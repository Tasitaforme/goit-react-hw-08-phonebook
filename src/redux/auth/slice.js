import { logInThunk, logOutThunk, refreshThunk, signUpThunk } from './thunks';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  token: '',
  isLoading: false,
  error: '',
  profile: {},
};

const handlePending = state => {
    state.isLoading = true;
    state.error = ''
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFulfilledSignUp = (state, { payload }) => {
  state.profile = payload.user;
  state.token = payload.token;
  state.isLoading = false;
  state.error = '';
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(signUpThunk.pending, handlePending)
      .addCase(signUpThunk.fulfilled, handleFulfilledSignUp)
      .addCase(signUpThunk.rejected, handleRejected)
      .addCase(logInThunk.pending, handlePending)
      .addCase(logInThunk.fulfilled, handleFulfilledSignUp)
      .addCase(logInThunk.rejected, handleRejected)
      .addCase(logOutThunk.pending, handlePending)
      .addCase(logOutThunk.fulfilled, () => initialState)
      .addCase(logOutThunk.rejected, handleRejected)
      .addCase(refreshThunk.pending, handlePending)
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.profile.name = payload.name;
        state.profile.email = payload.email;
        state.token = payload.token;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(refreshThunk.rejected, handleRejected);
      
  },
});

export const authReducer = authSlice.reducer;
