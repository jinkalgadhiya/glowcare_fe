import React, { useEffect, useMemo, useState } from "react";
import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ShopHero from "../../components/shop/ShopHero";
import ShopFilters from "../../components/shop/ShopFilters";
import ShopToolbar from "../../components/shop/ShopToolbar";
import ProductGrid from "../../components/shop/ProductGrid";
import EmptyProducts from "../../components/shop/EmptyProducts";
import ShopPromoBanner from "../../components/shop/ShopPromoBanner";
import ShopBenefits from "../../components/shop/ShopBenefits";
import ShopPagination from "../../components/shop/ShopPagination";

import { getProducts } from "../../database/productService";
import shopBannerData from "../../data/shopBannerData";

const PRODUCTS_PER_PAGE = 8;

const ShopPage = () => {
  const { category } = useParams();

  /* ---------------- Products ---------------- */

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- Filters ---------------- */

  const [brand, setBrand] = useState("");
  const [skinType, setSkinType] = useState("");
  const [concern, setConcern] = useState("");
  const [price, setPrice] = useState("");

  /* ---------------- Sorting ---------------- */

  const [sortBy, setSortBy] = useState("latest");

  /* ---------------- View ---------------- */

  const [view, setView] = useState("grid");

  /* ---------------- Pagination ---------------- */

  const [page, setPage] = useState(1);

  /* ---------------- Load Products ---------------- */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts();

        setProducts(data || []);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* ---------------- Reset Page ---------------- */

  useEffect(() => {
    setPage(1);
  }, [category, brand, skinType, concern, price, sortBy]);

  /* ---------------- Clear Filters ---------------- */

  const clearFilters = () => {
    setBrand("");
    setSkinType("");
    setConcern("");
    setPrice("");
    setSortBy("latest");
    setPage(1);
  };

  /* ---------------- Banner Data ---------------- */

  const bannerData = shopBannerData[category] || {
    title: "Shop",
    subtitle: "Discover premium skincare designed for healthy glowing skin.",
    image: "",
  };

  /* ---------------- Category Filter ---------------- */

  const categoryProducts = useMemo(() => {
    if (!category) return products;

    return products.filter((product) => {
      const slug = product.category
        ?.toLowerCase()
        .replace(/&/g, "")
        .replace(/\s+/g, "-");

      return slug === category;
    });
  }, [products, category]);

  /* ---------------- Apply Filters ---------------- */

  const filteredProducts = useMemo(() => {
    let data = [...categoryProducts];

    // Brand
    if (brand) {
      data = data.filter((product) => product.brand === brand);
    }

    // Skin Type
    if (skinType) {
      data = data.filter((product) => product.skinTypes?.includes(skinType));
    }

    // Concern
    if (concern) {
      data = data.filter((product) => product.concerns?.includes(concern));
    }

    // Price
    if (price) {
      data = data.filter((product) => {
        const currentPrice =
          product.variants?.[0]?.discountPrice ||
          product.variants?.[0]?.price ||
          0;

        switch (price) {
          case "0-500":
            return currentPrice <= 500;

          case "500-1000":
            return currentPrice > 500 && currentPrice <= 1000;

          case "1000-2000":
            return currentPrice > 1000 && currentPrice <= 2000;

          case "2000+":
            return currentPrice > 2000;

          default:
            return true;
        }
      });
    }

    return data;
  }, [categoryProducts, brand, skinType, concern, price]);

  /* ---------------- Sorting ---------------- */

  const sortedProducts = useMemo(() => {
    const data = [...filteredProducts];

    switch (sortBy) {
      case "priceLow":
        data.sort((a, b) => {
          const priceA =
            a.variants?.[0]?.discountPrice || a.variants?.[0]?.price || 0;

          const priceB =
            b.variants?.[0]?.discountPrice || b.variants?.[0]?.price || 0;

          return priceA - priceB;
        });

        break;

      case "priceHigh":
        data.sort((a, b) => {
          const priceA =
            a.variants?.[0]?.discountPrice || a.variants?.[0]?.price || 0;

          const priceB =
            b.variants?.[0]?.discountPrice || b.variants?.[0]?.price || 0;

          return priceB - priceA;
        });

        break;

      case "nameAZ":
        data.sort((a, b) => a.name.localeCompare(b.name));

        break;

      case "rating":
        data.sort((a, b) => (b.rating || 0) - (a.rating || 0));

        break;

      case "latest":
      default:
        data.reverse();
    }

    return data;
  }, [filteredProducts, sortBy]);

  /* ---------------- Pagination ---------------- */

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PRODUCTS_PER_PAGE;

    return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [sortedProducts, page]);

  /* ---------------- Dynamic Filter Options ---------------- */

  const brands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand))].filter(Boolean).sort();
  }, [products]);

  const skinTypes = useMemo(() => {
    return [...new Set(products.flatMap((p) => p.skinTypes || []))].sort();
  }, [products]);

  const concerns = useMemo(() => {
    return [...new Set(products.flatMap((p) => p.concerns || []))].sort();
  }, [products]);

  if (loading) {
    return (
      <>
        <Navbar />

        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Loading Products...
        </Box>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <ShopHero
        title={bannerData.title}
        subtitle={bannerData.subtitle}
        bannerImage={bannerData.image}
        category={bannerData.title}
      />

      <ShopFilters
        brand={brand}
        setBrand={setBrand}
        brands={brands}
        skinType={skinType}
        setSkinType={setSkinType}
        skinTypes={skinTypes}
        concern={concern}
        setConcern={setConcern}
        concerns={concerns}
        price={price}
        setPrice={setPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
        clearFilters={clearFilters}
      />

      <Container
        maxWidth="xl"
        sx={{
          pt: 2,
          pb: 6,
        }}
      >
        <ShopToolbar
          totalProducts={sortedProducts.length}
          view={view}
          setView={setView}
        />

        {sortedProducts.length === 0 ? (
          <EmptyProducts clearFilters={clearFilters} />
        ) : (
          <>
            <ProductGrid products={paginatedProducts} view={view} />

            {totalPages > 1 && (
              <ShopPagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            )}
          </>
        )}
      </Container>

      <ShopPromoBanner
        title="Everyday Glow Essentials"
        description="Discover dermatologist-tested skincare powered by clean ingredients and designed to give your skin a healthy, natural glow every single day."
        image={bannerData.promoImage}
        buttonText="Explore Collection"
        buttonLink="/shop/face-wash"
      />

      <ShopBenefits />

      <Footer />
    </>
  );
};

export default ShopPage;
