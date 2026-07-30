import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";

import { getUsers } from "../../database/userService";
import { getCurrentUser } from "../../auth/AuthService";

const ShippingForm = ({ checkoutData, setCheckoutData, nextStep }) => {
  const [errors, setErrors] = useState({});

  const shipping = checkoutData.shipping;

  // =============================
  // Auto Fill Saved Address
  // =============================

  useEffect(() => {
    const loadSavedAddress = async () => {
      try {
        // Logged in user
        const loggedInUser = getCurrentUser();

        if (!loggedInUser) return;

        const users = await getUsers();

        const customer = users.find((user) => user.id === loggedInUser.id);

        if (!customer) return;

        setCheckoutData((prev) => ({
          ...prev,
          shipping: {
            fullName: customer.address?.fullName || customer.fullName || "",

            email: customer.email || "",

            phone: customer.address?.phone || customer.phone || "",

            address: customer.address?.street || "",

            city: customer.address?.city || "",

            state: customer.address?.state || "",

            pincode: customer.address?.pincode || "",

            landmark: customer.address?.landmark || "",
          },
        }));
      } catch (error) {
        console.error(error);
      }
    };

    loadSavedAddress();
  }, [setCheckoutData]);

  // =============================
  // Handle Input Change
  // =============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCheckoutData((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [name]: value,
      },
    }));
  };

  // =============================
  // Validation
  // =============================

  const validate = () => {
    const newErrors = {};

    if (!shipping.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!shipping.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!shipping.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    }

    if (!shipping.address.trim()) {
      newErrors.address = "Street Address is required";
    }

    if (!shipping.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!shipping.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!shipping.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 32,
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 1,
        }}
      >
        Shipping Details
      </Typography>

      <Typography
        sx={{
          color: "#777",
          mb: 5,
        }}
      >
        Please enter your delivery information.
      </Typography>

      <Box
        sx={{
          maxWidth: 520,
          pl: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={shipping.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={shipping.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={shipping.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={shipping.pincode}
              onChange={handleChange}
              error={!!errors.pincode}
              helperText={errors.pincode}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={shipping.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={shipping.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              maxRows={3}
              label="Street Address"
              name="address"
              value={shipping.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Apartment / Landmark"
              name="landmark"
              value={shipping.landmark || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={{
                mb: 4,
                color: "#666",
                fontWeight: 500,
              }}
            >
              Country : 🇮🇳 India
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={validate}
                variant="contained"
                sx={{
                  px: 5,
                  width: "470px",
                  height: 52,
                  background: "#1E2F2B",
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: 15,
                  boxShadow: "none",

                  "&:hover": {
                    background: "#16251F",
                    boxShadow: "none",
                  },
                }}
              >
                Continue →
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ShippingForm;
