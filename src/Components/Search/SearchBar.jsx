/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./SearchBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../Reducer/MoviesSlice";
import CardList from "../Card/Card";
import PaginationPage from "../Pagination/Pagination";
import { InputBase, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "../../utils";
import { Helmet } from "react-helmet-async";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(search({ query: query == "" ? "k" : query, page: movie.page }));
  }, [movie.page, query]);


  function handleInputChange(e) {
    setQuery(e.target.value)
  }

  let debounceInput = debounce(handleInputChange, 500);

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
            onChange={debounceInput}
          />
        </Search>
      </div>

      <div className="searchBar-box">
        {movie.data.results?.map((e, i) => (
          <CardList key={i} elem={e} />
        ))}
      </div>

      <PaginationPage />


      <Helmet>
        <title>{"Search"}</title>
        <meta name="description" content="react, helmet, meta tags for search" />
      </Helmet>
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
