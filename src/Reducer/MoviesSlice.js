import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: "idle",
  error: null,
  page: 1,
  dbType: "trending/all/day",
  movieGenre: {},
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

export const fetchMovieGenre = createAsyncThunk("fetchMovieGenre", async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=5f047e2fe0b11cb702bceaa2ca86c0ef`
  );
  return response.data;
});

// export const searchMovieByID = createAsyncThunk(
//   "fetchAPIById",
//   async (id) => {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/discover/movie?api_key=5f047e2fe0b11cb702bceaa2ca86c0ef&with_genres=${id}&page=${page}`
//     );
 
//     return response.data;
//   }
// );


const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeAPI: (state, action) => {
      state.dbType = action.payload;
      state.movieGenre = {};
      state.page = 1;
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
      .addCase(fetchMovieGenre.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })

      .addCase(fetchMovieGenre.fulfilled, (state, action) => {
        state.movieGenre = action.payload;
      });
  },
});

export const { changePage, changeAPI } = MovieSlice.actions;
export default MovieSlice.reducer;
