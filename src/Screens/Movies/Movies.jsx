/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../../Reducer/MoviesSlice";
import CardList from "../../Components/Card/Card";

import "./Movies.scss";
import Loader from "../../Components/Loader";
import PaginationPage from "../../Components/Pagination/Pagination";
import MovieGenre from "../../Components/MovieGenre/MovieGenre";
import { useMediaQuery } from "@mui/material";
import SelectField from "../../Components/SelectField/SelectField";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Movies = () => {
  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [sortedResults, setSortedResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(
      fetchAPI({
        page: movie.page,
        dbType: movie.dbType,
        isGenereById: movie.isGenereById,
        genereID: movie.genereID,
      })
    );
  }, [movie.page, movie.dbType, movie.genereID]);

  useEffect(() => {
    const results = movie.data.results;
    let updatedResults = [];
    if (movie.rating === "HighToLow") {
      updatedResults = results
        ? [...results].sort((a, b) => b.vote_average - a.vote_average)
        : [];
    } else if (movie.rating === "LowToHigh") {
      updatedResults = results
        ? [...results].sort((a, b) => a.vote_average - b.vote_average)
        : [];
    } else {
      updatedResults = results;
    }

    setSortedResults(updatedResults);
  }, [movie]);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    let year = date?.toLocaleDateString().split("/").pop();
    let updatedResults = movie.data.results?.filter((e) => {
      const releaseYear = e.first_air_date
        ? e.first_air_date.substring(0, 4)
        : e.release_date?.split("-")[0];
      return releaseYear == year;
    });

    setSortedResults(updatedResults);
  };

  console.log(movie);

  if (movie.loading == "pending") return <Loader />;

  return (
    <div className="movie-container">
      {/* <h2 style={{ fontSize: isMobile && "16px" }}>
        {movie.dbType === "discover/movie"
          ? "MOVIES"
          : movie.dbType === "discover/tv"
          ? "TV SERIES"
          : movie.dbType === "trending/all/day"
          ? "TRENDING"
          : ""}
      </h2> */}

      <div className="header-content" style={{ display: "flex", justifyContent:"center", alignItems:"center", gap:"10%", marginBottom:"15px" }}>
        <DatePicker selected={selectedDate} onChange={handleDateChange}/>
        {/* {selectedDate && (
        <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
      )} */}
        <h2 style={{ fontSize: isMobile && "16px"}}>
          {movie.dbType === "discover/movie"
            ? "MOVIES"
            : movie.dbType === "discover/tv"
              ? "TV SERIES"
              : movie.dbType === "trending/all/day"
                ? "TRENDING"
                : ""}
        </h2>
        <SelectField />
      </div>


      <MovieGenre />
      <div className="movie-box">
        {sortedResults?.map((e, i) => (
          <CardList key={i} elem={e} />
        ))}
      </div>
      <PaginationPage />
    </div>
  );
};

export default Movies;
