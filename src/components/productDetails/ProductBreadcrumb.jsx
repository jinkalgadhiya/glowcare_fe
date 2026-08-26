import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useNavigate } from "react-router-dom";

const ProductBreadcrumb = ({ product }) => {
  const navigate = useNavigate();

  // =====================================================
  // CATEGORY
  // =====================================================

  const mainCategory = product?.category?.mainCategory || "";

  const subCategory = product?.category?.subCategory || "";

  const categoryName = subCategory
    ? subCategory
    : mainCategory || "Shop";

  // =====================================================
  // PRODUCT NAME
  // =====================================================

  const productName =
    product?.productName ||
    product?.name ||
    "Product";

  // =====================================================
  // SHOP CATEGORY URL
  // =====================================================

  const categorySlug = categoryName
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/\s+/g, "-");

  return (
    <Breadcrumbs
      separator={
        <NavigateNextRoundedIcon
          sx={{
            fontSize: 18,
            color: "#AFA79E",
          }}
        />
      }
      sx={{
        mb: 4,
        mt: 1,

        "& .MuiBreadcrumbs-ol": {
          alignItems: "center",
        },
      }}
    >
      {/* HOME */}

      <Link
        underline="hover"
        onClick={() => navigate("/")}
        sx={{
          cursor: "pointer",
          color: "#777",
          fontSize: 15,

          "&:hover": {
            color: "#B89478",
          },
        }}
      >
        Home
      </Link>

      {/* SHOP */}

      <Link
        underline="hover"
        onClick={() => navigate("/shop")}
        sx={{
          cursor: "pointer",
          color: "#777",
          fontSize: 15,

          "&:hover": {
            color: "#B89478",
          },
        }}
      >
        Shop
      </Link>

      {/* CATEGORY */}

      <Link
        underline="hover"
        onClick={() =>
          navigate(`/shop/${categorySlug}`)
        }
        sx={{
          cursor: "pointer",
          color: "#777",
          fontSize: 15,
          textTransform: "capitalize",

          "&:hover": {
            color: "#B89478",
          },
        }}
      >
        {categoryName}
      </Link>

      {/* PRODUCT */}

      <Typography
        sx={{
          color: "#1E2F2B",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        {productName}
      </Typography>
    </Breadcrumbs>
  );
};

export default ProductBreadcrumb;