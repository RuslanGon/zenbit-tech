import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/applications", 
});

// получить все заявки
export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// создать заявку
export const createApplication = createAsyncThunk(
  "applications/createApplication",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
      .addCase(fetchApplications.pending, (state) => { state.loading = true; })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(createApplication.pending, (state) => { state.loading = true; })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default applicationsSlice.reducer;
