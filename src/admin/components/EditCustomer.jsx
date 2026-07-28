import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";

import { updateCustomerStatus } from "../../database/userService";
import { useThemeContext } from "../context/ThemeContext";

const EditCustomer = ({ open, onClose, customer, onStatusUpdated }) => {
  const { darkMode } = useThemeContext();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (customer) {
      setStatus(customer.status || "Active");
    }
  }, [customer]);

  const handleUpdate = async () => {
    const updatedCustomer = {
      ...customer,
      status,
    };

    await updateCustomerStatus(customer.id, status);

    onStatusUpdated(updatedCustomer);

    onClose();
  };

  if (!customer) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: darkMode ? "#252525 !important" : "#fff",
          color: darkMode ? "#fff" : "#222",
          borderRadius: 3,
        },
      }}
      PaperProps={{
        sx: {
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          color: darkMode ? "#fff" : "#222",
        }}
      >
        Update Customer Status
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography
            sx={{
              mb: 2,
              color: darkMode ? "#ccc" : "#666",
            }}
          >
            Customer
          </Typography>

          <Typography
            sx={{
              mb: 3,
              fontWeight: 600,
              color: darkMode ? "#fff" : "#222",
            }}
          >
            {customer.fullName}
          </Typography>

          <FormControl
            fullWidth
            size="small"
            sx={{
              "& .MuiInputLabel-root": {
                color: darkMode ? "#AFAFAF" : "#777",
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
            }}
          >
            <InputLabel>Status</InputLabel>

            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
              displayEmpty
            >
              <MenuItem value="Active">Active</MenuItem>

              <MenuItem value="Inactive">Inactive</MenuItem>

              <MenuItem value="Blocked">Blocked</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            color: "#777",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{
            bgcolor: "#B89478",
            textTransform: "none",
            boxShadow: "none",

            "&:hover": {
              bgcolor: "#A88366",
              boxShadow: "none",
            },
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCustomer;
