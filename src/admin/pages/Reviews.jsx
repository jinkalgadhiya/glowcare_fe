import React from "react";
import { Box } from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useThemeContext } from "../context/ThemeContext";
import ReviewsComingSoon from "../components/ReviewsComingSoon";

const Reviews = () => {
  const { darkMode } = useThemeContext();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: darkMode ? "#181818" : "#F7F5F2",
        }}
      >
        {/* Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            pl: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReviewsComingSoon />
        </Box>
      </Box>
    </Box>
  );
};

export default Reviews;
