/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./SearchBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../Reducer/MoviesSlice";
import CardList from "../Card/Card";
import PaginationPage from "../Pagination/Pagination";
import { InputBase, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    dispatch(search({ query: query == "" ? "k" : query, page: movie.page }));
  }, [movie.page, query]);

  // window.history.replaceState(null, null, "/");
  // window.location.href = "/";

  return (
    <div className="searchBar-container">
      <div className="input-box">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={query}
            onChange={handleInputChange}
          />
        </Search>
      </div>

      <div className="searchBar-box">
        {movie.data.results?.map((e, i) => (
          <CardList key={i} elem={e} />
        ))}
      </div>

      <PaginationPage />
    </div>
  );
};

export default SearchBar;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
