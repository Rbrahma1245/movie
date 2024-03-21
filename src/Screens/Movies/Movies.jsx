import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../../Reducer/MoviesSlice";
import CardList from "../../Components/Card/Card";

import "./Movies.scss";
import Loader from "../../Components/Loader";
// import Pagination from "../../Components/Pagination/Pagination";

const Movies = () => {
  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  console.log(movie);

  useEffect(() => {
    dispatch(fetchAPI({ page: movie.page, dbType: movie.dbType }));
  }, [movie.page, movie.dbType]);

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

      <div className="movie-box">
        {movie.data.results?.map((e, i) => (
          <CardList key={i} elem={e} />
        ))}
      </div>

      {/* <Pagination /> */}
    </div>
  );
};

export default Movies;
