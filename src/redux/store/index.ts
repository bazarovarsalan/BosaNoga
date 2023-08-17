import { configureStore } from "@reduxjs/toolkit";
import topSalesSlice from "./topSalesSlice";
import catalogCategoriesSlice from "./catalogCategoriesSlice";
import catalogItemsSlice from "../catalogItemsSlice";
import inputSearchSlice from "./inputSearchSlice";

const store = configureStore({
  reducer: {
    topSales: topSalesSlice,
    catalogCategories: catalogCategoriesSlice,
    catalogItems: catalogItemsSlice,
    inputSearch: inputSearchSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
