import React, { useMemo, useState, useEffect } from "react";
import { Box, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import ProductHeader from "../components/ProductHeader";
import ProductTable from "../components/ProductTable";
import ProductFilter from "../components/ProductFilter";
import ViewProduct from "../components/ViewProduct";
import DeleteProduct from "../components/DeleteProduct";
import { getProducts } from "../../database/productService";
import { useThemeContext } from "../context/ThemeContext";

const Products = () => {
  const { darkMode } = useThemeContext();
  const navigate = useNavigate();

  /* ---------------- Products ---------------- */

  const [products, setProducts] = useState([]);

  useEffect(() => {
  const loadProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  loadProducts();
}, []);

  /* ---------------- Search ---------------- */

  const [searchTerm, setSearchTerm] = useState("");

  /* ---------------- Filter Drawer ---------------- */

  const [openFilter, setOpenFilter] = useState(false);

  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [badgeFilter, setBadgeFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  /* ---------------- View Drawer ---------------- */

  const [selectedProduct, setSelectedProduct] = useState(null);

  /* ---------------- Delete Dialog ---------------- */

  const [openDelete, setOpenDelete] = useState(false);

  /* ---------------- Reset Filters ---------------- */

  const handleReset = () => {
    setStatusFilter("All");
    setCategoryFilter("All");
    setBadgeFilter("All");
    setStockFilter("All");
    setSortBy("Newest");
  };

  /* ---------------- Search + Filter ---------------- */

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    /* Search */

    if (searchTerm.trim()) {
      filtered = filtered.filter((product) =>
        Object.values(product).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }

    /* Status */

    if (statusFilter !== "All") {
      filtered = filtered.filter((product) => product.status === statusFilter);
    }

    /* Category */

    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter,
      );
    }

    /* Badge */

    if (badgeFilter !== "All") {
      filtered = filtered.filter((product) => product.badge === badgeFilter);
    }

    /* Stock */

    if (stockFilter === "In Stock") {
      filtered = filtered.filter((product) => Number(product.stock) > 0);
    }

    if (stockFilter === "Out of Stock") {
      filtered = filtered.filter((product) => Number(product.stock) <= 0);
    }
    /* Sorting */

    switch (sortBy) {
      case "Newest":
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;

      case "Oldest":
        filtered.sort((a, b) => a.createdAt - b.createdAt);
        break;

      case "A-Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "Z-A":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "Price Low → High":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "Price High → Low":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
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
          backgroundColor: darkMode ? "#181818" : "#F7F5F2",
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
            products={filteredProducts}
            setSelectedProduct={setSelectedProduct}
            onDelete={(product) => {
              setSelectedProduct(product);
              setOpenDelete(true);
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
            backgroundColor: darkMode ? "#252525" : "#fff",
            boxShadow: "-5px 0 25px rgba(0,0,0,.18)",
          },
        }}
      >
        <ViewProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onEdit={() => {
            if (selectedProduct) {
              navigate(`/admin/products/edit/${selectedProduct.id}`);
            }
          }}
          onDelete={() => setOpenDelete(true)}
        />
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
