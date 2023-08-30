import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInputSearch = {
  value: string;
  toggleSearchInput: boolean;
};

type InputValueState = {
  inputSearch: TInputSearch;
};

const initialState: InputValueState = {
  inputSearch: { value: "", toggleSearchInput: true },
};

const inputSearchSlice = createSlice({
  name: "inputSearchValue",
  initialState,
  reducers: {
    addValueInput: (state, action: PayloadAction<string>) => {
      state.inputSearch.value = action.payload;
    },
    changeToggleInput: (state) => {
      state.inputSearch.toggleSearchInput =
        !state.inputSearch.toggleSearchInput;
    },
  },
});

export const { addValueInput, changeToggleInput } = inputSearchSlice.actions;

export default inputSearchSlice.reducer;
