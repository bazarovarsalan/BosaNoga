import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ICatalogItem {
  id: number | string;
  title: string;
}

interface IState {
  categories: ICatalogItem[];
  status: string;
  error: string | null | undefined;
}

const initialState: IState = {
  categories: [],
  status: "",
  error: null,
};

export const fetchCatalogCategories = createAsyncThunk(
  "catalogCategories/fetchCatalog",
  async function () {
    const response = await fetch(
      `${import.meta.env.VITE_BOSA_NOGA_API}categories`
    );
    if (!response.ok) {
      throw Error("Server error");
    }
    const data = await response.json();
    return data;
  }
);

const catalogCategoriesSlice = createSlice({
  name: "catalogCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCatalogCategories.fulfilled, (state, action) => {
        state.status = "resolved";
        state.categories = action.payload;
      })
      .addCase(fetchCatalogCategories.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default catalogCategoriesSlice.reducer;
