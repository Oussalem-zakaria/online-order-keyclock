import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOrders as fetchAllOrders,
  deleteOrder as removeOrderAPI,
  createOrder as addOrderAPI,
  updateOrder as updateOrderAPI,
  getOrder as fetchOrderById,
  getOrdersByCustomer as fetchOrdersByCustomer
} from "../services/ordersHttp";

const initialState = {
  currentOrder: JSON.parse(localStorage.getItem("order")) || {},
  orders: [],
  status: "idle",
  error: null,
};

export const getAllOrders = createAsyncThunk("orders/getAllOrders", async () => {
  const response = await fetchAllOrders();
  return response;
});

export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (id) => {
    const response = await fetchOrderById(id);
    return response;
  }
);

export const getOrdersByCustomer = createAsyncThunk(
  "orders/getOrdersByCustomer",
  async (customerId) => {
    console.log("customerId Redux: ", customerId)
    const response = await fetchOrdersByCustomer(customerId);
    return response;
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId) => {
    await removeOrderAPI(orderId);
    return orderId;
  }
);

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ orderData }) => {
    console.log("Order Data Redux: ", orderData)
    const response = await addOrderAPI(orderData);
    return response;
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ orderId, orderData }) => {
    console.log("Order ID: ", orderId);
    const response = await updateOrderAPI(orderId, orderData);
    return response;
  }
);

const orderslice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getOrdersByCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  },
});

export const { setOrder, setStatus, setError } = orderslice.actions;

export default orderslice.reducer;