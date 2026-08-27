import React, { useMemo, useState, useEffect } from "react";
import { Box, Drawer, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import ProductHeader from "../components/product/ProductHeader";
import ProductTable from "../components/product/ProductTable";
import ProductFilter from "../components/product/ProductFilter";
import ViewProduct from "../components/product/ViewProduct";
import DeleteProduct from "../components/product/DeleteProduct";
import { getProducts } from "../../database/productService";
import { useThemeContext } from "../context/ThemeContext";

const Products = () => {
  const { darkMode } = useThemeContext();
  const navigate = useNavigate();

  /* ---------------- STATES ---------------- */

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  const [openFilter, setOpenFilter] = useState(false);

  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [badgeFilter, setBadgeFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const rowsPerPage = 20;

  /* ---------------- LOAD PRODUCTS ---------------- */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data || []);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  /* ---------------- RESET PAGE WHEN FILTER CHANGES ---------------- */

  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    statusFilter,
    categoryFilter,
    badgeFilter,
    stockFilter,
    sortBy,
  ]);

  /* ---------------- RESET FILTERS ---------------- */

  const handleReset = () => {
    setStatusFilter("All");
    setCategoryFilter("All");
    setBadgeFilter("All");
    setStockFilter("All");
    setSortBy("Newest");
  };

  /* ---------------- SEARCH + FILTER + SORT ---------------- */

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    /* ---------------- SEARCH ---------------- */

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      filtered = filtered.filter((product) => {
        const productName = product.productName || "";

        const categoryName =
          product.category?.mainCategory ||
          product.category?.subCategory ||
          "";

        const badge = product.badge || "";
        const status = product.status || "";

        return `
          ${productName}
          ${categoryName}
          ${badge}
          ${status}
        `
          .toLowerCase()
          .includes(search);
      });
    }

    /* ---------------- STATUS FILTER ---------------- */

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (product) => product.status === statusFilter,
      );
    }

    /* ---------------- CATEGORY FILTER ---------------- */

    if (categoryFilter !== "All") {
      filtered = filtered.filter((product) => {
        const categoryId =
          product.category?._id || product.category;

        return String(categoryId) === String(categoryFilter);
      });
    }

    /* ---------------- BADGE FILTER ---------------- */

    if (badgeFilter !== "All") {
      filtered = filtered.filter(
        (product) => product.badge === badgeFilter,
      );
    }

    /* ---------------- STOCK FILTER ---------------- */

    if (stockFilter === "In Stock") {
      filtered = filtered.filter((product) =>
        product.variants?.some(
          (variant) => Number(variant.stock) > 0,
        ),
      );
    }

    if (stockFilter === "Out of Stock") {
      filtered = filtered.filter((product) =>
        product.variants?.every(
          (variant) => Number(variant.stock) <= 0,
        ),
      );
    }

    /* ---------------- SORTING ---------------- */

    switch (sortBy) {
      case "Newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0),
        );
        break;

      case "Oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt || 0) -
            new Date(b.createdAt || 0),
        );
        break;

      case "A-Z":
        filtered.sort((a, b) =>
          (a.productName || "").localeCompare(
            b.productName || "",
          ),
        );
        break;

      case "Z-A":
        filtered.sort((a, b) =>
          (b.productName || "").localeCompare(
            a.productName || "",
          ),
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [
    products,
    searchTerm,
    statusFilter,
    categoryFilter,
    badgeFilter,
    stockFilter,
    sortBy,
  ]);

  /* ---------------- PAGINATION ---------------- */

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}

      <AdminSidebar />

      {/* Main Content */}

      <Box
        sx={{
          flex: 1,
          ml: "300px",
          backgroundColor: darkMode
            ? "#181818"
            : "#F7F5F2",
        }}
      >
        <AdminNavbar />

        <Box
          sx={{
            p: 4,
            pt: "90px",
          }}
        >
          <ProductHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onOpenFilter={() => setOpenFilter(true)}
          />

          <ProductTable
            products={paginatedProducts}
            setSelectedProduct={setSelectedProduct}
            onDelete={(product) => {
              setSelectedProduct(product);
              setOpenDelete(true);
            }}
          />
        </Box>

        {/* Pagination */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Pagination
            page={page}
            onChange={(e, value) => setPage(value)}
            count={Math.max(
              1,
              Math.ceil(
                filteredProducts.length / rowsPerPage,
              ),
            )}
            sx={{
              mb: 6,

              "& .MuiPaginationItem-root": {
                color: darkMode ? "#fff" : "#555",
              },

              "& .Mui-selected": {
                backgroundColor:
                  "#B89478 !important",
                color: "#fff",
              },

              "& .Mui-selected:hover": {
                backgroundColor:
                  "#A88366 !important",
              },
            }}
          />
        </Box>
      </Box>

      {/* Filter Drawer */}

      <ProductFilter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        badgeFilter={badgeFilter}
        setBadgeFilter={setBadgeFilter}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleReset}
      />

      {/* View Product Drawer */}

      <Drawer
        anchor="right"
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        PaperProps={{
          sx: {
            width: 380,
            backgroundColor: darkMode
              ? "#252525"
              : "#fff",
            boxShadow:
              "-5px 0 25px rgba(0,0,0,.18)",
          },
        }}
      >
        {selectedProduct && (
          <ViewProduct
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onEdit={() => {
              navigate(
                `/admin/products/edit/${selectedProduct._id}`,
              );
            }}
            onDelete={() => setOpenDelete(true)}
          />
        )}
      </Drawer>

      {/* Delete Dialog */}

      <DeleteProduct
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        product={selectedProduct}
        setProducts={setProducts}
      />
    </Box>
  );
};

export default Products;