import React from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";

import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewAgendaRoundedIcon from "@mui/icons-material/ViewAgendaRounded";

const ShopToolbar = ({
  totalProducts,
  view,
  setView,
}) => {
  return (
    <Box
      sx={{
        py: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          color: "#666",
          fontSize: 15,
        }}
      >
        Showing{" "}
        <Typography
          component="span"
          sx={{
            color: "#222",
            fontWeight: 600,
          }}
        >
          {totalProducts}
        </Typography>{" "}
        Products
      </Typography>

      <Stack direction="row" spacing={1}>
        <Tooltip title="Grid View">
          <IconButton
            onClick={() => setView("grid")}
            sx={{
              bgcolor:
                view === "grid"
                  ? "#222"
                  : "#F5F5F5",

              color:
                view === "grid"
                  ? "#fff"
                  : "#555",

              transition: ".3s",

              "&:hover": {
                bgcolor: "#222",
                color: "#fff",
              },
            }}
          >
            <GridViewRoundedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="List View">
          <IconButton
            onClick={() => setView("list")}
            sx={{
              bgcolor:
                view === "list"
                  ? "#222"
                  : "#F5F5F5",

              color:
                view === "list"
                  ? "#fff"
                  : "#555",

              transition: ".3s",

              "&:hover": {
                bgcolor: "#222",
                color: "#fff",
              },
            }}
          >
            <ViewAgendaRoundedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default ShopToolbar;