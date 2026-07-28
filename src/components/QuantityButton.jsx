import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantityButton = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #E5E5E5",
        borderRadius: 1,
        overflow: "hidden",
        width: "fit-content",
      }}
    >
      <IconButton
        onClick={onDecrease}
        sx={{
          borderRadius: 0,
          width: 38,
          height: 38,
        }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>

      <Typography
        sx={{
          width: 40,
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        {quantity}
      </Typography>

      <IconButton
        onClick={onIncrease}
        sx={{
          borderRadius: 0,
          width: 38,
          height: 38,
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default QuantityButton;