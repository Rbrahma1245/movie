/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMovieGenere, fetchMovieGenre } from "../../Reducer/MoviesSlice";
import "./MovieGenre.scss";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

const MovieGenre = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movie.dbType !== "trending/all/day") {
      let genreType = movie.dbType === "discover/movie" ? "movie" : "tv";
      dispatch(fetchMovieGenre(genreType));
    }
  }, [movie.dbType]);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = (id) => {
    dispatch(changeMovieGenere({ dbType: movie.dbType, genereId: id }));
    setIsOpen(false);
  };

  if (movie.dbType === "trending/all/day") {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <div className="mobile-container">
          <Button
            variant="outlined"
            size="small"
            onClick={handleOpen}
          >
            <DragHandleIcon />
          </Button>
          <Drawer anchor="right" open={isOpen} onClose={handleClose}>
            <List>
              {movie.movieGenre.genres?.map((e) => (
                <ListItem key={e.id} onClick={() => handleClick(e.id)}>
                  <ListItemText primary={e.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default MovieGenre;
