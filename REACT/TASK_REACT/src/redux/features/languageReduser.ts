import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lng: "en",
};

const languageReduser = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lng=action.payload
    },
  },
});

export const { setLanguage } = languageReduser.actions;
export default languageReduser.reducer;
