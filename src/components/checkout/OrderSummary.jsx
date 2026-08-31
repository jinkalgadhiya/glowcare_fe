import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Paper,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";

import { useSelector } from "react-redux";

import CouponBox from "./CouponBox";
import PriceDetails from "./PriceDetails";

import { getCoupons } from "../../database/couponService";

const OrderSummary = ({
  checkoutData,
  onPricingChange,
}) => {
  const cartItems = useSelector(
    (state) => state.cart.items,
  );

  // =====================================================
  // COUPON STATE
  // =====================================================

  const [coupons, setCoupons] =
    useState([]);

  const [
    appliedCoupon,
    setAppliedCoupon,
  ] = useState(null);

  const [couponError, setCouponError] =
    useState("");

  const [
    couponLoading,
    setCouponLoading,
  ] = useState(false);

  const [couponCode, setCouponCode] =
    useState("");

  // =====================================================
  // LOAD COUPONS
  // =====================================================

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      const data = await getCoupons();

      const couponList =
        Array.isArray(data)
          ? data
          : data?.coupons || [];

      setCoupons(couponList);
    } catch (error) {
      console.error(
        "Failed to load coupons:",
        error,
      );

      setCoupons([]);
    }
  };

  // =====================================================
  // SUBTOTAL
  // =====================================================

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => {
        const price =
          Number(item.price) || 0;

        const quantity =
          Number(item.quantity) || 1;

        return (
          total +
          price * quantity
        );
      },
      0,
    );
  }, [cartItems]);

  // =====================================================
  // DELIVERY
  // =====================================================

  const deliveryType =
    checkoutData?.delivery ||
    "standard";

  const shipping =
    deliveryType === "express"
      ? 99
      : 0;

  // =====================================================
  // DISCOUNT
  // =====================================================

  const discount =
    appliedCoupon
      ? Number(
          appliedCoupon.discountAmount,
        ) || 0
      : 0;

  // =====================================================
  // GST
  // GST AFTER DISCOUNT
  // =====================================================

  const gst = Math.round(
    Math.max(
      subtotal - discount,
      0,
    ) * 0.05,
  );

  // =====================================================
  // FINAL TOTAL
  // =====================================================

  const finalTotal = Math.max(
    subtotal -
      discount +
      gst +
      shipping,
    0,
  );

  // =====================================================
  // PRICING DATA
  // THIS WILL BE USED EVERYWHERE
  // =====================================================

  const pricingData = useMemo(() => {
    return {
      subtotal,
      discount,
      gst,
      shipping,
      total: finalTotal,

      appliedCoupon:
        appliedCoupon
          ? {
              code:
                appliedCoupon.code ||
                "",

              discountAmount:
                discount,
            }
          : null,
    };
  }, [
    subtotal,
    discount,
    gst,
    shipping,
    finalTotal,
    appliedCoupon,
  ]);

  // =====================================================
  // SEND PRICING TO CHECKOUT PARENT
  // =====================================================

  useEffect(() => {
    if (onPricingChange) {
      onPricingChange(
        pricingData,
      );
    }
  }, [
    pricingData,
    onPricingChange,
  ]);

  // =====================================================
  // APPLY COUPON
  // =====================================================

  const handleApplyCoupon = async (
    code,
  ) => {
    setCouponError("");

    const enteredCode = String(
      code || "",
    )
      .trim()
      .toUpperCase();

    if (!enteredCode) {
      setCouponError(
        "Please enter a coupon code.",
      );

      return;
    }

    try {
      setCouponLoading(true);

      const latestData =
        await getCoupons();

      const latestCoupons =
        Array.isArray(latestData)
          ? latestData
          : latestData?.coupons || [];

      setCoupons(latestCoupons);

      const coupon =
        latestCoupons.find(
          (item) => {
            const currentCode =
              String(
                item.code || "",
              )
                .trim()
                .toUpperCase();

            return (
              currentCode ===
              enteredCode
            );
          },
        );

      // =================================================
      // NOT FOUND
      // =================================================

      if (!coupon) {
        setCouponError(
          "Invalid coupon code.",
        );

        return;
      }

      // =================================================
      // ACTIVE
      // =================================================

      if (
        coupon.isActive === false ||
        String(
          coupon.isActive,
        ).toLowerCase() === "false"
      ) {
        setCouponError(
          "This coupon is currently inactive.",
        );

        return;
      }

      // =================================================
      // START DATE
      // =================================================

      if (coupon.startDate) {
        const startDate =
          new Date(
            coupon.startDate,
          );

        if (
          !Number.isNaN(
            startDate.getTime(),
          )
        ) {
          startDate.setHours(
            0,
            0,
            0,
            0,
          );

          const today =
            new Date();

          today.setHours(
            0,
            0,
            0,
            0,
          );

          if (today < startDate) {
            setCouponError(
              "This coupon is not active yet.",
            );

            return;
          }
        }
      }

      // =================================================
      // EXPIRY DATE
      // =================================================

      if (coupon.expiryDate) {
        const expiryDate =
          new Date(
            coupon.expiryDate,
          );

        if (
          !Number.isNaN(
            expiryDate.getTime(),
          )
        ) {
          expiryDate.setHours(
            23,
            59,
            59,
            999,
          );

          if (
            new Date() >
            expiryDate
          ) {
            setCouponError(
              "This coupon has expired.",
            );

            return;
          }
        }
      }

      // =================================================
      // MINIMUM ORDER
      // =================================================

      const minimumOrder =
        Number(
          coupon.minimumOrderAmount,
        ) || 0;

      if (
        subtotal < minimumOrder
      ) {
        setCouponError(
          `Minimum order amount is ₹${minimumOrder.toLocaleString(
            "en-IN",
          )}.`,
        );

        return;
      }

      // =================================================
      // CALCULATE DISCOUNT
      // =================================================

      const discountType =
        String(
          coupon.discountType ||
            "",
        )
          .trim()
          .toLowerCase();

      const discountValue =
        Number(
          coupon.discountValue,
        ) || 0;

      let calculatedDiscount =
        0;

      // Percentage

      if (
        discountType ===
          "percentage" ||
        discountType ===
          "percent"
      ) {
        calculatedDiscount =
          (subtotal *
            discountValue) /
          100;

        const maximumDiscount =
          Number(
            coupon.maximumDiscount,
          );

        if (
          coupon.maximumDiscount !==
            null &&
          coupon.maximumDiscount !==
            undefined &&
          coupon.maximumDiscount !==
            "" &&
          !Number.isNaN(
            maximumDiscount,
          ) &&
          maximumDiscount > 0
        ) {
          calculatedDiscount =
            Math.min(
              calculatedDiscount,
              maximumDiscount,
            );
        }
      }

      // Fixed

      else if (
        discountType === "fixed" ||
        discountType ===
          "fixedamount" ||
        discountType ===
          "fixed_amount" ||
        discountType === "amount"
      ) {
        calculatedDiscount =
          discountValue;
      }

      // =================================================
      // SAFE DISCOUNT
      // =================================================

      calculatedDiscount =
        Math.min(
          calculatedDiscount,
          subtotal,
        );

      calculatedDiscount =
        Math.max(
          calculatedDiscount,
          0,
        );

      if (
        !Number.isFinite(
          calculatedDiscount,
        ) ||
        calculatedDiscount <= 0
      ) {
        setCouponError(
          "This coupon does not provide a valid discount.",
        );

        return;
      }

      // =================================================
      // APPLY
      // =================================================

      setAppliedCoupon({
        ...coupon,

        discountAmount:
          calculatedDiscount,
      });

      setCouponCode(
        enteredCode,
      );

      setCouponError("");
    } catch (error) {
      console.error(
        "Apply coupon error:",
        error,
      );

      setCouponError(
        "Unable to apply coupon. Please try again.",
      );
    } finally {
      setCouponLoading(false);
    }
  };

  // =====================================================
  // REMOVE COUPON
  // =====================================================

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);

    setCouponCode("");

    setCouponError("");
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        border:
          "1px solid #ECE6DE",
        position: "sticky",
        top: 100,
        background: "#fff",
        width: 480,
        boxSizing:
          "border-box",
      }}
    >
      {/* HEADING */}

      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 3,
        }}
      >
        Order Summary
      </Typography>

      {/* PRODUCTS */}

      <Box
        sx={{
          display: "flex",
          flexDirection:
            "column",
          gap: 2.5,
        }}
      >
        {cartItems.map(
          (item) => (
            <Box
              key={`${item.productId}-${item.variantId}`}
              sx={{
                display: "flex",
                gap: 2,
                alignItems:
                  "center",
              }}
            >
              <Avatar
                src={item.image}
                variant="rounded"
                sx={{
                  width: 75,
                  height: 75,
                  bgcolor:
                    "#F7F5F2",
                  borderRadius: 3,
                }}
              />

              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color:
                      "#1E2F2B",
                    fontSize: 15,
                    overflow:
                      "hidden",
                    textOverflow:
                      "ellipsis",
                    whiteSpace:
                      "nowrap",
                  }}
                >
                  {item.name}
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    fontSize: 13,
                    mt: 0.5,
                  }}
                >
                  {item.size}
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    fontSize: 13,
                    mt: 0.5,
                  }}
                >
                  Qty :{" "}
                  {item.quantity}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontWeight: 600,
                  color:
                    "#1E2F2B",
                  fontSize: 16,
                  whiteSpace:
                    "nowrap",
                }}
              >
                ₹
                {(
                  Number(
                    item.price ||
                      0,
                  ) *
                  Number(
                    item.quantity ||
                      1,
                  )
                ).toLocaleString(
                  "en-IN",
                )}
              </Typography>
            </Box>
          ),
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* COUPON */}

      <CouponBox
        couponCode={
          couponCode
        }
        setCouponCode={
          setCouponCode
        }
        appliedCoupon={
          appliedCoupon
        }
        couponError={
          couponError
        }
        loading={
          couponLoading
        }
        onApply={
          handleApplyCoupon
        }
        onRemove={
          handleRemoveCoupon
        }
      />

      <Divider sx={{ my: 4 }} />

      {/* PRICE DETAILS */}

      <PriceDetails
        subtotal={subtotal}
        discount={discount}
        gst={gst}
        shipping={shipping}
        total={finalTotal}
        appliedCoupon={
          appliedCoupon
        }
        delivery={
          deliveryType
        }
      />

      <Divider sx={{ my: 4 }} />

      {/* DELIVERY */}

      <Typography
        sx={{
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 1,
        }}
      >
        Estimated Delivery
      </Typography>

      <Typography
        sx={{
          color: "#777",
          mb: 4,
        }}
      >
        {deliveryType ===
        "express"
          ? "1–2 Business Days"
          : "3–5 Business Days"}
      </Typography>

      {/* SECURE */}

      <Box
        sx={{
          background:
            "#F8F6F3",
          p: 2,
          borderRadius: 3,
          textAlign:
            "center",
        }}
      >
        <Typography
          sx={{
            color:
              "#1E2F2B",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          🔒 Secure Checkout
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            color: "#777",
            fontSize: 13,
          }}
        >
          Your payment
          information is
          encrypted and
          secure.
        </Typography>
      </Box>
    </Paper>
  );
};

export default OrderSummary;