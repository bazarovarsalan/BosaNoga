import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const fetchTopSales = createAsyncThunk<{ rejectValue: string }>(
  "topSales/fetchTopSales",
  async function (_, { rejectWithValue }) {
    const response = await fetch("http://localhost:7070/api/top-sales");
    if (!response.ok) {
      return rejectWithValue("Server error");
    }
    const data = await response.json();
    return data;
  }
);

const topSalesSlice = createSlice({
  name: "topSales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state, _action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.status = "resolved";
        state.topItems = action.payload;
      })
      .addCase(fetchTopSales.rejected, (state, action) => {
        console.log(action);
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default topSalesSlice.reducer;
