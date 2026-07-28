import React, { useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import DeleteOrder from "../components/DeleteOrder";
import UpdateOrderStatus from "../components/UpdateOrderStatus";
import OrderHeader from "../components/OrderHeader";
import OrderTable from "../components/OrderTable";
import OrderFilter from "../components/OrderFilter";
import ViewOrder from "../components/ViewOrder";

import { getOrders } from "../../database/orderService";
import { useThemeContext } from "../context/ThemeContext";

const Orders = () => {
  const { darkMode } = useThemeContext();

  /* ---------------- Orders ---------------- */

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };

    loadOrders();
  }, []);

  /* ---------------- Search ---------------- */

  const [searchTerm, setSearchTerm] = useState("");

  /* ---------------- Filter Drawer ---------------- */

  const [openFilter, setOpenFilter] = useState(false);

  /* ---------------- View Drawer ---------------- */

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openView, setOpenView] = useState(false);

  /* ---------------- Update Status Dialog ---------------- */

  const [openStatus, setOpenStatus] = useState(false);

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
          <OrderHeader
            totalOrders={orders.length}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onOpenFilter={() => setOpenFilter(true)}
          />

          <OrderTable
            orders={orders}
            searchTerm={searchTerm}
            setSelectedOrder={setSelectedOrder}
            setOpenView={setOpenView}
            setOpenStatus={setOpenStatus}
            setOpenDelete={setOpenDelete}
          />
        </Box>
      </Box>

      {/* Filter Drawer */}

      <OrderFilter open={openFilter} onClose={() => setOpenFilter(false)} />

      {/* View Order Drawer */}

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
        <ViewOrder order={selectedOrder} onClose={() => setOpenView(false)} />
      </Drawer>

      <UpdateOrderStatus
        open={openStatus}
        onClose={() => setOpenStatus(false)}
        order={selectedOrder}
        onStatusUpdated={(updatedOrder) => {
          setOrders((prev) =>
            prev.map((order) =>
              order.id === updatedOrder.id ? updatedOrder : order,
            ),
          );
        }}
      />

      <DeleteOrder
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        order={selectedOrder}
        onDelete={(id) => {
          setOrders((prev) => prev.filter((order) => order.id !== id));
        }}
      />
    </Box>
  );
};

export default Orders;
