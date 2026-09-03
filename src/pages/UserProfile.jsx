import React from "react";
import { Box } from "@mui/material";
import { useLocation, Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import AccountSidebar from "../components/userprofile/AccountSidebar";
import MyProfile from "../components/userprofile/MyProfile";
import MyOrders from "../components/userprofile/MyOrders";
import Address from "../components/userprofile/Address";
import Coupons from "../components/userprofile/Coupons";
import HelpCenter from "../components/userprofile/HelpCenter";
import TermsConditions from "../components/userprofile/TermsConditions";
import PrivacyPolicy from "../components/userprofile/PrivacyPolicy";

const UserProfile = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/user/profile":
        return <MyProfile />;

      case "/user/orders":
        return <MyOrders />;

      case "/user/address":
        return <Address />;

      case "/user/coupons":
        return <Coupons />;

      case "/user/help-center":
        return <HelpCenter />;

      case "/user/terms-conditions":
        return <TermsConditions />;

      case "/user/privacy-policy":
        return <PrivacyPolicy />;

      case "/user":
        return <Navigate to="/user/profile" replace />;

      default:
        return <Navigate to="/user/profile" replace />;
    }
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          backgroundColor: "#F8F5F1",
          minHeight: "100vh",
          mt: 8,
          py: 5,
          px: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 5,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-start",

            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          {/* SIDEBAR */}

          <Box
            sx={{
              width: {
                xs: "100%",
                md: 320,
              },
              flexShrink: 0,
            }}
          >
            <AccountSidebar />
          </Box>

          {/* CONTENT */}

          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              width: "100%",
            }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default UserProfile;
