import React from "react";
import { Stack, Box } from "@mui/material";

import SectionCard from "./SectionCard";
import ImageUrlField from "./ImageUrlField";
import CustomTextField from "../../../components/common/CustomTextField";

const NewsletterSettings = ({
  newsletter,
  darkMode,
  inputStyle,
  fieldGridStyle,
  updateSection,
}) => {
  return (
    <Stack spacing={3}>
      <SectionCard
        title="Newsletter"
        description="Change the newsletter text and the right-side image."
        darkMode={darkMode}
      >
        <Stack spacing={3}>
          <ImageUrlField
            label="Newsletter Image URL"
            value={newsletter.image}
            darkMode={darkMode}
            onChange={(value) => updateSection("newsletter", "image", value)}
          />

          <Box sx={fieldGridStyle}>
            <CustomTextField
              label="Small Heading"
              value={newsletter.eyebrow}
              onChange={(e) =>
                updateSection("newsletter", "eyebrow", e.target.value)
              }
              sx={inputStyle}
            />

            <CustomTextField
              label="Main Heading"
              value={newsletter.title}
              onChange={(e) =>
                updateSection("newsletter", "title", e.target.value)
              }
              multiline
              rows={2}
              helperText="Use Enter for a new line."
              sx={inputStyle}
            />

            <CustomTextField
              label="Email Placeholder"
              value={newsletter.placeholder}
              onChange={(e) =>
                updateSection("newsletter", "placeholder", e.target.value)
              }
              sx={inputStyle}
            />

            <CustomTextField
              label="Button Label"
              value={newsletter.buttonLabel}
              onChange={(e) =>
                updateSection("newsletter", "buttonLabel", e.target.value)
              }
              sx={inputStyle}
            />
          </Box>

          <CustomTextField
            fullWidth
            label="Description"
            value={newsletter.description}
            onChange={(e) =>
              updateSection("newsletter", "description", e.target.value)
            }
            multiline
            rows={4}
            sx={inputStyle}
          />

          <CustomTextField
            fullWidth
            label="Bottom Note"
            value={newsletter.note}
            onChange={(e) =>
              updateSection("newsletter", "note", e.target.value)
            }
            sx={inputStyle}
          />
        </Stack>
      </SectionCard>
    </Stack>
  );
};

export default NewsletterSettings;
