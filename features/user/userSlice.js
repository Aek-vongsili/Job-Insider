import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.isLoggedIn= true;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setLogout(state,action){
        state.user = null;
        state.isLoggedIn=false;
    }
  },
});

export const { setUser, setLoading, setError,setLogout } = userSlice.actions;


export default userSlice.reducer;