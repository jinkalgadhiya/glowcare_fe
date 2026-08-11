import React, { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  MenuItem,
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Button,
  IconButton,
  Checkbox,
  FormGroup,
  FormLabel,
  Divider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getCategories } from "../../database/categoryService";
import { useThemeContext } from "../context/ThemeContext";

const ProductForm = ({
  productName,
  setProductName,

  category,
  setCategory,

  badge,
  setBadge,

  variants,
  setVariants,

  status,
  setStatus,

  description,
  setDescription,

  image,
  setImage,

  keyIngredients,
  setKeyIngredients,

  howToUse,
  setHowToUse,

  featured,
  setFeatured,

  galleryImages,
  setGalleryImages,

  texture,
  setTexture,

  fragrance,
  setFragrance,

  phValue,
  setPhValue,

  shelfLife,
  setShelfLife,

  suitableFor,
  setSuitableFor,

  skinConcerns,
  setSkinConcerns,

  benefits,
  setBenefits,

  caution,
  setCaution,

  errors,
}) => {
  const { darkMode } = useThemeContext();

  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      // Optional: show only active categories
      const activeCategories = data.filter(
        (category) => category.status === "Active",
      );

      setCategories(activeCategories);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const badgeOptions = [
    "None",
    "New Launch",
    "Best Seller",
    "Trending",
    "Limited Stock",
    "Out of Stock",
    "Sold Out",
  ];

  const sizeOptions = ["30 ml", "50 ml", "100 ml", "180 ml", "250 ml"];

  const textureOptions = [
    "Foam",
    "Gel",
    "Cream",
    "Lotion",
    "Serum",
    "Oil",
    "Milk",
    "Balm",
  ];

  const fragranceOptions = [
    "Fragrance Free",
    "Unscented",
    "Floral",
    "Citrus",
    "Herbal",
    "Mild",
  ];

  const shelfLifeOptions = [
    "6 Months",
    "12 Months",
    "18 Months",
    "24 Months",
    "36 Months",
  ];

  const suitableForOptions = [
    "Dry Skin",
    "Oily Skin",
    "Combination Skin",
    "Sensitive Skin",
    "Normal Skin",
  ];

  const skinConcernOptions = [
    "Acne",
    "Dark Spots",
    "Pigmentation",
    "Dryness",
    "Redness",
    "Wrinkles",
    "Fine Lines",
    "Uneven Tone",
    "Dullness",
    "Large Pores",
  ];

  const benefitOptions = [
    "Hydrating",
    "Brightening",
    "Barrier Repair",
    "Oil Control",
    "Deep Cleansing",
    "Soothing",
    "Anti Aging",
    "Exfoliating",
  ];

  const inputStyle = {
    "& .MuiInputLabel-root": {
      color: darkMode ? "#BDBDBD" : "#666",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#B89478",
    },

    "& .MuiOutlinedInput-root": {
      color: darkMode ? "#fff" : "#222",
      backgroundColor: darkMode ? "#2F2F2F" : "#fff",

      "& fieldset": {
        borderColor: darkMode ? "#555" : "#ccc",
      },

      "&:hover fieldset": {
        borderColor: "#B89478",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#B89478",
      },
    },

    "& .MuiSvgIcon-root": {
      color: darkMode ? "#fff" : "#222",
    },
  };

  // ===========================
  // Variant Functions
  // ===========================

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now(),
        size: "",
        price: "",
        discountPrice: "",
        stock: "",
        sku: "",
      },
    ]);
  };

  const removeVariant = (id) => {
    setVariants(variants.filter((item) => item.id !== id));
  };

  const handleVariantChange = (id, field, value) => {
    setVariants(
      variants.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === "sku" ? value.toUpperCase() : value,
            }
          : item,
      ),
    );
  };

  const handleCheckboxChange = (value, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      alert("Maximum 3 gallery images allowed.");
      return;
    }

    setGalleryImages(files);
  };

  return (
    <Stack spacing={3}>
      {/* Product Name */}

      <TextField
        label="Product Name *"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        error={Boolean(errors.productName)}
        helperText={errors.productName}
        sx={inputStyle}
      />

      {/* Category */}

      <TextField
        select
        label="Category *"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        error={Boolean(errors.category)}
        helperText={errors.category}
        sx={inputStyle}
      >
        {categories.map((item) => (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Badge */}

      <TextField
        select
        label="Product Badge"
        value={badge}
        onChange={(e) => setBadge(e.target.value)}
        sx={inputStyle}
      >
        {badgeOptions.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>

      {/* Featured */}

      <FormControlLabel
        control={
          <Switch
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            color="success"
          />
        }
        label="Featured Product"
      />

      {variants.map((variant, index) => (
        <Box
          key={variant.id}
          sx={{
            border: "1px solid",
            borderColor: darkMode ? "#444" : "#ddd",
            borderRadius: 2,
            p: 2,
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
            <Typography fontWeight={600}>Variant {index + 1}</Typography>

            {variants.length > 1 && (
              <IconButton
                color="error"
                onClick={() => removeVariant(variant.id)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>

          <Stack spacing={2}>
            <TextField
              select
              label="Size / Volume"
              value={variant.size}
              onChange={(e) =>
                handleVariantChange(variant.id, "size", e.target.value)
              }
              sx={inputStyle}
            >
              {sizeOptions.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Price"
              type="number"
              value={variant.price}
              onChange={(e) =>
                handleVariantChange(variant.id, "price", e.target.value)
              }
              sx={inputStyle}
            />

            <TextField
              label="Discount Price"
              type="number"
              value={variant.discountPrice}
              onChange={(e) =>
                handleVariantChange(variant.id, "discountPrice", e.target.value)
              }
              sx={inputStyle}
            />

            <TextField
              label="Stock"
              type="number"
              value={variant.stock}
              onChange={(e) =>
                handleVariantChange(variant.id, "stock", e.target.value)
              }
              sx={inputStyle}
            />

            <TextField
              label="SKU"
              value={variant.sku}
              onChange={(e) =>
                handleVariantChange(variant.id, "sku", e.target.value)
              }
              sx={inputStyle}
            />
          </Stack>
        </Box>
      ))}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={addVariant}
        sx={{
          alignSelf: "flex-start",
          bgcolor: "#B89478",
          "&:hover": {
            bgcolor: "#a37d60",
          },
        }}
      >
        Add Variant
      </Button>

      {/* Status */}

      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={inputStyle}
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </TextField>

      {/* Description */}

      <TextField
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={Boolean(errors.description)}
        helperText={errors.description}
        sx={inputStyle}
      />

      {/* Key Ingredients */}

      <TextField
        label="Key Ingredients"
        multiline
        rows={4}
        value={keyIngredients}
        onChange={(e) => setKeyIngredients(e.target.value)}
        sx={inputStyle}
      />

      {/* How To Use */}

      <TextField
        label="How To Use"
        multiline
        rows={4}
        value={howToUse}
        onChange={(e) => setHowToUse(e.target.value)}
        sx={inputStyle}
      />

      {/* ===========================
    Skincare Details
=========================== */}

      <Divider />

      <Typography
        variant="h6"
        fontWeight={600}
        color={darkMode ? "#fff" : "#222"}
      >
        Skincare Details
      </Typography>

      <Stack spacing={2}>
        {/* Texture */}

        <TextField
          select
          label="Texture"
          value={texture}
          onChange={(e) => setTexture(e.target.value)}
          sx={inputStyle}
        >
          {textureOptions.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        {/* Fragrance */}

        <TextField
          select
          label="Fragrance"
          value={fragrance}
          onChange={(e) => setFragrance(e.target.value)}
          sx={inputStyle}
        >
          {fragranceOptions.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        {/* pH */}

        <TextField
          label="pH Value"
          placeholder="Example: 5.5"
          value={phValue}
          onChange={(e) => setPhValue(e.target.value)}
          sx={inputStyle}
        />

        {/* Shelf Life */}

        <TextField
          select
          label="Shelf Life"
          value={shelfLife}
          onChange={(e) => setShelfLife(e.target.value)}
          sx={inputStyle}
        >
          {shelfLifeOptions.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        {/* Suitable For */}

        <Box>
          <FormLabel
            sx={{
              color: darkMode ? "#fff" : "#222",
              mb: 1,
              display: "block",
              fontWeight: 600,
            }}
          >
            Suitable For
          </FormLabel>

          <FormGroup row>
            {suitableForOptions.map((item) => (
              <FormControlLabel
                key={item}
                control={
                  <Checkbox
                    checked={suitableFor.includes(item)}
                    onChange={() =>
                      handleCheckboxChange(item, suitableFor, setSuitableFor)
                    }
                  />
                }
                label={item}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Skin Concerns */}

        <Box>
          <FormLabel
            sx={{
              color: darkMode ? "#fff" : "#222",
              mb: 1,
              display: "block",
              fontWeight: 600,
            }}
          >
            Skin Concerns
          </FormLabel>

          <FormGroup row>
            {skinConcernOptions.map((item) => (
              <FormControlLabel
                key={item}
                control={
                  <Checkbox
                    checked={skinConcerns.includes(item)}
                    onChange={() =>
                      handleCheckboxChange(item, skinConcerns, setSkinConcerns)
                    }
                  />
                }
                label={item}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Benefits */}

        <Box>
          <FormLabel
            sx={{
              color: darkMode ? "#fff" : "#222",
              mb: 1,
              display: "block",
              fontWeight: 600,
            }}
          >
            Benefits
          </FormLabel>

          <FormGroup row>
            {benefitOptions.map((item) => (
              <FormControlLabel
                key={item}
                control={
                  <Checkbox
                    checked={benefits.includes(item)}
                    onChange={() =>
                      handleCheckboxChange(item, benefits, setBenefits)
                    }
                  />
                }
                label={item}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Caution */}

        <TextField
          label="Caution"
          multiline
          rows={4}
          value={caution}
          onChange={(e) => setCaution(e.target.value)}
          placeholder="For external use only. Patch test before use. Avoid contact with eyes."
          sx={inputStyle}
        />
      </Stack>

      {/* ===========================
    Main Image
=========================== */}

      {/* Main Image */}

      <Box>
        <Typography
          sx={{
            mb: 1,
            fontWeight: 600,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Main Product Image
        </Typography>

        <TextField
          type="file"
          fullWidth
          onChange={(e) => setImage(e.target.files[0])}
          InputLabelProps={{ shrink: true }}
          inputProps={{ accept: "image/*" }}
          sx={inputStyle}
        />

        {errors.image && (
          <Typography
            sx={{
              mt: 1,
              fontSize: 12,
              color: "error.main",
            }}
          >
            {errors.image}
          </Typography>
        )}
      </Box>

      {/* Gallery Images */}

      <Box>
        <Typography
          sx={{
            mb: 2,
            fontWeight: 600,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Gallery Images (Maximum 3)
        </Typography>

        <Button
          component="label"
          variant="outlined"
          sx={{
            borderColor: "#B89478",
            color: "#B89478",
            textTransform: "none",
            mb: 2,
          }}
        >
          Upload Gallery Images
          <input
            hidden
            type="file"
            multiple
            accept="image/*"
            onChange={handleGalleryImages}
          />
        </Button>

        {/* Preview images here */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {galleryImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                width: 120,
                height: 120,
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={URL.createObjectURL(image)}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default ProductForm;
