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
import { getCategories } from "../../database/categoryService";
import { getProducts } from "../../database/productService";

const PRODUCTS_PER_PAGE = 12;

const ShopPage = () => {
  const { category } = useParams();

  /* ---------------- Products ---------------- */

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- Filters ---------------- */

  const [brand, setBrand] = useState("");
  const [skinType, setSkinType] = useState("");
  const [concern, setConcern] = useState("");
  const [benefit, setBenefit] = useState("");
  const [price, setPrice] = useState("");

  /* ---------------- Sorting ---------------- */

  const [sortBy, setSortBy] = useState("latest");

  /* ---------------- View ---------------- */

  const [view, setView] = useState("grid");

  /* ---------------- Pagination ---------------- */

  const [page, setPage] = useState(1);

  /* ---------------- Load Products ---------------- */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const productsData = await getProducts();
        const categoriesData = await getCategories();

        setProducts(
          (productsData || []).filter((item) => item.status === "Active"),
        );

        setCategories(
          (categoriesData || []).filter(
            (item) => item.status === "Active" && item.categoryType === "sub",
          ),
        );
      } catch (error) {
        console.error("Error loading shop data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* ---------------- Reset Page ---------------- */

  useEffect(() => {
    setPage(1);
  }, [category, brand, skinType, concern, benefit, price, sortBy]);

  /* ---------------- Clear Filters ---------------- */

  const clearFilters = () => {
    setBrand("");
    setSkinType("");
    setConcern("");
    setBenefit("");
    setPrice("");

    setSortBy("latest");
    setPage(1);
  };

  /* ---------------- Banner Data ---------------- */

  const currentCategory = categories.find((cat) => {
    const slug = cat.subCategory
      ?.toLowerCase()
      .replace(/&/g, "")
      .replace(/\s+/g, "-");

    return slug === category;
  });

  const bannerData = {
    title:
      currentCategory?.subCategory || currentCategory?.mainCategory || "Shop",

    subtitle:
      currentCategory?.description ||
      "Discover premium skincare designed for healthy glowing skin.",

    image: currentCategory?.bannerImage || "",

    promoImage: currentCategory?.bannerImage || "",
  };

  /* ---------------- Category Filter ---------------- */

  const categoryProducts = useMemo(() => {
    if (!category) return products;

    return products.filter((product) => {
      const mainCategory = product.category?.mainCategory || "";
      const subCategory = product.category?.subCategory || "";

      const mainSlug = mainCategory
        .toLowerCase()
        .replace(/&/g, "")
        .replace(/\s+/g, "-");

      const subSlug = subCategory
        .toLowerCase()
        .replace(/&/g, "")
        .replace(/\s+/g, "-");

      return mainSlug === category || subSlug === category;
    });
  }, [products, category]);

  /* ---------------- Apply Filters ---------------- */

  const filteredProducts = useMemo(() => {
    let data = [...categoryProducts];

    // Brand
    if (brand) {
      data = data.filter((product) => product.brand === brand);
    }

    // Suitable For (Skin Type)
    if (skinType) {
      data = data.filter((product) => product.suitableFor?.includes(skinType));
    }

    // Skin Concern
    if (concern) {
      data = data.filter((product) => product.skinConcerns?.includes(concern));
    }

    // Key Benefit
    if (benefit) {
      data = data.filter((product) => product.keybenefits?.includes(benefit));
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
  }, [categoryProducts, brand, skinType, concern, benefit, price]);

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
        data.sort((a, b) =>
          (a.productName || "").localeCompare(b.productName || ""),
        );
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
    return [...new Set(products.map((p) => p.brand).filter(Boolean))].sort();
  }, [products]);

  const skinTypes = useMemo(() => {
    return [...new Set(products.flatMap((p) => p.suitableFor || []))].sort();
  }, [products]);

  const concerns = useMemo(() => {
    return [...new Set(products.flatMap((p) => p.skinConcerns || []))].sort();
  }, [products]);

  const benefits = useMemo(() => {
    return [...new Set(products.flatMap((p) => p.benefits || []))].sort();
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
        benefit={benefit}
        setBenefit={setBenefit}
        benefits={benefits}
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
        title={bannerData.title}
        description={bannerData.subtitle}
        image={bannerData.promoImage}
        buttonText="Explore Collection"
        buttonLink={`/shop/${category}`}
      />

      <ShopBenefits />

      <Footer />
    </>
  );
};

export default ShopPage;
