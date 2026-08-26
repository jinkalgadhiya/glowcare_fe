import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";

import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";

const EmptyProducts = ({ clearFilters }) => {
  return (
    <Box
      sx={{
        py: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 650,
          p: 6,
          borderRadius: "30px",
          textAlign: "center",
          bgcolor: "#FAF7F2",
          border: "1px solid #E7DDD1",
        }}
      >
        <Box
          sx={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "#EEF3EF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
            mb: 4,
          }}
        >
          <SearchOffRoundedIcon
            sx={{
              fontSize: 46,
              color: "#385246",
            }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: 34,
            fontWeight: 600,
            color: "#20342E",
            mb: 2,
          }}
        >
          No Products Found
        </Typography>

        <Typography
          sx={{
            color: "#6E6E6E",
            fontSize: 18,
            maxWidth: 450,
            mx: "auto",
            lineHeight: 1.8,
            mb: 5,
          }}
        >
          We couldn't find any products matching your
          current filters. Try adjusting your selections
          to discover more GlowCare favorites.
        </Typography>

        <Button
          variant="contained"
          onClick={clearFilters}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: "50px",
            backgroundColor: "#20342E",
            textTransform: "none",
            fontWeight: 600,
            fontSize: 16,
            boxShadow: "none",

            "&:hover": {
              backgroundColor: "#385246",
              boxShadow: "none",
            },
          }}
        >
          Clear Filters
        </Button>
      </Paper>
    </Box>
  );
};

export default EmptyProducts;