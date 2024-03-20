import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../../Reducer/MoviesSlice";
import CardList from "../../Components/Card/Card";

const Movies = () => {
  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  console.log(movie);

  useEffect(() => {
    dispatch(fetchAPI());
  }, []);

  if (movie.loading == "pending") return <div>Loading...</div>;

  return (
    <div style={{ color: "white" }}>
      {movie.data.results?.map((e, i) => (
        <CardList key={i} elem={e} />
      ))}
    </div>
  );
};

export default Movies;
