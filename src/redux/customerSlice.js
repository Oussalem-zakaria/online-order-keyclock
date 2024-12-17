import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCustomers as fetchAllCustomers,
  deleteCustomer as removeCustomerAPI,
  createCustomer as addCustomerAPI,
  updateCustomer as updateCustomerAPI,
  getCustomer as fetchCustomerById,
  getCustomerByEmail as fetchCustomerByEmail
} from "../services/customersHttp";

const initialState = {
  currentCustomer: JSON.parse(localStorage.getItem("customer")) || {},
  customers: [],
  status: "idle",
  error: null,
};

export const getAllCustomers = createAsyncThunk("customers/getAllCustomers", async () => {
  const response = await fetchAllCustomers();
  return response;
});

export const getCustomer = createAsyncThunk(
  "customers/getCustomer",
  async (id) => {
    const response = await fetchCustomerById(id);
    return response;
  }
);

export const getCustomerByEmail = createAsyncThunk(
  "customers/getCustomerByEmail",
  async (email) => {
    const response = await fetchCustomerByEmail(email);
    return response;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customerId) => {
    await removeCustomerAPI(customerId);
    return customerId;
  }
);

export const addCustomer = createAsyncThunk(
  "customers/addCustomer",
  async ({ customerData }) => {
    console.log("customerData REDUX", customerData);
    const response = await addCustomerAPI(customerData);
    return response;
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ customerId, customerData }) => {
    console.log("customer ID: ", customerId);
    const response = await updateCustomerAPI(customerId, customerData);
    return response;
  }
);

const customerslice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.currentCustomer = action.payload;
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
      .addCase(getAllCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentCustomer = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter((customer) => customer.id !== action.payload);
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.customers.findIndex(
          (customer) => customer.id === action.payload.id
        );
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      });
  },
});

export const { setCustomer, setStatus, setError } = customerslice.actions;

export default customerslice.reducer;