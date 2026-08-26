import React from "react";

import {
  Box,
  Button,
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

const FloatingShowcaseSettings = ({
  floatingShowcase,
  darkMode,
  inputStyle,
  fieldGridStyle,
  updateSection,
  updateListItem,
  removeListItem,
  addListItem,
}) => {
  return (
    <Stack spacing={3}>
      <SectionCard
        title="Floating Collection"
        description="Manage the center text and the floating product images around it."
        darkMode={darkMode}
      >
        <Stack spacing={3}>
          <Box sx={fieldGridStyle}>
            <CustomTextField
              label="Small Heading"
              value={floatingShowcase.eyebrow}
              onChange={(e) =>
                updateSection("floatingShowcase", "eyebrow", e.target.value)
              }
              sx={inputStyle}
            />

            <CustomTextField
              label="Main Heading"
              value={floatingShowcase.title}
              onChange={(e) =>
                updateSection("floatingShowcase", "title", e.target.value)
              }
              multiline
              rows={2}
              helperText="Use Enter for a new line."
              sx={inputStyle}
            />

            <CustomTextField
              label="Button Label"
              value={floatingShowcase.buttonLabel}
              onChange={(e) =>
                updateSection("floatingShowcase", "buttonLabel", e.target.value)
              }
              sx={inputStyle}
            />

            <CustomTextField
              label="Button Link"
              value={floatingShowcase.buttonLink}
              onChange={(e) =>
                updateSection("floatingShowcase", "buttonLink", e.target.value)
              }
              placeholder="/shop"
              sx={inputStyle}
            />
          </Box>

          <CustomTextField
            fullWidth
            label="Description"
            value={floatingShowcase.description}
            onChange={(e) =>
              updateSection("floatingShowcase", "description", e.target.value)
            }
            multiline
            rows={4}
            sx={inputStyle}
          />

          <Divider />

          <Typography fontWeight={700} color={darkMode ? "#FFFFFF" : "#222"}>
            Floating Images
          </Typography>

          <Stack spacing={2}>
            {floatingShowcase.items.map((item, index) => (
              <Paper
                key={item.id}
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
                    mb: 2,
                  }}
                >
                  <Typography
                    fontWeight={700}
                    color={darkMode ? "#FFFFFF" : "#222"}
                  >
                    Floating Image {index + 1}
                  </Typography>

                  {floatingShowcase.items.length > 1 && (
                    <IconButton
                      color="error"
                      onClick={() =>
                        removeListItem("floatingShowcase", "items", index)
                      }
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  )}
                </Box>

                <Stack spacing={2}>
                  <ImageUrlField
                    label="Image URL"
                    value={item.image}
                    darkMode={darkMode}
                    onChange={(value) =>
                      updateListItem(
                        "floatingShowcase",
                        "items",
                        index,
                        "image",
                        value,
                      )
                    }
                  />

                  <Box sx={fieldGridStyle}>
                    <CustomTextField
                      label="Image Name"
                      value={item.name}
                      onChange={(e) =>
                        updateListItem(
                          "floatingShowcase",
                          "items",
                          index,
                          "name",
                          e.target.value,
                        )
                      }
                      sx={inputStyle}
                    />

                    <CustomTextField
                      label="Rotation"
                      value={item.rotate}
                      onChange={(e) =>
                        updateListItem(
                          "floatingShowcase",
                          "items",
                          index,
                          "rotate",
                          e.target.value,
                        )
                      }
                      placeholder="-10deg"
                      sx={inputStyle}
                    />

                    <CustomTextField
                      label="Top Position"
                      value={item.top || ""}
                      onChange={(e) =>
                        updateListItem(
                          "floatingShowcase",
                          "items",
                          index,
                          "top",
                          e.target.value,
                        )
                      }
                      placeholder="10%"
                      sx={inputStyle}
                    />

                    <CustomTextField
                      label="Bottom Position"
                      value={item.bottom || ""}
                      onChange={(e) =>
                        updateListItem(
                          "floatingShowcase",
                          "items",
                          index,
                          "bottom",
                          e.target.value,
                        )
                      }
                      placeholder="10%"
                      sx={inputStyle}
                    />

                    <CustomTextField
                      label="Left Position"
                      value={item.left || ""}
                      onChange={(e) =>
                        updateListItem(
                          "floatingShowcase",
                          "items",
                          index,
                          "left",
                          e.target.value,
                        )
                      }
                      placeholder="15%"
                      sx={inputStyle}
                    />

                    <CustomTextField
                      label="Right Position"
                      value={item.right || ""}
                      onChange={(e) =>
                        updateListItem(
                          "floatingShowcase",
                          "items",
                          index,
                          "right",
                          e.target.value,
                        )
                      }
                      placeholder="15%"
                      sx={inputStyle}
                    />
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>

          <Button
            variant="outlined"
            startIcon={<AddRoundedIcon />}
            onClick={() =>
              addListItem("floatingShowcase", "items", {
                id: `floating-${Date.now()}`,
                name: "New Item",
                image: "",
                top: "20%",
                left: "20%",
                rotate: "0deg",
              })
            }
            sx={{
              alignSelf: "flex-start",
              textTransform: "none",
              color: "#B89478",
              borderColor: "#B89478",
            }}
          >
            Add Floating Image
          </Button>
        </Stack>
      </SectionCard>
    </Stack>
  );
};

export default FloatingShowcaseSettings;
