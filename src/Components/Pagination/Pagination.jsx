import { useDispatch } from "react-redux";
import { changePage } from "../../Reducer/MoviesSlice";
import { useEffect, useState } from "react";

const Pagination = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  // Function to generate an array of page numbers
  const generatePageNumbers = (tem) => {
    const pageNumbers = [];
    for (let i = tem; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  useEffect(() => {
    console.log(generatePageNumbers(page));
  }, [page]);

  const nextPage = () => {
    dispatch(changePage());
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(Math.max(page - 1, 1));
  };

  function clickButton(page) {
    // setPage(page)

    console.log("click", page);
  }
  return (
    <div style={{ marginTop: 50, marginBottom: 50 }}>
      <button onClick={prevPage} disabled={page === 1}>
        Previous
      </button>
      {generatePageNumbers(page).map((page) => (
        <button key={page} onClick={() => clickButton(page)} style={{}}>
          {page}
        </button>
      ))}{" "}
      ... 500
      <button onClick={nextPage}>Next</button>
    </div>
  );
};

export default Pagination;
