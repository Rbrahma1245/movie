import { useState } from "react";
import "./Footer.scss";

import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeAPI } from "../../Reducer/MoviesSlice";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Footer = () => {
  let [isClicked, setIsClicked] = useState({
    trending: true,
    movie: false,
    tv: false,
    search: false,
  });

  const dispatch = useDispatch();

  function handleClick(dbType) {
    if (dbType !== "search") {
      dispatch(changeAPI(dbType));
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsClicked({
      ...isClicked,
      trending: dbType === "trending/all/day" ? true : false,
      movie: dbType === "discover/movie" ? true : false,
      tv: dbType === "discover/tv" ? true : false,
      search: dbType === "search" ? true : false,
    });
  }

  return (
    <div className="footer-container">
      <Tooltip title="Trending">
        <NavLink to="/">
          <WhatshotOutlinedIcon
            className="footer-icon"
            style={{ color: isClicked.trending ? "#bb9c21" : "" }}
            onClick={() => handleClick("trending/all/day")}
          />
        </NavLink>
      </Tooltip>
      <Tooltip title="Movies">
        <NavLink to="/">
          <MovieCreationOutlinedIcon
            className="footer-icon"
            style={{ color: isClicked.movie ? "#bb9c21" : "" }}
            onClick={() => handleClick("discover/movie")}
          />
        </NavLink>
      </Tooltip>
      <Tooltip title="TV Series">
        <NavLink to="/">
          <TvOutlinedIcon
            className="footer-icon"
            style={{ color: isClicked.tv ? "#bb9c21" : "" }}
            onClick={() => handleClick("discover/tv")}
          />
        </NavLink>
      </Tooltip>
      <Tooltip title="Search">
        <NavLink to="/search">
          <SearchOutlinedIcon
            className="footer-icon"
            style={{ color: isClicked.search ? "#bb9c21" : "" }}
            onClick={() => handleClick("search")}
          />
        </NavLink>
      </Tooltip>
      <Helmet>
        <title>{"Trending"}</title>
        <meta name="description" content="react, helmet, meta tags for search" />
      </Helmet>
    </div>
  );
};

export default Footer;
