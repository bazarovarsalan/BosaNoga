import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction, AnyAction } from "@reduxjs/toolkit";

export interface IItem {
  category: number;
  color: string;
  heelSize: string;
  id: number;
  images: string[];
  manufactur: string;
  material: string;
  price: number;
  reason: string;
  season: string;
  sizes: { size: string; available: boolean }[];
  sku: string;
  title: string;
}

interface State {
  item: IItem | null | undefined;
  status: string;
  error: string | null;
}

const initialState: State = {
  item: null,
  status: "",
  error: null,
};

export const fetchItemDetails = createAsyncThunk<
  IItem,
  string | undefined,
  { rejectValue: string }
>("itemDetails/fetchItemDetails", async function (id, { rejectWithValue }) {
  const response = await fetch(`http://localhost:7070/api/items/${id}`);
  if (!response.ok) {
    return rejectWithValue("Server error");
  }
  const data = await response.json();
  return data as IItem;
});

// By the way In the documentation to this project given a wrong adress `http://localhost:7070/api/items/:id`
// But correct url is `http://localhost:7070/api/items/id`

const itemDetailsSlice = createSlice({
  name: "itemDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchItemDetails.fulfilled, (state, action) => {
        state.status = "resolved";
        state.item = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.status = "rejected";
      });
  },
});

export default itemDetailsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
