import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchMovieDetailById } from "../../Reducer/MoviesSlice";
import { Button, Typography, useMediaQuery } from "@mui/material";

const MovieDetails = () => {
  let { movieId, elemType } = useParams();
  const isMobile = useMediaQuery("(max-width:600px)");

  const movie = useSelector((state) => state.movie);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetailById({ elemType, movieId }));
  }, []);

  const hours = Math.floor(movie.data?.runtime / 60);
  const minutes = movie.data?.runtime % 60;

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
          padding: 10,
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ width: isMobile ? "100%" : "30%" }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.data.poster_path}`}
            alt={movie.data.original_title || movie.data.original_name}
            loading="lazy"
            style={{ width: "100%", height: "450px", borderRadius: 8 }}
          />
        </div>
        <div style={{ width: isMobile ? "100%" : "60%" , marginTop:10}} >
          <Typography variant={isMobile ? "subtitle1" : "h5"}>
            {movie.data.original_title || movie.data.original_name}
            {` (${
              movie.data.release_date?.slice(0, 4) ||
              movie.data.last_air_date?.slice(0, 4)
            })`}
          </Typography>
          <Typography variant={isMobile ? "span" : "subtitle1"} gutterBottom>
            {`${movie.data.release_date || movie.data.last_air_date}`}
            {` (${movie.data.production_companies?.[0]?.origin_country})`}
            {`  *  ${movie.data.genres?.map((e) => e.name)}`}
            {movie.data?.runtime ? `  * ${hours}hr ${minutes}min ` : ""}
          </Typography>

          <Typography variant={isMobile ? "subtitle1" : "h5"} mt={isMobile ? 2 : 5}>
            Overview
          </Typography>
          <Typography variant={isMobile ? "span" : "subtitle1"}>
            {movie.data.overview}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
