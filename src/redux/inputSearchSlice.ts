import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInputSearch = {
  value: string;
  toggleSearchInput: boolean;
  displaySearchingItem: string;
};

type InputValueState = {
  inputSearch: TInputSearch;
};

const initialState: InputValueState = {
  inputSearch: { value: "", toggleSearchInput: true, displaySearchingItem: "" },
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
    toDisplaySearchingItem: (state, action: PayloadAction<string>) => {
      state.inputSearch.displaySearchingItem = action.payload;
    },
  },
});

export const { addValueInput, changeToggleInput, toDisplaySearchingItem } =
  inputSearchSlice.actions;

export default inputSearchSlice.reducer;
