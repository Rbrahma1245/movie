import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Screens/Home/Home";
import Trending from "./Screens/Trending/Trending";
import TVSeries from "./Screens/TVSeries/TVSeries";
import Page404 from "./Screens/Page404";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import SearchBar from "./Components/Search/SearchBar";
import { lazy } from "react";


function App() {
  const Movies = lazy(() => import('./Screens/Movies/Movies'));
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvseries" element={<TVSeries />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path=":elemType/:movieId" element={<MovieDetails />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>

      {/* <BrowserRouter>
        <RouterProvider router={router} />
      </BrowserRouter> */}
    </>
  );
}

export default App;
