import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginRequiredDialog = ({ open, onClose }) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle textAlign="center">
        Login Required
      </DialogTitle>

      <DialogContent>
        <Typography textAlign="center">
          Sign in to continue using this feature.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          pb: 3,
        }}
      >
        <Stack spacing={2} width="100%" px={2}>
          <Button
            variant="contained"
            onClick={() => {
              onClose();
              navigate("/login");
            }}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              onClose();
              navigate("/register");
            }}
          >
            Register
          </Button>

          <Button onClick={onClose}>
            Continue Shopping
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default LoginRequiredDialog;