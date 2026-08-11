import { useState } from "react";

import {
  Box,
  Tab,
  Tabs,
} from "@mui/material";

import ProductDescription from "./ProductDescription";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          mb: 4,

          borderBottom: "1px solid #ECE6DD",

          "& .MuiTabs-indicator": {
            backgroundColor: "#1E2F2B",
            height: 3,
            borderRadius: 10,
          },

          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            fontSize: 16,
            color: "#777",
            minHeight: 60,
            px: 4,
          },

          "& .Mui-selected": {
            color: "#1E2F2B !important",
          },
        }}
      >
        <Tab label="Description" />

        <Tab label="Ingredients" />

        <Tab label="Benefits" />

        <Tab label="How To Use" />

        <Tab label="Reviews" />
      </Tabs>

      <ProductDescription
        product={product}
        activeTab={activeTab}
      />
    </Box>
  );
};

export default ProductTabs;