import React, { useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import DeleteOrder from "../components/order/DeleteOrder";
import UpdateOrderStatus from "../components/order/UpdateOrderStatus";
import OrderHeader from "../components/order/OrderHeader";
import OrderTable from "../components/order/OrderTable";
import OrderFilter from "../components/order/OrderFilter";
import ViewOrder from "../components/order/ViewOrder";

import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../database/orderService";

import { useThemeContext } from "../context/ThemeContext";

const Orders = () => {
  const { darkMode } = useThemeContext();

  // ======================================================
  // ORDERS
  // ======================================================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrders();

      setOrders(data || []);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ======================================================
  // SEARCH
  // ======================================================

  const [searchTerm, setSearchTerm] = useState("");

  // ======================================================
  // FILTER DRAWER
  // ======================================================

  const [openFilter, setOpenFilter] = useState(false);

  // ======================================================
  // VIEW ORDER
  // ======================================================

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openView, setOpenView] = useState(false);

  // ======================================================
  // UPDATE STATUS
  // ======================================================

  const [openStatus, setOpenStatus] = useState(false);

  // ======================================================
  // DELETE ORDER
  // ======================================================

  const [openDelete, setOpenDelete] = useState(false);

  // ======================================================
  // HANDLE STATUS UPDATE
  // ======================================================

  const handleStatusUpdated = async (updatedData) => {
    try {
      const updatedOrder = await updateOrderStatus(
        selectedOrder._id || selectedOrder.id,
        updatedData.status,
        updatedData.paymentStatus,
      );

      setOrders((prev) =>
        prev.map((order) => {
          const orderId = order._id || order.id;
          const updatedId = updatedOrder._id || updatedOrder.id;

          return orderId === updatedId ? updatedOrder : order;
        }),
      );

      setSelectedOrder(updatedOrder);
      setOpenStatus(false);
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  // ======================================================
  // HANDLE DELETE
  // ======================================================

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);

      setOrders((prev) =>
        prev.filter((order) => {
          const orderId = order._id || order.id;
          return orderId !== id;
        }),
      );

      setSelectedOrder(null);
      setOpenDelete(false);
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
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
          backgroundColor: darkMode ? "#181818" : "#F7F5F2",
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
          <OrderHeader
            totalOrders={orders.length}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onOpenFilter={() => setOpenFilter(true)}
          />

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 300,
                color: darkMode ? "#fff" : "#555",
              }}
            >
              Loading orders...
            </Box>
          ) : (
            <OrderTable
              orders={orders}
              searchTerm={searchTerm}
              setSelectedOrder={setSelectedOrder}
              setOpenView={setOpenView}
              setOpenStatus={setOpenStatus}
              setOpenDelete={setOpenDelete}
            />
          )}
        </Box>
      </Box>

      {/* ==================================================
          FILTER
      ================================================== */}

      <OrderFilter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      />

      {/* ==================================================
          VIEW ORDER
      ================================================== */}

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
        <ViewOrder
          order={selectedOrder}
          onClose={() => setOpenView(false)}
        />
      </Drawer>

      {/* ==================================================
          UPDATE ORDER STATUS
      ================================================== */}

      <UpdateOrderStatus
        open={openStatus}
        onClose={() => setOpenStatus(false)}
        order={selectedOrder}
        onStatusUpdated={handleStatusUpdated}
      />

      {/* ==================================================
          DELETE ORDER
      ================================================== */}

      <DeleteOrder
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        order={selectedOrder}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default Orders;