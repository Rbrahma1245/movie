import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Screens/Home/Home";
import Trending from "./Screens/Trending/Trending";
import Movies from "./Screens/Movies/Movies";
import TVSeries from "./Screens/TVSeries/TVSeries";
import Page404 from "./Screens/Page404";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import MovieDetails from "./Components/MovieDetails/MovieDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvseries" element={<TVSeries />} />
          <Route path="/:movieId" element={<MovieDetails />} />
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
