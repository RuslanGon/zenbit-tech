
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, { setAuthToken } from "../../api.js";

const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/applications");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const createApplication = createAsyncThunk(
  "applications/createApplication",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/applications", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const deleteApplication = createAsyncThunk(
  "applications/deleteApplication",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/applications/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(createApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(deleteApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((app) => app._id !== action.payload);
      })
      .addCase(deleteApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default applicationsSlice.reducer;
