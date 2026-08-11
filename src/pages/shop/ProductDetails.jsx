import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, CircularProgress, Container, Typography } from "@mui/material";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ProductBreadcrumb from "../../components/productDetails/ProductBreadcrumb";
import ProductGallery from "../../components/productDetails/ProductGallery";
import ProductInfo from "../../components/productDetails/ProductInfo";
import ProductTabs from "../../components/productDetails/ProductTabs";
import RelatedProducts from "../../components/productDetails/RelatedProducts";
import ProductGuarantees from "../../components/productDetails/ProductGuarantees";

import { getProductById } from "../../database/productService";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const data = await getProductById(id);

      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <Box
          sx={{
            height: "70vh",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <CircularProgress
            sx={{
              color: "#1E2F2B",
            }}
          />
        </Box>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <Box
          sx={{
            height: "70vh",

            display: "flex",

            flexDirection: "column",

            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 34,

              fontWeight: 700,

              color: "#1E2F2B",

              mb: 2,
            }}
          >
            Product Not Found
          </Typography>

          <Typography color="text.secondary">
            This product may have been removed.
          </Typography>
        </Box>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Container
        maxWidth="xl"
        sx={{
          mt: "70px", // push page below navbar
          pb: 8,
          py: 5,
        }}
      >
        <ProductBreadcrumb product={product} />

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              lg: "1.05fr .95fr",
            },

            gap: 6,

            mb: 10,
          }}
        >
          <ProductGallery product={product} />

          <ProductInfo product={product} />
        </Box>

        <ProductTabs product={product} />

        <RelatedProducts product={product} />

        <ProductGuarantees />
      </Container>

      <Footer />
    </>
  );
};

export default ProductDetails;
