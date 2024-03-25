/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../../Reducer/MoviesSlice";
import CardList from "../../Components/Card/Card";

import "./Movies.scss";
import Loader from "../../Components/Loader";
import PaginationPage from "../../Components/Pagination/Pagination";
import MovieGenre from "../../Components/MovieGenre/MovieGenre";


const Movies = () => {
  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAPI({ page: movie.page, dbType: movie.dbType, isGenereById: movie.isGenereById, genereID: movie.genereID }));

  }, [movie.page, movie.dbType, movie.genereID]);

  if (movie.loading == "pending") return <Loader />;

  return (
    <div className="movie-container">
      <h2>
        {movie.dbType === "discover/movie"
          ? "MOVIES"
          : movie.dbType === "discover/tv"
            ? "TV SERIES"
            : movie.dbType === "trending/all/day"
              ? "TRENDING"
              : ""}
      </h2>
      <MovieGenre />
      <div className="movie-box">
        {movie.data.results?.map((e, i) => (
          <CardList key={i} elem={e} />
        ))}
      </div>
      <PaginationPage />
    </div>
  );
};

export default Movies;
