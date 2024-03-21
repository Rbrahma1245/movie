import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: "idle",
  error: null,
  page: 1,
  dbType: "trending/all/day"
};

export const fetchAPI = createAsyncThunk(
  "fetchAPI",
  async ({ page, dbType }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${dbType}?api_key=5f047e2fe0b11cb702bceaa2ca86c0ef&page=${page}`
    );
    return response.data;
  }
);


const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    changePage: (state) => {
      state.page += 1;
    },
    changeAPI: (state, action) => {
      state.dbType = action.payload;
    },
  },
  extraReducers: (builder) => {
    // console.log(builder, "builder");
    builder
      .addCase(fetchAPI.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchAPI.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
      })
      .addCase(fetchAPI.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});

export const { changePage, changeAPI } = MovieSlice.actions;
export default MovieSlice.reducer;