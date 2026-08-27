import React, { useState } from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Stack,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { getCategories } from "../../../database/categoryService";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";

const ProductHeader = ({ searchTerm, setSearchTerm, onOpenFilter }) => {
  const { darkMode } = useThemeContext();
  const navigate = useNavigate();

  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  const handleAddProduct = async () => {
    try {
      const categories = await getCategories();

      // Product can be added only if an active subcategory exists.
      // Main category rows have an empty subCategory field.
      const activeSubCategories = categories.filter(
        (item) =>
          item.status === "Active" &&
          item.subCategory &&
          item.subCategory.trim() !== "",
      );

      if (activeSubCategories.length === 0) {
        setOpenCategoryDialog(true);
        return;
      }

      navigate("/admin/products/create");
    } catch (error) {
      console.error("Error checking categories:", error);
      setOpenCategoryDialog(true);
    }
  };

  return (
    <Box
      sx={{
        pt: "60px",
        mb: 4,
        mt: "-60px",
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
        sx={{ mb: 3 }}
      >
        <Link
          underline="hover"
          onClick={() => navigate("/admin/dashboard")}
          sx={{
            cursor: "pointer",
            color: darkMode ? "#AFAFAF" : "#777",
            fontSize: 14,
            "&:hover": {
              color: "#B89478",
            },
          }}
        >
          Dashboard
        </Link>

        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
            color: darkMode ? "#fff" : "#474040",
          }}
        >
          Products
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          size="small"
          sx={{
            width: {
              xs: "100%",
              md: 420,
            },
            "& .MuiOutlinedInput-root": {
              height: 46,
              borderRadius: "12px",
              backgroundColor: darkMode ? "#333333" : "#F8F5F1",
              color: darkMode ? "#fff" : "#222",
              "& fieldset": {
                borderColor: darkMode ? "#444" : "#DDD",
              },
              "&:hover fieldset": {
                borderColor: "#B89478",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#B89478",
              },
            },
            "& input::placeholder": {
              color: darkMode ? "#BDBDBD" : "#888",
              opacity: 1,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon
                  sx={{
                    color: darkMode ? "#BDBDBD" : "#888",
                  }}
                />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={handleAddProduct}
            sx={{
              minWidth: 170,
              height: 46,
              bgcolor: "#B89478",
              color: "#fff",
              textTransform: "none",
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#A88366",
                boxShadow: "none",
              },
            }}
          >
            Add Product
          </Button>

          <Button
            variant="outlined"
            startIcon={<FilterListRoundedIcon />}
            onClick={onOpenFilter}
            sx={{
              minWidth: 120,
              height: 46,
              borderColor: "#B89478",
              color: "#B89478",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": {
                borderColor: "#A88366",
                bgcolor: "rgba(184,148,120,.08)",
              },
            }}
          >
            Filter
          </Button>
        </Stack>
      </Box>

      <Dialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: darkMode ? "#252525" : "#fff",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: darkMode ? "#fff" : "#222",
            fontWeight: 600,
          }}
        >
          Subcategory Required
        </DialogTitle>

        <DialogContent>
          <Typography
            sx={{
              color: darkMode ? "#BDBDBD" : "#666",
            }}
          >
            Please add at least one active subcategory before creating a
            product.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenCategoryDialog(false)}
            sx={{
              color: "#B89478",
            }}
          >
            Close
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              setOpenCategoryDialog(false);
              navigate("/admin/categories/create");
            }}
            sx={{
              bgcolor: "#B89478",
              "&:hover": {
                bgcolor: "#A88366",
              },
            }}
          >
            Add Category
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductHeader;