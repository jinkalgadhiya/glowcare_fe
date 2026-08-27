import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  Divider,
  Stack,
  Button,
} from "@mui/material";

import {
  createProduct,
  updateProduct,
  getProductById,
} from "../../database/productService";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate, useParams } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import ProductForm from "../components/product/ProductForm";

import { getCategories } from "../../database/categoryService";
import { useThemeContext } from "../context/ThemeContext";

const AddProducts = () => {
  const { darkMode } = useThemeContext();

  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  /* ---------------- STATES ---------------- */

  const [errors, setErrors] = useState({});
  const [productData, setProductData] = useState(null);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [badge, setBadge] = useState("None");
  const [featured, setFeatured] = useState(false);

  const [variants, setVariants] = useState([
    {
      id: Date.now(),
      size: "",
      price: "",
      discountPrice: "",
      stock: "",
      sku: "",
    },
  ]);

  const [status, setStatus] = useState("Active");

  const [description, setDescription] = useState("");
  const [keyIngredients, setKeyIngredients] = useState("");
  const [howToUse, setHowToUse] = useState("");

  const [texture, setTexture] = useState("");
  const [fragrance, setFragrance] = useState("");
  const [phValue, setPhValue] = useState("");
  const [shelfLife, setShelfLife] = useState("");

  const [suitableFor, setSuitableFor] = useState([]);
  const [skinConcerns, setSkinConcerns] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [caution, setCaution] = useState("");

  const [image, setImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([""]);

  /* ---------------- CLEAR FIELD ERROR ---------------- */

  const clearError = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  /* ---------------- LOAD PRODUCT FOR EDIT ---------------- */

  useEffect(() => {
    const loadProduct = async () => {
      if (!isEdit) return;

      try {
        const product = await getProductById(id);

        if (!product) return;

        setProductData(product);

        setProductName(product.productName || "");

        /*
         * category is now a MongoDB ObjectId.
         *
         * Because getProductById() uses populate("category"),
         * product.category can be an object.
         */
        setCategory(
          typeof product.category === "object"
            ? product.category?._id || ""
            : product.category || "",
        );

        setBadge(product.badge || "None");
        setFeatured(product.featured || false);

        /*
         * MongoDB variants use _id.
         * ProductForm uses id for React/UI operations.
         */
        setVariants(
          product.variants?.length
            ? product.variants.map((variant) => ({
                ...variant,
                id: variant._id || Date.now() + Math.random(),
              }))
            : [
                {
                  id: Date.now(),
                  size: "",
                  price: "",
                  discountPrice: "",
                  stock: "",
                  sku: "",
                },
              ],
        );

        setStatus(product.status || "Active");

        setDescription(product.description || "");
        setKeyIngredients(product.keyIngredients || "");
        setHowToUse(product.howToUse || "");

        setTexture(product.texture || "");
        setFragrance(product.fragrance || "");
        setPhValue(product.phValue || "");
        setShelfLife(product.shelfLife || "");

        setSuitableFor(product.suitableFor || []);
        setSkinConcerns(product.skinConcerns || []);
        setBenefits(product.benefits || []);
        setCaution(product.caution || "");

        setImage(product.image || "");

        setGalleryImages(
          product.galleryImages?.length ? product.galleryImages : [""],
        );
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    loadProduct();
  }, [id, isEdit]);

  /* ---------------- SAVE PRODUCT ---------------- */

  const handleSaveProduct = async () => {
    const newErrors = {};

    try {
      /* ---------------- LOAD CATEGORIES ---------------- */

      const categories = await getCategories();

      /*
       * category now contains the MongoDB category _id.
       */
      const categoryExists = categories.some(
        (item) =>
          item._id === category &&
          item.status === "Active" &&
          item.categoryType === "sub",
      );

      /* ---------------- BASIC VALIDATION ---------------- */

      if (!productName.trim()) {
        newErrors.productName = "Product name is required.";
      }

      if (!category) {
        newErrors.category = "Please select a category.";
      } else if (!categoryExists) {
        newErrors.category = "Selected category no longer exists.";
      }

      if (badge === "None") {
        newErrors.badge = "Please select a product badge.";
      }

      /* ---------------- VARIANT VALIDATION ---------------- */

      if (variants.length === 0) {
        newErrors.variants = "Please add at least one variant.";
      }

      variants.forEach((variant, index) => {
        if (!variant.size) {
          newErrors[`size${index}`] = "Select a size.";
        }

        if (
          variant.price === "" ||
          variant.price === null ||
          variant.price === undefined
        ) {
          newErrors[`price${index}`] = "Price is required.";
        }

        if (
          variant.discountPrice !== "" &&
          Number(variant.discountPrice) >= Number(variant.price)
        ) {
          newErrors[`discountPrice${index}`] =
            "Discount price must be less than price.";
        }

        if (
          variant.stock === "" ||
          variant.stock === null ||
          variant.stock === undefined
        ) {
          newErrors[`stock${index}`] = "Stock is required.";
        }

        if (!variant.sku?.trim()) {
          newErrors[`sku${index}`] = "SKU is required.";
        }
      });

      /* ---------------- OTHER VALIDATION ---------------- */

      if (!status) {
        newErrors.status = "Please select product status.";
      }

      if (!description.trim()) {
        newErrors.description = "Description is required.";
      }

      if (!image.trim()) {
        newErrors.image = "Product image URL is required.";
      }

      if (!keyIngredients.trim()) {
        newErrors.keyIngredients = "Key ingredients are required.";
      }

      if (!howToUse.trim()) {
        newErrors.howToUse = "How to use is required.";
      }

      if (!texture.trim()) {
        newErrors.texture = "Texture is required.";
      }

      if (!fragrance.trim()) {
        newErrors.fragrance = "Fragrance is required.";
      }

      if (!phValue.trim()) {
        newErrors.phValue = "pH value is required.";
      }

      if (!shelfLife.trim()) {
        newErrors.shelfLife = "Shelf life is required.";
      }

      if (suitableFor.length === 0) {
        newErrors.suitableFor = "Select at least one option.";
      }

      if (skinConcerns.length === 0) {
        newErrors.skinConcerns = "Select at least one concern.";
      }

      if (benefits.length === 0) {
        newErrors.benefits = "Select at least one benefit.";
      }

      if (!caution.trim()) {
        newErrors.caution = "Caution is required.";
      }

      const validGalleryImages = galleryImages.filter((item) => item?.trim());

      if (validGalleryImages.length === 0) {
        newErrors.galleryImages = "Please add at least one gallery image.";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        return;
      }

      /* ---------------- PREPARE VARIANTS ---------------- */

      /*
       * Remove the frontend-only `id`.
       *
       * Keep MongoDB `_id` when editing existing variants.
       */
      const cleanedVariants = variants.map(({ id, ...variant }) => ({
        ...variant,
        price: Number(variant.price),
        discountPrice:
          variant.discountPrice === "" ? 0 : Number(variant.discountPrice),
        stock: Number(variant.stock),
      }));

      /* ---------------- PRODUCT PAYLOAD ---------------- */

      const productPayload = {
        productName: productName.trim(),

        category,

        badge,
        featured,

        variants: cleanedVariants,

        status,

        description: description.trim(),
        keyIngredients: keyIngredients.trim(),
        howToUse: howToUse.trim(),

        texture,
        fragrance,
        phValue,
        shelfLife,

        suitableFor,
        skinConcerns,
        benefits,

        caution: caution.trim(),

        image: image.trim(),

        galleryImages: validGalleryImages,
      };

      /* ---------------- CREATE / UPDATE ---------------- */

      if (isEdit) {
        await updateProduct(id, productPayload);
      } else {
        await createProduct(productPayload);
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);

      const message =
        error.response?.data?.message || "Failed to save product.";

      setErrors({
        submit: message,
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <AdminSidebar />

      <Box
        sx={{
          flex: 1,
          ml: "300px",
          backgroundColor: darkMode ? "#181818" : "#F7F5F2",
        }}
      >
        <AdminNavbar />

        <Box
          sx={{
            p: 4,
            pt: "90px",
          }}
        >
          {/* Breadcrumb */}

          <Breadcrumbs
            separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
            sx={{ mb: 2 }}
          >
            <Link
              underline="hover"
              onClick={() => navigate("/admin/dashboard")}
              sx={{
                cursor: "pointer",
                color: darkMode ? "#AFAFAF" : "#777",
                fontSize: 14,
              }}
            >
              Dashboard
            </Link>

            <Link
              underline="hover"
              onClick={() => navigate("/admin/products")}
              sx={{
                cursor: "pointer",
                color: darkMode ? "#AFAFAF" : "#777",
                fontSize: 14,
              }}
            >
              Products
            </Link>

            <Typography
              sx={{
                color: darkMode ? "#fff" : "#222",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {isEdit ? "Edit Product" : "Add Product"}
            </Typography>
          </Breadcrumbs>

          {/* Heading */}

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: darkMode ? "#fff" : "#222",
              mb: 1,
            }}
          >
            {isEdit ? "Edit Product" : "Add Product"}
          </Typography>

          <Typography
            sx={{
              mb: 4,
              color: darkMode ? "#BDBDBD" : "#777",
            }}
          >
            {isEdit
              ? "Update product information."
              : "Add a new product to your GlowCare store."}
          </Typography>

          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: darkMode ? "#252525" : "#fff",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: darkMode ? "#fff" : "#222",
                mb: 2,
              }}
            >
              Product Details
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <ProductForm
              productName={productName}
              setProductName={setProductName}
              category={category}
              setCategory={setCategory}
              badge={badge}
              setBadge={setBadge}
              featured={featured}
              setFeatured={setFeatured}
              variants={variants}
              setVariants={setVariants}
              status={status}
              setStatus={setStatus}
              description={description}
              setDescription={setDescription}
              keyIngredients={keyIngredients}
              setKeyIngredients={setKeyIngredients}
              howToUse={howToUse}
              setHowToUse={setHowToUse}
              image={image}
              setImage={setImage}
              galleryImages={galleryImages}
              setGalleryImages={setGalleryImages}
              errors={errors}
              clearError={clearError}
              texture={texture}
              setTexture={setTexture}
              fragrance={fragrance}
              setFragrance={setFragrance}
              phValue={phValue}
              setPhValue={setPhValue}
              shelfLife={shelfLife}
              setShelfLife={setShelfLife}
              suitableFor={suitableFor}
              setSuitableFor={setSuitableFor}
              skinConcerns={skinConcerns}
              setSkinConcerns={setSkinConcerns}
              benefits={benefits}
              setBenefits={setBenefits}
              caution={caution}
              setCaution={setCaution}
            />

            {errors.submit && (
              <Typography
                color="error"
                sx={{
                  mt: 3,
                }}
              >
                {errors.submit}
              </Typography>
            )}

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/admin/products")}
                sx={{
                  minWidth: 130,
                  height: 46,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "#B89478",
                  color: "#B89478",

                  "&:hover": {
                    borderColor: "#A88366",
                    bgcolor: "rgba(184,148,120,.08)",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleSaveProduct}
                sx={{
                  minWidth: 180,
                  height: 46,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  bgcolor: "#B89478",
                  boxShadow: "none",

                  "&:hover": {
                    bgcolor: "#A88366",
                    boxShadow: "none",
                  },
                }}
              >
                {isEdit ? "Update Product" : "Save Product"}
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProducts;
