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
import { Pagination } from "@mui/material";

const Categories = () => {
  const { darkMode } = useThemeContext();
  const navigate = useNavigate();

  /* Search */

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);

  const rowsPerPage = 20;

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
  const [menuFilter, setMenuFilter] = useState("All");
  const [mainCategoryFilter, setMainCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [categoryTypeFilter, setCategoryTypeFilter] = useState("All");
  const [descriptionFilter, setDescriptionFilter] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const categoryData = await getCategories();
      setCategories(categoryData);
    };

    loadData();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    statusFilter,
    menuFilter,
    mainCategoryFilter,
    subCategoryFilter,
    categoryTypeFilter,
    descriptionFilter,
    sortBy,
  ]);

  /* Combined Search + Filter */

  const filteredCategories = useMemo(() => {
    let filtered = [...categories];

    /* Search */

    if (searchTerm.trim()) {
      filtered = filtered.filter((category) =>
        `${category.menuType}
         ${category.categoryType}
         ${category.mainCategory}
         ${category.subCategory}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );
    }

    /* Status */

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (category) => category.status === statusFilter,
      );
    }

    if (menuFilter !== "All") {
      filtered = filtered.filter(
        (category) => category.menuType === menuFilter,
      );
    }

    if (categoryTypeFilter !== "All") {
      filtered = filtered.filter(
        (category) => category.categoryType === categoryTypeFilter,
      );
    }

    if (mainCategoryFilter.trim()) {
      filtered = filtered.filter((category) =>
        category.mainCategory
          ?.toLowerCase()
          .includes(mainCategoryFilter.toLowerCase()),
      );
    }

    if (subCategoryFilter.trim()) {
      filtered = filtered.filter((category) =>
        category.subCategory
          ?.toLowerCase()
          .includes(subCategoryFilter.toLowerCase()),
      );
    }

    if (descriptionFilter.trim()) {
      filtered = filtered.filter((category) =>
        category.description
          ?.toLowerCase()
          .includes(descriptionFilter.toLowerCase()),
      );
    }

    /* Sorting */

    switch (sortBy) {
      case "A-Z":
        filtered.sort((a, b) =>
          (a.subCategory || a.mainCategory || "").localeCompare(
            b.subCategory || b.mainCategory || "",
          ),
        );
        break;

      case "Z-A":
        filtered.sort((a, b) =>
          (b.subCategory || b.mainCategory || "").localeCompare(
            a.subCategory || a.mainCategory || "",
          ),
        );
        break;
      case "A-Z":
        filtered.sort((a, b) =>
          (a.subCategory || a.mainCategory || "").localeCompare(
            b.subCategory || b.mainCategory || "",
          ),
        );
        break;

      case "Z-A":
        filtered.sort((a, b) =>
          (b.subCategory || b.mainCategory || "").localeCompare(
            a.subCategory || a.mainCategory || "",
          ),
        );
        break;

      case "Newest":
        filtered.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );
        break;

      case "Oldest":
        filtered.sort(
          (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [
    categories,
    searchTerm,
    statusFilter,
    menuFilter,
    mainCategoryFilter,
    subCategoryFilter,
    categoryTypeFilter,
    descriptionFilter,
    sortBy,
  ]);

  const paginatedCategories = filteredCategories.slice(
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
            categories={paginatedCategories}
            setSelectedCategory={setSelectedCategory}
            onDelete={(category) => {
              setSelectedCategory(category);
              setOpenDelete(true);
            }}
          />
        </Box>
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
            count={Math.ceil(filteredCategories.length / rowsPerPage)}
            sx={{
              mb: 6,
              "& .MuiPaginationItem-root": {
                color: darkMode ? "#fff" : "#555",
              },

              "& .Mui-selected": {
                backgroundColor: "#B89478 !important",
                color: "#fff",
              },

              "& .Mui-selected:hover": {
                backgroundColor: "#A88366 !important",
              },
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
        menuFilter={menuFilter}
        setMenuFilter={setMenuFilter}
        mainCategoryFilter={mainCategoryFilter}
        setMainCategoryFilter={setMainCategoryFilter}
        subCategoryFilter={subCategoryFilter}
        setSubCategoryFilter={setSubCategoryFilter}
        categoryTypeFilter={categoryTypeFilter}
        setCategoryTypeFilter={setCategoryTypeFilter}
        descriptionFilter={descriptionFilter}
        setDescriptionFilter={setDescriptionFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={() => {
          setStatusFilter("All");
          setMenuFilter("All");
          setMainCategoryFilter("");
          setSubCategoryFilter("");
          setCategoryTypeFilter("All");
          setDescriptionFilter("");
          setSortBy("Newest");
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
