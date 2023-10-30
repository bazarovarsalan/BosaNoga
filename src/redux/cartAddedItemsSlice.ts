import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type IItemCart = {
  id: number;
  title: string;
  price: number;
  image: string;
  size: string;
  quontity: number;
};

type ICartAddedState = {
  cartList: IItemCart[];
};

const initialState: ICartAddedState = {
  cartList: [],
};

const cartAddedItemsSlice = createSlice({
  name: "cartAddedItems",
  initialState,
  reducers: {
    addToCartItem: (state, action: PayloadAction<IItemCart>) => {
      const isTheSameItem = state.cartList.find(
        (o) => o.id === action.payload.id
      );
      if (isTheSameItem) {
        isTheSameItem.quontity =
          isTheSameItem.quontity + action.payload.quontity;
      } else {
        state.cartList = [...state.cartList, action.payload];
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartList = state.cartList.filter((el) => el.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartList = [];
    },
  },
});

export const { addToCartItem, removeFromCart, clearCart } =
  cartAddedItemsSlice.actions;

export default cartAddedItemsSlice.reducer;
