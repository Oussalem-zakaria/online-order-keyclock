import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts as fetchAllProducts,
  deleteProduct as removeProductAPI,
  createProduct as addProductAPI,
  updateProduct as updateProductAPI,
  getProduct as fetchProductById
} from "../services/productsHttp";

const initialState = {
  currentProduct: JSON.parse(localStorage.getItem("product")) || {},
  products: [],
  status: "idle",
  error: null,
};

export const getAllProducts = createAsyncThunk("products/getAllProducts", async () => {
  const response = await fetchAllProducts();
  return response;
});

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (email) => {
    const response = await fetchProductById(email);
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    await removeProductAPI(productId);
    return productId;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ productData, role }) => {
    console.log("ROLE****: ", role);
    const response = await addProductAPI(productData, role);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, productData }) => {
    const response = await updateProductAPI(productId, productData);
    return response;
  }
);

const productslice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.currentProduct = action.payload;
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
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
  },
});

export const { setProduct, setStatus, setError } = productslice.actions;

export default productslice.reducer;