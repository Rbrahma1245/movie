import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../Reducer/MoviesSlice';
import "./Pagination.scss"
import useMediaQuery from '@mui/material/useMediaQuery';

const PaginationPage = () => {

  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleChange = (event, value) => {
    dispatch(changePage(value));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className='pagination-container'>
      <Stack spacing={2}>
        <Pagination count={500} page={movie.page} size={isMobile? "small" : "large"} onChange={handleChange} />
      </Stack>
    </div>
  );
}

export default PaginationPage