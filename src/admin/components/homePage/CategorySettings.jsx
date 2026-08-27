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

const createId = () => `category-${crypto.randomUUID?.() || Date.now()}`;

const CategorySettings = ({
  categorySettings,
  darkMode,
  inputStyle,
  fieldGridStyle,
  updateSection,
  updateListItem,
  addListItem,
  removeListItem,
}) => {
  return (
    <SectionCard
      title="Popular Categories"
      description="Manage the category cards shown on the homepage."
      darkMode={darkMode}
    >
      <Stack spacing={3}>
        <Box sx={fieldGridStyle}>
          <CustomTextField
            label="Small Heading"
            value={categorySettings.eyebrow}
            onChange={(event) =>
              updateSection("categories", "eyebrow", event.target.value)
            }
            sx={inputStyle}
          />

          <CustomTextField
            label="Main Heading"
            value={categorySettings.heading}
            onChange={(event) =>
              updateSection("categories", "heading", event.target.value)
            }
            sx={inputStyle}
          />
        </Box>

        <Divider />

        <Stack spacing={2}>
          {categorySettings.items.map((item, index) => (
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
                  Category Card {index + 1}
                </Typography>

                {categorySettings.items.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => removeListItem("categories", "items", index)}
                  >
                    <DeleteOutlineRoundedIcon />
                  </IconButton>
                )}
              </Box>

              <Stack spacing={2}>
                <ImageUrlField
                  label="Category Image URL"
                  value={item.image}
                  darkMode={darkMode}
                  onChange={(value) =>
                    updateListItem("categories", "items", index, "image", value)
                  }
                />

                <Box sx={fieldGridStyle}>
                  <CustomTextField
                    label="Category Title"
                    value={item.title}
                    onChange={(event) =>
                      updateListItem(
                        "categories",
                        "items",
                        index,
                        "title",
                        event.target.value,
                      )
                    }
                    sx={inputStyle}
                  />

                  <CustomTextField
                    label="Explore Link"
                    value={item.link}
                    onChange={(event) =>
                      updateListItem(
                        "categories",
                        "items",
                        index,
                        "link",
                        event.target.value,
                      )
                    }
                    placeholder="/shop"
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
            addListItem("categories", "items", {
              id: createId(),
              title: "New Category",
              image: "",
              link: "/shop",
            })
          }
          sx={{
            alignSelf: "flex-start",
            textTransform: "none",
            color: "#B89478",
            borderColor: "#B89478",
          }}
        >
          Add Category Card
        </Button>
      </Stack>
    </SectionCard>
  );
};

export default CategorySettings;
