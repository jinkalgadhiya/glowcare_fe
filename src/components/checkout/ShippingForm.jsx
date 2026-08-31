import React, { useState, useEffect } from "react";

import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  Radio,
} from "@mui/material";

import { getAddresses, addAddress } from "../../database/addressService";
import { getCurrentUser } from "../../auth/AuthService";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

import AddAddressDialog from "../userprofile/AddAddressDialog";

// =====================================================
// EMPTY ADDRESS
// =====================================================

const emptyAddress = {
  addressType: "Home",
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};

// =====================================================
// SHIPPING FORM
// =====================================================

const ShippingForm = ({ checkoutData, setCheckoutData, nextStep }) => {
  const [errors, setErrors] = useState({});

  // =====================================================
  // SAVED ADDRESSES
  // =====================================================

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  // =====================================================
  // ADD ADDRESS DIALOG
  // =====================================================

  const [openAddressModal, setOpenAddressModal] = useState(false);

  const [addressForm, setAddressForm] = useState({
    ...emptyAddress,
  });

  const [addressError, setAddressError] = useState("");

  const [savingAddress, setSavingAddress] = useState(false);

  const shipping = checkoutData.shipping;

  // =====================================================
  // LOAD SAVED ADDRESSES
  // =====================================================

  const loadSavedAddresses = async () => {
    try {
      setLoadingAddresses(true);

      const loggedInUser = getCurrentUser();

      if (!loggedInUser) {
        setAddresses([]);
        return;
      }

      const data = await getAddresses();

      const loadedAddresses = data || [];

      setAddresses(loadedAddresses);

      // Set logged-in customer's email
      setCheckoutData((prev) => ({
        ...prev,
        shipping: {
          ...prev.shipping,
          email: loggedInUser.email || prev.shipping.email || "",
        },
      }));

      // Select default address automatically
      const defaultAddress =
        loadedAddresses.find((address) => address.isDefault) ||
        loadedAddresses[0];

      if (defaultAddress) {
        selectAddress(defaultAddress);
      }
    } catch (error) {
      console.error("Failed to load saved addresses:", error);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    loadSavedAddresses();
  }, []);

  // =====================================================
  // SELECT SAVED ADDRESS
  // =====================================================

  const selectAddress = (address) => {
    if (!address) return;

    setSelectedAddressId(address.id);

    setCheckoutData((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,

        fullName: address.fullName || "",
        phone: address.phone || "",

        // Keep address information available in checkout
        addressLine: address.addressLine || "",
        city: address.city || "",
        state: address.state || "",
        pincode: address.pincode || "",
      },
    }));

    setErrors({});
  };

  // =====================================================
  // OPEN ADD ADDRESS DIALOG
  // =====================================================

  const handleAddAddress = () => {
    setAddressForm({
      ...emptyAddress,
    });

    setAddressError("");
    setOpenAddressModal(true);
  };

  // =====================================================
  // CLOSE ADD ADDRESS DIALOG
  // =====================================================

  const handleCloseAddressModal = () => {
    if (savingAddress) return;

    setOpenAddressModal(false);

    setAddressForm({
      ...emptyAddress,
    });

    setAddressError("");
  };

  // =====================================================
  // ADDRESS FORM CHANGE
  // =====================================================

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setAddressError("");
  };

  // =====================================================
  // SAVE NEW ADDRESS
  // =====================================================

  const handleSaveAddress = async () => {
    // Full Name
    if (!addressForm.fullName.trim()) {
      setAddressError("Full Name is required.");
      return;
    }

    // Phone
    if (!addressForm.phone.trim()) {
      setAddressError("Phone Number is required.");
      return;
    }

    if (!/^\d{10}$/.test(addressForm.phone.trim())) {
      setAddressError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Address Line
    if (!addressForm.addressLine.trim()) {
      setAddressError("Street Address is required.");
      return;
    }

    // City
    if (!addressForm.city.trim()) {
      setAddressError("City is required.");
      return;
    }

    // State
    if (!addressForm.state.trim()) {
      setAddressError("State is required.");
      return;
    }

    // Pincode
    if (!/^\d{6}$/.test(addressForm.pincode.trim())) {
      setAddressError("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setSavingAddress(true);

      // =================================================
      // SAVE ADDRESS
      // =================================================

      const savedAddress = await addAddress({
        ...addressForm,

        isDefault: addresses.length === 0,
      });

      // =================================================
      // RELOAD ADDRESSES
      // =================================================

      const updatedAddresses = await getAddresses();

      const loadedAddresses = updatedAddresses || [];

      setAddresses(loadedAddresses);

      // =================================================
      // FIND NEW ADDRESS
      // =================================================

      const newAddress =
        loadedAddresses.find(
          (address) =>
            address.id === savedAddress?.id ||
            address._id === savedAddress?._id
        ) || savedAddress;

      // =================================================
      // SELECT NEW ADDRESS
      // =================================================

      if (newAddress) {
        selectAddress(newAddress);
      }

      // =================================================
      // CLOSE DIALOG
      // =================================================

      setOpenAddressModal(false);

      setAddressForm({
        ...emptyAddress,
      });

      setAddressError("");
    } catch (error) {
      console.error("Failed to save address:", error);

      setAddressError(
        error?.response?.data?.message ||
          "Unable to save address. Please try again."
      );
    } finally {
      setSavingAddress(false);
    }
  };

  // =====================================================
  // CHECKOUT FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCheckoutData((prev) => ({
      ...prev,

      shipping: {
        ...prev.shipping,
        [name]: value,
      },
    }));

    // If customer manually changes saved address fields,
    // remove selected saved address.
    if (
      [
        "fullName",
        "phone",
        "addressLine",
        "city",
        "state",
        "pincode",
      ].includes(name)
    ) {
      setSelectedAddressId(null);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!shipping.fullName?.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    // Email
    if (!shipping.email?.trim()) {
      newErrors.email = "Email is required";
    }

    // Phone
    if (!shipping.phone?.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(shipping.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    // Address
    if (!shipping.addressLine?.trim()) {
      newErrors.addressLine = "Street Address is required";
    }

    // City
    if (!shipping.city?.trim()) {
      newErrors.city = "City is required";
    }

    // State
    if (!shipping.state?.trim()) {
      newErrors.state = "State is required";
    }

    // Pincode
    if (!shipping.pincode?.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(shipping.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      nextStep();
    }
  };

  // =====================================================
  // ADDRESS ICON
  // =====================================================

  const getAddressIcon = (type) => {
    if (type === "Work") {
      return (
        <BusinessOutlinedIcon
          sx={{
            fontSize: 18,
            color: "#1E2F2B",
          }}
        />
      );
    }

    return (
      <HomeOutlinedIcon
        sx={{
          fontSize: 18,
          color: "#1E2F2B",
        }}
      />
    );
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Box>
      {/* =================================================
          TITLE
      ================================================= */}

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
          mb: 4,
        }}
      >
        Select a saved address or enter your delivery information.
      </Typography>

      {/* =================================================
          SAVED ADDRESSES
      ================================================= */}

      {!loadingAddresses && addresses.length > 0 && (
        <Box sx={{ mb: 4 }}>
          {/* HEADER */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 600,
                color: "#1E2F2B",
              }}
            >
              Saved Addresses
            </Typography>

            <Button
              startIcon={<AddOutlinedIcon />}
              onClick={handleAddAddress}
              variant="outlined"
              sx={{
                height: 40,
                px: 2,
                borderRadius: "11px",
                textTransform: "none",
                fontSize: 13,
                fontWeight: 600,

                color: "#1E2F2B",
                borderColor: "#1E2F2B",

                "&:hover": {
                  backgroundColor: "#F2EEE8",
                  borderColor: "#1E2F2B",
                },
              }}
            >
              Add Address
            </Button>
          </Box>

          {/* ADDRESS LIST */}

          <Grid container spacing={2}>
            {addresses.map((address) => {
              const selected = selectedAddressId === address.id;

              return (
                <Grid item xs={12} sm={6} key={address.id}>
                  <Card
                    elevation={0}
                    onClick={() => selectAddress(address)}
                    sx={{
                      p: 2.5,
                      cursor: "pointer",
                      borderRadius: 3,
                      width: "260px",
                      height: "200px",

                      border: selected
                        ? "2px solid #1E2F2B"
                        : "1px solid #E5DED4",

                      backgroundColor: selected
                        ? "#F5F9F5"
                        : "#FFFFFF",

                      transition: "all .2s ease",

                      "&:hover": {
                        borderColor: "#1E2F2B",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        alignItems: "flex-start",
                      }}
                    >
                      <Radio
                        checked={selected}
                        value={address.id}
                        sx={{
                          color: "#1E2F2B",
                          p: 0,

                          "&.Mui-checked": {
                            color: "#1E2F2B",
                          },
                        }}
                      />

                      <Box
                        sx={{
                          flex: 1,
                        }}
                      >
                        {/* ADDRESS TYPE */}

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 0.5,
                          }}
                        >
                          {getAddressIcon(address.addressType)}

                          <Typography
                            sx={{
                              fontWeight: 700,
                              color: "#1E2F2B",
                            }}
                          >
                            {address.addressType || "Address"}
                          </Typography>

                          {address.isDefault && (
                            <Typography
                              sx={{
                                fontSize: 11,
                                px: 1,
                                py: 0.3,
                                borderRadius: 2,
                                backgroundColor: "#E8F1EA",
                                color: "#2F5D45",
                                fontWeight: 600,
                              }}
                            >
                              Default
                            </Typography>
                          )}
                        </Box>

                        {/* FULL NAME */}

                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#333",
                          }}
                        >
                          {address.fullName}
                        </Typography>

                        {/* PHONE */}

                        <Typography
                          sx={{
                            mt: 0.5,
                            fontSize: 13,
                            color: "#777",
                          }}
                        >
                          {address.phone}
                        </Typography>

                        {/* ADDRESS */}

                        {address.addressLine && (
                          <Typography
                            sx={{
                              mt: 1,
                              fontSize: 13,
                              lineHeight: 1.6,
                              color: "#555",
                            }}
                          >
                            {address.addressLine}
                          </Typography>
                        )}

                        {/* CITY / STATE / PINCODE */}

                        {(address.city ||
                          address.state ||
                          address.pincode) && (
                          <Typography
                            sx={{
                              mt: 0.3,
                              fontSize: 13,
                              color: "#555",
                            }}
                          >
                            {address.city}
                            {address.city && address.state ? ", " : ""}
                            {address.state}
                            {address.pincode
                              ? ` - ${address.pincode}`
                              : ""}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* =================================================
          NO SAVED ADDRESSES
      ================================================= */}

      {!loadingAddresses && addresses.length === 0 && (
        <Box
          sx={{
            mb: 4,
            p: 2.5,
            borderRadius: 3,
            backgroundColor: "#F8F6F2",
            border: "1px solid #E5DED4",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                color: "#1E2F2B",
              }}
            >
              No saved addresses
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "#777",
              }}
            >
              Add an address to make checkout faster.
            </Typography>
          </Box>

          <Button
            startIcon={<AddOutlinedIcon />}
            onClick={handleAddAddress}
            variant="outlined"
            sx={{
              flexShrink: 0,
              borderRadius: "11px",
              textTransform: "none",
              color: "#1E2F2B",
              borderColor: "#1E2F2B",

              "&:hover": {
                backgroundColor: "#F2EEE8",
                borderColor: "#1E2F2B",
              },
            }}
          >
            Add Address
          </Button>
        </Box>
      )}

      {/* =================================================
          DELIVERY INFORMATION
      ================================================= */}

      <Box
        sx={{
          maxWidth: 520,
          pl: {
            xs: 0,
            sm: 3,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 600,
            color: "#1E2F2B",
            mb: 3,
          }}
        >
          Delivery Information
        </Typography>

        <Grid container spacing={3}>
          {/* FULL NAME */}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={shipping.fullName || ""}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
          </Grid>

          {/* PHONE */}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={shipping.phone || ""}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>

          {/* EMAIL */}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={shipping.email || ""}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                width: "470px",
              }}
            />
          </Grid>

          {/* COUNTRY */}

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

      {/* =================================================
          REUSABLE ADD ADDRESS DIALOG
      ================================================= */}

      <AddAddressDialog
        open={openAddressModal}
        onClose={handleCloseAddressModal}
        formData={addressForm}
        setFormData={setAddressForm}
        handleChange={handleAddressChange}
        error={addressError}
        handleSave={handleSaveAddress}
        saving={savingAddress}
      />
    </Box>
  );
};

export default ShippingForm;