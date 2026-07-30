import React from "react";
import { Box, Typography, Button } from "@mui/material";

const EmptyProducts = ({ clearFilters }) => {
  return (
    <Box textAlign="center" py={8}>
      <Typography variant="h5" gutterBottom>
        No Products Found
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Try changing your filters.
      </Typography>

      <Button variant="contained" onClick={clearFilters}>
        Clear Filters
      </Button>
    </Box>
  );
};

export default EmptyProducts;