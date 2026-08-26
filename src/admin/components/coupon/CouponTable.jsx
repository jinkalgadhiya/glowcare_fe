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
  Box,
} from "@mui/material";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useThemeContext } from "../../context/ThemeContext";

const CouponTable = ({
  coupons,
  onView,
  onEdit,
  onDelete,
}) => {
  const { darkMode } = useThemeContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const open = Boolean(anchorEl);

  // =====================================================
  // OPEN ACTION MENU
  // =====================================================

  const handleMenu = (event, coupon) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(coupon);
  };

  // =====================================================
  // CLOSE ACTION MENU
  // =====================================================

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN");
  };

  // =====================================================
  // DISCOUNT
  // =====================================================

  const getDiscount = (coupon) => {
    if (coupon.discountType === "percentage") {
      return `${coupon.discountValue}%`;
    }

    return `₹${Number(
      coupon.discountValue || 0,
    ).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // MINIMUM ORDER
  // =====================================================

  const getMinimumOrder = (coupon) => {
    return `₹${Number(
      coupon.minimumOrderAmount || 0,
    ).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Paper
      elevation={2}
      sx={{
        mt: 4,
        borderRadius: 3,
        overflow: "hidden",

        bgcolor: darkMode
          ? "#252525"
          : "#FFFFFF",

        color: darkMode
          ? "#FFFFFF"
          : "#222",
      }}
    >
      <Table
        sx={{
          "& .MuiTableCell-root": {
            color: darkMode
              ? "#F5F5F5"
              : "#222",

            borderBottom: darkMode
              ? "1px solid #454545"
              : "1px solid #EAEAEA",
          },
        }}
      >
        {/* =====================================================
            TABLE HEADER
        ===================================================== */}

        <TableHead>
          <TableRow
            sx={{
              bgcolor: darkMode
                ? "#303030"
                : "#F8F5F1",
            }}
          >
            {[
              "#",
              "Coupon",
              "Discount",
              "Minimum Order",
              "Validity",
              "Usage",
              "Status",
              "Actions",
            ].map((item) => (
              <TableCell
                key={item}
                align={
                  item === "Actions"
                    ? "center"
                    : "left"
                }
                sx={{
                  fontWeight: 700,
                  color: darkMode
                    ? "#FFFFFF"
                    : "#222",
                }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* =====================================================
            TABLE BODY
        ===================================================== */}

        <TableBody>
          {coupons.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                align="center"
                sx={{
                  py: 8,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: darkMode
                      ? "#FFFFFF"
                      : "#555",
                  }}
                >
                  No coupons found
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    color: darkMode
                      ? "#BDBDBD"
                      : "#888",
                  }}
                >
                  Try another search or add a
                  new coupon.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            coupons.map((coupon, index) => (
              <TableRow
                key={coupon._id || coupon.id || index}
                hover
                sx={{
                  transition: ".25s",

                  "&:hover": {
                    bgcolor: darkMode
                      ? "#2F2F2F"
                      : "#FAF7F4",
                  },
                }}
              >
                {/* =================================================
                    NUMBER
                ================================================= */}

                <TableCell>
                  {index + 1}
                </TableCell>

                {/* =================================================
                    COUPON
                ================================================= */}

                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: darkMode
                        ? "#FFFFFF"
                        : "#1E2F2B",
                    }}
                  >
                    {coupon.code || "-"}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.3,
                      fontSize: 13,
                      color: darkMode
                        ? "#BDBDBD"
                        : "#777",

                      maxWidth: 250,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {coupon.description || "-"}
                  </Typography>
                </TableCell>

                {/* =================================================
                    DISCOUNT
                ================================================= */}

                <TableCell>
                  <Chip
                    label={getDiscount(coupon)}
                    size="small"
                    sx={{
                      fontWeight: 600,

                      color: darkMode
                        ? "#FFFFFF"
                        : "#6B4E3D",

                      backgroundColor:
                        darkMode
                          ? "#3D322B"
                          : "#F4E7DD",
                    }}
                  />
                </TableCell>

                {/* =================================================
                    MINIMUM ORDER
                ================================================= */}

                <TableCell>
                  {getMinimumOrder(coupon)}
                </TableCell>

                {/* =================================================
                    VALIDITY
                ================================================= */}

                <TableCell>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: darkMode
                          ? "#F5F5F5"
                          : "#333",
                      }}
                    >
                      {formatDate(
                        coupon.startDate,
                      )}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 13,
                        color: darkMode
                          ? "#BDBDBD"
                          : "#777",
                      }}
                    >
                      to{" "}
                      {formatDate(
                        coupon.expiryDate,
                      )}
                    </Typography>
                  </Box>
                </TableCell>

                {/* =================================================
                    USAGE
                ================================================= */}

                <TableCell>
                  <Typography
                    sx={{
                      color: darkMode
                        ? "#F5F5F5"
                        : "#333",

                      fontWeight: 500,
                    }}
                  >
                    {coupon.usedCount || 0}
                    {" / "}
                    {coupon.usageLimit ?? "∞"}
                  </Typography>
                </TableCell>

                {/* =================================================
                    STATUS
                ================================================= */}

                <TableCell>
                  <Chip
                    label={
                      coupon.isActive
                        ? "Active"
                        : "Inactive"
                    }
                    size="small"
                    color={
                      coupon.isActive
                        ? "success"
                        : "default"
                    }
                    sx={{
                      fontWeight: 600,
                    }}
                  />
                </TableCell>

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <TableCell align="center">
                  <IconButton
                    onClick={(event) =>
                      handleMenu(
                        event,
                        coupon,
                      )
                    }
                    sx={{
                      color: darkMode
                        ? "#F5F5F5"
                        : "#444",

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
            ))
          )}
        </TableBody>
      </Table>

      {/* =====================================================
          ACTION MENU
      ===================================================== */}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 200,
            mt: 1,
            borderRadius: 2,

            bgcolor: darkMode
              ? "#2B2B2B"
              : "#FFFFFF",

            color: darkMode
              ? "#FFFFFF"
              : "#222",

            border: darkMode
              ? "1px solid #3D3D3D"
              : "1px solid #EAEAEA",

            boxShadow: darkMode
              ? "0 10px 30px rgba(0,0,0,.45)"
              : "0 10px 30px rgba(0,0,0,.12)",
          },
        }}
      >
        {/* =================================================
            VIEW
        ================================================= */}

        <MenuItem
          onClick={() => {
            if (selectedRow) {
              onView(selectedRow);
            }

            handleClose();
          }}
          sx={{
            py: 1.2,

            color: darkMode
              ? "#F5F5F5"
              : "#222",

            "&:hover": {
              bgcolor: darkMode
                ? "#383838"
                : "#F8F5F1",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: darkMode
                ? "#F5F5F5"
                : "#555",
            }}
          >
            <VisibilityOutlinedIcon
              fontSize="small"
            />
          </ListItemIcon>

          <ListItemText>
            Show
          </ListItemText>
        </MenuItem>

        {/* =================================================
            EDIT
        ================================================= */}

        <MenuItem
          onClick={() => {
            if (selectedRow) {
              onEdit(selectedRow);
            }

            handleClose();
          }}
          sx={{
            py: 1.2,

            color: darkMode
              ? "#F5F5F5"
              : "#222",

            "&:hover": {
              bgcolor: darkMode
                ? "#383838"
                : "#F8F5F1",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: darkMode
                ? "#F5F5F5"
                : "#555",
            }}
          >
            <EditOutlinedIcon
              fontSize="small"
            />
          </ListItemIcon>

          <ListItemText>
            Edit
          </ListItemText>
        </MenuItem>

        {/* =================================================
            DELETE
        ================================================= */}

        <MenuItem
          onClick={() => {
            if (selectedRow) {
              onDelete(selectedRow);
            }

            handleClose();
          }}
          sx={{
            py: 1.2,
            color: "#EF5350",

            "&:hover": {
              bgcolor: darkMode
                ? "#3A2626"
                : "#FFF5F5",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "#EF5350",
            }}
          >
            <DeleteOutlineOutlinedIcon
              fontSize="small"
            />
          </ListItemIcon>

          <ListItemText>
            Delete
          </ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default CouponTable;