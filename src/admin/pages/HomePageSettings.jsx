import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Breadcrumbs,
  CircularProgress,
  Link,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import HeroSettings from "../components/homePage/HeroSettings";
import CategorySettings from "../components/homePage/CategorySettings";
import WhyChooseSettings from "../components/homePage/WhyChooseSettings";
import FloatingShowcaseSettings from "../components/homePage/FloatingShowcaseSettings";
import NewsletterSettings from "../components/homePage/NewsletterSettings";
import ReviewsSettings from "../components/homePage/ReviewsSettings";

import { useThemeContext } from "../context/ThemeContext";

import {
  getHomePageSettings,
  resetHomePageSettings,
  saveHomePageSettings,
} from "../../database/homePageService";

import {
  getDefaultHomePageSettings,
  mergeHomePageSettings,
} from "../../data/homePageDefaults";

const HomePageSettings = () => {
  const { darkMode } = useThemeContext();
  const navigate = useNavigate();

  const [settings, setSettings] = useState(() => getDefaultHomePageSettings());

  const [activeTab, setActiveTab] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const inputStyle = {
    "& .MuiInputLabel-root": {
      color: darkMode ? "#BDBDBD" : "#666",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#B89478",
    },

    "& .MuiOutlinedInput-root": {
      color: darkMode ? "#FFFFFF" : "#222",
      backgroundColor: darkMode ? "#2F2F2F" : "#FFFFFF",

      "& fieldset": {
        borderColor: darkMode ? "#555" : "#D8D0C8",
      },

      "&:hover fieldset": {
        borderColor: "#B89478",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#B89478",
      },
    },
  };

  const fieldGridStyle = {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "repeat(2, minmax(0, 1fr))",
    },
    gap: 2,
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await getHomePageSettings();

        if (savedSettings) {
          const { id, updatedAt, ...homePageSettings } = savedSettings;

          setSettings(mergeHomePageSettings(homePageSettings));
        } else {
          setSettings(getDefaultHomePageSettings());
        }
      } catch (error) {
        console.error("Error loading homepage settings:", error);

        setNotice({
          type: "error",
          text: "Could not load saved homepage settings.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSection = (sectionName, field, value) => {
    setSettings((previous) => ({
      ...previous,

      [sectionName]: {
        ...previous[sectionName],
        [field]: value,
      },
    }));
  };

  const updateListItem = (sectionName, listName, index, field, value) => {
    setSettings((previous) => ({
      ...previous,

      [sectionName]: {
        ...previous[sectionName],

        [listName]: previous[sectionName][listName].map((item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                [field]: value,
              }
            : item,
        ),
      },
    }));
  };

  const addListItem = (sectionName, listName, newItem) => {
    setSettings((previous) => ({
      ...previous,

      [sectionName]: {
        ...previous[sectionName],

        [listName]: [...previous[sectionName][listName], newItem],
      },
    }));
  };

  const removeListItem = (sectionName, listName, index) => {
    setSettings((previous) => ({
      ...previous,

      [sectionName]: {
        ...previous[sectionName],

        [listName]: previous[sectionName][listName].filter(
          (_, itemIndex) => itemIndex !== index,
        ),
      },
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setNotice(null);

      await saveHomePageSettings(settings);

      setNotice({
        type: "success",
        text: "Homepage changes saved successfully.",
      });
    } catch (error) {
      console.error("Error saving homepage settings:", error);

      setNotice({
        type: "error",
        text: "Homepage changes could not be saved. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    const shouldReset = window.confirm(
      "Reset all homepage settings to the original design?",
    );

    if (!shouldReset) return;

    try {
      await resetHomePageSettings();

      setSettings(getDefaultHomePageSettings());

      setNotice({
        type: "success",
        text: "Homepage settings were reset to the original design.",
      });
    } catch (error) {
      console.error("Error resetting homepage settings:", error);

      setNotice({
        type: "error",
        text: "Homepage settings could not be reset.",
      });
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <AdminSidebar />

        <Box
          sx={{
            flex: 1,
            ml: "300px",
            minHeight: "100vh",
            backgroundColor: darkMode ? "#181818" : "#F7F5F2",
          }}
        >
          <AdminNavbar />

          <Box
            sx={{
              minHeight: "calc(100vh - 70px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "#B89478" }} />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      <Box
        sx={{
          flex: 1,
          ml: "300px",
          minHeight: "100vh",
          backgroundColor: darkMode ? "#181818" : "#F7F5F2",
          mt: "70px",
        }}
      >
        <AdminNavbar />

        <Box
          sx={{
            p: { xs: 2, md: 4 },
            pt: "105px",
            maxWidth: 1600,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
              mb: 4,
            }}
          >
            <Box>
              <Breadcrumbs
                separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
                sx={{ mb: 3 }}
              >
                <Link
                  underline="hover"
                  onClick={() => navigate("/admin/dashboard")}
                  sx={{
                    cursor: "pointer",
                    color: darkMode ? "#AFAFAF" : "#777",
                    fontSize: 14,

                    "&:hover": {
                      color: "#B89478",
                    },
                  }}
                >
                  Dashboard
                </Link>

                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: darkMode ? "#fff" : "#474040",
                  }}
                >
                  Home Page Manager
                </Typography>
              </Breadcrumbs>

              <Typography
                sx={{
                  mt: 1,
                  color: darkMode ? "#BDBDBD" : "#777",
                }}
              >
                Manage homepage text, banners, images, and category cards.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<RestartAltRoundedIcon />}
                onClick={handleReset}
                disabled={isSaving}
                sx={{
                  textTransform: "none",
                  borderColor: "#B89478",
                  color: "#B89478",

                  "&:hover": {
                    borderColor: "#A88366",
                    backgroundColor: "rgba(184,148,120,.08)",
                  },
                }}
              >
                Reset Default
              </Button>

              <Button
                variant="contained"
                startIcon={
                  isSaving ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <SaveRoundedIcon />
                  )
                }
                onClick={handleSave}
                disabled={isSaving}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#B89478",
                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: "#A88366",
                    boxShadow: "none",
                  },
                }}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </Stack>
          </Box>

          {notice && (
            <Alert
              severity={notice.type}
              onClose={() => setNotice(null)}
              sx={{ mb: 3 }}
            >
              {notice.text}
            </Alert>
          )}

          <Paper
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: darkMode ? "#252525" : "#FFFFFF",
              border: "1px solid",
              borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                px: 1,

                "& .MuiTab-root": {
                  minHeight: 58,
                  textTransform: "none",
                  fontWeight: 600,
                  color: darkMode ? "#BDBDBD" : "#777",
                },

                "& .Mui-selected": {
                  color: "#B89478 !important",
                },

                "& .MuiTabs-indicator": {
                  backgroundColor: "#B89478",
                },
              }}
            >
              <Tab value="hero" label="Hero Banners" />
              <Tab value="categories" label="Popular Categories" />
              <Tab value="whyChoose" label="Why GlowCare" />
              <Tab value="floatingShowcase" label="Floating Collection" />
              <Tab value="newsletter" label="Newsletter" />
              <Tab value="reviews" label="Customer Reviews" />
            </Tabs>
          </Paper>

          {activeTab === "hero" && (
            <HeroSettings
              hero={settings.hero}
              darkMode={darkMode}
              inputStyle={inputStyle}
              fieldGridStyle={fieldGridStyle}
              updateListItem={updateListItem}
              addListItem={addListItem}
              removeListItem={removeListItem}
            />
          )}

          {activeTab === "categories" && (
            <CategorySettings
              categorySettings={settings.categories}
              darkMode={darkMode}
              inputStyle={inputStyle}
              fieldGridStyle={fieldGridStyle}
              updateSection={updateSection}
              updateListItem={updateListItem}
              addListItem={addListItem}
              removeListItem={removeListItem}
            />
          )}

          {activeTab === "whyChoose" && (
            <WhyChooseSettings
              whyChoose={settings.whyChoose}
              darkMode={darkMode}
              inputStyle={inputStyle}
              fieldGridStyle={fieldGridStyle}
              updateSection={updateSection}
              updateListItem={updateListItem}
              addListItem={addListItem}
              removeListItem={removeListItem}
            />
          )}

          {activeTab === "floatingShowcase" && (
            <FloatingShowcaseSettings
              floatingShowcase={settings.floatingShowcase}
              darkMode={darkMode}
              inputStyle={inputStyle}
              fieldGridStyle={fieldGridStyle}
              updateSection={updateSection}
              updateListItem={updateListItem}
              addListItem={addListItem}
              removeListItem={removeListItem}
            />
          )}

          {activeTab === "newsletter" && (
            <NewsletterSettings
              newsletter={settings.newsletter}
              darkMode={darkMode}
              inputStyle={inputStyle}
              fieldGridStyle={fieldGridStyle}
              updateSection={updateSection}
            />
          )}

          {activeTab === "reviews" && (
            <ReviewsSettings
              reviews={settings.reviews}
              darkMode={darkMode}
              inputStyle={inputStyle}
              fieldGridStyle={fieldGridStyle}
              updateSection={updateSection}
              updateListItem={updateListItem}
              addListItem={addListItem}
              removeListItem={removeListItem}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePageSettings;
