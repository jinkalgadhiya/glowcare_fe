import { Box, Container, Grid, Paper } from "@mui/material";
import { useState } from "react";
import Navbar from "../components/Navbar";
import CheckoutStepper from "../components/checkout/CheckoutStepper";
import ShippingForm from "../components/checkout/ShippingForm";
import DeliveryMethod from "../components/checkout/DeliveryMethod";
import PaymentMethod from "../components/checkout/PaymentMethod";
import ReviewOrder from "../components/checkout/ReviewOrder";
import OrderSummary from "../components/checkout/OrderSummary";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [checkoutData, setCheckoutData] = useState({
    shipping: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },

    delivery: "standard",

    payment: "cod",
  });

  const nextStep = () => {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const backStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <ShippingForm
            checkoutData={checkoutData}
            setCheckoutData={setCheckoutData}
            nextStep={nextStep}
          />
        );

      case 1:
        return (
          <DeliveryMethod
            checkoutData={checkoutData}
            setCheckoutData={setCheckoutData}
            nextStep={nextStep}
            backStep={backStep}
          />
        );

      case 2:
        return (
          <PaymentMethod
            checkoutData={checkoutData}
            setCheckoutData={setCheckoutData}
            nextStep={nextStep}
            backStep={backStep}
          />
        );

      case 3:
        return <ReviewOrder checkoutData={checkoutData} backStep={backStep} />;

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          background: "#FCFAF7",
          minHeight: "100vh",
          py: 8,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            mx: "auto",
          }}
        >
          <CheckoutStepper activeStep={activeStep} />

          <Grid container spacing={5} sx={{ mt: 2 }}>
            <Grid item xs={12} md={7} lg={7}>
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  border: "1px solid #ECE6DE",
                  background: "#fff",
                }}
              >
                {renderStep()}
              </Paper>
            </Grid>

            <Grid item xs={12} md={5} lg={5}>
              <OrderSummary />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Checkout;
