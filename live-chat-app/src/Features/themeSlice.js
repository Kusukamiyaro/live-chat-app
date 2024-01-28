import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "themseSlice",
  initialState: true,
  reducers: {
    toggleTheme: (state) => {
      return state =!state;
    },
  },
});
export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;