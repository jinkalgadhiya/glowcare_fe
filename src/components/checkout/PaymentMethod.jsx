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
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

const PaymentMethod = ({
  checkoutData,
  setCheckoutData,
  nextStep,
  backStep,
}) => {
  const handleChange = (event) => {
    setCheckoutData((prev) => ({
      ...prev,
      payment: event.target.value,
    }));
  };

  return (
    <Box sx={{width: 530,}}>
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
        value={checkoutData.payment}
        onChange={handleChange}
      >
        {/* Cash on Delivery */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            cursor: "pointer",
            border:
              checkoutData.payment === "cod"
                ? "2px solid #1E2F2B"
                : "1px solid #E5E5E5",
            background:
              checkoutData.payment === "cod"
                ? "#F6FBF8"
                : "#fff",
          }}
        >
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label={
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#1E2F2B",
                  }}
                >
                  <PaymentsOutlinedIcon
                    sx={{
                      mr: 1,
                      verticalAlign: "middle",
                    }}
                  />
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

        {/* Credit Card */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            cursor: "pointer",
            border:
              checkoutData.payment === "card"
                ? "2px solid #1E2F2B"
                : "1px solid #E5E5E5",
            background:
              checkoutData.payment === "card"
                ? "#F6FBF8"
                : "#fff",
          }}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label={
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#1E2F2B",
                  }}
                >
                  <CreditCardOutlinedIcon
                    sx={{
                      mr: 1,
                      verticalAlign: "middle",
                    }}
                  />
                  Credit / Debit Card
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    mt: 1,
                  }}
                >
                  Visa, Mastercard & RuPay cards.
                </Typography>
              </Box>
            }
          />
        </Paper>

        {/* UPI */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            cursor: "pointer",
            border:
              checkoutData.payment === "upi"
                ? "2px solid #1E2F2B"
                : "1px solid #E5E5E5",
            background:
              checkoutData.payment === "upi"
                ? "#F6FBF8"
                : "#fff",
          }}
        >
          <FormControlLabel
            value="upi"
            control={<Radio />}
            label={
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#1E2F2B",
                  }}
                >
                  <AccountBalanceWalletOutlinedIcon
                    sx={{
                      mr: 1,
                      verticalAlign: "middle",
                    }}
                  />
                  UPI
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    mt: 1,
                  }}
                >
                  Google Pay, PhonePe, Paytm & BHIM.
                </Typography>
              </Box>
            }
          />
        </Paper>

        {/* Net Banking */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            cursor: "pointer",
            border:
              checkoutData.payment === "netbanking"
                ? "2px solid #1E2F2B"
                : "1px solid #E5E5E5",
            background:
              checkoutData.payment === "netbanking"
                ? "#F6FBF8"
                : "#fff",
          }}
        >
          <FormControlLabel
            value="netbanking"
            control={<Radio />}
            label={
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#1E2F2B",
                  }}
                >
                  <AccountBalanceOutlinedIcon
                    sx={{
                      mr: 1,
                      verticalAlign: "middle",
                    }}
                  />
                  Net Banking
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    mt: 1,
                  }}
                >
                  All major Indian banks supported.
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
          }}
        >
          ← Back
        </Button>

        <Button
          variant="contained"
          onClick={nextStep}
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