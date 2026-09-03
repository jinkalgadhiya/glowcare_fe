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

import { useThemeContext } from "../../context/ThemeContext";

const ReturnTable = ({
  returns = [],
  searchTerm = "",
  setSelectedReturn,
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

  const handleMenu = (event, returnRequest) => {
    setAnchorEl(event.currentTarget);

    setSelectedRow(returnRequest);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ======================================================
  // HELPERS
  // ======================================================

  const getReturnId = (returnRequest) => {
    return returnRequest?._id || returnRequest?.id || "";
  };

  const getOrderNumber = (returnRequest) => {
    return returnRequest?.orderNumber || returnRequest?.orderId || "-";
  };

  const getProductName = (returnRequest) => {
    return returnRequest?.productName || "Product";
  };

  const getCustomerName = (returnRequest) => {
    return (
      returnRequest?.customerName ||
      returnRequest?.customer?.fullName ||
      "Guest"
    );
  };

  const getCustomerEmail = (returnRequest) => {
    return (
      returnRequest?.customerEmail || returnRequest?.customer?.email || "-"
    );
  };

  const getRefundAmount = (returnRequest) => {
    return returnRequest?.refundAmount ?? returnRequest?.paidAmount ?? 0;
  };

  const getReturnDate = (returnRequest) => {
    return returnRequest?.createdAt || null;
  };

  // ======================================================
  // SEARCH
  // ======================================================

  const filteredReturns = returns.filter((returnRequest) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return true;

    const returnId = getReturnId(returnRequest).toLowerCase();

    const orderNumber = String(getOrderNumber(returnRequest)).toLowerCase();

    const productName = getProductName(returnRequest).toLowerCase();

    const customerName = getCustomerName(returnRequest).toLowerCase();

    const customerEmail = getCustomerEmail(returnRequest).toLowerCase();

    return (
      returnId.includes(search) ||
      orderNumber.includes(search) ||
      productName.includes(search) ||
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

      case "approved":
        return "info";

      case "rejected":
        return "error";

      case "pickup scheduled":
        return "secondary";

      case "picked up":
        return "secondary";

      case "received":
        return "info";

      case "refunded":
        return "success";

      case "cancelled":
        return "error";

      default:
        return "default";
    }
  };

  // ======================================================
  // TABLE
  // ======================================================

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,

        overflow: "hidden",

        border: "1px solid",

        borderColor: darkMode ? "#333" : "#E5E7EB",

        backgroundColor: darkMode ? "#252525" : "#FFFFFF",
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
              "Return ID",
              "Order",
              "Product",
              "Customer",
              "Refund",
              "Reason",
              "Status",
              "Date",
              "Action",
            ].map((title) => (
              <TableCell
                key={title}
                align={title === "Action" ? "center" : "left"}
                sx={{
                  fontWeight: 700,

                  color: darkMode ? "#FFFFFF" : "#222",

                  borderColor: darkMode ? "#3A3A3A" : "#E5E7EB",

                  whiteSpace: "nowrap",
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
          {filteredReturns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                <Typography
                  sx={{
                    py: 5,

                    color: darkMode ? "#BBBBBB" : "#777",
                  }}
                >
                  No Return Requests Found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            filteredReturns.map((returnRequest) => {
              const returnId = getReturnId(returnRequest);

              const orderNumber = getOrderNumber(returnRequest);

              const productName = getProductName(returnRequest);

              const customerName = getCustomerName(returnRequest);

              const customerEmail = getCustomerEmail(returnRequest);

              const refundAmount = getRefundAmount(returnRequest);

              const returnDate = getReturnDate(returnRequest);

              return (
                <TableRow
                  hover
                  key={returnId}
                  sx={{
                    "&:hover": {
                      backgroundColor: darkMode ? "#2F2F2F" : "#FAFAFA",
                    },
                  }}
                >
                  {/* =====================================
                        RETURN ID
                    ===================================== */}

                  <TableCell
                    sx={{
                      color: darkMode ? "#FFFFFF" : "#777",

                      fontWeight: 600,
                    }}
                  >
                    #{String(returnId).slice(-6)}
                  </TableCell>

                  {/* =====================================
                        ORDER NUMBER
                    ===================================== */}

                  <TableCell
                    sx={{
                      color: darkMode ? "#FFFFFF" : "#222",
                      fontWeight: 600,
                    }}
                  >
                    #{String(orderNumber).replace("#", "").slice(-5)}
                  </TableCell>

                  {/* =====================================
                        PRODUCT
                    ===================================== */}

                  <TableCell>
                    <Typography
                      sx={{
                        fontWeight: 600,

                        color: darkMode ? "#FFFFFF" : "#222",

                        maxWidth: 180,

                        overflow: "hidden",

                        textOverflow: "ellipsis",

                        whiteSpace: "nowrap",
                      }}
                    >
                      {productName}
                    </Typography>
                  </TableCell>

                  {/* =====================================
                        CUSTOMER
                    ===================================== */}

                  <TableCell>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 600,

                          color: darkMode ? "#FFFFFF" : "#222",
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

                  {/* =====================================
                        REFUND
                    ===================================== */}

                  <TableCell
                    sx={{
                      color: darkMode ? "#FFFFFF" : "#222",

                      fontWeight: 600,

                      whiteSpace: "nowrap",
                    }}
                  >
                    ₹{Number(refundAmount).toLocaleString("en-IN")}
                  </TableCell>

                  {/* =====================================
                        REASON
                    ===================================== */}

                  <TableCell>
                    <Typography
                      sx={{
                        color: darkMode ? "#DDDDDD" : "#555",

                        maxWidth: 180,

                        overflow: "hidden",

                        textOverflow: "ellipsis",

                        whiteSpace: "nowrap",
                      }}
                    >
                      {returnRequest?.reason || "-"}
                    </Typography>
                  </TableCell>

                  {/* =====================================
                        STATUS
                    ===================================== */}

                  <TableCell>
                    <Chip
                      label={returnRequest?.status || "Pending"}
                      color={getStatusColor(returnRequest?.status)}
                      size="small"
                    />
                  </TableCell>

                  {/* =====================================
                        DATE
                    ===================================== */}

                  <TableCell
                    sx={{
                      color: darkMode ? "#FFFFFF" : "#222",

                      whiteSpace: "nowrap",
                    }}
                  >
                    {returnDate
                      ? new Date(returnDate).toLocaleDateString("en-IN")
                      : "-"}
                  </TableCell>

                  {/* =====================================
                        ACTION
                    ===================================== */}

                  <TableCell align="center">
                    <IconButton
                      onClick={(event) => handleMenu(event, returnRequest)}
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

            bgcolor: darkMode ? "#252525" : "#FFFFFF",

            color: darkMode ? "#FFFFFF" : "#000",

            "& .MuiMenuItem-root": {
              color: darkMode ? "#FFFFFF" : "#000",
            },

            "& .MuiListItemIcon-root": {
              minWidth: 35,
            },
          },
        }}
      >
        {/* ================================================
            VIEW
        ================================================ */}

        <MenuItem
          onClick={() => {
            setSelectedReturn(selectedRow);

            setOpenView(true);

            handleClose();
          }}
        >
          <ListItemIcon>
            <VisibilityOutlinedIcon
              fontSize="small"
              sx={{
                color: darkMode ? "#FFFFFF" : "#555",
              }}
            />
          </ListItemIcon>

          <ListItemText
            primary="View"
            primaryTypographyProps={{
              sx: {
                color: darkMode ? "#FFFFFF" : "#000",

                fontWeight: 500,
              },
            }}
          />
        </MenuItem>

        {/* ================================================
            UPDATE STATUS
        ================================================ */}

        <MenuItem
          onClick={() => {
            setSelectedReturn(selectedRow);

            setOpenStatus(true);

            handleClose();
          }}
        >
          <ListItemIcon>
            <EditOutlinedIcon
              fontSize="small"
              sx={{
                color: "#1976D2",
              }}
            />
          </ListItemIcon>

          <ListItemText
            primary="Update Status"
            primaryTypographyProps={{
              sx: {
                color: darkMode ? "#FFFFFF" : "#000",

                fontWeight: 500,
              },
            }}
          />
        </MenuItem>

        {/* ================================================
            DELETE
        ================================================ */}

        <MenuItem
          onClick={() => {
            setSelectedReturn(selectedRow);

            setOpenDelete(true);

            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon
              fontSize="small"
              sx={{
                color: "#D32F2F",
              }}
            />
          </ListItemIcon>

          <ListItemText
            primary="Delete"
            primaryTypographyProps={{
              sx: {
                color: "#D32F2F",

                fontWeight: 500,
              },
            }}
          />
        </MenuItem>
      </Menu>
    </TableContainer>
  );
};

export default ReturnTable;
