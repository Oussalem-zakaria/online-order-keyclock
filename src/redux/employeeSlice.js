import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllEmployees as fetchAllEmployees,
  deleteEmpoloyee as removeEmployeeAPI,
  createEmpoloyee as addEmployeeAPI,
  getEmpoloyee as fetchEmployeeById
} from "../services/employeeHttp";

const initialState = {
  currentEmployee: JSON.parse(localStorage.getItem("employee")) || {},
  employees: [],
  status: "idle",
  error: null,
};

export const getAllEmployees = createAsyncThunk("employees/getAllEmployees", async () => {
  const response = await fetchAllEmployees();
  return response;
});

export const getEmpoloyee = createAsyncThunk(
  "employees/getEmpoloyee",
  async (id) => {
    const response = await fetchEmployeeById(id);
    return response;
  }
);

export const deleteEmpoloyee = createAsyncThunk(
  "employees/deleteEmpoloyee",
  async (employeeId) => {
    await removeEmployeeAPI(employeeId);
    return employeeId;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async ({ employeeData }) => {
    console.log("Employee Data Redux: ", employeeData)
    const response = await addEmployeeAPI(employeeData);
    return response;
  }
);

const employeeslice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee: (state, action) => {
      state.currentEmployee = action.payload;
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
      .addCase(getAllEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getEmpoloyee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmpoloyee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentEmployee = action.payload;
      })
      .addCase(getEmpoloyee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteEmpoloyee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((employee) => employee.id !== action.payload);
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
  },
});

export const { setEmployee, setStatus, setError } = employeeslice.actions;

export default employeeslice.reducer;