import React from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import SectionCard from "./SectionCard";
import ImageUrlField from "./ImageUrlField";
import CustomTextField from "../../../components/common/CustomTextField";

const createId = () => `hero-${crypto.randomUUID?.() || Date.now()}`;

const HeroSettings = ({
  hero,
  darkMode,
  inputStyle,
  fieldGridStyle,
  updateListItem,
  addListItem,
  removeListItem,
}) => {
  return (
    <SectionCard
      title="Hero Banners"
      description="Edit the homepage slider images, text, buttons, and text positions."
      darkMode={darkMode}
    >
      <Stack spacing={3}>
        {hero.slides.map((slide, index) => (
          <Paper
            key={slide.id}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: darkMode ? "#1E1E1E" : "#FAF7F4",
              border: "1px solid",
              borderColor: darkMode ? "#414141" : "#E7DDD2",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <Chip
                label={`Banner ${index + 1}`}
                sx={{
                  fontWeight: 700,
                  backgroundColor: darkMode ? "#3D322B" : "#F4E7DD",
                  color: darkMode ? "#FFFFFF" : "#6B4E3D",
                }}
              />

              {hero.slides.length > 1 && (
                <IconButton
                  color="error"
                  onClick={() => removeListItem("hero", "slides", index)}
                >
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              )}
            </Box>

            <Stack spacing={2}>
              <ImageUrlField
                label="Banner Image URL"
                value={slide.image}
                darkMode={darkMode}
                onChange={(value) =>
                  updateListItem("hero", "slides", index, "image", value)
                }
              />

              <Box sx={fieldGridStyle}>
                {/* HEADING */}
                <CustomTextField
                  label="Heading"
                  value={slide.title}
                  onChange={(event) =>
                    updateListItem(
                      "hero",
                      "slides",
                      index,
                      "title",
                      event.target.value,
                    )
                  }
                  helperText="Use Enter for a new line."
                  multiline
                  rows={2}
                  sx={inputStyle}
                />

                {/* SUBTITLE */}
                <CustomTextField
                  label="Subtitle"
                  value={slide.subtitle}
                  onChange={(event) =>
                    updateListItem(
                      "hero",
                      "slides",
                      index,
                      "subtitle",
                      event.target.value,
                    )
                  }
                  helperText="Use Enter for a new line."
                  multiline
                  rows={2}
                  sx={inputStyle}
                />

                {/* BUTTON LABEL */}
                <CustomTextField
                  label="Button Label"
                  value={slide.buttonLabel}
                  onChange={(event) =>
                    updateListItem(
                      "hero",
                      "slides",
                      index,
                      "buttonLabel",
                      event.target.value,
                    )
                  }
                  sx={inputStyle}
                />

                {/* BUTTON LINK */}
                <CustomTextField
                  label="Button Link"
                  value={slide.buttonLink}
                  onChange={(event) =>
                    updateListItem(
                      "hero",
                      "slides",
                      index,
                      "buttonLink",
                      event.target.value,
                    )
                  }
                  placeholder="/shop"
                  sx={inputStyle}
                />

                {/* TEXT POSITION */}
                <CustomTextField
                  select
                  label="Text Position"
                  value={slide.contentPosition}
                  onChange={(event) =>
                    updateListItem(
                      "hero",
                      "slides",
                      index,
                      "contentPosition",
                      event.target.value,
                    )
                  }
                  sx={inputStyle}
                >
                  <MenuItem value="left">Left</MenuItem>

                  <MenuItem value="center">Center</MenuItem>

                  <MenuItem value="right">Right</MenuItem>
                </CustomTextField>
              </Box>
            </Stack>
          </Paper>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddRoundedIcon />}
          onClick={() =>
            addListItem("hero", "slides", {
              id: createId(),
              image: "",
              title: "",
              subtitle: "",
              buttonLabel: "Shop Now",
              buttonLink: "/shop",
              contentPosition: "center",
            })
          }
          sx={{
            alignSelf: "flex-start",
            textTransform: "none",
            color: "#B89478",
            borderColor: "#B89478",
          }}
        >
          Add Banner
        </Button>
      </Stack>
    </SectionCard>
  );
};

export default HeroSettings;
