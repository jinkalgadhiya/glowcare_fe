import React from "react";
import { Paper, Typography } from "@mui/material";

const SectionCard = ({ title, description, children, darkMode }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        backgroundColor: darkMode ? "#252525" : "#FFFFFF",
        border: "1px solid",
        borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 700,
          color: darkMode ? "#FFFFFF" : "#222",
        }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          sx={{
            mt: 0.5,
            mb: 3,
            color: darkMode ? "#BDBDBD" : "#777",
          }}
        >
          {description}
        </Typography>
      )}

      {children}
    </Paper>
  );
};

export default SectionCard;
