import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchMovieDetailById } from "../../Reducer/MoviesSlice";
import { Button, Typography } from "@mui/material";

const MovieDetails = () => {
  let { movieId, elemType } = useParams();

  const movie = useSelector((state) => state.movie);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetailById({elemType, movieId}));
  }, []);

  console.log(movie);



  const hours = Math.floor(movie.data?.runtime / 60);
  const minutes = movie.data?.runtime% 60;

  return (
    <>
      <NavLink to="/">
        <Button
          variant="outlined"
          style={{ margin: 10 }}
          sx={{ color: "#bb9c21", borderColor: "#bb9c21" }}
        >
          Back
        </Button>
      </NavLink>
      <div
        style={{
          display: "flex",
          marginTop: "30px",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ width: "30%" }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.data.poster_path}`}
            alt={movie.data.original_title || movie.data.original_name}
            loading="lazy"
            style={{ width: "90%", height: "450px", borderRadius:8 }}
          />
        </div>
        <div style={{ width: "60%" }}>
          <Typography variant="h5">
            {movie.data.original_title || movie.data.original_name}
            {` (${movie.data.release_date?.slice(0, 4) || movie.data.last_air_date?.slice(0, 4)})`}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {`${movie.data.release_date || movie.data.last_air_date}`}
            {` (${movie.data.production_companies?.[0]?.origin_country})`}
            {`  *  ${movie.data.genres?.map((e) => e.name)}`}
            {movie.data?.runtime ? `  * ${hours}hr ${minutes}min ` : ""}

          </Typography>

          <Typography variant="h6" mt={5}>
            Overview
          </Typography>
          <Typography>{movie.data.overview}</Typography>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
