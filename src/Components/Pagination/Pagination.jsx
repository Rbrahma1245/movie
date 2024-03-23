import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../Reducer/MoviesSlice';
import "./Pagination.scss"

const PaginationPage = () => {

  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();


  const handleChange = (event, value) => {
    dispatch(changePage(value));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className='pagination-container'>
      <Stack spacing={5}>
        <Pagination count={500} page={movie.page} size="large" onChange={handleChange} />
      </Stack>
    </div>
  );
}

export default PaginationPage