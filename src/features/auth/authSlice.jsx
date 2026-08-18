import { createSlice } from '@reduxjs/toolkit';

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getStoredUser(),
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
