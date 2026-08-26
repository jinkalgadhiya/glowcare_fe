import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

import api from "../../api/axios";
import { getMyOrders } from "../../database/orderService";
import { getWishlist } from "../../database/wishlistService";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [orderCount, setOrderCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");

  // =====================================================
  // LOAD PROFILE + ORDERS + WISHLIST
  // =====================================================

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        setError("");

        const [userResponse, orders, wishlist] = await Promise.all([
          api.get("/users/me"),
          getMyOrders(),
          getWishlist(),
        ]);

        // ================= USER =================

        if (
          userResponse.data.status === "success" &&
          userResponse.data.data
        ) {
          const currentUser = userResponse.data.data;

          setUser(currentUser);

          setFullName(currentUser.fullName || "");
          setEmail(currentUser.email || "");
          setContact(currentUser.contactNumber || "");
        } else {
          setUser(null);
        }

        // ================= ORDERS =================

        setOrderCount(Array.isArray(orders) ? orders.length : 0);

        // ================= WISHLIST =================

        if (Array.isArray(wishlist)) {
          /*
           * Your wishlist document contains:
           *
           * products: [...]
           *
           * getWishlist() returns the data from backend.
           *
           * Handle both:
           * 1. direct products array
           * 2. wishlist object containing products
           */

          if (wishlist.length > 0 && wishlist[0]?.products) {
            setWishlistCount(wishlist[0].products.length);
          } else {
            setWishlistCount(wishlist.length);
          }
        } else if (wishlist?.products) {
          setWishlistCount(wishlist.products.length);
        } else {
          setWishlistCount(0);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your profile.",
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  // =====================================================
  // OPEN EDIT PROFILE
  // =====================================================

  const handleOpenEdit = () => {
    if (!user) return;

    setFullName(user.fullName || "");
    setEmail(user.email || "");
    setContact(user.contactNumber || "");

    setSaveError("");
    setOpenEdit(true);
  };

  // =====================================================
  // SAVE PROFILE TO MONGODB
  // =====================================================

  const handleSaveChanges = async () => {
    if (!user) return;

    setSaveError("");

    if (!fullName.trim()) {
      setSaveError("Full name is required.");
      return;
    }

    if (!email.trim()) {
      setSaveError("Email address is required.");
      return;
    }

    if (!contact.trim()) {
      setSaveError("Contact number is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.put("/users/me", {
        fullName: fullName.trim(),
        email: email.trim(),
        contactNumber: contact.trim(),
        profileImage: user.profileImage || "",
      });

      if (
        response.data.status === "success" &&
        response.data.data
      ) {
        const updatedUser = response.data.data;

        // Update UI with MongoDB response
        setUser(updatedUser);

        setFullName(updatedUser.fullName || "");
        setEmail(updatedUser.email || "");
        setContact(updatedUser.contactNumber || "");

        setOpenEdit(false);
      } else {
        setSaveError(
          response.data.message || "Failed to update profile.",
        );
      }
    } catch (error) {
      console.error("Failed to update profile:", error);

      setSaveError(
        error.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <Card
        elevation={0}
        sx={{
          width: "100%",
          minHeight: 400,
          borderRadius: "28px",
          border: "1px solid #E8E1D8",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#1E2F2B" }} />
      </Card>
    );
  }

  // =====================================================
  // NO USER
  // =====================================================

  if (!user) {
    return (
      <Card
        elevation={0}
        sx={{
          width: "100%",
          minHeight: 400,
          borderRadius: "28px",
          border: "1px solid #E8E1D8",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "#777",
            fontSize: 16,
          }}
        >
          Please sign in to view your profile.
        </Typography>
      </Card>
    );
  }

  // =====================================================
  // PROFILE UI
  // =====================================================

  return (
    <>
      <Card
        elevation={0}
        sx={{
          width: "100%",
          borderRadius: "28px",
          border: "1px solid #E8E1D8",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {/* ================= PROFILE HEADER ================= */}

        <Box
          sx={{
            p: 4,
            background:
              "linear-gradient(135deg, #FAF6F0 0%, #EEE1D0 55%, #E2D2BE 100%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {/* Customer Information */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              {/* Profile Image */}

              <Avatar
                src={user.profileImage || ""}
                alt={user.fullName || "User"}
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: "#BA9964",
                  fontSize: 48,
                  fontWeight: 700,
                }}
              >
                {user.fullName?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>

              {/* Details */}

              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 26,
                      md: 34,
                    },
                    fontWeight: 700,
                    color: "#1E2F2B",
                  }}
                >
                  {user.fullName || "User"}
                </Typography>

                <Typography
                  sx={{
                    color: "#7A746C",
                    mt: 1,
                  }}
                >
                  {user.email || "No email available"}
                </Typography>

                <Typography
                  sx={{
                    color: "#7A746C",
                    mt: 0.5,
                  }}
                >
                  {user.contactNumber || "No contact available"}
                </Typography>

                <Button
                  startIcon={<EditOutlinedIcon />}
                  onClick={handleOpenEdit}
                  sx={{
                    mt: 3,
                    px: 3,
                    py: 1,
                    borderRadius: "14px",
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#fff",
                    background:
                      "linear-gradient(135deg,#1E2F2B,#355148)",

                    "&:hover": {
                      background:
                        "linear-gradient(135deg,#162320,#294039)",
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>

            {/* Member Badge */}

            <Box
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: "50px",
                bgcolor: "#EEF3EF",
                border: "1px solid #D7E4D9",
              }}
            >
              <Typography
                sx={{
                  color: "#1E2F2B",
                  fontWeight: 600,
                }}
              >
                GlowCare Member ✨
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Divider */}

        <Box
          sx={{
            height: "1px",
            bgcolor: "#ECE6DD",
          }}
        />

        {/* ================= STATS ================= */}

        <Box
          sx={{
            p: 4,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {/* Orders */}

          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "22px",
              border: "1px solid #E4ECE5",
              bgcolor: "#F5F9F5",
              textAlign: "center",
            }}
          >
            <ShoppingBagOutlinedIcon
              sx={{
                fontSize: 34,
                color: "#1E2F2B",
              }}
            />

            <Typography
              sx={{
                mt: 2,
                fontSize: 36,
                fontWeight: 700,
                color: "#1E2F2B",
              }}
            >
              {orderCount}
            </Typography>

            <Typography sx={{ color: "#666" }}>
              Total Orders
            </Typography>
          </Card>

          {/* Wishlist */}

          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "22px",
              border: "1px solid #F0E4E4",
              bgcolor: "#FCF7F7",
              textAlign: "center",
            }}
          >
            <FavoriteBorderOutlinedIcon
              sx={{
                fontSize: 34,
                color: "#1E2F2B",
              }}
            />

            <Typography
              sx={{
                mt: 2,
                fontSize: 36,
                fontWeight: 700,
                color: "#1E2F2B",
              }}
            >
              {wishlistCount}
            </Typography>

            <Typography sx={{ color: "#666" }}>
              Wishlist Items
            </Typography>
          </Card>

          {/* Coupons */}

          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "22px",
              border: "1px solid #EEE8DD",
              bgcolor: "#FFFBF5",
              textAlign: "center",
            }}
          >
            <LocalOfferOutlinedIcon
              sx={{
                fontSize: 34,
                color: "#1E2F2B",
              }}
            />

            <Typography
              sx={{
                mt: 2,
                fontSize: 36,
                fontWeight: 700,
                color: "#1E2F2B",
              }}
            >
              0
            </Typography>

            <Typography sx={{ color: "#666" }}>
              Available Coupons
            </Typography>
          </Card>
        </Box>
      </Card>

      {/* ================================================= */}
      {/* EDIT PROFILE DIALOG */}
      {/* ================================================= */}

      <Dialog
        open={openEdit}
        onClose={() => !saving && setOpenEdit(false)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow:
                "0 20px 60px rgba(30,47,43,0.15)",
            },
          },
        }}
      >
        {/* Header */}

        <Box
          sx={{
            px: 4,
            py: 3,
            background:
              "linear-gradient(135deg, #F4EEE5 0%, #ECE4D7 100%)",
            borderBottom: "1px solid #E2D9CB",
          }}
        >
          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1E2F2B",
            }}
          >
            Edit Profile
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: "#7A746C",
              fontSize: 14,
            }}
          >
            Update your personal information
          </Typography>
        </Box>

        <DialogContent
          sx={{
            p: 4,
            backgroundColor: "#FFFDFC",
          }}
        >
          {saveError && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
              }}
            >
              {saveError}
            </Alert>
          )}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
              },
              gap: 3,
            }}
          >
            <TextField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
              disabled={saving}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  backgroundColor: "#FAF7F2",
                },
              }}
            />

            <TextField
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              disabled={saving}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  backgroundColor: "#FAF7F2",
                },
              }}
            />

            <TextField
              label="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              fullWidth
              disabled={saving}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  backgroundColor: "#FAF7F2",
                },
              }}
            />
          </Box>

          {/* Buttons */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 5,
            }}
          >
            <Button
              onClick={() => setOpenEdit(false)}
              variant="outlined"
              disabled={saving}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#D9D0C3",
                color: "#5F5952",
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSaveChanges}
              variant="contained"
              disabled={saving}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: "#1E2F2B",

                "&:hover": {
                  backgroundColor: "#243A35",
                },
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyProfile;