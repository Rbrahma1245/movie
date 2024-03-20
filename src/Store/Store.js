import { configureStore } from "@reduxjs/toolkit";
import MoviesSlice from "../Reducer/MoviesSlice";

const Store = configureStore({
  reducer: {
    movie: MoviesSlice,
  },
});

export default Store;
