import React, {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Drawer,
} from "@mui/material";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import ReturnHeader from "../components/return/ReturnHeader";
import ReturnTable from "../components/return/ReturnTable";
import ReturnFilter from "../components/return/ReturnFilter";
import ViewReturn from "../components/return/ViewReturn";

import UpdateReturnStatus from "../components/return/UpdateReturnStatus";

import DeleteReturn from "../components/return/DeleteReturn";

import {
  getReturnRequests,
  updateReturnStatus,
  deleteReturnRequest,
} from "../../database/returnService";

import { useThemeContext } from "../context/ThemeContext";

const Returns = () => {
  const { darkMode } =
    useThemeContext();

  // ======================================================
  // RETURNS
  // ======================================================

  const [
    returnRequests,
    setReturnRequests,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadReturnRequests =
    async () => {
      try {
        setLoading(true);

        const data =
          await getReturnRequests();

        setReturnRequests(
          Array.isArray(data)
            ? data
            : [],
        );
      } catch (error) {
        console.error(
          "Failed to load return requests:",
          error,
        );

        setReturnRequests([]);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadReturnRequests();
  }, []);

  // ======================================================
  // SEARCH
  // ======================================================

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  // ======================================================
  // FILTER
  // ======================================================

  const [
    openFilter,
    setOpenFilter,
  ] = useState(false);

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  const [
    refundFilter,
    setRefundFilter,
  ] = useState("All");

  const [
    sortBy,
    setSortBy,
  ] = useState("Newest");

  // ======================================================
  // SELECTED RETURN
  // ======================================================

  const [
    selectedReturn,
    setSelectedReturn,
  ] = useState(null);

  // ======================================================
  // VIEW RETURN
  // ======================================================

  const [
    openView,
    setOpenView,
  ] = useState(false);

  // ======================================================
  // UPDATE RETURN STATUS
  // ======================================================

  const [
    openStatus,
    setOpenStatus,
  ] = useState(false);

  // ======================================================
  // DELETE RETURN
  // ======================================================

  const [
    openDelete,
    setOpenDelete,
  ] = useState(false);

  // ======================================================
  // HANDLE STATUS UPDATE
  // ======================================================

  const handleStatusUpdated =
    async (updatedData) => {
      try {
        if (!selectedReturn) return;

        const returnId =
          selectedReturn._id ||
          selectedReturn.id;

        if (!returnId) {
          console.error(
            "Return ID is missing",
          );

          return;
        }

        const updatedReturn =
          await updateReturnStatus(
            returnId,
            updatedData,
          );

        // Update table immediately

        setReturnRequests((prev) =>
          prev.map((item) => {
            const itemId =
              item._id ||
              item.id;

            const updatedId =
              updatedReturn._id ||
              updatedReturn.id;

            return itemId === updatedId
              ? updatedReturn
              : item;
          }),
        );

        // Update selected return

        setSelectedReturn(
          updatedReturn,
        );

        // Close dialog

        setOpenStatus(false);
      } catch (error) {
        console.error(
          "Failed to update return:",
          error,
        );
      }
    };

  // ======================================================
  // HANDLE DELETE RETURN
  // ======================================================

  const handleDeleteReturn =
    async () => {
      try {
        if (!selectedReturn) return;

        const returnId =
          selectedReturn._id ||
          selectedReturn.id;

        if (!returnId) {
          console.error(
            "Return ID is missing",
          );

          return;
        }

        // Delete from MongoDB

        await deleteReturnRequest(
          returnId,
        );

        // Remove from table immediately

        setReturnRequests((prev) =>
          prev.filter((item) => {
            const itemId =
              item._id ||
              item.id;

            return itemId !== returnId;
          }),
        );

        // Clear selected return

        setSelectedReturn(null);

        // Close delete dialog

        setOpenDelete(false);
      } catch (error) {
        console.error(
          "Failed to delete return:",
          error,
        );
      }
    };

  // ======================================================
  // RESET FILTER
  // ======================================================

  const handleResetFilter = () => {
    setStatusFilter("All");

    setRefundFilter("All");

    setSortBy("Newest");
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <AdminSidebar />

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <Box
        sx={{
          flex: 1,

          ml: "300px",

          backgroundColor:
            darkMode
              ? "#181818"
              : "#F7F5F2",

          minHeight: "100vh",
        }}
      >
        <AdminNavbar />

        <Box
          sx={{
            p: 4,

            pt: "90px",
          }}
        >
          {/* ==============================================
              HEADER
          ============================================== */}

          <ReturnHeader
            totalReturns={
              returnRequests.length
            }
            searchTerm={
              searchTerm
            }
            setSearchTerm={
              setSearchTerm
            }
            onOpenFilter={() =>
              setOpenFilter(true)
            }
          />

          {/* ==============================================
              LOADING / TABLE
          ============================================== */}

          {loading ? (
            <Box
              sx={{
                display: "flex",

                justifyContent:
                  "center",

                alignItems:
                  "center",

                minHeight: 300,

                color: darkMode
                  ? "#fff"
                  : "#555",
              }}
            >
              Loading return requests...
            </Box>
          ) : (
            <ReturnTable
              returns={
                returnRequests
              }
              searchTerm={
                searchTerm
              }
              statusFilter={
                statusFilter
              }
              refundFilter={
                refundFilter
              }
              sortBy={
                sortBy
              }
              setSelectedReturn={
                setSelectedReturn
              }
              setOpenView={
                setOpenView
              }
              setOpenStatus={
                setOpenStatus
              }
              setOpenDelete={
                setOpenDelete
              }
            />
          )}
        </Box>
      </Box>

      {/* ==================================================
          FILTER DRAWER
      ================================================== */}

      <ReturnFilter
        open={openFilter}
        onClose={() =>
          setOpenFilter(false)
        }
        statusFilter={
          statusFilter
        }
        setStatusFilter={
          setStatusFilter
        }
        refundFilter={
          refundFilter
        }
        setRefundFilter={
          setRefundFilter
        }
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={
          handleResetFilter
        }
      />

      {/* ==================================================
          VIEW RETURN
      ================================================== */}

      <Drawer
        anchor="right"
        open={openView}
        onClose={() =>
          setOpenView(false)
        }
        PaperProps={{
          sx: {
            width: 420,

            backgroundColor:
              darkMode
                ? "#252525"
                : "#fff",

            boxShadow:
              "-5px 0 25px rgba(0,0,0,.18)",
          },
        }}
      >
        <ViewReturn
          returnRequest={
            selectedReturn
          }
          onClose={() =>
            setOpenView(false)
          }
        />
      </Drawer>

      {/* ==================================================
          UPDATE RETURN STATUS
      ================================================== */}

      <UpdateReturnStatus
        open={openStatus}
        onClose={() =>
          setOpenStatus(false)
        }
        returnRequest={
          selectedReturn
        }
        onStatusUpdated={
          handleStatusUpdated
        }
      />

      {/* ==================================================
          DELETE RETURN
      ================================================== */}

      <DeleteReturn
        open={openDelete}
        onClose={() =>
          setOpenDelete(false)
        }
        returnRequest={
          selectedReturn
        }
        onDelete={
          handleDeleteReturn
        }
      />
    </Box>
  );
};

export default Returns;