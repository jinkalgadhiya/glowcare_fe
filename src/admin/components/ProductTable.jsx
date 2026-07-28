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

const ProductTable = ({ products = [], setSelectedProduct, onDelete }) => {
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
            <TableCell
              sx={{
                fontWeight: 700,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              #
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              Image
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              Product
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              Category
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              Price
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              Stock
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              Badge
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
                color: darkMode ? "#fff" : "#222",
              }}
            >
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
              <TableCell
                colSpan={9}
                align="center"
                sx={{
                  py: 8,
                }}
              >
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
            products.map((product, index) => (
              <TableRow
                key={product.id}
                hover
                sx={{
                  "& td": {
                    color: darkMode ? "#fff" : "#222",
                    borderColor: darkMode ? "#444" : "#EAEAEA",
                  },

                  "&:hover": {
                    backgroundColor: darkMode ? "#2E2E2E" : "#FAF8F5",
                  },
                }}
              >
                <TableCell>{index + 1}</TableCell>

                <TableCell>
                  <Avatar
                    src={product.image}
                    variant="rounded"
                    sx={{
                      width: 55,
                      height: 55,
                      borderRadius: 2,
                    }}
                  />
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {product.name}
                </TableCell>

                <TableCell>{product.category}</TableCell>

                <TableCell>
                  {product.variants?.[0]?.discountPrice ? (
                    <>
                      <Typography
                        component="span"
                        sx={{
                          textDecoration: "line-through",
                          color: "gray",
                          mr: 1,
                        }}
                      >
                        ₹{product.variants[0].price}
                      </Typography>

                      <Typography component="span" color="error">
                        ₹{product.variants[0].discountPrice}
                      </Typography>
                    </>
                  ) : (
                    <>₹{product.variants?.[0]?.price || 0}</>
                  )}
                </TableCell>

                <TableCell>{product.variants?.[0]?.stock || 0}</TableCell>

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

                <TableCell>
                  <Chip
                    label={product.status}
                    color={product.status === "Active" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={(e) => handleMenu(e, product)}
                    sx={{
                      color: darkMode ? "#fff" : "#555",
                    }}
                  >
                    <MoreHorizOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 190,
            borderRadius: 2,
            mt: 1,
            backgroundColor: darkMode ? "#2A2A2A" : "#fff",

            color: darkMode ? "#fff" : "#222",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setSelectedProduct(selectedRow);
            handleClose();
          }}
        >
          <ListItemIcon
            sx={{
              color: "inherit",
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>View</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate(`/admin/products/edit/${selectedRow.id}`);

            handleClose();
          }}
        >
          <ListItemIcon
            sx={{
              color: "inherit",
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
            color: "#E53935",
          }}
        >
          <ListItemIcon
            sx={{
              color: "#E53935",
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

export default ProductTable;
