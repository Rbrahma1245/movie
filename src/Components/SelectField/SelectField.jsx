import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeRating } from "../../Reducer/MoviesSlice";

const SelectField = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie);

  const handleChange = (event) => {
    dispatch(changeRating(event.target.value));
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Rating</InputLabel>
          <Select
            labelId="select-label"
            label="Rating"
            value={movie?.rating}
            onChange={handleChange}
          >
            <MenuItem value={"LowToHigh"}>Low to High</MenuItem>
            <MenuItem value={"HighToLow"}>High to Low</MenuItem>
            <MenuItem value={"Clear"}>Clear</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default SelectField;
