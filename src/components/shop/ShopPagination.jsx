import React from "react";
import { Box, Pagination } from "@mui/material";

const ShopPagination = ({ page, setPage, totalPages }) => {
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Pagination
        page={page}
        count={totalPages}
        color="primary"
        onChange={(event, value) => setPage(value)}
      />
    </Box>
  );
};

export default ShopPagination;