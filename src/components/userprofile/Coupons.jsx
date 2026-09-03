import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Stack,
  Typography,
  Button,
  Divider,
  Chip,
} from "@mui/material";

import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import { getCoupons } from "../../database/couponService";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [copiedCode, setCopiedCode] = useState("");

  // =====================================================
  // LOAD COUPONS
  // =====================================================

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      const data = await getCoupons();

      const couponList = Array.isArray(data) ? data : data?.coupons || [];

      setCoupons(couponList);
    } catch (error) {
      console.error("Failed to load coupons:", error);
      setCoupons([]);
    }
  };

  // =====================================================
  // COPY COUPON
  // =====================================================

  const copyCoupon = async (code) => {
    try {
      await navigator.clipboard.writeText(code);

      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode("");
      }, 2000);
    } catch (error) {
      console.error("Failed to copy coupon:", error);
    }
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // COUPON STATUS
  // =====================================================

  const getCouponStatus = (coupon) => {
    if (
      coupon?.isActive === false ||
      String(coupon?.isActive).toLowerCase() === "false"
    ) {
      return "Inactive";
    }

    if (coupon?.expiryDate) {
      const expiryDate = new Date(coupon.expiryDate);

      if (!Number.isNaN(expiryDate.getTime())) {
        expiryDate.setHours(23, 59, 59, 999);

        if (new Date() > expiryDate) {
          return "Expired";
        }
      }
    }

    return "Available";
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    if (status === "Available") {
      return {
        color: "#2F5D45",
        backgroundColor: "#EAF3EC",
        borderColor: "#CFE2D4",
      };
    }

    if (status === "Expired") {
      return {
        color: "#7A4038",
        backgroundColor: "#F7E9E6",
        borderColor: "#E8CFC9",
      };
    }

    return {
      color: "#655842",
      backgroundColor: "#F5F1E9",
      borderColor: "#E5DED0",
    };
  };

  // =====================================================
  // DISCOUNT TEXT
  // =====================================================

  const getDiscountText = (coupon) => {
    const type = String(coupon.discountType || "")
      .trim()
      .toLowerCase();

    const value = Number(coupon.discountValue || 0);

    if (type === "percentage" || type === "percent") {
      return `${value}% OFF`;
    }

    return `₹${value.toLocaleString("en-IN")} OFF`;
  };

  // =====================================================
  // COUPONS PAGE
  // =====================================================

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        minHeight: 620,
        borderRadius: "24px",
        border: "1px solid #E8E1D8",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* =====================================================
          HELP CENTER STYLE HEADER
      ===================================================== */}

      <Box
        sx={{
          px: {
            xs: 3,
            md: 5,
          },
          py: {
            xs: 4,
            md: 5,
          },
          background: "linear-gradient(135deg, #F8F3EC 0%, #EFE7DC 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Circle */}

        <Box
          sx={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            backgroundColor: "rgba(184,148,120,0.10)",
            right: -60,
            top: -70,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "rgba(184,148,120,0.08)",
            right: 80,
            bottom: -60,
          }}
        />

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={3}
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          justifyContent="space-between"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* LEFT HEADER */}

          <Stack direction="row" spacing={3} alignItems="center">
            {/* Icon */}

            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 3,
                backgroundColor: "#1E2F2B",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
                boxShadow: "0 10px 25px rgba(30,47,43,0.15)",
              }}
            >
              <LocalOfferOutlinedIcon
                sx={{
                  color: "#fff",
                  fontSize: 32,
                }}
              />
            </Box>

            {/* Text */}

            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#B89478",
                  mb: 1,
                }}
              >
                Special Offers
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 28,
                    md: 34,
                  },
                  fontWeight: 600,
                  color: "#1E2F2B",
                  lineHeight: 1.2,
                }}
              >
                My Coupons
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "#777168",
                  fontSize: 15,
                  lineHeight: 1.7,
                  maxWidth: 600,
                }}
              >
                Discover exclusive GlowCare offers and save more on your
                favorite skincare essentials.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {coupons.length === 0 ? (
        <Box
          sx={{
            minHeight: 480,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 3,
            backgroundColor: "#FCFAF7",
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: "#F1F5F1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <LocalOfferOutlinedIcon
              sx={{
                fontSize: 46,
                color: "#1E2F2B",
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: 25,
              fontWeight: 700,
              color: "#1E2F2B",
            }}
          >
            No Coupons Available
          </Typography>

          <Typography
            sx={{
              mt: 1,
              maxWidth: 430,
              fontSize: 14,
              lineHeight: 1.8,
              color: "#777168",
            }}
          >
            You don't have any coupons available right now. New GlowCare offers
            will appear here when available.
          </Typography>
        </Box>
      ) : (
        <>
          {/* =====================================================
              COUPON CONTENT
          ===================================================== */}

          <Box
            sx={{
              p: {
                xs: 2,
                md: 3,
              },
              backgroundColor: "#FCFAF7",
            }}
          >
            <Stack spacing={2}>
              {coupons.map((coupon) => {
                const status = getCouponStatus(coupon);

                const statusStyle = getStatusStyle(status);

                const isCopied = copiedCode === coupon.code;

                const isAvailable = status === "Available";

                return (
                  <Box
                    key={coupon._id || coupon.id || coupon.code}
                    sx={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E6DED3",
                      borderRadius: "18px",
                      overflow: "hidden",
                      transition: "all 0.25s ease",

                      "&:hover": {
                        borderColor: "#D2C7BA",
                        boxShadow: "0 8px 24px rgba(30,47,43,0.06)",
                      },
                    }}
                  >
                    {/* MAIN COUPON */}

                    <Box
                      sx={{
                        px: {
                          xs: 2,
                          md: 3,
                        },
                        py: 2.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "grid",

                          gridTemplateColumns: {
                            xs: "1fr",
                            md: "auto 1fr auto auto",
                          },

                          alignItems: "center",

                          gap: {
                            xs: 2,
                            md: 3,
                          },
                        }}
                      >
                        {/* ICON */}

                        <Box
                          sx={{
                            width: 68,
                            height: 68,
                            borderRadius: "14px",
                            backgroundColor: "#F5F2ED",
                            border: "1px solid #ECE5DB",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <LocalOfferOutlinedIcon
                            sx={{
                              fontSize: 34,
                              color: "#1E2F2B",
                            }}
                          />
                        </Box>

                        {/* OFFER DETAILS */}

                        <Box
                          sx={{
                            minWidth: 0,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 17,
                              fontWeight: 700,
                              color: "#1E2F2B",
                            }}
                          >
                            {coupon.title ||
                              coupon.description ||
                              "GlowCare Special Offer"}
                          </Typography>

                          <Typography
                            sx={{
                              mt: 0.5,
                              fontSize: 15,
                              fontWeight: 600,
                              color: "#6B5630",
                            }}
                          >
                            {getDiscountText(coupon)}
                          </Typography>

                          {Number(coupon.minimumOrderAmount) > 0 && (
                            <Typography
                              sx={{
                                mt: 0.5,
                                fontSize: 13,
                                color: "#81786E",
                              }}
                            >
                              Min. order ₹
                              {Number(coupon.minimumOrderAmount).toLocaleString(
                                "en-IN",
                              )}
                            </Typography>
                          )}
                        </Box>

                        {/* CODE + DATE */}

                        <Box
                          sx={{
                            minWidth: {
                              xs: "100%",
                              md: 210,
                            },
                            textAlign: {
                              xs: "left",
                              md: "center",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: "#8A8178",
                              letterSpacing: 0.8,
                              mb: 0.6,
                            }}
                          >
                            COUPON CODE
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 17,
                              fontWeight: 800,
                              color: isAvailable ? "#1E2F2B" : "#8A8A8A",
                              letterSpacing: 1,
                            }}
                          >
                            {coupon.code}
                          </Typography>

                          <Typography
                            sx={{
                              mt: 0.6,
                              fontSize: 12,
                              color: "#777168",
                            }}
                          >
                            Valid till {formatDate(coupon.expiryDate)}
                          </Typography>
                        </Box>

                        {/* COPY BUTTON */}

                        <Button
                          variant="outlined"
                          startIcon={
                            isCopied ? (
                              <CheckOutlinedIcon />
                            ) : (
                              <ContentCopyOutlinedIcon />
                            )
                          }
                          disabled={!isAvailable}
                          onClick={() => copyCoupon(coupon.code)}
                          sx={{
                            minWidth: 125,
                            height: 42,
                            borderRadius: "12px",
                            textTransform: "none",
                            fontSize: 13,
                            fontWeight: 600,

                            color: isCopied ? "#2F5D45" : "#1E2F2B",

                            borderColor: isCopied ? "#CFE2D4" : "#1E2F2B",

                            backgroundColor: isCopied ? "#EAF3EC" : "#FFFFFF",

                            "&:hover": {
                              backgroundColor: "#1E2F2B",
                              color: "#FFFFFF",
                              borderColor: "#1E2F2B",
                            },
                          }}
                        >
                          {isCopied ? "Copied" : "Copy Code"}
                        </Button>
                      </Box>
                    </Box>

                    <Divider />

                    {/* =====================================================
                        COUPON FOOTER
                    ===================================================== */}

                    <Box
                      sx={{
                        px: {
                          xs: 2,
                          md: 3,
                        },
                        py: 1.5,
                        backgroundColor: "#FBF9F5",
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <LocalOfferOutlinedIcon
                            sx={{
                              fontSize: 17,
                              color: "#7C746B",
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: 12,
                              color: "#777168",
                            }}
                          >
                            GlowCare exclusive offer
                          </Typography>
                        </Box>

                        {/* STATUS */}

                        <Chip
                          label={status}
                          size="small"
                          sx={{
                            height: 28,
                            fontSize: 11,
                            fontWeight: 600,
                            flexShrink: 0,

                            color: statusStyle.color,

                            backgroundColor: statusStyle.backgroundColor,

                            border: `1px solid ${statusStyle.borderColor}`,

                            borderRadius: "20px",
                          }}
                        />
                      </Stack>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </>
      )}
    </Card>
  );
};

export default Coupons;
