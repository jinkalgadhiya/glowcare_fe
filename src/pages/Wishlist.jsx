import React from "react";
import { Box, Container, Typography, Grid, Button, Paper } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const navigate = useNavigate();

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
          {/* Header */}

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
              My Wishlist
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
              Keep all your favourite GlowCare skincare essentials in one place.
              Discover them anytime and add them to your cart whenever you're
              ready.
            </Typography>
          </Box>

          {/* Summary */}

          {wishlistItems.length > 0 && (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 6,
                borderRadius: 3,
                //   border: "1px solid #ECE7E1",
                backgroundColor: "#FCFAF7",

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
                  <FavoriteRoundedIcon
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
                    Wishlist Items
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#1E2F2B",
                    }}
                  >
                    {wishlistItems.length}
                  </Typography>
                </Box>
              </Box>

              {/* Right Side */}

              <Button
                variant="outlined"
                endIcon={<span style={{ fontSize: 18 }}>→</span>}
                onClick={() => navigate("/")}
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
          )}

          {/* Empty Wishlist */}

          {wishlistItems.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                py: 12,
                px: 3,
                textAlign: "center",
                borderRadius: 5,
                backgroundColor: "#fff",
              }}
            >
              <FavoriteBorderRoundedIcon
                sx={{
                  fontSize: 90,
                  color: "#B89478",
                  mb: 3,
                }}
              />

              <Typography
                sx={{
                  fontSize: 34,
                  fontWeight: 600,
                  color: "#1E2F2B",
                  mb: 2,
                }}
              >
                Your Wishlist is Empty
              </Typography>

              <Typography
                sx={{
                  color: "#777",
                  maxWidth: 520,
                  mx: "auto",
                  mb: 5,
                  lineHeight: 1.8,
                }}
              >
                Explore our premium skincare collection and save your favourite
                products to access them quickly anytime.
              </Typography>

              <Button
                variant="contained"
                onClick={() => navigate("/")}
                sx={{
                  bgcolor: "#1E2F2B",
                  px: 5,
                  py: 1.7,
                  borderRadius: "40px",
                  textTransform: "none",

                  "&:hover": {
                    bgcolor: "#B89478",
                  },
                }}
              >
                Continue Shopping
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={4}>
              {wishlistItems.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard
                    product={product}
                    showBadge={false}
                    showDescription={false}
                    showRating={false}
                  />
                </Grid>
              ))}
              <Box
                sx={{
                  mt: 8,
                  display: "flex",
                  justifyContent: "center",
                }}
              ></Box>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Wishlist;
