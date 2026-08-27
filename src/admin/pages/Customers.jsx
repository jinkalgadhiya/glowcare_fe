import React, { useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import CustomerHeader from "../components/customer/CustomerHeader";
import CustomerFilter from "../components/customer/CustomerFilter";
import CustomerTable from "../components/customer/CustomerTable";
import ViewCustomer from "../components/customer/ViewCustomer";
import EditCustomer from "../components/customer/EditCustomer";
import DeleteCustomer from "../components/customer/DeleteCustomer";

import { getCustomers } from "../../database/userService";
import { useThemeContext } from "../context/ThemeContext";

const Customers = () => {
  const { darkMode } = useThemeContext();

  /* ---------------- Customers ---------------- */

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
  const loadCustomers = async () => {
    try {
      const data = await getCustomers();

      setCustomers(data);
    } catch (error) {
      console.error(
        "Error loading customers:",
        error
      );
    }
  };

  loadCustomers();
}, []);

  /* ---------------- Search ---------------- */

  const [searchTerm, setSearchTerm] = useState("");

  /* ---------------- Filter Drawer ---------------- */

  const [openFilter, setOpenFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  /* ---------------- View Drawer ---------------- */

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [openView, setOpenView] = useState(false);

  /* ---------------- Edit Dialog ---------------- */

  const [openEdit, setOpenEdit] = useState(false);

  /* ---------------- Delete Dialog ---------------- */

  const [openDelete, setOpenDelete] = useState(false);

  const filteredCustomers = customers
    .filter((customer) => {
      if (statusFilter === "All") return true;

      return customer.status === statusFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Newest":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "Oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "Name A → Z":
          return (a.fullName || "").localeCompare(b.fullName || "");

        case "Name Z → A":
          return (b.fullName || "").localeCompare(a.fullName || "");

        default:
          return 0;
      }
    });

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}

      <AdminSidebar />

      {/* Main Content */}

      <Box
        sx={{
          flex: 1,
          ml: "300px",
          backgroundColor: darkMode ? "#181818" : "#F7F5F2",
        }}
      >
        <AdminNavbar />

        <Box
          sx={{
            p: 4,
            pt: "90px",
          }}
        >
          <CustomerHeader
            totalCustomers={customers.length}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onOpenFilter={() => setOpenFilter(true)}
          />

          <CustomerTable
            customers={filteredCustomers}
            searchTerm={searchTerm}
            setSelectedCustomer={setSelectedCustomer}
            setOpenView={setOpenView}
            setOpenEdit={setOpenEdit}
            setOpenDelete={setOpenDelete}
          />
        </Box>
      </Box>

      {/* Filter Drawer */}

      <CustomerFilter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={() => {
          setStatusFilter("All");
          setSortBy("Newest");
        }}
      />

      {/* View Customer Drawer */}

      <Drawer
        anchor="right"
        open={openView}
        onClose={() => setOpenView(false)}
        PaperProps={{
          sx: {
            width: 420,
            backgroundColor: darkMode ? "#252525" : "#fff",
            boxShadow: "-5px 0 25px rgba(0,0,0,.18)",
          },
        }}
      >
        <ViewCustomer
          customer={selectedCustomer}
          onClose={() => setOpenView(false)}
        />
      </Drawer>

      {/* Edit Customer */}

      <EditCustomer
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        customer={selectedCustomer}
        onStatusUpdated={(updatedCustomer) => {
          setCustomers((prev) =>
            prev.map((customer) =>
              customer._id === updatedCustomer._id ? updatedCustomer : customer,
            ),
          );
        }}
      />

      {/* Delete Customer */}

      <DeleteCustomer
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        customer={selectedCustomer}
        onDelete={(id) => {
          setCustomers((prev) =>
            prev.filter((customer) => customer._id !== id),
          );
        }}
      />
    </Box>
  );
};

export default Customers;
