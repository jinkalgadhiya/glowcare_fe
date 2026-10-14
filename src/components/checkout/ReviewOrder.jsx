import React from "react";

import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Dialog,
  DialogContent,
  Divider,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createOrder } from "../../database/orderService";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../database/paymentService";

import { clearWholeCart } from "../../redux/cart/cartActions";

const ReviewOrder = ({
  checkoutData,
  backStep,
  pricing,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  // ================= SUCCESS DIALOG =================

  const [openSuccessDialog, setOpenSuccessDialog] =
    React.useState(false);

  // ================= PAYMENT FAILED DIALOG =================

  const [openPaymentFailedDialog, setOpenPaymentFailedDialog] =
    React.useState(false);

  const [paymentFailureMessage, setPaymentFailureMessage] =
    React.useState("");

  // ================= ORDER =================

  const [placedOrder, setPlacedOrder] =
    React.useState(null);

  const [placingOrder, setPlacingOrder] =
    React.useState(false);

  const [paymentError, setPaymentError] =
    React.useState("");

  /*
    This ref is important.

    Razorpay can trigger ondismiss when its popup closes.
    We use this to make sure a successful payment does not
    accidentally open the "Payment Failed" dialog.
  */

  const paymentSucceededRef =
    React.useRef(false);

  // ================= SHIPPING DATA =================

  const shippingData =
    checkoutData?.shipping || {};

  const addressLine =
    shippingData.addressLine ||
    shippingData.address ||
    "";

  const city =
    shippingData.city || "";

  const state =
    shippingData.state || "";

  const pincode =
    shippingData.pincode || "";

  const addressParts = [
    addressLine,
    city,
    state,
    pincode,
  ].filter(Boolean);

  // ================= PRICING =================

  const subtotal =
    Number(pricing?.subtotal) || 0;

  const discount =
    Number(pricing?.discount) || 0;

  const gst =
    Number(pricing?.gst) || 0;

  const shipping =
    Number(pricing?.shipping) || 0;

  const total =
    Number(pricing?.total) || 0;

  const appliedCoupon =
    pricing?.appliedCoupon || null;

  const formatPrice = (value) => {
    return Number(value || 0).toLocaleString(
      "en-IN"
    );
  };

  // ================= PAYMENT METHOD =================

  /*
    PaymentMethod.jsx stores:

    "COD"
    "Online"

    Old lowercase "cod" is also supported.
  */

  const paymentValue =
    checkoutData?.payment || "COD";

  const paymentMethod =
    paymentValue === "COD" ||
    paymentValue === "cod"
      ? "COD"
      : "Online";

  // ================= DELIVERY METHOD =================

  const deliveryValue =
    checkoutData?.delivery || "standard";

  const deliveryMethod =
    deliveryValue === "express" ||
    deliveryValue === "Express"
      ? "Express"
      : "Standard";

  // ================= SECTION TITLE =================

  const SectionTitle = ({
    icon,
    children,
  }) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          mb: 2.5,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            backgroundColor: "#F3F0EA",
            color: "#1E2F2B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 18,
            color: "#1E2F2B",
          }}
        >
          {children}
        </Typography>
      </Box>
    );
  };

  // ================= SUCCESS DIALOG =================

  const showSuccessDialog = async (
    order
  ) => {
    /*
      Cart is cleared ONLY after successful
      order/payment completion.
    */

    dispatch(clearWholeCart());

    setPlacedOrder(order);

    setOpenSuccessDialog(true);
  };

  // ================= PAYMENT FAILED DIALOG =================

  const showPaymentFailedDialog = (
    message
  ) => {
    setPaymentFailureMessage(
      message ||
        "Your payment was not completed. No payment has been made."
    );

    setOpenPaymentFailedDialog(true);
  };

  // ================= ONLINE PAYMENT =================

  const handleOnlinePayment = async (
    createdOrder
  ) => {
    try {
      setPaymentError("");

      paymentSucceededRef.current =
        false;

      // ================= CHECK RAZORPAY =================

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay checkout is not loaded. Please refresh the page."
        );
      }

      // ================= CHECK ORDER =================

      if (!createdOrder?._id) {
        throw new Error(
          "Created order ID is missing."
        );
      }

      // ================= CREATE RAZORPAY ORDER =================

      const razorpayResponse =
        await createRazorpayOrder(
          createdOrder._id
        );

      console.log(
        "RAZORPAY RESPONSE FROM SERVICE:",
        razorpayResponse
      );

      const razorpayData =
        razorpayResponse?.data;

      if (
        !razorpayData?.razorpayOrderId ||
        !razorpayData?.amount ||
        !razorpayData?.keyId
      ) {
        throw new Error(
          "Razorpay order response is incomplete. Check the browser console."
        );
      }

      console.log(
        "RAZORPAY DATA:",
        razorpayData
      );

      // ================= RAZORPAY OPTIONS =================

      const options = {
        key: razorpayData.keyId,

        amount: razorpayData.amount,

        currency:
          razorpayData.currency || "INR",

        name: "GlowCare",

        description:
          "GlowCare skincare order",

        order_id:
          razorpayData.razorpayOrderId,

        prefill: {
          name:
            shippingData.fullName || "",

          email:
            shippingData.email || "",

          contact:
            shippingData.phone ||
            shippingData.contactNumber ||
            shippingData.mobile ||
            "",
        },

        theme: {
          color: "#1E2F2B",
        },

        // ================= PAYMENT SUCCESS =================

        handler: async (
          paymentResponse
        ) => {
          try {
            console.log(
              "RAZORPAY PAYMENT RESPONSE:",
              paymentResponse
            );

            setPlacingOrder(true);

            setPaymentError("");

            // ================= VERIFY PAYMENT =================

            const verificationResponse =
              await verifyRazorpayPayment({
                orderId:
                  createdOrder._id,

                razorpay_order_id:
                  paymentResponse.razorpay_order_id,

                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,

                razorpay_signature:
                  paymentResponse.razorpay_signature,
              });

            console.log(
              "PAYMENT VERIFICATION RESPONSE:",
              verificationResponse
            );

            /*
              Mark payment as successful BEFORE
              Razorpay's modal closes.
            */

            paymentSucceededRef.current =
              true;

            // ================= PAID AMOUNT =================

            const paidOrder = {
              ...createdOrder,

              paidAmount:
                Number(
                  razorpayData.amount
                ) / 100,
            };

            // ================= SHOW SUCCESS =================

            await showSuccessDialog(
              paidOrder
            );
          } catch (error) {
            console.error(
              "PAYMENT VERIFICATION ERROR:",
              error
            );

            const message =
              error?.response?.data
                ?.message ||
              error?.message ||
              "Payment verification failed.";

            setPaymentError(message);

            showPaymentFailedDialog(
              message
            );
          } finally {
            setPlacingOrder(false);
          }
        },

        // ================= RAZORPAY CLOSED =================

        modal: {
          ondismiss: () => {
            console.log(
              "RAZORPAY PAYMENT POPUP CLOSED"
            );

            /*
              If payment was NOT successful and
              user closed Razorpay, show the
              payment failed/cancelled dialog.
            */

            if (
              !paymentSucceededRef.current
            ) {
              setPlacingOrder(false);

              showPaymentFailedDialog(
                "You cancelled the payment. Your order has not been completed."
              );
            }
          },
        },
      };

      // ================= OPEN RAZORPAY =================

      const razorpay =
        new window.Razorpay(options);

      // ================= PAYMENT FAILED =================

      razorpay.on(
        "payment.failed",
        (paymentError) => {
          console.error(
            "RAZORPAY PAYMENT FAILED:",
            paymentError
          );

          paymentSucceededRef.current =
            false;

          const message =
            paymentError?.error
              ?.description ||
            "Your payment could not be completed. Please try again.";

          setPaymentError(message);

          setPlacingOrder(false);

          showPaymentFailedDialog(
            message
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "ONLINE PAYMENT ERROR:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to start online payment.";

      setPaymentError(message);

      setPlacingOrder(false);

      showPaymentFailedDialog(
        message
      );
    }
  };

  // ================= PLACE ORDER =================

  const handlePlaceOrder = async () => {
    if (
      placingOrder ||
      cartItems.length === 0
    ) {
      return;
    }

    try {
      setPlacingOrder(true);

      setPaymentError("");

      // ================= ORDER ITEMS =================

      const items = cartItems.map(
        (item) => ({
          productId:
            item.productId ||
            item._id,

          variantId:
            item.variantId || "",

          name:
            item.name ||
            item.productName ||
            "",

          image:
            item.image || "",

          category:
            typeof item.category ===
            "string"
              ? item.category
              : item.category
                  ?.subCategory ||
                item.category
                  ?.mainCategory ||
                "",

          size:
            item.size || "",

          price:
            Number(item.price) || 0,

          quantity:
            Number(item.quantity) || 1,

          total:
            (Number(item.price) || 0) *
            (Number(item.quantity) || 1),
        })
      );

      // ================= CUSTOMER =================

      const customer = {
        fullName:
          shippingData.fullName ||
          "",

        email:
          shippingData.email ||
          "",

        contactNumber:
          shippingData.phone ||
          shippingData.contactNumber ||
          "",
      };

      // ================= SHIPPING ADDRESS =================

      const shippingAddress = {
        fullName:
          shippingData.fullName ||
          "",

        contactNumber:
          shippingData.phone ||
          shippingData.contactNumber ||
          "",

        address:
          addressLine,

        city,

        state,

        pincode,
      };

      // ================= ORDER DATA =================

      const orderData = {
        customer,

        items,

        shippingAddress,

        pricing: {
          subtotal,

          discount,

          gst,

          shipping,

          total,

          couponCode:
            appliedCoupon?.code ||
            "",

          couponDiscount:
            Number(
              appliedCoupon?.discount ||
                appliedCoupon?.discountValue ||
                0
            ),
        },

        deliveryMethod,

        paymentMethod,
      };

      console.log(
        "ORDER DATA:",
        orderData
      );

      // ================= CREATE ORDER =================

      const orderResponse =
        await createOrder(
          orderData
        );

      const createdOrder =
        orderResponse?.data?.data ||
        orderResponse?.data ||
        orderResponse;

      if (!createdOrder?._id) {
        throw new Error(
          "Order was not created correctly."
        );
      }

      console.log(
        "ORDER CREATED:",
        createdOrder
      );

      // ================= ONLINE PAYMENT =================

      if (
        paymentMethod === "Online"
      ) {
        /*
          MongoDB order is created first.

          Razorpay opens next.

          Success dialog will ONLY open after
          successful Razorpay verification.
        */

        await handleOnlinePayment(
          createdOrder
        );

        return;
      }

      // ================= COD =================

      /*
        COD doesn't require Razorpay.

        Therefore directly show success.
      */

      await showSuccessDialog(
        createdOrder
      );
    } catch (error) {
      console.error(
        "ORDER FAILED:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to place order. Please try again.";

      alert(message);
    } finally {
      setPlacingOrder(false);
    }
  };

  // ================= RETURN UI =================

  return (
    <Box
      sx={{
        width: "520px",
        maxWidth: "100%",
      }}
    >
      {/* ================= HEADING ================= */}

      <Typography
        sx={{
          fontSize: 32,
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 1,
        }}
      >
        Review Order
      </Typography>

      <Typography
        sx={{
          color: "#777",
          mb: 5,
          fontSize: 14,
        }}
      >
        Please review your order details before
        placing your order.
      </Typography>

      {/* ================= SHIPPING ADDRESS ================= */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "16px",
          border:
            "1px solid #E8E2D9",
          backgroundColor: "#FFFFFF",
        }}
      >
        <SectionTitle
          icon={
            <LocationOnOutlinedIcon
              sx={{ fontSize: 21 }}
            />
          }
        >
          Shipping Address
        </SectionTitle>

        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 600,
            color: "#292D2B",
            mb: 0.6,
          }}
        >
          {shippingData.fullName ||
            "-"}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: "#666",
            mb: 0.4,
          }}
        >
          {shippingData.email ||
            "-"}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: "#666",
            mb:
              addressParts.length
                ? 1.5
                : 0,
          }}
        >
          {shippingData.phone ||
            "-"}
        </Typography>

        {addressParts.length >
          0 && (
          <Box
            sx={{
              pt: 1.5,
              borderTop:
                "1px solid #EEE9E2",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: 1.7,
                color: "#555",
              }}
            >
              {addressLine}
            </Typography>

            {(city ||
              state ||
              pincode) && (
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "#555",
                }}
              >
                {[city, state]
                  .filter(Boolean)
                  .join(", ")}

                {pincode
                  ? ` - ${pincode}`
                  : ""}
              </Typography>
            )}
          </Box>
        )}
      </Paper>

      {/* ================= DELIVERY METHOD ================= */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "16px",
          border:
            "1px solid #E8E2D9",
        }}
      >
        <SectionTitle
          icon={
            <LocalShippingOutlinedIcon
              sx={{ fontSize: 21 }}
            />
          }
        >
          Delivery Method
        </SectionTitle>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            px: 1.5,
            py: 1.5,
            borderRadius: "10px",
            backgroundColor:
              "#F8F6F2",
          }}
        >
          <Typography>
            Delivery
          </Typography>

          <Typography
            sx={{
              fontWeight: 600,
              textTransform:
                "capitalize",
            }}
          >
            {deliveryMethod}
          </Typography>
        </Box>
      </Paper>

      {/* ================= PAYMENT METHOD ================= */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "16px",
          border:
            "1px solid #E8E2D9",
        }}
      >
        <SectionTitle
          icon={
            <CreditCardOutlinedIcon
              sx={{ fontSize: 21 }}
            />
          }
        >
          Payment Method
        </SectionTitle>

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            px: 1.5,
            py: 1.5,
            borderRadius: "10px",
            backgroundColor:
              "#F8F6F2",
          }}
        >
          <Typography>
            Payment
          </Typography>

          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            {paymentMethod ===
            "COD"
              ? "Cash on Delivery"
              : "Online Payment"}
          </Typography>
        </Box>
      </Paper>

      {/* ================= PAYMENT ERROR ================= */}

      {paymentError && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: "10px",
            border:
              "1px solid #F3C6C6",
            backgroundColor:
              "#FFF5F5",
          }}
        >
          <Typography
            sx={{
              color: "#C62828",
              fontSize: 14,
            }}
          >
            {paymentError}
          </Typography>
        </Paper>
      )}

      {/* ================= ORDER ITEMS ================= */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "16px",
          border:
            "1px solid #E8E2D9",
        }}
      >
        <SectionTitle
          icon={
            <ShoppingBagOutlinedIcon
              sx={{ fontSize: 21 }}
            />
          }
        >
          Order Items
        </SectionTitle>

        {cartItems.map(
          (item, index) => (
            <Box
              key={`${
                item.productId ||
                item._id
              }-${
                item.variantId ||
                index
              }`}
              sx={{
                display: "flex",
                alignItems:
                  "center",
                gap: 2,
                mb:
                  index ===
                  cartItems.length - 1
                    ? 0
                    : 2.5,
              }}
            >
              <Avatar
                src={item.image}
                variant="rounded"
                sx={{
                  width: 68,
                  height: 68,
                  borderRadius:
                    "10px",
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
                  }}
                >
                  {item.name ||
                    item.productName}
                </Typography>

                <Typography
                  sx={{
                    color: "#888",
                    fontSize: 12,
                  }}
                >
                  Quantity:{" "}
                  {item.quantity}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontWeight: 600,
                  whiteSpace:
                    "nowrap",
                }}
              >
                ₹
                {formatPrice(
                  Number(
                    item.price || 0
                  ) *
                    Number(
                      item.quantity ||
                        1
                    )
                )}
              </Typography>
            </Box>
          )
        )}
      </Paper>

      {/* ================= BUTTONS ================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={backStep}
          disabled={placingOrder}
        >
          ← Back
        </Button>

        <Button
          variant="contained"
          onClick={
            handlePlaceOrder
          }
          disabled={
            placingOrder ||
            cartItems.length === 0
          }
          sx={{
            background:
              "#1E2F2B",

            "&:hover": {
              background:
                "#16251F",
            },
          }}
        >
          {placingOrder
            ? paymentMethod ===
              "Online"
              ? "Processing Payment..."
              : "Placing Order..."
            : "Place Order"}
        </Button>
      </Box>

      {/* ====================================================== */}
      {/* ================= SUCCESS DIALOG ===================== */}
      {/* ====================================================== */}

      <Dialog
        open={openSuccessDialog}
        maxWidth="sm"
        fullWidth
        onClose={() => {
          setOpenSuccessDialog(
            false
          );
        }}
      >
        <DialogContent
          sx={{
            p: 5,
            textAlign: "center",
          }}
        >
          <CheckCircleRoundedIcon
            sx={{
              fontSize: 60,
              color: "#2E7D32",
            }}
          />

          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 700,
              mt: 2,
            }}
          >
            Order Placed Successfully
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#666",
            }}
          >
            Thank you for choosing
            GlowCare.
          </Typography>

          <Divider
            sx={{
              my: 4,
            }}
          />

          <Typography>
            ORDER NUMBER
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            {placedOrder?.orderNumber ||
              "-"}
          </Typography>

          <Typography>
            {paymentMethod ===
            "Online"
              ? "Total Paid"
              : "Order Total"}
          </Typography>

          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1E2F2B",
              mb: 4,
            }}
          >
            ₹
            {formatPrice(
              paymentMethod ===
                "Online"
                ? placedOrder?.paidAmount ??
                    placedOrder?.pricing
                      ?.total ??
                    placedOrder?.total ??
                    total
                : placedOrder?.pricing
                    ?.total ??
                    placedOrder?.total ??
                    total
            )}
          </Typography>

          {/* ================= CONTINUE SHOPPING ================= */}

          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              setOpenSuccessDialog(
                false
              );

              navigate("/");
            }}
            sx={{
              background:
                "#1E2F2B",
              mb: 2,

              "&:hover": {
                background:
                  "#16251F",
              },
            }}
          >
            Continue Shopping
          </Button>

          {/* ================= VIEW ORDERS ================= */}

          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              setOpenSuccessDialog(
                false
              );

              navigate(
                "/user/orders"
              );
            }}
          >
            View My Orders
          </Button>
        </DialogContent>
      </Dialog>

      {/* ====================================================== */}
      {/* ================ PAYMENT FAILED DIALOG =============== */}
      {/* ====================================================== */}

      <Dialog
        open={
          openPaymentFailedDialog
        }
        maxWidth="sm"
        fullWidth
        onClose={() => {
          setOpenPaymentFailedDialog(
            false
          );
        }}
      >
        <DialogContent
          sx={{
            p: 5,
            textAlign: "center",
          }}
        >
          {/* ================= ERROR ICON ================= */}

          <CancelRoundedIcon
            sx={{
              fontSize: 64,
              color: "#D32F2F",
            }}
          />

          {/* ================= TITLE ================= */}

          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 700,
              mt: 2,
              color: "#1E2F2B",
            }}
          >
            Payment Failed
          </Typography>

          {/* ================= MESSAGE ================= */}

          <Typography
            sx={{
              mt: 2,
              color: "#666",
              lineHeight: 1.7,
            }}
          >
            {paymentFailureMessage ||
              "Your payment could not be completed."}
          </Typography>

          <Divider
            sx={{
              my: 4,
            }}
          />

          {/* ================= NO PAYMENT MESSAGE ================= */}

          <Typography
            sx={{
              fontSize: 14,
              color: "#777",
              mb: 3,
            }}
          >
            Don't worry — your payment has
            not been completed.
          </Typography>

          {/* ================= TRY AGAIN ================= */}

          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              setOpenPaymentFailedDialog(
                false
              );

              setPaymentError("");
            }}
            sx={{
              background:
                "#1E2F2B",
              mb: 2,

              "&:hover": {
                background:
                  "#16251F",
              },
            }}
          >
            Try Again
          </Button>

          {/* ================= CONTINUE SHOPPING ================= */}

          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              setOpenPaymentFailedDialog(
                false
              );

              navigate("/");
            }}
          >
            Continue Shopping
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ReviewOrder;