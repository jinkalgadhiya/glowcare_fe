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
import DeleteIcon from "@mui/icons-material/Delete";

import { useThemeContext } from "../context/ThemeContext";

const OrderTable = ({
  orders = [],
  searchTerm = "",
  setSelectedOrder,
  setOpenView,
  setOpenStatus,
  setOpenDelete,
}) => {
  const { darkMode } = useThemeContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const open = Boolean(anchorEl);

  // ======================================================
  // MENU
  // ======================================================

  const handleMenu = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(order);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ======================================================
  // HELPERS
  // ======================================================

  const getOrderId = (order) => {
    return order?._id || order?.id || "";
  };

  const getCustomerName = (order) => {
    return (
      order?.customer?.fullName ||
      order?.customerName ||
      order?.user?.fullName ||
      "Guest"
    );
  };

  const getCustomerEmail = (order) => {
    return (
      order?.customer?.email ||
      order?.customerEmail ||
      order?.user?.email ||
      "-"
    );
  };

  const getTotal = (order) => {
    return (
      order?.pricing?.total ??
      order?.totalAmount ??
      order?.total ??
      0
    );
  };

  const getPaymentMethod = (order) => {
    return (
      order?.paymentMethod ||
      order?.payment?.method ||
      "COD"
    );
  };

  const getOrderDate = (order) => {
    return (
      order?.orderDate ||
      order?.createdAt ||
      null
    );
  };

  // ======================================================
  // SEARCH
  // ======================================================

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return true;

    const orderId = getOrderId(order).toLowerCase();
    const customerName = getCustomerName(order).toLowerCase();
    const customerEmail = getCustomerEmail(order).toLowerCase();

    return (
      orderId.includes(search) ||
      customerName.includes(search) ||
      customerEmail.includes(search)
    );
  });

  // ======================================================
  // STATUS COLOR
  // ======================================================

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";

      case "processing":
        return "info";

      case "shipped":
        return "secondary";

      case "delivered":
        return "success";

      case "cancelled":
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
        {/* ==================================================
            TABLE HEAD
        ================================================== */}

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

        {/* ==================================================
            TABLE BODY
        ================================================== */}

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
            filteredOrders.map((order) => {
              const orderId = getOrderId(order);
              const customerName = getCustomerName(order);
              const customerEmail = getCustomerEmail(order);
              const total = getTotal(order);
              const paymentMethod = getPaymentMethod(order);
              const orderDate = getOrderDate(order);

              return (
                <TableRow
                  hover
                  key={orderId}
                  sx={{
                    "&:hover": {
                      backgroundColor: darkMode
                        ? "#2F2F2F"
                        : "#FAFAFA",
                    },
                  }}
                >
                  {/* Order ID */}

                  <TableCell
                    sx={{
                      color: darkMode ? "#fff" : "#777",
                      fontWeight: 600,
                    }}
                  >
                    #{String(orderId).slice(-6)}
                  </TableCell>

                  {/* Customer */}

                  <TableCell>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: darkMode ? "#fff" : "#222",
                        }}
                      >
                        {customerName}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: darkMode ? "#B5B5B5" : "#777",
                        }}
                      >
                        {customerEmail}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Total */}

                  <TableCell
                    sx={{
                      color: darkMode ? "#fff" : "#222",
                      fontWeight: 600,
                    }}
                  >
                    ₹{Number(total).toLocaleString("en-IN")}
                  </TableCell>

                  {/* Payment */}

                  <TableCell
                    sx={{
                      color: darkMode ? "#fff" : "#222",
                    }}
                  >
                    {paymentMethod}
                  </TableCell>

                  {/* Status */}

                  <TableCell>
                    <Chip
                      label={order?.status || "Pending"}
                      color={getStatusColor(order?.status)}
                      size="small"
                    />
                  </TableCell>

                  {/* Date */}

                  <TableCell
                    sx={{
                      color: darkMode ? "#fff" : "#222",
                    }}
                  >
                    {orderDate
                      ? new Date(
                          orderDate,
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </TableCell>

                  {/* Action */}

                  <TableCell align="center">
                    <IconButton
                      onClick={(event) =>
                        handleMenu(event, order)
                      }
                      sx={{
                        color: darkMode ? "#F5F5F5" : "#444",

                        "&:hover": {
                          bgcolor: darkMode
                            ? "#383838"
                            : "#F2F2F2",
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

      {/* ==================================================
          ACTION MENU
      ================================================== */}

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
        {/* View */}

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
              sx={{
                color: darkMode ? "#fff" : "#555",
              }}
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

        {/* Update Status */}

        <MenuItem
          onClick={() => {
            setSelectedOrder(selectedRow);
            setOpenStatus(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditOutlinedIcon
              fontSize="small"
              sx={{ color: "#1976d2" }}
            />
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

        {/* Delete */}

        <MenuItem
          onClick={() => {
            setSelectedOrder(selectedRow);
            setOpenDelete(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon
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