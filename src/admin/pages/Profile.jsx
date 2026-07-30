import React, { useEffect, useState } from "react";
import { Box, Dialog } from "@mui/material";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import ProfileHeader from "../components/ProfileHeader";
import AccountInfo from "../components/AccountInfo";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";

import { useThemeContext } from "../context/ThemeContext";

const Profile = () => {
  const { darkMode } = useThemeContext();

  const [admin, setAdmin] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    setAdmin(storedAdmin);
  }, []);

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
            maxWidth: 1500,
            mx: "auto",
          }}
        >
          <ProfileHeader onEdit={() => setOpenEdit(true)} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr",
                lg: "1fr 0.8fr",
              },
              gap: 4,
              mt: 4,
              alignItems: "stretch",
            }}
          >
            <AccountInfo admin={admin} />

            <ChangePassword admin={admin} onUpdated={setAdmin} />
          </Box>
        </Box>
      </Box>

      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="sm"
      >
        <EditProfile
          admin={admin}
          onClose={() => setOpenEdit(false)}
          onUpdated={(updatedAdmin) => {
            setAdmin(updatedAdmin);
          }}
        />
      </Dialog>
    </Box>
  );
};

export default Profile;
