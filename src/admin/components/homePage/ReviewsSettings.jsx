import React from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import SectionCard from "./SectionCard";
import ImageUrlField from "./ImageUrlField";
import CustomTextField from "../../../components/common/CustomTextField";

const ReviewsSettings = ({
  reviews,
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
        title="Customer Reviews"
        description="Manage homepage review text, ratings, and customer images."
        darkMode={darkMode}
      >
        <Stack spacing={3}>
          {/* SECTION HEADING */}
          <Box sx={fieldGridStyle}>
            <CustomTextField
              label="Small Heading"
              value={reviews.eyebrow}
              onChange={(e) =>
                updateSection("reviews", "eyebrow", e.target.value)
              }
              sx={inputStyle}
            />

            <CustomTextField
              label="Main Heading"
              value={reviews.heading}
              onChange={(e) =>
                updateSection("reviews", "heading", e.target.value)
              }
              sx={inputStyle}
            />
          </Box>

          {/* DESCRIPTION */}
          <CustomTextField
            fullWidth
            label="Description"
            value={reviews.description}
            onChange={(e) =>
              updateSection("reviews", "description", e.target.value)
            }
            multiline
            rows={3}
            sx={inputStyle}
          />

          <Divider />

          {/* REVIEWS */}
          <Stack spacing={2}>
            {reviews.items.map((review, index) => (
              <Paper
                key={review.id}
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
                  <Chip
                    label={`Review ${index + 1}`}
                    sx={{
                      fontWeight: 700,
                      backgroundColor: darkMode ? "#3D322B" : "#F4E7DD",
                      color: darkMode ? "#FFFFFF" : "#6B4E3D",
                    }}
                  />

                  {reviews.items.length > 1 && (
                    <IconButton
                      color="error"
                      onClick={() => removeListItem("reviews", "items", index)}
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  )}
                </Box>

                <Stack spacing={2}>
                  <ImageUrlField
                    label="Customer Image URL"
                    value={review.image}
                    darkMode={darkMode}
                    onChange={(value) =>
                      updateListItem("reviews", "items", index, "image", value)
                    }
                  />

                  {/* CUSTOMER DETAILS */}
                  <Box sx={fieldGridStyle}>
                    <CustomTextField
                      label="Customer Name"
                      value={review.name}
                      onChange={(e) =>
                        updateListItem(
                          "reviews",
                          "items",
                          index,
                          "name",
                          e.target.value,
                        )
                      }
                      sx={inputStyle}
                    />

                    <CustomTextField
                      label="Customer Role"
                      value={review.designation}
                      onChange={(e) =>
                        updateListItem(
                          "reviews",
                          "items",
                          index,
                          "designation",
                          e.target.value,
                        )
                      }
                      sx={inputStyle}
                    />

                    <CustomTextField
                      label="Rating"
                      type="number"
                      value={review.rating}
                      onChange={(e) =>
                        updateListItem(
                          "reviews",
                          "items",
                          index,
                          "rating",
                          Number(e.target.value),
                        )
                      }
                      inputProps={{
                        min: 1,
                        max: 5,
                      }}
                      sx={inputStyle}
                    />
                  </Box>

                  {/* REVIEW TEXT */}
                  <CustomTextField
                    fullWidth
                    label="Review Text"
                    value={review.review}
                    onChange={(e) =>
                      updateListItem(
                        "reviews",
                        "items",
                        index,
                        "review",
                        e.target.value,
                      )
                    }
                    multiline
                    rows={4}
                    sx={inputStyle}
                  />
                </Stack>
              </Paper>
            ))}
          </Stack>

          {/* ADD REVIEW */}
          <Button
            variant="outlined"
            startIcon={<AddRoundedIcon />}
            onClick={() =>
              addListItem("reviews", "items", {
                id: `review-${Date.now()}`,
                name: "New Customer",
                designation: "Verified Customer",
                rating: 5,
                image: "",
                review: "",
              })
            }
            sx={{
              alignSelf: "flex-start",
              textTransform: "none",
              color: "#B89478",
              borderColor: "#B89478",
            }}
          >
            Add Review
          </Button>
        </Stack>
      </SectionCard>
    </Stack>
  );
};

export default ReviewsSettings;
