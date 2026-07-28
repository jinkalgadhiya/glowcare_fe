import React, { useMemo, useState, useEffect } from "react";
import { Box, Drawer } from "@mui/material";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import CategoryHeader from "../components/CategoryHeader";
import CategoryTable from "../components/CategoryTable";
import CategoryFilter from "../components/CategoryFilter";
import ViewCategory from "../components/ViewCategory";
import DeleteCategory from "../components/DeleteCategory";
import { getCategories } from "../../database/categoryService";
import { getProducts } from "../../database/productService";
import { useThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { darkMode } = useThemeContext();
  const navigate = useNavigate();

  /* Search */

  const [searchTerm, setSearchTerm] = useState("");

  /* Categories */

  const [categories, setCategories] = useState([]);

  /* Drawers */

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  /* Filter Drawer */

  const [filterOpen, setFilterOpen] = useState(false);

  /* Filter States */

  const [statusFilter, setStatusFilter] = useState("All");

  const [sortBy, setSortBy] = useState("Newest");

  const [productFilter, setProductFilter] = useState("All");

  const [products, setProducts] = useState([]);

  useEffect(() => {
  const loadData = async () => {
    const categoryData = await getCategories();
    const productData = await getProducts();

    setCategories(categoryData);
    setProducts(productData);
  };

  loadData();
}, []);

  /* Combined Search + Filter */

  const filteredCategories = useMemo(() => {
    let filtered = [...categories];

    /* Search */

    if (searchTerm.trim()) {
      filtered = filtered.filter((category) =>
        Object.values(category).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }

    /* Status */

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (category) => category.status === statusFilter,
      );
    }

    /* Product Count */

    if (productFilter !== "All") {
      filtered = filtered.filter((category) => {
        const count = products.filter(
          (product) => product.category === category.name,
        ).length;

        if (productFilter === "Has Products") return count > 0;

        if (productFilter === "Empty Categories") return count === 0;

        return true;
      });
    }

    /* Sorting */

    switch (sortBy) {
      case "A-Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "Z-A":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "Newest":
  filtered.sort((a, b) => b.createdAt - a.createdAt);
  break;

case "Oldest":
  filtered.sort((a, b) => a.createdAt - b.createdAt);
  break;

      default:
        break;
    }

    return filtered;
  }, [categories, searchTerm, statusFilter, sortBy, productFilter, products]);
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
          <CategoryHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onOpenFilter={() => setFilterOpen(true)}
          />

          <CategoryTable
            categories={filteredCategories}
            setCategories={setCategories}
            setSelectedCategory={setSelectedCategory}
            onDelete={(category) => {
              setSelectedCategory(category);
              setOpenDelete(true);
            }}
          />
        </Box>
      </Box>

      {/* Filter Drawer */}

      <CategoryFilter
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        productFilter={productFilter}
        setProductFilter={setProductFilter}
        onReset={() => {
          setStatusFilter("All");
          setSortBy("Newest");
          setProductFilter("All");
        }}
      />

      {/* View Drawer */}

      <Drawer
        anchor="right"
        open={Boolean(selectedCategory)}
        onClose={() => setSelectedCategory(null)}
        PaperProps={{
          sx: {
            width: 380,
            boxShadow: "-5px 0 20px rgba(0,0,0,.15)",
            backgroundColor: darkMode ? "#252525" : "#fff",
          },
        }}
      >
        <ViewCategory
          category={selectedCategory}
          darkMode={darkMode}
          onClose={() => setSelectedCategory(null)}
          onEdit={() =>
            navigate(`/admin/categories/edit/${selectedCategory.id}`)
          }
          onDelete={() => setOpenDelete(true)}
        />
      </Drawer>

      {/* Delete Dialog */}

      <DeleteCategory
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        category={selectedCategory}
        setCategories={setCategories}
      />
    </Box>
  );
};

export default Categories;
