import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { getProducts } from "../../database/productService";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

const CategoryTable = ({ categories, setSelectedCategory, onDelete }) => {
  const { darkMode } = useThemeContext();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(category);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        mt: 4,
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: darkMode ? "#252525" : "#fff",
        color: darkMode ? "#fff" : "#222",
      }}
    >
      <Table
        sx={{
          "& .MuiTableCell-root": {
            color: darkMode ? "#F5F5F5" : "#222",
            borderBottom: darkMode ? "1px solid #454545" : "1px solid #EAEAEA",
          },
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              bgcolor: darkMode ? "#303030" : "#F8F5F1",
            }}
          >
            {[
              "#",
              "Category Name",
              "Description",
              "Status",
              "Products",
              "Actions",
            ].map((item) => (
              <TableCell
                key={item}
                align={item === "Actions" ? "center" : "left"}
                sx={{
                  fontWeight: 700,
                  color: darkMode ? "#FFFFFF" : "#222",
                }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                sx={{
                  py: 8,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: darkMode ? "#FFFFFF" : "#555",
                  }}
                >
                  No categories found
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    color: darkMode ? "#BDBDBD" : "#888",
                  }}
                >
                  Try another search or add a new category.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category, index) => {
              const productCount = products.filter(
                (product) => product.category === category.name,
              ).length;

              return (
                <TableRow
                  key={category.id}
                  hover
                  sx={{
                    transition: ".25s",

                    "&:hover": {
                      bgcolor: darkMode ? "#2F2F2F" : "#FAF7F4",
                    },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{category.name}</TableCell>

                  <TableCell>{category.description}</TableCell>

                  <TableCell>
                    <Chip
                      label={category.status}
                      color={
                        category.status === "Active" ? "success" : "default"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell>{productCount}</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={(e) => handleMenu(e, category)}
                      sx={{
                        color: darkMode ? "#F5F5F5" : "#444",

                        "&:hover": {
                          bgcolor: darkMode ? "#383838" : "#F2F2F2",
                        },
                      }}
                    >
                      <MoreHorizOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 200,
            mt: 1,
            borderRadius: 2,
            bgcolor: darkMode ? "#2B2B2B" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#222",
            border: darkMode ? "1px solid #3D3D3D" : "1px solid #EAEAEA",
            boxShadow: darkMode
              ? "0 10px 30px rgba(0,0,0,.45)"
              : "0 10px 30px rgba(0,0,0,.12)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setSelectedCategory(selectedRow);
            handleClose();
          }}
          sx={{
            py: 1.2,
            color: darkMode ? "#F5F5F5" : "#222",

            "&:hover": {
              bgcolor: darkMode ? "#383838" : "#F8F5F1",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: darkMode ? "#F5F5F5" : "#555",
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Show</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate(`/admin/categories/edit/${selectedRow.id}`);
            handleClose();
          }}
          sx={{
            py: 1.2,
            color: darkMode ? "#F5F5F5" : "#222",

            "&:hover": {
              bgcolor: darkMode ? "#383838" : "#F8F5F1",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: darkMode ? "#F5F5F5" : "#555",
            }}
          >
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onDelete(selectedRow);
            handleClose();
          }}
          sx={{
            py: 1.2,
            color: "#EF5350",

            "&:hover": {
              bgcolor: darkMode ? "#3A2626" : "#FFF5F5",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "#EF5350",
            }}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default CategoryTable;
