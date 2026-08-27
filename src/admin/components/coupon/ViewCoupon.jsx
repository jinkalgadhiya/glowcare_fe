import React from "react";

import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
} from "@mui/material";

import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

import { useThemeContext } from "../../context/ThemeContext";

const ViewCoupon = ({ open, onClose, coupon }) => {
  const { darkMode } = useThemeContext();

  if (!coupon) return null;

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN");
  };

  // =====================================================
  // DISCOUNT
  // =====================================================

  const discount =
    coupon.discountType === "percentage"
      ? `${coupon.discountValue}%`
      : `₹${Number(coupon.discountValue || 0).toLocaleString("en-IN")}`;

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          width: "100%",
          borderRadius: "10px",

          bgcolor: darkMode ? "#252525" : "#FFFFFF",

          color: darkMode ? "#FFFFFF" : "#222222",

          border: darkMode ? "1px solid #3D3D3D" : "1px solid #E5E5E5",

          boxShadow: darkMode
            ? "0 15px 45px rgba(0, 0, 0, 0.6)"
            : "0 15px 45px rgba(0, 0, 0, 0.15)",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: darkMode
              ? "rgba(0, 0, 0, 0.72)"
              : "rgba(0, 0, 0, 0.45)",
          },
        },
      }}
    >
      <DialogContent
        sx={{
          p: 4,

          bgcolor: darkMode ? "#252525" : "#FFFFFF",

          color: darkMode ? "#FFFFFF" : "#222222",
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 2,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              bgcolor: darkMode ? "#3D322B" : "#F4E7DD",
            }}
          >
            <LocalOfferOutlinedIcon
              sx={{
                fontSize: 28,
                color: "#B89478",
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 27,
                fontWeight: 700,

                color: darkMode ? "#FFFFFF" : "#1E2F2B",
              }}
            >
              {coupon.code || "-"}
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                fontSize: 14,

                color: darkMode ? "#BDBDBD" : "#777777",
              }}
            >
              Coupon Details
            </Typography>
          </Box>
        </Box>

        {/* =====================================================
            DESCRIPTION
        ===================================================== */}

        <Typography
          sx={{
            mt: 2,

            color: darkMode ? "#C7C7C7" : "#777777",

            lineHeight: 1.6,
          }}
        >
          {coupon.description || "No description"}
        </Typography>

        <Divider
          sx={{
            my: 3,

            borderColor: darkMode ? "#3D3D3D" : "#E7DDD2",
          }}
        />

        {/* =====================================================
            DETAILS
        ===================================================== */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },

            gap: 2,
          }}
        >
          {/* DISCOUNT */}

          <Box
            sx={{
              p: 2,
              borderRadius: 2,

              bgcolor: darkMode ? "#2E2E2E" : "#F8F5F1",

              border: darkMode ? "1px solid #3D3D3D" : "1px solid #EAE2D9",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,

                color: darkMode ? "#AFAFAF" : "#777",

                mb: 0.5,
              }}
            >
              Discount
            </Typography>

            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,

                color: darkMode ? "#FFFFFF" : "#1E2F2B",
              }}
            >
              {discount}
            </Typography>
          </Box>

          {/* MINIMUM ORDER */}

          <Box
            sx={{
              p: 2,
              borderRadius: 2,

              bgcolor: darkMode ? "#2E2E2E" : "#F8F5F1",

              border: darkMode ? "1px solid #3D3D3D" : "1px solid #EAE2D9",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,

                color: darkMode ? "#AFAFAF" : "#777",

                mb: 0.5,
              }}
            >
              Minimum Order
            </Typography>

            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,

                color: darkMode ? "#FFFFFF" : "#1E2F2B",
              }}
            >
              ₹{Number(coupon.minimumOrderAmount || 0).toLocaleString("en-IN")}
            </Typography>
          </Box>

          {/* MAXIMUM DISCOUNT */}

          {coupon.maximumDiscount !== null &&
            coupon.maximumDiscount !== undefined && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,

                  bgcolor: darkMode ? "#2E2E2E" : "#F8F5F1",

                  border: darkMode ? "1px solid #3D3D3D" : "1px solid #EAE2D9",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,

                    color: darkMode ? "#AFAFAF" : "#777",

                    mb: 0.5,
                  }}
                >
                  Maximum Discount
                </Typography>

                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,

                    color: darkMode ? "#FFFFFF" : "#1E2F2B",
                  }}
                >
                  ₹{Number(coupon.maximumDiscount).toLocaleString("en-IN")}
                </Typography>
              </Box>
            )}

          {/* USAGE */}

          <Box
            sx={{
              p: 2,
              borderRadius: 2,

              bgcolor: darkMode ? "#2E2E2E" : "#F8F5F1",

              border: darkMode ? "1px solid #3D3D3D" : "1px solid #EAE2D9",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,

                color: darkMode ? "#AFAFAF" : "#777",

                mb: 0.5,
              }}
            >
              Usage
            </Typography>

            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,

                color: darkMode ? "#FFFFFF" : "#1E2F2B",
              }}
            >
              {coupon.usedCount || 0}
              {" / "}
              {coupon.usageLimit ?? "∞"}
            </Typography>
          </Box>
        </Box>

        {/* =====================================================
            VALIDITY
        ===================================================== */}

        <Box
          sx={{
            mt: 2,
            p: 2,

            borderRadius: 2,

            bgcolor: darkMode ? "#2E2E2E" : "#F8F5F1",

            border: darkMode ? "1px solid #3D3D3D" : "1px solid #EAE2D9",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,

              color: darkMode ? "#AFAFAF" : "#777",

              mb: 1,
            }}
          >
            Validity
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 12,

                  color: darkMode ? "#888" : "#999",
                }}
              >
                Start Date
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontWeight: 600,

                  color: darkMode ? "#FFFFFF" : "#333",
                }}
              >
                {formatDate(coupon.startDate)}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 12,

                  color: darkMode ? "#888" : "#999",
                }}
              >
                Expiry Date
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontWeight: 600,

                  color: darkMode ? "#FFFFFF" : "#333",
                }}
              >
                {formatDate(coupon.expiryDate)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* =====================================================
            STATUS
        ===================================================== */}

        <Box sx={{ mt: 2 }}>
          <Chip
            label={coupon.isActive ? "Active" : "Inactive"}
            sx={{
              fontWeight: 600,

              backgroundColor: coupon.isActive
                ? darkMode
                  ? "#294332"
                  : "#E8F1EA"
                : darkMode
                  ? "#432E2C"
                  : "#F4E8E6",

              color: coupon.isActive
                ? darkMode
                  ? "#9BE0AD"
                  : "#2F5D45"
                : darkMode
                  ? "#FF9D94"
                  : "#8A4038",
            }}
          />
        </Box>

        {/* =====================================================
            CLOSE BUTTON
        ===================================================== */}

        <Button
          fullWidth
          onClick={onClose}
          variant="contained"
          sx={{
            mt: 4,
            height: 46,

            backgroundColor: "#B89478",

            color: "#FFFFFF",

            textTransform: "none",

            fontSize: 15,
            fontWeight: 600,

            borderRadius: 2,

            boxShadow: "none",

            "&:hover": {
              backgroundColor: "#A88366",
              boxShadow: "none",
            },
          }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCoupon;
