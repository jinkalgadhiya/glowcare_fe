import React, { useEffect, useState } from "react";

import {
  Box,
  Card,
  Typography,
  Stack,
  Button,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../database/addressService";

import AddAddressDialog from "./AddAddressDialog";

const emptyAddress = {
  addressType: "Home",
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};

const Address = () => {
  const [addresses, setAddresses] = useState([]);

  const [open, setOpen] = useState(false);

  const [editingAddress, setEditingAddress] = useState(null);

  const [formData, setFormData] = useState(emptyAddress);

  const [error, setError] = useState("");

  // ======================================================
  // LOAD ADDRESSES
  // ======================================================

  const loadAddresses = async () => {
    try {
      const data = await getAddresses();

      setAddresses(data || []);
    } catch (error) {
      console.error("Failed to load addresses:", error);

      setAddresses([]);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  // ======================================================
  // INPUT CHANGE
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ======================================================
  // OPEN ADD
  // ======================================================

  const handleAdd = () => {
    setEditingAddress(null);

    setFormData({
      ...emptyAddress,
    });

    setError("");

    setOpen(true);
  };

  // ======================================================
  // OPEN EDIT
  // ======================================================

  const handleEdit = (address) => {
    setEditingAddress(address);

    setFormData({
      addressType: address.addressType || "Home",
      fullName: address.fullName || "",
      phone: address.phone || "",
      addressLine: address.addressLine || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
    });

    setError("");

    setOpen(true);
  };

  // ======================================================
  // CLOSE DIALOG
  // ======================================================

  const handleClose = () => {
    setOpen(false);

    setEditingAddress(null);

    setFormData({
      ...emptyAddress,
    });

    setError("");
  };

  // ======================================================
  // SAVE ADDRESS
  // ======================================================

  const handleSave = async () => {
    const requiredFields = [
      "fullName",
      "phone",
      "addressLine",
      "city",
      "state",
      "pincode",
    ];

    const hasEmptyField = requiredFields.some(
      (field) => !String(formData[field] || "").trim(),
    );

    if (hasEmptyField) {
      setError("Please fill in all address details.");

      return;
    }

    try {
      const addressData = {
        ...formData,

        ...(editingAddress
          ? {
              id: editingAddress.id,
            }
          : {}),

        isDefault: editingAddress?.isDefault || false,
      };

      if (editingAddress) {
        await updateAddress(addressData);
      } else {
        await addAddress(addressData);
      }

      handleClose();

      await loadAddresses();
    } catch (error) {
      console.error("Failed to save address:", error);

      setError("Unable to save address. Please try again.");
    }
  };

  // ======================================================
  // DELETE ADDRESS
  // ======================================================

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);

      await loadAddresses();
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  // ======================================================
  // SET DEFAULT
  // ======================================================

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(id);

      await loadAddresses();
    } catch (error) {
      console.error("Failed to set default address:", error);
    }
  };

  // ======================================================
  // ADDRESS TYPE ICON
  // ======================================================

  const getAddressIcon = (type) => {
    if (type === "Work") {
      return <BusinessOutlinedIcon sx={{ fontSize: 20 }} />;
    }

    return <HomeOutlinedIcon sx={{ fontSize: 20 }} />;
  };

  // ======================================================
  // RETURN
  // ======================================================

  return (
    <>
      {/* ==================================================
          MAIN CARD
      ================================================== */}

      <Card
        elevation={0}
        sx={{
          width: "100%",
          borderRadius: "24px",
          border: "1px solid #E8E1D8",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <Box
          sx={{
            px: {
              xs: 3,
              md: 4,
            },
            py: 3,

            background:
              "linear-gradient(135deg, #F3EBDD 0%, #E9DFCF 100%)",

            borderBottom: "1px solid #DED3C4",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: "100%",
            }}
          >
            {/* LEFT SIDE */}

            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: 24,
                    md: 28,
                  },
                  fontWeight: 700,
                  color: "#1E2F2B",
                }}
              >
                Saved Addresses
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 14,
                  color: "#777168",
                }}
              >
                Manage your saved delivery addresses
              </Typography>
            </Box>

            {/* RIGHT SIDE */}

            <Button
              startIcon={<AddOutlinedIcon />}
              onClick={handleAdd}
              variant="contained"
              sx={{
                height: 44,
                px: 2.5,
                ml: "600px",
                mt: "10px",
                borderRadius: "13px",
                textTransform: "none",
                fontSize: 14,
                fontWeight: 600,
                backgroundColor: "#1E2F2B",
                color: "#FFFFFF",
                boxShadow: "none",
                flexShrink: 0,

                "&:hover": {
                  backgroundColor: "#294039",
                  boxShadow:
                    "0 6px 18px rgba(30,47,43,0.15)",
                },
              }}
            >
              Add Address
            </Button>
          </Stack>
        </Box>

        {/* ==================================================
            CONTENT
        ================================================== */}

        <Box
          sx={{
            p: {
              xs: 2,
              md: 3,
            },

            backgroundColor: "#FCFAF7",
          }}
        >
          {/* ==================================================
              EMPTY STATE
          ================================================== */}

          {addresses.length === 0 ? (
            <Box
              sx={{
                minHeight: 430,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                textAlign: "center",

                px: 3,
              }}
            >
              <Box
                sx={{
                  width: 92,
                  height: 92,

                  borderRadius: "50%",

                  backgroundColor: "#F0F4F0",
                  border: "1px solid #DCE6DE",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  mb: 3,
                }}
              >
                <LocationOnOutlinedIcon
                  sx={{
                    fontSize: 42,
                    color: "#1E2F2B",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: 23,
                  fontWeight: 700,
                  color: "#1E2F2B",
                }}
              >
                No Saved Addresses
              </Typography>

              <Typography
                sx={{
                  mt: 1,

                  maxWidth: 420,

                  fontSize: 14,
                  lineHeight: 1.8,

                  color: "#777168",
                }}
              >
                Add your delivery address to make checkout faster
                and easier.
              </Typography>

              <Button
                startIcon={<AddOutlinedIcon />}
                onClick={handleAdd}
                variant="outlined"
                sx={{
                  mt: 3,

                  height: 44,
                  px: 3,

                  borderRadius: "12px",

                  textTransform: "none",
                  fontWeight: 600,

                  color: "#1E2F2B",
                  borderColor: "#1E2F2B",

                  "&:hover": {
                    backgroundColor: "#F2EEE8",
                    borderColor: "#1E2F2B",
                  },
                }}
              >
                Add Your First Address
              </Button>
            </Box>
          ) : (
            /* ==================================================
                ADDRESS LIST - FIXED SAME WIDTH CARDS
            ================================================== */

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2.5,
                alignItems: "stretch",
              }}
            >
              {addresses.map((address) => {
                const addressType =
                  address.addressType || "Home";

                return (
                  <Box
                    key={address.id}
                    sx={{
                      width: {
                        xs: "100%",
                        sm: 360,
                      },

                      flexShrink: 0,

                      display: "flex",
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        width: "95%",
                        minHeight: 350,

                        display: "flex",
                        flexDirection: "column",

                        borderRadius: "18px",

                        border: address.isDefault
                          ? "1px solid #C7D8CC"
                          : "1px solid #E8E1D8",

                        backgroundColor: "#FFFFFF",

                        overflow: "hidden",

                        transition: "all .25s ease",

                        "&:hover": {
                          transform:
                            "translateY(-2px)",

                          boxShadow:
                            "0 10px 28px rgba(30,47,43,0.07)",

                          borderColor:
                            address.isDefault
                              ? "#B8CCBD"
                              : "#D5CABE",
                        },
                      }}
                    >
                      {/* CARD HEADER */}

                      <Box
                        sx={{
                          px: 2.5,
                          py: 2,

                          backgroundColor:
                            address.isDefault
                              ? "#F5F8F5"
                              : "#FBF9F5",

                          borderBottom:
                            "1px solid #EEE8DF",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",

                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {/* LEFT */}

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.2,
                              minWidth: 0,
                            }}
                          >
                            {/* ICON */}

                            <Box
                              sx={{
                                width: 42,
                                height: 42,
                                flexShrink: 0,

                                borderRadius: "12px",

                                backgroundColor:
                                  address.isDefault
                                    ? "#E7F0E9"
                                    : "#F1ECE5",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                color: "#1E2F2B",
                              }}
                            >
                              {getAddressIcon(
                                addressType,
                              )}
                            </Box>

                            {/* TYPE */}

                            <Box>
                              <Typography
                                sx={{
                                  fontSize: 16,
                                  fontWeight: 700,
                                  color: "#1E2F2B",
                                  lineHeight: 1.2,
                                }}
                              >
                                {addressType}
                              </Typography>

                              <Typography
                                sx={{
                                  mt: 0.3,
                                  fontSize: 11,
                                  color: "#8A8178",
                                  textTransform:
                                    "uppercase",
                                  letterSpacing: 0.5,
                                }}
                              >
                                Delivery Address
                              </Typography>
                            </Box>
                          </Box>

                          {/* DEFAULT */}

                          {address.isDefault && (
                            <Chip
                              label="Default"
                              size="small"
                              sx={{
                                marginLeft: "auto",

                                height: 32,
                                px: 1.2,

                                backgroundColor:
                                  "#E8F1EA",

                                color: "#2F5D45",

                                border:
                                  "1px solid #CDDFD2",

                                borderRadius: "18px",

                                fontSize: 12,
                                fontWeight: 600,

                                flexShrink: 0,
                              }}
                            />
                          )}
                        </Box>
                      </Box>

                      {/* CARD BODY */}

                      <Box
                        sx={{
                          p: 2.5,

                          flex: 1,

                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* NAME */}

                        <Typography
                          sx={{
                            fontSize: 17,
                            fontWeight: 700,
                            color: "#1E2F2B",
                          }}
                        >
                          {address.fullName}
                        </Typography>

                        {/* PHONE */}

                        <Typography
                          sx={{
                            mt: 0.5,
                            fontSize: 13,
                            color: "#777168",
                          }}
                        >
                          {address.phone}
                        </Typography>

                        <Divider
                          sx={{
                            my: 2,
                            borderColor: "#EEE8DF",
                          }}
                        />

                        {/* STREET */}

                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: 1.7,
                            color: "#4F4A44",
                            wordBreak: "break-word",
                          }}
                        >
                          {address.addressLine}
                        </Typography>

                        {/* CITY STATE */}

                        <Typography
                          sx={{
                            mt: 0.5,
                            fontSize: 14,
                            lineHeight: 1.7,
                            color: "#4F4A44",
                          }}
                        >
                          {address.city}, {address.state}
                        </Typography>

                        {/* PINCODE */}

                        <Typography
                          sx={{
                            mt: 0.5,
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#1E2F2B",
                          }}
                        >
                          {address.pincode}
                        </Typography>

                        {/* BOTTOM */}

                        <Box
                          sx={{
                            mt: "auto",
                            pt: 2,
                          }}
                        >
                          <Divider
                            sx={{
                              mb: 1.5,
                              borderColor: "#EEE8DF",
                            }}
                          />

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            {/* DEFAULT ACTION */}

                            <Box
                              sx={{
                                minHeight: 36,

                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {address.isDefault ? (
                                <Typography
                                  sx={{
                                    fontSize: 12,
                                    color: "#6F6961",
                                  }}
                                >
                                  Default delivery address
                                </Typography>
                              ) : (
                                <Button
                                  onClick={() =>
                                    handleSetDefault(
                                      address.id,
                                    )
                                  }
                                  sx={{
                                    p: 0,

                                    minWidth: 0,

                                    textTransform:
                                      "none",

                                    fontSize: 13,
                                    fontWeight: 600,

                                    color: "#1E2F2B",

                                    "&:hover": {
                                      backgroundColor:
                                        "transparent",

                                      color: "#526A61",
                                    },
                                  }}
                                >
                                  Set as Default
                                </Button>
                              )}
                            </Box>

                            {/* EDIT DELETE */}

                            <Stack
                              direction="row"
                              spacing={0.5}
                            >
                              <IconButton
                                onClick={() =>
                                  handleEdit(address)
                                }
                                sx={{
                                  width: 36,
                                  height: 36,

                                  color: "#1E2F2B",

                                  "&:hover": {
                                    backgroundColor:
                                      "#EEF3EF",
                                  },
                                }}
                              >
                                <EditOutlinedIcon
                                  sx={{
                                    fontSize: 19,
                                  }}
                                />
                              </IconButton>

                              <IconButton
                                onClick={() =>
                                  handleDelete(
                                    address.id,
                                  )
                                }
                                sx={{
                                  width: 36,
                                  height: 36,

                                  color: "#8A5C55",

                                  "&:hover": {
                                    backgroundColor:
                                      "#F8EEEC",

                                    color: "#7A4038",
                                  },
                                }}
                              >
                                <DeleteOutlineOutlinedIcon
                                  sx={{
                                    fontSize: 20,
                                  }}
                                />
                              </IconButton>
                            </Stack>
                          </Stack>
                        </Box>
                      </Box>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Card>

      {/* ==================================================
          REUSABLE ADDRESS DIALOG
      ================================================== */}

      <AddAddressDialog
        open={open}
        onClose={handleClose}
        editingAddress={editingAddress}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        error={error}
        handleSave={handleSave}
      />
    </>
  );
};

export default Address;