import {
  Box,
  Typography,
} from "@mui/material";

const steps = [
  "Shipping",
  "Delivery",
  "Payment",
  "Review",
];

const CheckoutStepper = ({ activeStep }) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: 42,
          fontWeight: 500,
          color: "#1E2F2B",
          textAlign: "center",
          mb: 6,
          mt: 6,
        }}
      >
        Checkout
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 8,
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={step}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",

                background:
                  index <= activeStep
                    ? "#1E2F2B"
                    : "#ECE6DE",

                color:
                  index <= activeStep
                    ? "#fff"
                    : "#777",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                fontWeight: 600,
              }}
            >
              {index + 1}
            </Box>

            <Box
              sx={{
                ml: 2,
                mr: 4,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#1E2F2B",
                }}
              >
                {step}
              </Typography>
            </Box>

            {index !== steps.length - 1 && (
              <Box
                sx={{
                  width: 90,

                  height: 2,

                  background:
                    index < activeStep
                      ? "#1E2F2B"
                      : "#DDD",

                  mr: 4,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default CheckoutStepper;