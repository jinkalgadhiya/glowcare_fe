import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

const PaymentMethod = ({
  checkoutData,
  setCheckoutData,
  nextStep,
  backStep,
}) => {
  const selectedPayment = checkoutData?.payment || "COD";

  const handleChange = (event) => {
    setCheckoutData((prev) => ({
      ...prev,
      payment: event.target.value,
    }));
  };

  const handleContinue = () => {
    if (!checkoutData?.payment) {
      setCheckoutData((prev) => ({
        ...prev,
        payment: "COD",
      }));
    }

    nextStep();
  };

  const getCardStyles = (paymentType) => ({
    p: 3,
    mb: 3,
    borderRadius: 3,
    cursor: "pointer",
    border:
      selectedPayment === paymentType
        ? "2px solid #1E2F2B"
        : "1px solid #E5E5E5",
    background:
      selectedPayment === paymentType
        ? "#F6FBF8"
        : "#fff",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#1E2F2B",
      background: "#F6FBF8",
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 530,
      }}
    >
      <Typography
        sx={{
          fontSize: 32,
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 1,
        }}
      >
        Payment Method
      </Typography>

      <Typography
        sx={{
          color: "#777",
          mb: 5,
        }}
      >
        Choose your preferred payment method.
      </Typography>

      <RadioGroup
        name="payment-method"
        value={selectedPayment}
        onChange={handleChange}
      >
        {/* Cash on Delivery */}

        <Paper
          elevation={0}
          sx={getCardStyles("COD")}
          onClick={() =>
            setCheckoutData((prev) => ({
              ...prev,
              payment: "COD",
            }))
          }
        >
          <FormControlLabel
            value="COD"
            control={<Radio />}
            label={
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#1E2F2B",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PaymentsOutlinedIcon sx={{ mr: 1 }} />
                  Cash on Delivery
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    mt: 1,
                  }}
                >
                  Pay when your order is delivered.
                </Typography>
              </Box>
            }
          />
        </Paper>

        {/* Online Payment */}

        <Paper
          elevation={0}
          sx={{
            ...getCardStyles("Online"),
            mb: 0,
          }}
          onClick={() =>
            setCheckoutData((prev) => ({
              ...prev,
              payment: "Online",
            }))
          }
        >
          <FormControlLabel
            value="Online"
            control={<Radio />}
            label={
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#1E2F2B",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CreditCardOutlinedIcon sx={{ mr: 1 }} />
                  Online Payment
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    mt: 1,
                  }}
                >
                  Pay securely using Credit Card, Debit Card,
                  UPI, or Net Banking.
                </Typography>
              </Box>
            }
          />
        </Paper>
      </RadioGroup>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          mt: 5,
        }}
      >
        <Button
          variant="outlined"
          onClick={backStep}
          sx={{
            px: 5,
            height: 52,
            borderRadius: 2,
            textTransform: "none",
            borderColor: "#1E2F2B",
            color: "#1E2F2B",
            "&:hover": {
              borderColor: "#16251F",
              background: "#F6FBF8",
            },
          }}
        >
          ← Back
        </Button>

        <Button
          variant="contained"
          onClick={handleContinue}
          sx={{
            px: 5,
            height: 52,
            background: "#1E2F2B",
            borderRadius: 2,
            textTransform: "none",
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
    </Box>
  );
};

export default PaymentMethod;