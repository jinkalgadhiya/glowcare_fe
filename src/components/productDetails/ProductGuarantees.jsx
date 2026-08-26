import {
  Box,
  Typography,
} from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

const guarantees = [
  {
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 42 }} />,
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders above ₹499.",
  },
  {
    icon: <AutorenewRoundedIcon sx={{ fontSize: 42 }} />,
    title: "Easy Returns",
    description: "7-day hassle-free returns on eligible products.",
  },
  {
    icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 42 }} />,
    title: "100% Authentic",
    description: "Every GlowCare product is genuine and quality checked.",
  },
  {
    icon: <CreditCardOutlinedIcon sx={{ fontSize: 42 }} />,
    title: "Secure Payments",
    description: "Safe and encrypted checkout with trusted payment gateways.",
  },
];

const ProductGuarantees = () => {
  return (
    <Box
      sx={{
        mt: 10,
        mb: 10,

        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2,1fr)",
          lg: "repeat(4,1fr)",
        },

        gap: 4,
      }}
    >
      {guarantees.map((item, index) => (
        <Box
          key={index}
          sx={{
            p: 4,

            textAlign: "center",

            bgcolor: "#FAF7F2",

            borderRadius: 4,

            border: "1px solid #ECE6DD",

            transition: ".35s",

            "&:hover": {
              transform: "translateY(-8px)",

              boxShadow:
                "0 20px 40px rgba(0,0,0,.08)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",

              color: "#B89478",

              mb: 2,
            }}
          >
            {item.icon}
          </Box>

          <Typography
            sx={{
              fontSize: 20,

              fontWeight: 700,

              color: "#1E2F2B",

              mb: 1,
            }}
          >
            {item.title}
          </Typography>

          <Typography
            sx={{
              color: "#777",

              lineHeight: 1.8,

              fontSize: 15,
            }}
          >
            {item.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProductGuarantees;