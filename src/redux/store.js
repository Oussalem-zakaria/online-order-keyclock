import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import userReducer from "./userSlice";
import customerReducer from "./customerSlice";
import productReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    user: userReducer,
    customer: customerReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;