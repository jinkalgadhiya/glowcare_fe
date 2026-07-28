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

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useThemeContext } from "../context/ThemeContext";

const AddCategory = () => {
  const { darkMode } = useThemeContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [createdAt, setCreatedAt] = useState(null);

  useEffect(() => {
    const loadCategory = async () => {
      if (!isEdit) return;

      const category = await getCategoryById(id);

      if (category) {
        setCategoryName(category.name);
        setDescription(category.description);
        setStatus(category.status);
        setCreatedAt(category.createdAt);
      }
    };

    loadCategory();
  }, [id, isEdit]);

  const handleSaveCategory = async () => {
  if (categoryName.trim() === "") {
    alert("Category name is required");
    return;
  }

  try {
    if (isEdit) {
      console.log("Updating category...");

      await updateCategory({
        id, // Keep the existing ID
        name: categoryName,
        description,
        status,
        createdAt,
        productCount: 0,
      });

      console.log("Category updated successfully");
    } else {
      console.log("Adding category...");

      await addCategory({
        id: crypto.randomUUID(),
        name: categoryName,
        description,
        status,
        createdAt: Date.now(),
        productCount: 0,
      });

      console.log("Category added successfully");
    }

    navigate("/admin/categories");
  } catch (err) {
    console.error("FULL ERROR:", err);
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
                label="Category Name"
                placeholder="Enter category name"
                fullWidth
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
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
              />

              <TextField
                label="Description"
                placeholder="Enter category description"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              />
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
