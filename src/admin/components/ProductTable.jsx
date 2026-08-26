import React, { useState } from "react";
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
  Avatar,
} from "@mui/material";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

const ProductTable = ({
  products = [],
  setSelectedProduct,
  onDelete,
}) => {
  const { darkMode } = useThemeContext();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(product);
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
        backgroundColor: darkMode ? "#252525" : "#fff",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: darkMode ? "#303030" : "#F8F5F1",
            }}
          >
            <TableCell sx={{ fontWeight: 700, color: darkMode ? "#fff" : "#222" }}>
              #
            </TableCell>

            <TableCell sx={{ fontWeight: 700, color: darkMode ? "#fff" : "#222" }}>
              Image
            </TableCell>

            <TableCell sx={{ fontWeight: 700, color: darkMode ? "#fff" : "#222" }}>
              Product
            </TableCell>

            <TableCell sx={{ fontWeight: 700, color: darkMode ? "#fff" : "#222" }}>
              Category
            </TableCell>

            <TableCell sx={{ fontWeight: 700, color: darkMode ? "#fff" : "#222" }}>
              Price
            </TableCell>

            <TableCell sx={{ fontWeight: 700, color: darkMode ? "#fff" : "#222" }}>
              Stock
            </TableCell>

            <TableCell sx={{ fontWeight: 700, color: darkMode ? "#fff" : "#222" }}>
              Badge
            </TableCell>

            <TableCell sx={{ fontWeight: 700, color: darkMode ? "#fff" : "#222" }}>
              Status
            </TableCell>

            <TableCell
              align="center"
              sx={{
                fontWeight: 700,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: darkMode ? "#BDBDBD" : "#666",
                  }}
                >
                  No products found
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    color: darkMode ? "#888" : "#999",
                  }}
                >
                  Try changing your search or filter.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product, index) => {
              const category = product.category;

              const categoryName =
                category?.subCategory ||
                category?.mainCategory ||
                "-";

              const variant = product.variants?.[0];

              return (
                <TableRow
                  key={product._id}
                  hover
                  sx={{
                    "& td": {
                      color: darkMode ? "#fff" : "#222",
                      borderColor: darkMode ? "#444" : "#EAEAEA",
                    },

                    "&:hover": {
                      backgroundColor: darkMode
                        ? "#2E2E2E"
                        : "#FAF8F5",
                    },
                  }}
                >
                  {/* Number */}

                  <TableCell>
                    {index + 1}
                  </TableCell>

                  {/* Image */}

                  <TableCell>
                    <Avatar
                      src={product.image}
                      alt={product.productName}
                      variant="rounded"
                      sx={{
                        width: 55,
                        height: 55,
                        borderRadius: 2,
                      }}
                    />
                  </TableCell>

                  {/* Product */}

                  <TableCell
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {product.productName}
                  </TableCell>

                  {/* Category */}

                  <TableCell>
                    {categoryName}
                  </TableCell>

                  {/* Price */}

                  <TableCell>
                    {variant?.discountPrice &&
                    Number(variant.discountPrice) > 0 ? (
                      <>
                        <Typography
                          component="span"
                          sx={{
                            textDecoration: "line-through",
                            color: "gray",
                            mr: 1,
                          }}
                        >
                          ₹{variant.price}
                        </Typography>

                        <Typography
                          component="span"
                          color="error"
                        >
                          ₹{variant.discountPrice}
                        </Typography>
                      </>
                    ) : (
                      <>₹{variant?.price || 0}</>
                    )}
                  </TableCell>

                  {/* Stock */}

                  <TableCell>
                    {variant?.stock || 0}
                  </TableCell>

                  {/* Badge */}

                  <TableCell>
                    <Chip
                      label={product.badge || "None"}
                      size="small"
                      sx={{
                        bgcolor:
                          product.badge === "Best Seller"
                            ? "#FFF4E5"
                            : product.badge === "New Launch"
                              ? "#E8F5E9"
                              : product.badge === "Trending"
                                ? "#E3F2FD"
                                : product.badge === "Limited Stock"
                                  ? "#FFF8E1"
                                  : product.badge === "Out of Stock"
                                    ? "#FBE9E7"
                                    : product.badge === "Sold Out"
                                      ? "#F3E5F5"
                                      : darkMode
                                        ? "#3B3B3B"
                                        : "#EEEEEE",

                        color:
                          product.badge === "Best Seller"
                            ? "#EF6C00"
                            : product.badge === "New Launch"
                              ? "#2E7D32"
                              : product.badge === "Trending"
                                ? "#1565C0"
                                : product.badge === "Limited Stock"
                                  ? "#F9A825"
                                  : product.badge === "Out of Stock"
                                    ? "#D84315"
                                    : product.badge === "Sold Out"
                                      ? "#7B1FA2"
                                      : darkMode
                                        ? "#fff"
                                        : "#555",

                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  {/* Status */}

                  <TableCell>
                    <Chip
                      label={product.status}
                      color={
                        product.status === "Active"
                          ? "success"
                          : "default"
                      }
                      size="small"
                    />
                  </TableCell>

                  {/* Actions */}

                  <TableCell align="center">
                    <IconButton
                      onClick={(e) =>
                        handleMenu(e, product)
                      }
                      sx={{
                        color: darkMode ? "#fff" : "#555",
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

      {/* Action Menu */}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 190,
            borderRadius: 2,
            mt: 1,
            backgroundColor: darkMode
              ? "#2A2A2A"
              : "#fff",
            color: darkMode ? "#fff" : "#222",
          },
        }}
      >
        {/* View */}

        <MenuItem
          onClick={() => {
            setSelectedProduct(selectedRow);
            handleClose();
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <VisibilityOutlinedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>View</ListItemText>
        </MenuItem>

        {/* Edit */}

        <MenuItem
          onClick={() => {
            navigate(
              `/admin/products/edit/${selectedRow?._id}`,
            );

            handleClose();
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Edit</ListItemText>
        </MenuItem>

        {/* Delete */}

        <MenuItem
          onClick={() => {
            onDelete(selectedRow);
            handleClose();
          }}
          sx={{
            color: "#E53935",
          }}
        >
          <ListItemIcon sx={{ color: "#E53935" }}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default ProductTable;