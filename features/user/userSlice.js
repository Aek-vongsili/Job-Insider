import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.isLoggedIn = true;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setLogout(state, action) {
      state.user = null;
      state.isLoggedIn = false;
    },
    setRole(state, { payload }) {
      state.role = payload;
    },
  },
});

export const { setUser, setLoading, setError, setLogout, setRole } =
  userSlice.actions;
export const selectRole = (state) => state.user.role;
export default userSlice.reducer;
