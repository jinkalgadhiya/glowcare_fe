import React from "react";
import { Box, Pagination, PaginationItem } from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const ShopPagination = ({ page, setPage, totalPages }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 6,
        mb: 2,
      }}
    >
      <Pagination
        page={page}
        count={totalPages}
        shape="rounded"
        size="large"
        siblingCount={1}
        boundaryCount={1}
        onChange={(event, value) => setPage(value)}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: NavigateBeforeRoundedIcon,
              next: NavigateNextRoundedIcon,
            }}
            {...item}
          />
        )}
        sx={{
          "& .MuiPagination-ul": {
            gap: "10px",
            justifyContent: "center",
          },

          "& .MuiPaginationItem-root": {
            width: 42,
            height: 42,
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: 600,
            color: "#1E2F2B",
            border: "1px solid #E6DED2",
            backgroundColor: "#FFFFFF",
            transition: "all .25s ease",

            "&:hover": {
              backgroundColor: "#F7F2EA",
              borderColor: "#D9CCBC",
            },
          },

          "& .Mui-selected": {
            backgroundColor: "#F3EBDD !important",
            color: "#1E2F2B",
            border: "1px solid #DCCDBA",
            boxShadow: "0 4px 12px rgba(0,0,0,.08)",
          },

          "& .MuiPaginationItem-previousNext": {
            color: "#8B7765",
          },
        }}
      />
    </Box>
  );
};

export default ShopPagination;