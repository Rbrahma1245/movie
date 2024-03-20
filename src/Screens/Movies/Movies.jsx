import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, fetchAPI } from "../../Reducer/MoviesSlice";
import CardList from "../../Components/Card/Card";

import "./Movies.scss";
import Loader from "../../Components/Loader";

const Movies = () => {
  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  console.log(movie);

  useEffect(() => {
    dispatch(fetchAPI(movie.page));
  }, [movie.page]);

  function handleClick() {
    console.log("click");
    dispatch(changePage());
  }

  if (movie.loading == "pending") return <Loader />;

  return (
    <div className="movie-container">
      <div className="movie-box">
        {movie.data.results?.map((e, i) => (
          <CardList key={i} elem={e} />
        ))}
      </div>
      <button onClick={handleClick}>CLICK</button>
    </div>
  );
};

export default Movies;
