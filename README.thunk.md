### Оголошення асинхронного генератора action за допомогою функції [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)

`createAsyncThunk()` – це функція з бібліотеки Redux Toolkit, яка дозволяє створювати асинхронні action creators. Ця функція приймає два аргументи:

1. тип action;
1. функція-обробник, яка повинна виконати HTTP-запит і повернути Promise із даними, які стануть значенням payload в action.

Колбек функція, в якій виконується запит, називається
[`payloadCreator`](https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator)
і відповідає за складання значення властивості payload. Вона буде викликана з
двома аргументами:

1. **arg** — значення, яке було передано операції під час виклику (наприклад id для видалення контакту);
1. **thunkAPI** — об’єкт, що містить усі параметри, які зазвичай передаються до
   thunk-функції, а також деякі додаткові (наприклад rejectWithValue — це
   допоміжна функція, яка дозволяє повернути відхилену відповідь в payload).

### Обробка запиту, що завершився з помилкою

```js
//action.js / operations.js / thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';

//1-й варіант (помилка від axios)
export const getContactsThunk = createAsyncThunk(
  'contacts/fetchAll', // Унікальний рядок, що ідентифікує тип action
  // Використовуємо символ підкреслення як ім'я першого параметра,
  // тому що в цій операції він нам не потрібен
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      // При успішному запиті повертаємо проміс із даними
      return response.data;
    } catch (error) {
      // При помилці запиту повертаємо проміс
      // який буде відхилений з текстом помилки від axios
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//2-й варіант (помилка від бекенду)
export const createContactThunk = createAsyncThunk('contacts/addContact', newContact =>
   async (newContact, {rejectWithValue}) => {
 try {
      const { data } = await axios.post('/contacts', newContact);
      return data;
    } catch (error) {
      // При помилці запиту повертаємо проміс
      // який буде відхилений з текстом помилки від бекенду
      return rejectWithValue(error.response.data);
    }
  }
);

//3-й варіант (помилка від axios без async в thunk)
export const deleteContactThunk = createAsyncThunk('contacts/deleteContact', id =>
  const { data } = await axios.delete(`contacts/${id}`);
  return data;
);
```

```js
//contactsSlice.js
import { createSlice } from '@reduxjs/toolkit';

//виносимо функцію для 2-го варіанту оптимізації коду
const thunkArr = [getContactsThunk, deleteContactThunk, deleteContactThunk];
const defineThunkStatus = status => {
  return thunkArr.map(el => el(status));
};

//виносимо повторювані дії в функцію для 4-го варіанту оптимізації коду
//краще винести окремо в файл handlers.js
const handlePending = state => {
  state.isLoading = true;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: null,
    isLoading: false,
    error: null,
  },
  // Додавання обробки внутрішніхекшенів
  reducers: {},
  // Додавання обробки зовнішніх екшенів (thunk actions)
  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(createContactThunk.fulfilled, (state, { payload }) => {
        // .unshift() додасть елемент на початок масиву
        // .push() додасть елемент в кінець масиву
        state.items.push(payload);
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        //state.items = state.items.filter(el => el.id !=== payload.id)
        const index = state.items.findIndex(el => el.id === payload.id);
        state.items.splice(index, 1);
      })
      .addMatcher(
        //1-й варіант для оптимізації коду з очікуванням відповіді
        isAnyOf(
          getContactsThunk.pending,
          createContactThunk.pending,
          deleteContactThunk.pending
        ),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        //2-й варіант для оптимізації коду з очікуванням відповіді
        isAnyOf(...defineThunkStatus('pending')),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        //3-й варіант для оптимізації коду з очікуванням відповіді
        action => action.type.endsWith('pending'),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        //4-й варіант для оптимізації коду з очікуванням відповіді
        action => action.type.endsWith('pending'),
        handlePending
      )
      .addMatcher(
        action => action.type.endsWith('fulfilled'),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      //1-й варіант (помилка від axios)
      .addCase(getContactsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      //2-й варіант (помилка від бекенду)
      .addCase(createContactThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })
      //3-й варіант (помилка від axios)
      .addCase(deleteContactThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
```
