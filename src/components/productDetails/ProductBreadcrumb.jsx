import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useNavigate } from "react-router-dom";

const ProductBreadcrumb = ({ product }) => {
  const navigate = useNavigate();

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

      <Link
        underline="hover"
        onClick={() =>
          navigate(
            `/shop/${product.category
              ?.toLowerCase()
              .replace(/&/g, "")
              .replace(/\s+/g, "-")}`,
          )
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
        {product.category}
      </Link>

      <Typography
        sx={{
          color: "#1E2F2B",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        {product.name}
      </Typography>
    </Breadcrumbs>
  );
};

export default ProductBreadcrumb;