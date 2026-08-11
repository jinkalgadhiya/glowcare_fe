import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";
import {
  addCategory,
  updateCategory,
  getCategoryById,
} from "../../database/categoryService";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../database/categoryService";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useThemeContext } from "../context/ThemeContext";

const AddCategory = () => {
  const { darkMode } = useThemeContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [menuType, setMenuType] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("Active");
  const [createdAt, setCreatedAt] = useState(null);
  const [categoryType, setCategoryType] = useState("main");
  const [description, setDescription] = useState("");

  const [allCategories, setAllCategories] = useState([]);

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
        setCreatedAt(category.createdAt);
      }
    };

    loadData();
  }, [id, isEdit]);

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
              id: isEdit ? id : crypto.randomUUID(),
              menuType,
              categoryType: "main",
              mainCategory,
              status,
              createdAt: createdAt || Date.now(),
            }
          : {
              id: isEdit ? id : crypto.randomUUID(),
              menuType,
              categoryType: "sub",
              mainCategory,
              subCategory,
              description,
              bannerImage,
              status,
              createdAt: createdAt || Date.now(),
            };

      if (isEdit) {
        await updateCategory(payload);
      } else {
        await addCategory(payload);
      }

      navigate("/admin/categories");
    } catch (err) {
      console.error(err);
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
          ml: "300px", // Same width as your sidebar
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
              <TextField
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
                sx={{
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
                }}
              >
                <MenuItem value="skincare">Skincare</MenuItem>

                <MenuItem value="haircare">Haircare</MenuItem>

                <MenuItem value="more">More</MenuItem>
              </TextField>

              <TextField
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
              </TextField>

              {categoryType === "main" ? (
                <TextField
                  label="Category Name"
                  value={mainCategory}
                  onChange={(e) => setMainCategory(e.target.value)}
                  fullWidth
                  error={Boolean(errors.mainCategory)}
                  helperText={errors.mainCategory}
                  sx={textFieldStyle}
                />
              ) : (
                <TextField
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
                      <MenuItem key={item.id} value={item.mainCategory}>
                        {item.mainCategory}
                      </MenuItem>
                    ))}
                </TextField>
              )}

              {categoryType === "sub" && (
                <TextField
                  label="Sub Category"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  fullWidth
                  error={Boolean(errors.subCategory)}
                  helperText={errors.subCategory}
                  sx={textFieldStyle}
                />
              )}

              {categoryType === "sub" && (
                <TextField
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

              {categoryType === "sub" && (
                <>
                  <TextField
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

              <TextField
                select
                label="Status"
                fullWidth
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{
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
                }}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>

              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
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
                    // saveBtnStyle,

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
