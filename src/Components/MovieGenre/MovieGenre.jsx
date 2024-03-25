/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMovieGenere, fetchMovieGenre } from "../../Reducer/MoviesSlice";
import "./MovieGenre.scss";
import { Button } from "@mui/material";

const MovieGenre = () => {
  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movie.dbType !== "trending/all/day") {
      let genreType = movie.dbType === "discover/movie" ? "movie" : "tv";
      dispatch(fetchMovieGenre(genreType));
    }
  }, [movie.dbType]);

  const handleClick = (id) => {
    dispatch(changeMovieGenere({ dbType: movie.dbType, genereId: id }));
  };

  // console.log(movie);

  return (
    <div className="movieGenre-container">
      {movie.movieGenre.genres?.map((e) => {
        return (
          <div key={e.id}>
            <Button
              variant="outlined"
              size="small"
              style={{ textTransform: "none" }}
              onClick={() => handleClick(e.id)}
            >
              {e.name}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default MovieGenre;
