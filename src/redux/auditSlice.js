import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllAudits as fetchAllAudits,
  deleteAudit as removeAuditAPI,
  createAudit as addAuditAPI,
  getAudit as fetchAuditById
} from "../services/auditHttp";

const initialState = {
  currentAudit: JSON.parse(localStorage.getItem("audit")) || {},
  audits: [],
  status: "idle",
  error: null,
};

export const getAllAudits = createAsyncThunk("audits/getAllAudits", async () => {
  const response = await fetchAllAudits();
  return response;
});

export const getAudit = createAsyncThunk(
  "audits/getAudit",
  async (id) => {
    const response = await fetchAuditById(id);
    return response;
  }
);

export const deleteAudit = createAsyncThunk(
  "audits/deleteAudit",
  async (auditId) => {
    await removeAuditAPI(auditId);
    return auditId;
  }
);

export const addAudit = createAsyncThunk(
  "audits/addAudit",
  async ({ auditData }) => {
    console.log("Audit Data Redux: ", auditData)
    const response = await addAuditAPI(auditData);
    return response;
  }
);

const auditslice = createSlice({
  name: "audit",
  initialState,
  reducers: {
    setAudit: (state, action) => {
      state.currentAudit = action.payload;
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
      .addCase(getAllAudits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllAudits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.audits = action.payload;
      })
      .addCase(getAllAudits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAudit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAudit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentAudit = action.payload;
      })
      .addCase(getAudit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteAudit.fulfilled, (state, action) => {
        state.audits = state.audits.filter((audit) => audit.id !== action.payload);
      })
      .addCase(addAudit.fulfilled, (state, action) => {
        state.audits.push(action.payload);
      })
  },
});

export const { setAudit, setStatus, setError } = auditslice.actions;

export default auditslice.reducer;