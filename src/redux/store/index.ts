import { configureStore, combineReducers } from "@reduxjs/toolkit";
import topSalesSlice from "../topSalesSlice";
import catalogCategoriesSlice from "../catalogCategoriesSlice";
import catalogItemsSlice from "../catalogItemsSlice";
import inputSearchSlice from "../inputSearchSlice";
import itemDetailsSlice from "../itemDetailsSlice";
import cartAddedItemsSlice from "../cartAddedItemsSlice";
import placeTheOrderSlice from "../placeTheOrderSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
  topSales: topSalesSlice,
  catalogCategories: catalogCategoriesSlice,
  catalogItems: catalogItemsSlice,
  inputSearch: inputSearchSlice,
  itemDetails: itemDetailsSlice,
  cartAddedItems: cartAddedItemsSlice,
  placeTheOrder: placeTheOrderSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "topSales",
    "catalogCategories",
    "catalogItems",
    "inputSearch",
    "itemDetails",
    "placeTheOrder",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
