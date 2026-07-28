import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useThemeContext } from "../context/ThemeContext";

const OrderTable = ({
  orders,
  searchTerm,
  setSelectedOrder,
  setOpenView,
  setOpenStatus,
  setOpenDelete,
}) => {
  const { darkMode } = useThemeContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(order);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    return (
      order.id.toLowerCase().includes(search) ||
      order.customer.fullName.toLowerCase().includes(search)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";

      case "Processing":
        return "info";

      case "Shipped":
        return "secondary";

      case "Delivered":
        return "success";

      case "Cancelled":
        return "error";

      default:
        return "default";
    }
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: darkMode ? "#333" : "#E5E7EB",
        backgroundColor: darkMode ? "#252525" : "#fff",
      }}
    >
      <Table>
        {/* Table Head */}

        <TableHead>
          <TableRow
            sx={{
              backgroundColor: darkMode ? "#2E2E2E" : "#F8FAF9",
            }}
          >
            {[
              "Order ID",
              "Customer",
              "Total",
              "Payment",
              "Status",
              "Date",
              "Action",
            ].map((title) => (
              <TableCell
                key={title}
                align={title === "Action" ? "center" : "left"}
                sx={{
                  fontWeight: 700,
                  color: darkMode ? "#fff" : "#222",
                  borderColor: darkMode ? "#3A3A3A" : "#E5E7EB",
                }}
              >
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}

        <TableBody>
          {filteredOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography
                  sx={{
                    py: 5,
                    color: darkMode ? "#BBB" : "#777",
                  }}
                >
                  No Orders Found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            filteredOrders.map((order) => (
              <TableRow
                hover
                key={order.id}
                sx={{
                  "&:hover": {
                    backgroundColor: darkMode ? "#2F2F2F" : "#FAFAFA",
                  },
                }}
              >
                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#777",
                  }}
                >
                  {order.id}
                </TableCell>

                <TableCell>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: darkMode ? "#fff" : "#222",
                      }}
                    >
                      {order.customer.fullName}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: darkMode ? "#B5B5B5" : "#777",
                      }}
                    >
                      {order.customer.email}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#222",
                  }}
                >
                  ₹{order.pricing.total}
                </TableCell>

                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#222",
                  }}
                >
                  {order.paymentMethod}
                </TableCell>

                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#222",
                  }}
                >
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#222",
                  }}
                >
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={(e) => handleMenu(e, order)}
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
            ))
          )}
        </TableBody>
      </Table>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 190,
            borderRadius: 2,
            mt: 1,
            bgcolor: darkMode ? "#252525" : "#fff",
            color: darkMode ? "#fff" : "#000",

            "& .MuiMenuItem-root": {
              color: darkMode ? "#fff" : "#000",
            },

            "& .MuiListItemIcon-root": {
              minWidth: 35,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setSelectedOrder(selectedRow);
            setOpenView(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <VisibilityOutlinedIcon
              fontSize="small"
              sx={{ color: darkMode ? "#fff" : "#555" }}
            />
          </ListItemIcon>

          <ListItemText
            primary="View"
            primaryTypographyProps={{
              sx: {
                color: darkMode ? "#fff" : "#000",
                fontWeight: 500,
              },
            }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => {
            setSelectedOrder(selectedRow);
            setOpenStatus(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" sx={{ color: "#1976d2" }} />
          </ListItemIcon>

          <ListItemText
            primary="Update Status"
            primaryTypographyProps={{
              sx: {
                color: darkMode ? "#fff" : "#000",
                fontWeight: 500,
              },
            }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => {
            setSelectedOrder(selectedRow);
            setOpenDelete(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon
              fontSize="small"
              sx={{ color: "#d32f2f" }}
            />
          </ListItemIcon>

          <ListItemText
            primary="Delete"
            primaryTypographyProps={{
              sx: {
                color: "#d32f2f",
                fontWeight: 500,
              },
            }}
          />
        </MenuItem>
      </Menu>
    </TableContainer>
  );
};

export default OrderTable;
