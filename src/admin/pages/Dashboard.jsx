import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsCard from "../components/dashboard/StatsCard";
import LowStockProducts from "../components/dashboard/LowStockProducts";
import RecentOrders from "../components/dashboard/RecentOrders";

import { useThemeContext } from "../context/ThemeContext";

import { getProducts } from "../../database/productService";
import { getCategories } from "../../database/categoryService";
import { getOrders } from "../../database/orderService";
import { getUsers } from "../../database/userService";

const Dashboard = () => {
  const { darkMode } = useThemeContext();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [
          productsData,
          categoriesData,
          ordersData,
          customersData,
        ] = await Promise.all([
          getProducts(),
          getCategories(),
          getOrders(),
          getUsers(),
        ]);

        setProducts(productsData || []);
        setCategories(categoriesData || []);
        setOrders(ordersData || []);
        setCustomers(customersData || []);
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    loadDashboardData();
  }, []);

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: <Inventory2RoundedIcon />,
      path: "/admin/products",
    },
    {
      title: "Categories",
      value: categories.length,
      icon: <CategoryRoundedIcon />,
      path: "/admin/categories",
    },
    {
      title: "Customers",
      value: customers.length,
      icon: <PeopleAltRoundedIcon />,
      path: "/admin/customers",
    },
    {
      title: "Orders",
      value: orders.length,
      icon: <ShoppingCartRoundedIcon />,
      path: "/admin/orders",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <AdminSidebar />

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
            pt: "95px",
            px: 4,
            pb: 4,
            minHeight: "100vh",
            backgroundColor: darkMode ? "#181818" : "#F7F5F2",
          }}
        >
          {/* Welcome Banner */}

          <WelcomeBanner />

          {/* Stats Cards */}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2,1fr)",
                xl: "repeat(4,1fr)",
              },
              gap: 3,
              mt: 3,
              mb: 3,
            }}
          >
            {stats.map((item) => (
              <StatsCard
                key={item.title}
                {...item}
                darkMode={darkMode}
              />
            ))}
          </Box>

          {/* Dashboard Content */}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "380px 1fr",
              },
              gap: 3,
            }}
          >
            <LowStockProducts products={products} />

            <RecentOrders orders={orders} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;