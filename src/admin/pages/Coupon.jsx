import React, { useEffect, useState } from "react";

import {
  Box,
  Container,
  CircularProgress,
} from "@mui/material";

import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

import CouponHeader from "../components/coupon/CouponHeader";
import CouponFilter from "../components/coupon/CouponFilter";
import CouponTable from "../components/coupon/CouponTable";
import AddCoupon from "../components/coupon/AddCoupon";
import ViewCoupon from "../components/coupon/ViewCoupon";
import DeleteCoupon from "../components/coupon/DeleteCoupon";

import {
  getCoupons,
  addCoupon,
  updateCoupon,
  deleteCoupon,
} from "../../database/couponService";

import { useThemeContext } from "../context/ThemeContext";

const Coupon = () => {
  const { darkMode } = useThemeContext();

  // ====================================================
  // COUPONS
  // ====================================================

  const [coupons, setCoupons] = useState([]);

  const [loading, setLoading] = useState(true);

  // ====================================================
  // SEARCH
  // ====================================================

  const [search, setSearch] = useState("");

  // ====================================================
  // FILTER DRAWER
  // ====================================================

  const [openFilter, setOpenFilter] = useState(false);

  const [discountTypeFilter, setDiscountTypeFilter] =
    useState("All");

  const [sortBy, setSortBy] = useState("Newest");

  // ====================================================
  // ADD / VIEW / DELETE
  // ====================================================

  const [openAdd, setOpenAdd] = useState(false);

  const [openView, setOpenView] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [selectedCoupon, setSelectedCoupon] =
    useState(null);

  // ====================================================
  // LOAD COUPONS
  // ====================================================

  const loadCoupons = async () => {
    try {
      setLoading(true);

      const data = await getCoupons();

      setCoupons(data || []);
    } catch (error) {
      console.error(
        "Failed to load coupons:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  // ====================================================
  // SEARCH + FILTER + SORT
  // ====================================================

  const filteredCoupons = [...coupons]
    .filter((coupon) => {
      // -------------------------------
      // SEARCH
      // -------------------------------

      const searchValue = search
        .trim()
        .toLowerCase();

      const matchesSearch =
        !searchValue ||
        coupon.code
          ?.toLowerCase()
          .includes(searchValue) ||
        coupon.description
          ?.toLowerCase()
          .includes(searchValue);

      // -------------------------------
      // DISCOUNT TYPE
      // -------------------------------

      const matchesDiscountType =
        discountTypeFilter === "All"
          ? true
          : coupon.discountType ===
            discountTypeFilter;

      return (
        matchesSearch &&
        matchesDiscountType
      );
    })
    .sort((a, b) => {
      // -------------------------------
      // NEWEST
      // -------------------------------

      if (sortBy === "Newest") {
        return (
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
        );
      }

      // -------------------------------
      // OLDEST
      // -------------------------------

      if (sortBy === "Oldest") {
        return (
          new Date(a.createdAt || 0) -
          new Date(b.createdAt || 0)
        );
      }

      // -------------------------------
      // A-Z
      // -------------------------------

      if (sortBy === "A-Z") {
        return String(a.code || "")
          .toLowerCase()
          .localeCompare(
            String(b.code || "").toLowerCase(),
          );
      }

      // -------------------------------
      // Z-A
      // -------------------------------

      if (sortBy === "Z-A") {
        return String(b.code || "")
          .toLowerCase()
          .localeCompare(
            String(a.code || "").toLowerCase(),
          );
      }

      return 0;
    });

  // ====================================================
  // ADD COUPON
  // ====================================================

  const handleAddCoupon = async (couponData) => {
    try {
      await addCoupon(couponData);

      setOpenAdd(false);
      setSelectedCoupon(null);

      await loadCoupons();
    } catch (error) {
      console.error(
        "Failed to add coupon:",
        error,
      );

      throw error;
    }
  };

  // ====================================================
  // VIEW COUPON
  // ====================================================

  const handleView = (coupon) => {
    setSelectedCoupon(coupon);
    setOpenView(true);
  };

  // ====================================================
  // EDIT COUPON
  // ====================================================

  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setOpenAdd(true);
  };

  // ====================================================
  // DELETE CLICK
  // ====================================================

  const handleDeleteClick = (coupon) => {
    setSelectedCoupon(coupon);
    setOpenDelete(true);
  };

  // ====================================================
  // DELETE COUPON
  // ====================================================

  const handleDelete = async () => {
    if (!selectedCoupon) return;

    try {
      await deleteCoupon(
        selectedCoupon._id,
      );

      setOpenDelete(false);
      setSelectedCoupon(null);

      await loadCoupons();
    } catch (error) {
      console.error(
        "Failed to delete coupon:",
        error,
      );
    }
  };

  // ====================================================
  // UPDATE COUPON
  // ====================================================

  const handleUpdateCoupon = async (
    couponData,
  ) => {
    if (!selectedCoupon) return;

    try {
      await updateCoupon(
        selectedCoupon._id,
        couponData,
      );

      setOpenAdd(false);
      setSelectedCoupon(null);

      await loadCoupons();
    } catch (error) {
      console.error(
        "Failed to update coupon:",
        error,
      );

      throw error;
    }
  };

  // ====================================================
  // OPEN ADD COUPON
  // ====================================================

  const handleOpenAdd = () => {
    setSelectedCoupon(null);
    setOpenAdd(true);
  };

  // ====================================================
  // CLOSE ADD / EDIT
  // ====================================================

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setSelectedCoupon(null);
  };

  // ====================================================
  // CLOSE VIEW
  // ====================================================

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedCoupon(null);
  };

  // ====================================================
  // CLOSE DELETE
  // ====================================================

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedCoupon(null);
  };

  // ====================================================
  // RESET FILTER
  // ====================================================

  const handleResetFilter = () => {
    setDiscountTypeFilter("All");
    setSortBy("Newest");
  };

  // ====================================================
  // RETURN
  // ====================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",

        backgroundColor: darkMode
          ? "#1E1E1E"
          : "#FCFAF7",

        color: darkMode
          ? "#FFFFFF"
          : "#222",

        transition:
          "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* ==================================================
          ADMIN SIDEBAR
      ================================================== */}

      <AdminSidebar />

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <Box
        sx={{
          marginLeft: "300px",

          minHeight: "100vh",

          backgroundColor: darkMode
            ? "#1E1E1E"
            : "#FCFAF7",

          transition:
            "background-color 0.3s ease",
        }}
      >
        {/* ==================================================
            ADMIN NAVBAR
        ================================================== */}

        <AdminNavbar />

        {/* ==================================================
            COUPON CONTENT
        ================================================== */}

        <Box
          sx={{
            pt: 10,

            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            pb: 5,
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              px: {
                xs: 0,
                sm: 1,
                md: 2,
              },
            }}
          >
            {/* ==================================================
                COUPON HEADER
            ================================================== */}

            <CouponHeader
              search={search}
              setSearch={setSearch}
              onAdd={handleOpenAdd}
              onOpenFilter={() =>
                setOpenFilter(true)
              }
            />

            {/* ==================================================
                COUPON TABLE
            ================================================== */}

            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "center",
                  alignItems: "center",
                  py: 10,
                }}
              >
                <CircularProgress
                  sx={{
                    color: "#B89478",
                  }}
                />
              </Box>
            ) : (
              <CouponTable
                coupons={filteredCoupons}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={
                  handleDeleteClick
                }
              />
            )}
          </Container>
        </Box>
      </Box>

      {/* ==================================================
          FILTER DRAWER
      ================================================== */}

      <CouponFilter
        open={openFilter}
        onClose={() =>
          setOpenFilter(false)
        }
        discountTypeFilter={
          discountTypeFilter
        }
        setDiscountTypeFilter={
          setDiscountTypeFilter
        }
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleResetFilter}
      />

      {/* ==================================================
          ADD / EDIT COUPON
      ================================================== */}

      <AddCoupon
        open={openAdd}
        onClose={handleCloseAdd}
        coupon={selectedCoupon}
        onSave={
          selectedCoupon
            ? handleUpdateCoupon
            : handleAddCoupon
        }
      />

      {/* ==================================================
          VIEW COUPON
      ================================================== */}

      <ViewCoupon
        open={openView}
        onClose={handleCloseView}
        coupon={selectedCoupon}
      />

      {/* ==================================================
          DELETE COUPON
      ================================================== */}

      <DeleteCoupon
        open={openDelete}
        onClose={handleCloseDelete}
        coupon={selectedCoupon}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default Coupon;