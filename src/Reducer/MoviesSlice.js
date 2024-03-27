import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../Config/Config";

const initialState = {
  data: [],
  loading: "idle",
  error: null,
  page: 1,
  dbType: "trending/all/day",
  movieGenre: {},

  genereID: undefined,
  isGenereById: false,
};

export const fetchAPI = createAsyncThunk(
  "fetchAPI",
  async ({ page = 1, dbType, isGenereById, genereID }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${dbType}?api_key=${Config.tmdbKey}${
        isGenereById ? `&with_genres=${genereID}` : ""
      }&page=${page}`
    );
    return response.data;
  }
);

export const fetchMovieGenre = createAsyncThunk(
  "fetchMovieGenre",
  async (genreType) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/${genreType}/list?api_key=${Config.tmdbKey}`
    );
    return response.data;
  }
);

export const fetchMovieDetailById = createAsyncThunk(
  "fetchMovieDetailById",
  async ({elemType, movieId}) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${elemType}/${movieId}?api_key=${Config.tmdbKey}`
    );
    return response.data;
  }
);

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
    changeMovieGenere: (state, action) => {
      state.isGenereById = true;
      state.dbType = action.payload.dbType;
      state.genereID = action.payload.genereId;
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
        state.isGenereById = false;
      })
      .addCase(fetchMovieGenre.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })

      .addCase(fetchMovieGenre.fulfilled, (state, action) => {
        state.movieGenre = action.payload;
      })

      .addCase(fetchMovieDetailById.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const {
  changePage,
  changeAPI,
  changeMovieGenere,
  setIsGenereByIdFalse,
} = MovieSlice.actions;
export default MovieSlice.reducer;
