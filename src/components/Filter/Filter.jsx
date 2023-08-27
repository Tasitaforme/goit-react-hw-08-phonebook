import { FilterWrap } from './Filter.styled';
import { Input } from '../ContactForm/ContactForm.styled';

import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';

const Filter = () => {
  const value = useSelector(selectFilter);
  const dispatch = useDispatch();
  
  const onChange = e => {
    dispatch(setFilter(e.target.value.toLowerCase().trim()));
  };

  return (
    <FilterWrap>
      <label htmlFor="input_filter">👇 Find contact by name</label>

      <Input
        id="input_filter"
        type="text"
        name="filter"
        placeholder="Start enter name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={onChange}
        value={value}
      />
    </FilterWrap>
  );
};
export default Filter;

