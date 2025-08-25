import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// базовый URL твоего backend
const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Устанавливаем токен в заголовки
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// Получить все заявки текущего пользователя
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

// Создать новую заявку для текущего пользователя
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

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchApplications
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // только текущий пользователь
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })
      // createApplication
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
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export default applicationsSlice.reducer;
