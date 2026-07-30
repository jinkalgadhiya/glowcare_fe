import React from "react";
import {
  Box,
  Stack,
  FormControl,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

const selectStyle = {
  width: 112,

  "& .MuiOutlinedInput-root": {
    height: 42,
    borderRadius: "14px",
    backgroundColor: "#fff",

    "& fieldset": {
      borderColor: "#E8E1D8",
    },

    "&:hover fieldset": {
      borderColor: "#D8CCBE",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#1E2F2B",
    },
  },

  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: 500,
    py: 0,
  },
};

const ShopFilters = ({
  brand,
  setBrand,
  skinType,
  setSkinType,
  concern,
  setConcern,
  price,
  setPrice,
  sortBy,
  setSortBy,
  clearFilters,
}) => {
  return (
    <Box
      sx={{
        maxWidth: "1320px",
        mx: "auto",
        mt: "-50px",
        mb: 5,

        px: 4,
        py: 3,

        backgroundColor: "#fff",

        borderRadius: "26px",

        boxShadow: "0 20px 50px rgba(30,47,43,.08),0 6px 18px rgba(0,0,0,.04)",

        position: "relative",
        zIndex: 20,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: "100%",
        }}
      >
        {/* Left Section */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            flexWrap: "nowrap",
          }}
        >
          <Button
            startIcon={<TuneIcon />}
            sx={{
              height: 42,
              px: 4,

              borderRadius: "14px",

              backgroundColor: "#F5F1EA",

              color: "#1E2F2B",

              fontWeight: 700,

              fontSize: "15px",

              textTransform: "none",

              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#EEE7DD",
              },
            }}
          >
            Filters
          </Button>

          {/* Skin Type */}
          <FormControl size="small" sx={selectStyle}>
            <Select
              displayEmpty
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
            >
              <MenuItem value="">Skin Type</MenuItem>
              <MenuItem value="Dry">Dry</MenuItem>
              <MenuItem value="Oily">Oily</MenuItem>
              <MenuItem value="Combination">Combination</MenuItem>
              <MenuItem value="Sensitive">Sensitive</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
            </Select>
          </FormControl>

          {/* Price */}
          <FormControl size="small" sx={selectStyle}>
            <Select
              displayEmpty
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <MenuItem value="">Price</MenuItem>
              <MenuItem value="0-500">₹0 - ₹500</MenuItem>
              <MenuItem value="500-1000">₹500 - ₹1000</MenuItem>
              <MenuItem value="1000-2000">₹1000 - ₹2000</MenuItem>
              <MenuItem value="2000+">₹2000+</MenuItem>
            </Select>
          </FormControl>

          {/* Brand */}
          <FormControl size="small" sx={selectStyle}>
            <Select
              displayEmpty
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <MenuItem value="">Brand</MenuItem>
              <MenuItem value="GlowCare">GlowCare</MenuItem>
            </Select>
          </FormControl>

          {/* Ingredients */}
          <FormControl size="small" sx={selectStyle}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">Ingredients</MenuItem>
              <MenuItem>Green Tea</MenuItem>
              <MenuItem>Vitamin C</MenuItem>
              <MenuItem>Niacinamide</MenuItem>
              <MenuItem>Salicylic Acid</MenuItem>
              <MenuItem>Hyaluronic Acid</MenuItem>
            </Select>
          </FormControl>

          {/* Concern */}
          <FormControl size="small" sx={selectStyle}>
            <Select
              displayEmpty
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
            >
              <MenuItem value="">Concern</MenuItem>
              <MenuItem value="Acne">Acne</MenuItem>
              <MenuItem value="Hydration">Hydration</MenuItem>
              <MenuItem value="Pigmentation">Pigmentation</MenuItem>
              <MenuItem value="Anti Aging">Anti Aging</MenuItem>
              <MenuItem value="Brightening">Brightening</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Right Section */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            ml: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              height: 42,
              fontSize: "15px",
              fontWeight: 500,
              color: "#666",
              whiteSpace: "nowrap",
            }}
          >
            Sort by:
          </Typography>

          <FormControl
            size="small"
            sx={{
              ...selectStyle,
              width: 160,
            }}
          >
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="latest">Popularity</MenuItem>
              <MenuItem value="priceLow">Price : Low to High</MenuItem>
              <MenuItem value="priceHigh">Price : High to Low</MenuItem>
              <MenuItem value="rating">Highest Rated</MenuItem>
              <MenuItem value="nameAZ">Name : A-Z</MenuItem>
            </Select>
          </FormControl>

          <Button
            onClick={clearFilters}
            sx={{
              height: 42,
              px: 4,

              borderRadius: "14px",

              border: "1px solid #E8E1D8",

              color: "#1E2F2B",

              fontWeight: 700,

              fontSize: "14px",

              textTransform: "none",

              "&:hover": {
                backgroundColor: "#F8F6F2",
              },
            }}
          >
            Clear
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ShopFilters;
