import React from "react";

import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { useThemeContext } from "../../context/ThemeContext";

import CustomTextField from "../../../components/common/CustomTextField";

// =====================================================
// REVIEW FILTER
// =====================================================

const ReviewFilter = ({
  open,
  onClose,

  ratingFilter,
  setRatingFilter,

  productFilter,
  setProductFilter,

  customerFilter,
  setCustomerFilter,

  sortBy,
  setSortBy,

  onReset,
}) => {
  const { darkMode } = useThemeContext();

  // =====================================================
  // RATING OPTIONS
  // =====================================================

  const ratingOptions = [
    "All",
    "5",
    "4",
    "3",
    "2",
    "1",
  ];

  // =====================================================
  // SORT OPTIONS
  // =====================================================

  const sortOptions = [
    "Newest",
    "Oldest",
    "Highest Rating",
    "Lowest Rating",
  ];

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: {
            xs: "100%",
            sm: 360,
          },

          backgroundColor:
            darkMode
              ? "#1E1E1E"
              : "#FFFFFF",

          color:
            darkMode
              ? "#FFFFFF"
              : "#222",
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          height: "100vh",
          overflowY: "auto",

          "&::-webkit-scrollbar": {
            width: "8px",
          },

          "&::-webkit-scrollbar-thumb": {
            background:
              darkMode
                ? "#555"
                : "#CCC",

            borderRadius: "10px",
          },

          "&::-webkit-scrollbar-track": {
            background:
              darkMode
                ? "#1E1E1E"
                : "#FFFFFF",
          },
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 600,
                color:
                  darkMode
                    ? "#FFFFFF"
                    : "#222",
              }}
            >
              Filter Reviews
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color:
                  darkMode
                    ? "#999"
                    : "#777",
              }}
            >
              Filter and sort customer reviews
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              color:
                darkMode
                  ? "#FFFFFF"
                  : "#444",

              "&:hover": {
                backgroundColor:
                  darkMode
                    ? "#333"
                    : "#F5F1EC",
              },
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>

        <Divider
          sx={{
            mb: 3,
            borderColor:
              darkMode
                ? "#444"
                : "#E5E5E5",
          }}
        />

        {/* =================================================
            RATING
        ================================================= */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Rating
        </Typography>

        <RadioGroup
          value={ratingFilter}
          onChange={(e) =>
            setRatingFilter(
              e.target.value
            )
          }
        >
          {ratingOptions.map(
            (item) => (
              <FormControlLabel
                key={item}
                value={item}
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color:
                          "#B89478",
                      },
                    }}
                  />
                }
                label={
                  item === "All"
                    ? "All Ratings"
                    : `${item} Stars`
                }
              />
            )
          )}
        </RadioGroup>

        <Divider
          sx={{
            my: 3,
            borderColor:
              darkMode
                ? "#444"
                : "#E5E5E5",
          }}
        />

        {/* =================================================
            PRODUCT
        ================================================= */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Product Name
        </Typography>

        <CustomTextField
          fullWidth
          size="small"
          value={productFilter}
          onChange={(e) =>
            setProductFilter(
              e.target.value
            )
          }
          placeholder="Search product..."
        />

        <Divider
          sx={{
            my: 3,
            borderColor:
              darkMode
                ? "#444"
                : "#E5E5E5",
          }}
        />

        {/* =================================================
            CUSTOMER
        ================================================= */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Customer Name
        </Typography>

        <CustomTextField
          fullWidth
          size="small"
          value={customerFilter}
          onChange={(e) =>
            setCustomerFilter(
              e.target.value
            )
          }
          placeholder="Search customer..."
        />

        <Divider
          sx={{
            my: 3,
            borderColor:
              darkMode
                ? "#444"
                : "#E5E5E5",
          }}
        />

        {/* =================================================
            SORT
        ================================================= */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Sort By
        </Typography>

        <RadioGroup
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
        >
          {sortOptions.map(
            (item) => (
              <FormControlLabel
                key={item}
                value={item}
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color:
                          "#B89478",
                      },
                    }}
                  />
                }
                label={item}
              />
            )
          )}
        </RadioGroup>

        <Divider
          sx={{
            my: 3,
            borderColor:
              darkMode
                ? "#444"
                : "#E5E5E5",
          }}
        />

        {/* =================================================
            BUTTONS
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={onReset}
            sx={{
              height: 44,
              borderColor:
                "#B89478",

              color:
                "#B89478",

              textTransform:
                "none",

              fontWeight: 600,

              "&:hover": {
                borderColor:
                  "#A88366",

                backgroundColor:
                  darkMode
                    ? "rgba(184,148,120,0.08)"
                    : "#FAF6F1",
              },
            }}
          >
            Reset
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{
              height: 44,
              bgcolor:
                "#B89478",

              textTransform:
                "none",

              fontWeight: 600,

              boxShadow: "none",

              "&:hover": {
                bgcolor:
                  "#A88366",

                boxShadow: "none",
              },
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ReviewFilter;