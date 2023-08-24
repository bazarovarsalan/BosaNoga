import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface IItemForOrder {
  id: number;
  price: number;
  count: number;
}

export interface IOwner {
  phone: string;
  adress: string;
}
interface IAsyncParams {
  owner: IOwner;
  items: IItemForOrder[];
}

interface IStateForOrder {
  inputForOrder: IOwner;
  status: string | null;
  error: string | null | undefined;
}

const initialState: IStateForOrder = {
  inputForOrder: { phone: "", adress: "" },
  status: "",
  error: null,
};

export const fetchPostOrder = createAsyncThunk<unknown, IAsyncParams>(
  "placeTheOrder/fetchPlaceTheOrder",
  async function (asyncParams) {
    const response = await fetch(`http://localhost:7070/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(asyncParams),
    });
    return response.ok;
  }
);

const placeTheOrderSlice = createSlice({
  name: "placeTheOrder",
  initialState,
  reducers: {
    addInputPhoneForOrder: (state, action: PayloadAction<string>) => {
      state.inputForOrder.phone = action.payload;
    },
    addInputAdressForOrder: (state, action: PayloadAction<string>) => {
      state.inputForOrder.adress = action.payload;
    },
    clearState: (state) => {
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPostOrder.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchPostOrder.fulfilled, (state) => {
        state.status = "resolved";
        state.error = null;
      });
  },
});

export const { addInputPhoneForOrder, addInputAdressForOrder, clearState } =
  placeTheOrderSlice.actions;

export default placeTheOrderSlice.reducer;
