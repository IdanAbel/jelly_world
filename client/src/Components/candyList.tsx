import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CircularProgress,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import CandyFilter from "./candyFilter";
import React from "react";
import { listCandies } from "../Services/candyServices.ts";
import { RootState } from "../store.ts";

const CandyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMinecandies, setIsMinecandies] = useState(false);

  const dispatch = useDispatch();
  const { loading, candies, error } = useSelector(
    (state: RootState) => state.candyList
  );
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listCandies("") as any);
  }, [dispatch]);

  const filtercandies = () => {
    return candies
      ?.filter((candy) =>
        candy.flavorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      ?.filter((candy) =>
        isMinecandies ? candy.createdBy === userInfo?.id : true
      );
  };

  const handleFilterChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsMinecandies(event.target.checked);
  };

  const filteredcandies = filtercandies();

  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="center">
        <CandyFilter onFilterChange={handleFilterChange} />
        {userInfo && (
          <FormControlLabel
            control={
              <Checkbox
                checked={isMinecandies}
                onChange={handleCheckboxChange}
              />
            }
            label="My candies"
          />
        )}
      </Stack>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box>
          {filteredcandies && filteredcandies?.length > 0 ? (
            filteredcandies.map((candy, index) => (
              <Typography key={index} variant="h6">
                {candy.flavorName}
              </Typography>
            ))
          ) : (
            <Typography>No candies found</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CandyList;
