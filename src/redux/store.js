import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import userReducer from "./userSlice";
import customerReducer from "./customerSlice";
import productReducer from "./productsSlice";
import orderReducer from "./ordersSlice";
import auditReducer from "./auditSlice";
import employeeReducer from "./employeeSlice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    user: userReducer,
    customer: customerReducer,
    product: productReducer,
    order: orderReducer,
    audit: auditReducer,
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
