import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInputSearch = {
  value: string;
};

type InputValueState = {
  inputSearch: TInputSearch;
};

const initialState: InputValueState = {
  inputSearch: { value: "" },
};

const inputSearchSlice = createSlice({
  name: "inputSearchValue",
  initialState,
  reducers: {
    addValueInput: (state, action: PayloadAction<string>) => {
      state.inputSearch.value = action.payload;
    },
  },
});

export const { addValueInput } = inputSearchSlice.actions;

export default inputSearchSlice.reducer;
