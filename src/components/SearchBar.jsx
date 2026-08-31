import React, { useState } from "react";

import {
  Box,
  IconButton,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

const SearchBar = ({ scrolled }) => {
  const navigate = useNavigate();

  const [showSearch, setShowSearch] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");

  // ==========================================
  // SEARCH FUNCTION
  // ==========================================

  const handleSearch = () => {
    const query = searchValue.trim();

    if (!query) {
      return;
    }

    navigate(
      `/shop?search=${encodeURIComponent(query)}`
    );

    setShowSearch(false);
  };

  // ==========================================
  // ENTER KEY
  // ==========================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // ==========================================
  // SEARCH ICON CLICK
  // ==========================================

  const handleSearchClick = () => {
    if (showSearch) {
      handleSearch();
    } else {
      setShowSearch(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* SEARCH INPUT */}

      <Box
        sx={{
          width: showSearch
            ? "220px"
            : "0px",

          opacity: showSearch
            ? 1
            : 0,

          overflow: "hidden",

          transition:
            "all .4s ease",
        }}
      >
        <TextField
          size="small"

          autoFocus={showSearch}

          placeholder="Search products..."

          value={searchValue}

          onChange={(event) =>
            setSearchValue(
              event.target.value
            )
          }

          onKeyDown={handleKeyDown}

          onBlur={() => {
            // Keep search open if user has typed text
            if (!searchValue.trim()) {
              setShowSearch(false);
            }
          }}

          sx={{
            width: "220px",

            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",

              backgroundColor:
                "white",
            },
          }}
        />
      </Box>

      {/* SEARCH ICON */}

      <IconButton
        onClick={handleSearchClick}

        sx={{
          color: scrolled
            ? "#222"
            : "white",
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;