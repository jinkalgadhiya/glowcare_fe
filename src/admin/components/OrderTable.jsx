import React from "react";
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
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { useThemeContext } from "../context/ThemeContext";

const OrderTable = ({
  orders,
  searchTerm,
  setSelectedOrder,
}) => {
  const { darkMode } = useThemeContext();

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
            <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Payment</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>

            <TableCell align="center" sx={{ fontWeight: 700 }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}

        <TableBody>
          {filteredOrders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
              >
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
                    backgroundColor: darkMode
                      ? "#2F2F2F"
                      : "#FAFAFA",
                  },
                }}
              >
                <TableCell>{order.id}</TableCell>

                <TableCell>
                  <Box>
                    <Typography fontWeight={600}>
                      {order.customer.fullName}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {order.customer.email}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  ₹{order.pricing.total}
                </TableCell>

                <TableCell>
                  {order.paymentMethod}
                </TableCell>

                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={() => setSelectedOrder(order)}
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;