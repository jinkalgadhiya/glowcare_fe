import React from "react";
import {
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";

import { useThemeContext } from "../context/ThemeContext";

const CategoryForm = ({
  categoryName,
  setCategoryName,
  description,
  setDescription,
  status,
  setStatus,
}) => {
  const { darkMode } = useThemeContext();

  const textFieldStyle = {
    "& .MuiInputLabel-root": {
      color: darkMode ? "#BDBDBD" : "#666",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#B89478",
    },

    "& .MuiOutlinedInput-root": {
      color: darkMode ? "#fff" : "#222",

      "& fieldset": {
        borderColor: darkMode ? "#555" : "#ccc",
      },

      "&:hover fieldset": {
        borderColor: "#B89478",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#B89478",
      },
    },

    "& .MuiSvgIcon-root": {
      color: darkMode ? "#fff" : "#222",
    },
  };

  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        label="Category Name"
        placeholder="Enter category name"
        value={categoryName}
        onChange={(e) =>
          setCategoryName(e.target.value)
        }
        sx={textFieldStyle}
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Description"
        placeholder="Enter category description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        sx={textFieldStyle}
      />

      <TextField
        select
        fullWidth
        label="Status"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        sx={textFieldStyle}
      >
        <MenuItem value="Active">
          Active
        </MenuItem>

        <MenuItem value="Inactive">
          Inactive
        </MenuItem>
      </TextField>
    </Stack>
  );
};

export default CategoryForm;