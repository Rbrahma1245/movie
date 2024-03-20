import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAPI = createAsyncThunk("fetchAPI", async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=5f047e2fe0b11cb702bceaa2ca86c0ef`
  );
  return response.data;
});

const initialState = {
  data: [],
  loading: "idle",
  error: null,
};

const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
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

export const { selectOption } = MovieSlice.actions;
export default MovieSlice.reducer;
