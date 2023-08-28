import { createAsyncThunk } from '@reduxjs/toolkit';
import { logIn, logOut, refresh, signUp } from 'redux/api/requests';

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
 
    async (newContact, { rejectWithValue }) => {
      try {
        return await signUp(newContact);
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

export const logInThunk = createAsyncThunk('auth/login', async (body, thinkAPI) => {
  try {
    return await logIn(body);
  } catch (error) {
    return thinkAPI.rejectWithValue(
      error.message + '. ' + error.response.statusText + '.'
    );
  }
});

export const logOutThunk = createAsyncThunk(
  'auth/logout',

  async (_, { rejectWithValue }) => {
    try {
      return await logOut();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      return await refresh();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);