import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ITopItems {
  id: string;
  category: string;
  title: string;
  price: string;
  images: string;
}

interface IState {
  topItems: ITopItems[];
  status: string;
  error: string | null | undefined;
}

const initialState: IState = {
  topItems: [],
  status: "",
  error: null,
};

export const fetchTopSales = createAsyncThunk(
  "topSales/fetchTopSales",
  async function (_, { rejectWithValue }) {
    const response = await fetch(
      `${import.meta.env.VITE_BOSA_NOGA_API}top-sales`
    );
    if (!response.ok) {
      return rejectWithValue("Server error");
    }
    const data = await response.json();
    return data as ITopItems[];
  }
);

const topSalesSlice = createSlice({
  name: "topSales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.status = "resolved";
        state.topItems = action.payload;
      })
      .addCase(fetchTopSales.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default topSalesSlice.reducer;
