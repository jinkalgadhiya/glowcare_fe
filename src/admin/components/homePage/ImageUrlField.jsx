import React from "react";
import { Box } from "@mui/material";

import CustomTextField from "../../../components/common/CustomTextField";

const ImageUrlField = ({
  label,
  value,
  onChange,
  darkMode,
}) => {
  return (
    <Box>
      <CustomTextField
        fullWidth
        label={label}
        value={value || ""}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="https://example.com/image.jpg"
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: darkMode
              ? "#2F2F2F"
              : "#FFFFFF",
          },
        }}
      />

      {value && (
        <Box
          component="img"
          src={value}
          alt={label}
          sx={{
            mt: 1.5,
            width: "100%",
            maxWidth: 220,
            height: 130,
            objectFit: "cover",
            borderRadius: 2,
            border: "1px solid",
            borderColor: darkMode
              ? "#444"
              : "#E7DDD2",
            display: "block",
          }}
        />
      )}
    </Box>
  );
};

export default ImageUrlField;