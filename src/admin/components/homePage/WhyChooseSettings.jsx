import React from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import SectionCard from "./SectionCard";
import ImageUrlField from "./ImageUrlField";
import CustomTextField from "../../../components/common/CustomTextField";

const WhyChooseSettings = ({
  whyChoose,
  darkMode,
  fieldGridStyle,
  updateSection,
  updateListItem,
  removeListItem,
  addListItem,
}) => {
  return (
    <Stack spacing={3}>
      <SectionCard
        title="Why GlowCare"
        description="Edit the image, heading, trust card, and feature points."
        darkMode={darkMode}
      >
        <Stack spacing={3}>
          {/* =====================================================
              MAIN IMAGE
          ===================================================== */}

          <ImageUrlField
            label="Main Section Image URL"
            value={whyChoose.image}
            darkMode={darkMode}
            onChange={(value) => updateSection("whyChoose", "image", value)}
          />

          {/* =====================================================
              MAIN FIELDS
          ===================================================== */}

          <Box sx={fieldGridStyle}>
            <CustomTextField
              label="Small Heading"
              value={whyChoose.eyebrow}
              onChange={(event) =>
                updateSection("whyChoose", "eyebrow", event.target.value)
              }
            />

            <CustomTextField
              label="Main Heading"
              value={whyChoose.title}
              onChange={(event) =>
                updateSection("whyChoose", "title", event.target.value)
              }
              helperText="Use Enter for a new line."
              multiline
              minRows={2}
            />

            <CustomTextField
              label="Trusted Card Title"
              value={whyChoose.trustTitle}
              onChange={(event) =>
                updateSection("whyChoose", "trustTitle", event.target.value)
              }
            />

            <CustomTextField
              label="Trusted Card Subtitle"
              value={whyChoose.trustSubtitle}
              onChange={(event) =>
                updateSection("whyChoose", "trustSubtitle", event.target.value)
              }
            />
          </Box>

          {/* =====================================================
              DESCRIPTION
          ===================================================== */}

          <CustomTextField
            fullWidth
            label="Description"
            value={whyChoose.description}
            onChange={(event) =>
              updateSection("whyChoose", "description", event.target.value)
            }
            multiline
            minRows={4}
          />

          <Divider />

          {/* =====================================================
              FEATURE TITLE
          ===================================================== */}

          <Typography fontWeight={700} color={darkMode ? "#FFFFFF" : "#222"}>
            Feature Points
          </Typography>

          {/* =====================================================
              FEATURES
          ===================================================== */}

          <Stack spacing={2}>
            {whyChoose.features.map((feature, index) => (
              <Paper
                key={feature.id}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: darkMode ? "#1E1E1E" : "#FAF7F4",
                  border: "1px solid",
                  borderColor: darkMode ? "#414141" : "#E7DDD2",
                }}
              >
                {/* FEATURE HEADER */}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Chip
                    label={`Feature ${index + 1}`}
                    sx={{
                      fontWeight: 700,
                      backgroundColor: darkMode ? "#3D322B" : "#F4E7DD",
                      color: darkMode ? "#FFFFFF" : "#6B4E3D",
                    }}
                  />

                  {whyChoose.features.length > 1 && (
                    <IconButton
                      color="error"
                      onClick={() =>
                        removeListItem("whyChoose", "features", index)
                      }
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  )}
                </Box>

                {/* FEATURE FIELDS */}

                <Box sx={fieldGridStyle}>
                  <CustomTextField
                    label="Number"
                    value={feature.id}
                    onChange={(event) =>
                      updateListItem(
                        "whyChoose",
                        "features",
                        index,
                        "id",
                        event.target.value,
                      )
                    }
                  />

                  <CustomTextField
                    label="Feature Title"
                    value={feature.title}
                    onChange={(event) =>
                      updateListItem(
                        "whyChoose",
                        "features",
                        index,
                        "title",
                        event.target.value,
                      )
                    }
                  />
                </Box>

                {/* FEATURE DESCRIPTION */}

                <CustomTextField
                  fullWidth
                  label="Feature Description"
                  value={feature.description}
                  onChange={(event) =>
                    updateListItem(
                      "whyChoose",
                      "features",
                      index,
                      "description",
                      event.target.value,
                    )
                  }
                  multiline
                  minRows={3}
                  sx={{
                    mt: 2,
                  }}
                />
              </Paper>
            ))}
          </Stack>

          {/* =====================================================
              ADD FEATURE
          ===================================================== */}

          <Button
            variant="outlined"
            startIcon={<AddRoundedIcon />}
            onClick={() =>
              addListItem("whyChoose", "features", {
                id: String(whyChoose.features.length + 1).padStart(2, "0"),
                title: "New Feature",
                description: "",
              })
            }
            sx={{
              alignSelf: "flex-start",
              textTransform: "none",
              color: "#B89478",
              borderColor: "#B89478",
            }}
          >
            Add Feature
          </Button>
        </Stack>
      </SectionCard>
    </Stack>
  );
};

export default WhyChooseSettings;
