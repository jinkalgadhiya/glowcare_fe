import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  MenuItem,
  Stack,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";

import {
  createCategory,
  updateCategory,
  getCategoryById,
  getCategories,
} from "../../database/categoryService";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate, useParams } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useThemeContext } from "../context/ThemeContext";

// Common TextField
import CustomTextField from "../../components/common/CustomTextField";

const AddCategory = () => {
  const { darkMode } = useThemeContext();

  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [menuType, setMenuType] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("Active");
  const [categoryType, setCategoryType] = useState("main");
  const [description, setDescription] = useState("");

  const [allCategories, setAllCategories] = useState([]);

  // ======================================================
  // DARK / LIGHT THEME STYLE
  // ======================================================

  const textFieldStyle = {
    "& .MuiInputLabel-root": {
      color: darkMode ? "#BDBDBD" : "#666",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#B89478",
    },

    "& .MuiOutlinedInput-root": {
      color: darkMode ? "#fff" : "#222",

      "& fieldset": {
        borderColor: darkMode ? "#555" : "#ccc",
      },

      "&:hover fieldset": {
        borderColor: "#B89478",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#B89478",
      },
    },

    "& .MuiSvgIcon-root": {
      color: darkMode ? "#fff" : "#222",
    },
  };

  // ======================================================
  // LOAD DATA
  // ======================================================

  useEffect(() => {
    const loadData = async () => {
      const categories = await getCategories();

      setAllCategories(categories);

      if (!isEdit) return;

      const category = await getCategoryById(id);

      if (category) {
        setMenuType(category.menuType || "");
        setCategoryType(category.categoryType || "main");
        setMainCategory(category.mainCategory || "");
        setSubCategory(category.subCategory || "");
        setDescription(category.description || "");
        setBannerImage(category.bannerImage || "");
        setStatus(category.status || "Active");
      }
    };

    loadData();
  }, [id, isEdit]);

  // ======================================================
  // SAVE CATEGORY
  // ======================================================

  const handleSaveCategory = async () => {
    const newErrors = {};

    if (!menuType) {
      newErrors.menuType = "Please select menu type";
    }

    if (categoryType === "main") {
      if (!mainCategory.trim()) {
        newErrors.mainCategory = "Category name is required";
      }
    }

    if (categoryType === "sub") {
      if (!mainCategory) {
        newErrors.mainCategory = "Please select main category";
      }

      if (!subCategory.trim()) {
        newErrors.subCategory = "Sub category is required";
      }

      if (!description.trim()) {
        newErrors.description = "Description is required";
      }

      if (!bannerImage.trim()) {
        newErrors.bannerImage = "Banner image URL is required";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload =
        categoryType === "main"
          ? {
              menuType,
              categoryType: "main",
              mainCategory: mainCategory.trim(),
              status,
            }
          : {
              menuType,
              categoryType: "sub",
              mainCategory,
              subCategory: subCategory.trim(),
              description: description.trim(),
              bannerImage: bannerImage.trim(),
              status,
            };

      if (isEdit) {
        await updateCategory(id, payload);
      } else {
        await createCategory(payload);
      }

      navigate("/admin/categories");
    } catch (err) {
      console.error("Error saving category:", err);

      alert(
        err.response?.data?.message ||
          "Failed to save category. Please try again.",
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Side */}
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
          {/* Breadcrumb */}
          <Breadcrumbs
            separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
            sx={{
              mb: 2,
            }}
          >
            <Link
              underline="hover"
              sx={{
                cursor: "pointer",
                color: darkMode ? "#AFAFAF" : "#777",
                fontSize: 14,

                "&:hover": {
                  color: "#B89478",
                },
              }}
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </Link>

            <Link
              underline="hover"
              sx={{
                cursor: "pointer",
                color: darkMode ? "#AFAFAF" : "#777",
                fontSize: 14,

                "&:hover": {
                  color: "#B89478",
                },
              }}
              onClick={() => navigate("/admin/categories")}
            >
              Categories
            </Link>

            <Typography
              sx={{
                color: darkMode ? "#fff" : "#222",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {isEdit ? "Edit Category" : "Create Category"}
            </Typography>
          </Breadcrumbs>

          {/* Heading */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: darkMode ? "#fff" : "#222",
              mb: 1,
            }}
          >
            {isEdit ? "Edit Category" : "Create Category"}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              mb: 4,
              fontSize: "14px",
              color: darkMode ? "#BDBDBD" : "#777",
            }}
          >
            {isEdit
              ? "Update your category details."
              : "Add a new product category to your GlowCare store."}
          </Typography>

          {/* Form Card */}
          <Paper
            elevation={2}
            sx={{
              borderRadius: 3,
              p: 4,
              backgroundColor: darkMode ? "#252525" : "#fff",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              {isEdit ? "Edit Category Details" : "Category Details"}
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Stack spacing={3}>
              {/* Menu Type */}
              <CustomTextField
                select
                label="Menu Type"
                value={menuType}
                onChange={(e) => {
                  setMenuType(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    menuType: "",
                    subCategory: "",
                  }));
                }}
                fullWidth
                error={Boolean(errors.menuType)}
                helperText={errors.menuType}
                sx={textFieldStyle}
              >
                <MenuItem value="skincare">Skincare</MenuItem>
                <MenuItem value="haircare">Haircare</MenuItem>
                <MenuItem value="more">More</MenuItem>
              </CustomTextField>

              {/* Category Type */}
              <CustomTextField
                select
                label="Category Type"
                value={categoryType}
                onChange={(e) => {
                  setCategoryType(e.target.value);

                  setMainCategory("");
                  setSubCategory("");
                  setDescription("");
                  setBannerImage("");

                  setErrors({});
                }}
                fullWidth
                sx={textFieldStyle}
              >
                <MenuItem value="main">Main Category</MenuItem>
                <MenuItem value="sub">Sub Category</MenuItem>
              </CustomTextField>

              {/* Main Category */}
              {categoryType === "main" ? (
                <CustomTextField
                  label="Category Name"
                  value={mainCategory}
                  onChange={(e) => setMainCategory(e.target.value)}
                  fullWidth
                  error={Boolean(errors.mainCategory)}
                  helperText={errors.mainCategory}
                  sx={textFieldStyle}
                />
              ) : (
                <CustomTextField
                  select
                  label="Main Category"
                  value={mainCategory}
                  onChange={(e) => setMainCategory(e.target.value)}
                  fullWidth
                  error={Boolean(errors.mainCategory)}
                  helperText={errors.mainCategory}
                  sx={textFieldStyle}
                >
                  {allCategories
                    .filter(
                      (item) =>
                        item.categoryType === "main" &&
                        item.menuType === menuType,
                    )
                    .map((item) => (
                      <MenuItem
                        key={item._id}
                        value={item.mainCategory}
                      >
                        {item.mainCategory}
                      </MenuItem>
                    ))}
                </CustomTextField>
              )}

              {/* Sub Category */}
              {categoryType === "sub" && (
                <CustomTextField
                  label="Sub Category"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  fullWidth
                  error={Boolean(errors.subCategory)}
                  helperText={errors.subCategory}
                  sx={textFieldStyle}
                />
              )}

              {/* Description */}
              {categoryType === "sub" && (
                <CustomTextField
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                  sx={textFieldStyle}
                />
              )}

              {/* Banner Image */}
              {categoryType === "sub" && (
                <>
                  <CustomTextField
                    label="Banner Image URL"
                    value={bannerImage}
                    onChange={(e) => {
                      setBannerImage(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        bannerImage: "",
                      }));
                    }}
                    placeholder="https://example.com/banner.jpg"
                    fullWidth
                    error={Boolean(errors.bannerImage)}
                    helperText={errors.bannerImage}
                    sx={textFieldStyle}
                  />

                  {bannerImage && (
                    <Box
                      component="img"
                      src={bannerImage}
                      alt="Banner Preview"
                      sx={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        borderRadius: 2,
                        border: "1px solid #ddd",
                      }}
                    />
                  )}
                </>
              )}

              {/* Status */}
              <CustomTextField
                select
                label="Status"
                fullWidth
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={textFieldStyle}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </CustomTextField>

              {/* Buttons */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/categories")}
                  sx={{
                    minWidth: 120,
                    height: 44,
                    textTransform: "none",
                    borderRadius: 2,
                    color: "#B89478",
                    borderColor: "#B89478",

                    "&:hover": {
                      backgroundColor: darkMode ? "#333" : "#f0f0f0",
                      borderColor: "#B89478",
                    },
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={handleSaveCategory}
                  sx={{
                    minWidth: 170,
                    height: 44,
                    backgroundColor: "#B89478",
                    textTransform: "none",
                    borderRadius: 2,
                    boxShadow: "none",

                    "&:hover": {
                      backgroundColor: "#A88366",
                      boxShadow: "none",
                    },
                  }}
                >
                  {isEdit ? "Update Category" : "Save Category"}
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AddCategory;