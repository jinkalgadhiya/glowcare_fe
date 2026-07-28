import { Box, Container, Typography, Paper, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getProducts } from "../database/productService";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartPageItem from "../components/cart/CartPageItem";
import OrderSummary from "../components/cart/OrderSummary";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";



const Cart = () => {
  const [products, setProducts] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);
  return (
  <>
    <Navbar />

    <Box
      sx={{
        bgcolor: "#F8F6F2",
        minHeight: "100vh",
        pt: 12,
        pb: 8,
      }}
    >
      <Container maxWidth="xl">
        {/* Hero Section */}

        <Box
          sx={{
            textAlign: "center",
            mb: 7,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 40,
                md: 58,
              },
              fontWeight: 500,
              color: "#1E2F2B",
            }}
          >
            My Cart
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#777",
              maxWidth: 650,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Review your GlowCare skincare essentials before checkout. Manage
            quantities, remove items, and complete your purchase whenever you're
            ready.
          </Typography>
        </Box>

        {cartItems.length === 0 ? (
          <Paper
  elevation={0}
  sx={{
    p: {
      xs: 5,
      md: 10,
    },
    borderRadius: 5,
    textAlign: "center",
    bgcolor: "#fff",
  }}
>
  <ShoppingBagOutlinedIcon
    sx={{
      fontSize: 80,
      color: "#B89478",
      mb: 3,
    }}
  />

  <Typography
    sx={{
      fontSize: {
        xs: 34,
        md: 42,
      },
      fontWeight: 700,
      color: "#1E2F2B",
      mb: 2,
    }}
  >
    Your Cart is Empty
  </Typography>

  <Typography
    sx={{
      maxWidth: 520,
      mx: "auto",
      color: "#666",
      fontSize: 18,
      lineHeight: 1.8,
      mb: 5,
    }}
  >
    Looks like you haven't added any GlowCare products yet. Explore our
    premium skincare collection and discover your next favorite skincare
    essential.
  </Typography>

  <Button
    component={Link}
    to="/"
    variant="contained"
    sx={{
      px: 5,
      py: 1.8,
      borderRadius: "40px",
      textTransform: "none",
      fontWeight: 600,
      fontSize: 16,

      bgcolor: "#1E2F2B",

      "&:hover": {
        bgcolor: "#16251F",
      },
    }}
  >
    Continue Shopping
  </Button>
</Paper>
        ) : (
          <>
            {/* Cart Header */}

            {/* Cart Summary */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 6,
                borderRadius: 3,
                backgroundColor: "#F8F6F2",

                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 3,
              }}
            >
              {/* Left Side */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    borderRadius: "50%",
                    bgcolor: "#F7EFE8",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ShoppingBagOutlinedIcon
                    sx={{
                      color: "#B89478",
                      fontSize: 28,
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#777",
                    }}
                  >
                    Shopping Bag
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#1E2F2B",
                    }}
                  >
                    {cartItems.length}
                  </Typography>
                </Box>
              </Box>

              {/* Right Side */}

              <Button
                component={Link}
                to="/"
                variant="outlined"
                endIcon={<span style={{ fontSize: 18 }}>→</span>}
                sx={{
                  px: 4,
                  py: 1.5,

                  borderRadius: "40px",

                  textTransform: "none",

                  fontWeight: 600,
                  fontSize: 15,

                  color: "#1E2F2B",
                  borderColor: "#1E2F2B",

                  "&:hover": {
                    bgcolor: "#1E2F2B",
                    color: "#fff",
                    borderColor: "#1E2F2B",
                  },
                }}
              >
                Continue Shopping
              </Button>
            </Paper>

            {/* Product Cards */}

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                justifyContent: {
                  xs: "center",
                  lg: "flex-start",
                },
                mb: 8,
              }}
            >
              {cartItems.map((item) => {
                const fullProduct = products.find(
                  (product) => product.id === item.productId,
                );

                if (!fullProduct) return null;

                const variant = fullProduct.variants.find(
                  (v) => v.id === item.variantId,
                );

                return (
                  <CartPageItem
                    key={`${item.productId}-${item.variantId}`}
                    item={item}
                    product={{
                      ...fullProduct,
                      variants: [
                        {
                          ...variant,
                          discountPrice: item.price,
                        },
                      ],
                    }}
                  />
                );
              })}
            </Box>

            {/* Order Summary */}

            <Paper
              elevation={0}
              sx={{
                p: 5,
                borderRadius: 5,
                bgcolor: "#fff",
              }}
            >
              <OrderSummary subtotal={subtotal} />
            </Paper>
          </>
        )}
      </Container>
    </Box>
    </>
  );
};

export default Cart;
