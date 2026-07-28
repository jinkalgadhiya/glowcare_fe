import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ scrolled }) => {
  const [showSearch, setShowSearch] = useState(false);
  console.log(showSearch);

  return (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        width: showSearch ? "220px" : "0px",
        opacity: showSearch ? 1 : 0,
        overflow: "hidden",
        transition: "all .4s ease",
      }}
    >
      <TextField
        size="small"
        autoFocus={showSearch}
        placeholder="Search products..."
        onBlur={() => setShowSearch(false)}
        sx={{
          width: "220px",

          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            backgroundColor: "white",
          },
        }}
      />
    </Box>

    <IconButton
      onClick={() => setShowSearch(true)}
      sx={{
        color: scrolled ? "#222" : "white",
      }}
    >
      <SearchIcon />
    </IconButton>
  </Box>
);
};

export default SearchBar;
