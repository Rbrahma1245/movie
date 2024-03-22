import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieGenre } from "../../Reducer/MoviesSlice";
import "./MovieGenre.scss";
import { Button } from "@mui/material";

const MovieGenre = () => {
  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movie.dbType == "discover/movie") {
      dispatch(fetchMovieGenre());
    }
  }, [movie.dbType == "discover/movie"]);

  return (
    <div className="movieGenre-container">
      {movie.movieGenre.genres?.map((e) => {
        return (
          <div key={e.id}>
            <Button
              variant="outlined"
              size="small"
              style={{ textTransform: "none" }}
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
