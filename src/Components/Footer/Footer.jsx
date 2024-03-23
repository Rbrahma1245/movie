import { useState } from "react";
import "./Footer.scss";

import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeAPI } from "../../Reducer/MoviesSlice";

const Footer = () => {
  let [isClicked, setIsClicked] = useState({
    trending: true,
    movie: false,
    tv: false,
  });

  const dispatch = useDispatch();

  function handleClick(dbType) {
    dispatch(changeAPI(dbType));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsClicked({
      ...isClicked,
      trending: dbType === "trending/all/day" ? true : false,
      movie: dbType === "discover/movie" ? true : false,
      tv: dbType === "discover/tv" ? true : false,
    });
  }

  return (
    <div className="footer-container">
      <Tooltip title="Trending">
        <WhatshotOutlinedIcon
          className="footer-icon"
          style={{ color: isClicked.trending ? "#bb9c21" : "" }}
          onClick={() => handleClick("trending/all/day")}
        />
      </Tooltip>
      <Tooltip title="Movies">
        <MovieCreationOutlinedIcon
          className="footer-icon"
          style={{ color: isClicked.movie ? "#bb9c21" : "" }}
          onClick={() => handleClick("discover/movie")}
        />
      </Tooltip>
      <Tooltip title="TV Series">
        <TvOutlinedIcon
          className="footer-icon"
          style={{ color: isClicked.tv ? "#bb9c21" : "" }}
          onClick={() => handleClick("discover/tv")}
        />
      </Tooltip>
      <Tooltip title="Search">
        <SearchOutlinedIcon className="footer-icon" />
      </Tooltip>
    </div>
  );
};

export default Footer;
