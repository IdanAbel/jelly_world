import { useEffect, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

interface CandyFilterProps {
  onFilterChange: (searchTerm: string) => void;
}

const CandyFilter: React.FC<CandyFilterProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, onFilterChange]);

  return (
    <TextField
      placeholder="Search candies"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
    />
  );
};

export default CandyFilter;
