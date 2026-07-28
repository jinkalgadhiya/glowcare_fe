import React from "react";
import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";

const DeliveryMethod = ({
  checkoutData,
  setCheckoutData,
  nextStep,
  backStep,
}) => {
  const handleChange = (event) => {
    setCheckoutData((prev) => ({
      ...prev,
      delivery: event.target.value,
    }));
  };

  return (
    <Box sx={{width: 520,}}>
      {/* Heading */}

      <Typography
        sx={{
          fontSize: 32,
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 1,
        }}
      >
        Delivery Method
      </Typography>

      <Typography
        sx={{
          color: "#777",
          mb: 5,
        }}
      >
        Choose your preferred delivery option.
      </Typography>

      <RadioGroup
        value={checkoutData.delivery}
        onChange={handleChange}
      >
        {/* Standard Delivery */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border:
              checkoutData.delivery === "standard"
                ? "2px solid #1E2F2B"
                : "1px solid #E5E5E5",
            background:
              checkoutData.delivery === "standard"
                ? "#F6FBF8"
                : "#fff",
            cursor: "pointer",
          }}
        >
          <FormControlLabel
            value="standard"
            control={<Radio />}
            label={
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#1E2F2B",
                  }}
                >
                  <LocalShippingOutlinedIcon
                    sx={{
                      mr: 1,
                      verticalAlign: "middle",
                    }}
                  />
                  Standard Delivery
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    mt: 1,
                  }}
                >
                  Delivery in 3–5 Business Days
                </Typography>

                <Typography
                  sx={{
                    color: "#2E7D32",
                    fontWeight: 600,
                    mt: 1,
                  }}
                >
                  FREE
                </Typography>
              </Box>
            }
          />
        </Paper>

        {/* Express */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border:
              checkoutData.delivery === "express"
                ? "2px solid #1E2F2B"
                : "1px solid #E5E5E5",
            background:
              checkoutData.delivery === "express"
                ? "#F6FBF8"
                : "#fff",
            cursor: "pointer",
          }}
        >
          <FormControlLabel
            value="express"
            control={<Radio />}
            label={
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#1E2F2B",
                  }}
                >
                  <BoltOutlinedIcon
                    sx={{
                      mr: 1,
                      verticalAlign: "middle",
                    }}
                  />
                  Express Delivery
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    mt: 1,
                  }}
                >
                  Delivery in 1–2 Business Days
                </Typography>

                <Typography
                  sx={{
                    color: "#1E2F2B",
                    fontWeight: 600,
                    mt: 1,
                  }}
                >
                  ₹99
                </Typography>
              </Box>
            }
          />
        </Paper>
      </RadioGroup>

      {/* Buttons */}

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

export default DeliveryMethod;