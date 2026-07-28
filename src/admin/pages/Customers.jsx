import React, { useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import CustomerHeader from "../components/CustomerHeader";
import CustomerFilter from "../components/CustomerFilter";
import CustomerTable from "../components/CustomerTable";
import ViewCustomer from "../components/ViewCustomer";
import EditCustomer from "../components/EditCustomer";
import DeleteCustomer from "../components/DeleteCustomer";

import { getCustomers } from "../../database/userService";
import { useThemeContext } from "../context/ThemeContext";

const Customers = () => {
  const { darkMode } = useThemeContext();

  /* ---------------- Customers ---------------- */

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadCustomers = async () => {
      const data = await getCustomers();
      setCustomers(data);
    };

    loadCustomers();
  }, []);

  /* ---------------- Search ---------------- */

  const [searchTerm, setSearchTerm] = useState("");

  /* ---------------- Filter Drawer ---------------- */

  const [openFilter, setOpenFilter] = useState(false);

  /* ---------------- View Drawer ---------------- */

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [openView, setOpenView] = useState(false);

  /* ---------------- Edit Dialog ---------------- */

  const [openEdit, setOpenEdit] = useState(false);

  /* ---------------- Delete Dialog ---------------- */

  const [openDelete, setOpenDelete] = useState(false);

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
            customers={customers}
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
              customer.id === updatedCustomer.id
                ? updatedCustomer
                : customer,
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
            prev.filter((customer) => customer.id !== id),
          );
        }}
      />
    </Box>
  );
};

export default Customers;