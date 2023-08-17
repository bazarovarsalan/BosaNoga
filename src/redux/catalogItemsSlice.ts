import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction, AnyAction } from "@reduxjs/toolkit";

export interface CatalogItem {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

interface IStateCatalogItems {
  items: CatalogItem[];
  status: string;
  error: string | null | undefined;
}

const initialState: IStateCatalogItems = {
  items: [],
  status: "",
  error: null,
};

interface IAsyncParams {
  get?: { status: boolean; id?: string };
  offset?: { status: boolean; id?: string; quontityToOffset: number };
  search?: { status: boolean; value: string };
}

export const fetchCatalogItems = createAsyncThunk<
  CatalogItem,
  IAsyncParams,
  { rejectValue: string }
>(
  "catalogItems/fetchCatalogItems",
  async function (asyncParams, { rejectWithValue }) {
    const urlFoo = () => {
      if (asyncParams.get?.status) {
        return !(asyncParams.get?.id === "All")
          ? `http://localhost:7070/api/items?categoryId=${asyncParams.get.id}`
          : "http://localhost:7070/api/items";
      } else if (asyncParams.offset?.status) {
        return !(asyncParams.offset?.id === "All")
          ? `http://localhost:7070/api/items?categoryId=${asyncParams.offset.id}&offset=${asyncParams.offset?.quontityToOffset}`
          : `http://localhost:7070/api/items?offset=${asyncParams.offset.quontityToOffset}`;
      } else if (asyncParams.search?.status) {
        return `http://localhost:7070/api/items?q=${asyncParams.search.value}`;
      }
    };
    // this function returns string url adress for fetch depends of type of request

    const url = urlFoo() as string;

    const response = await fetch(url);
    if (!response.ok) {
      throw Error("Server error");
    }
    const data = await response.json();
    return data as CatalogItem;
  }
);

const catalogItemsSlice = createSlice({
  name: "catalogItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogItems.pending, (state, _action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCatalogItems.fulfilled, (state, action) => {
        state.status = "resolved";
        state.items = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.status = "rejected";
      });
  },
});

export default catalogItemsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
