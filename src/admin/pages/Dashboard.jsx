import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";

import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useThemeContext } from "../context/ThemeContext";

const Dashboard = () => {
  const { darkMode } = useThemeContext();

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
          ml: "300px", // Same width as your sidebar
          backgroundColor: darkMode ? "#181818" : "#F7F5F2",
        }}
      >
        <AdminNavbar />

        <Box
          sx={{
            height: "calc(100vh - 72px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            pt: "95px",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              width: 500,
              textAlign: "center",
              p: 5,
              borderRadius: 4,
              backgroundColor: darkMode ? "#242424" : "#fff",
            }}
          >
            <ConstructionRoundedIcon
              sx={{
                fontSize: 70,
                color: "#B89478",
                mb: 2,
              }}
            />

            <Typography
              variant="h4"
              fontWeight={700}
              gutterBottom
              color={darkMode ? "#fff" : "#222"}
            >
              Dashboard Coming Soon
            </Typography>

            <Typography
              sx={{
                color: darkMode ? "#CFCFCF" : "#666",
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              We're currently building your GlowCare Admin Dashboard.
              <br />
              Product analytics, sales reports, customer insights, and inventory
              management will be available soon.
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#B89478",
                px: 4,
                py: 1.2,
                borderRadius: 3,

                "&:hover": {
                  backgroundColor: "#A88366",
                },
              }}
            >
              Stay Tuned
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
