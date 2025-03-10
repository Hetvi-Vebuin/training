import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lng: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lng=action.payload
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
