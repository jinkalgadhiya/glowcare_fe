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
  Avatar,
} from "@mui/material";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useThemeContext } from "../context/ThemeContext";

const CustomerTable = ({
  customers,
  searchTerm,
  setSelectedCustomer,
  setOpenView,
  setOpenEdit,
  setOpenDelete,
}) => {
  const { darkMode } = useThemeContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event, customer) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(customer);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();

    return (
      customer.fullName?.toLowerCase().includes(search) ||
      customer.email?.toLowerCase().includes(search) ||
      customer.contactNumber?.toLowerCase().includes(search)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";

      case "Inactive":
        return "warning";

      case "Blocked":
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
              "Customer",
              "Phone",
              "Orders",
              "Spent",
              "Status",
              "Joined",
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
          {filteredCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography
                  sx={{
                    py: 5,
                    color: darkMode ? "#BBB" : "#777",
                  }}
                >
                  No Customers Found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            filteredCustomers.map((customer) => (
              <TableRow
                hover
                key={customer._id}
                sx={{
                  "&:hover": {
                    backgroundColor: darkMode ? "#2F2F2F" : "#FAFAFA",
                  },
                }}
              >
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar
                      src={customer.image}
                      alt={customer.fullName}
                      sx={{
                        width: 46,
                        height: 46,
                      }}
                    >
                      {customer.fullName?.charAt(0)}
                    </Avatar>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: darkMode ? "#fff" : "#222",
                        }}
                      >
                        {customer.fullName}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: darkMode ? "#B5B5B5" : "#777",
                        }}
                      >
                        {customer.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#222",
                  }}
                >
                  {customer.contactNumber || "-"}
                </TableCell>

                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#222",
                  }}
                >
                  {customer.totalOrders || 0}
                </TableCell>

                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#222",
                  }}
                >
                  ₹{customer.totalSpent || 0}
                </TableCell>

                <TableCell>
                  <Chip
                    label={customer.status}
                    color={getStatusColor(customer.status)}
                    size="small"
                  />
                </TableCell>

                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#222",
                  }}
                >
                  {customer.createdAt
  ? new Date(customer.createdAt).toLocaleDateString()
  : "-"}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={(e) => handleMenu(e, customer)}
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
        {/* View */}

        <MenuItem
          onClick={() => {
            setSelectedCustomer(selectedRow);
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

        {/* Edit Status */}

        <MenuItem
          onClick={() => {
            setSelectedCustomer(selectedRow);
            setOpenEdit(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" sx={{ color: "#1976d2" }} />
          </ListItemIcon>

          <ListItemText
            primary="Edit Status"
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
            setSelectedCustomer(selectedRow);
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

export default CustomerTable;
