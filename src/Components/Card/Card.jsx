import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import "./Card.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const CardList = ({ elem }) => {
  const movie = useSelector((state) => state.movie);

  let rating = elem.vote_average?.toFixed(2);

  return (
    <NavLink to={`${elem.id}`}>
    <motion.div
      className="card-container"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.8 }}
    >
      <Badge badgeContent={rating} color={rating < 6 ? "error" : "primary"}>
        <Card sx={{ maxWidth: 400 }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${elem.poster_path}`}
            alt={elem.title}
            loading="lazy"
            style={{}}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {elem.original_title || elem.original_name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" style={{ textTransform: "none" }}>
              {movie.dbType === "discover/movie"
                ? "Movie"
                : movie.dbType === "discover/tv"
                ? "TV Series"
                : movie.dbType === "trending/all/day"
                ? elem.media_type?.replace(/^\w/, (c) => c.toUpperCase())
                : ""}
            </Button>
            <Button size="small" style={{ textTransform: "none" }}>
              {elem.release_date || elem.first_air_date}
            </Button>
          </CardActions>
        </Card>
      </Badge>
    </motion.div>
    </NavLink>
  );
};

export default CardList;
