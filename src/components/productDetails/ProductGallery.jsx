import { useEffect, useMemo, useState } from "react";

import { Box, Chip, Fade, IconButton } from "@mui/material";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { useDispatch, useSelector } from "react-redux";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/wishlist/wishlistSlice";

const ProductGallery = ({ product }) => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const images = useMemo(() => {
    return [product.image, ...(product.galleryImages || [])].filter(Boolean);
  }, [product]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "center center",
    transform: "scale(1)",
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [product]);

  const handleWishlist = (e) => {
    e.stopPropagation();

    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;

    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.25)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  return (
    <Box width="100%">
      {/* Main Image */}

      <Box
        // onMouseMove={handleMouseMove}
        // onMouseLeave={handleMouseLeave}
        sx={{
          position: "relative",

          width: "85%",

          height: {
            xs: 420,
            sm: 500,
            md: 580,
            lg: 640,
          },

          borderRadius: 5,

          overflow: "hidden",

          background: "linear-gradient(180deg,#FCFAF7 0%,#F4ECE2 100%)",

          border: "1px solid #EEE5DA",

          display: "flex",

          justifyContent: "center",

          ml: "auto",

          alignItems: "center",
        }}
      >
        {/* Badge */}

        {product.badge && (
          <Chip
            label={product.badge}
            sx={{
              position: "absolute",

              top: 22,

              left: 22,

              bgcolor: "#B78962",

              color: "#fff",

              fontWeight: 600,

              zIndex: 10,
            }}
          />
        )}

        {/* Wishlist */}

        <IconButton
          onClick={handleWishlist}
          sx={{
            position: "absolute",

            top: 22,

            right: 22,

            width: 48,

            height: 48,

            bgcolor: "#fff",

            boxShadow: "0 10px 25px rgba(0,0,0,.08)",

            "&:hover": {
              bgcolor: "#fff",
            },
          }}
        >
          {isWishlisted ? (
            <FavoriteRoundedIcon sx={{ color: "#E53935" }} />
          ) : (
            <FavoriteBorderRoundedIcon />
          )}
        </IconButton>

        {/* Previous */}

        {images.length > 1 && (
          <IconButton
            onClick={previousImage}
            sx={{
              position: "absolute",

              left: 22,

              top: "50%",

              transform: "translateY(-50%)",

              bgcolor: "#fff",

              width: 46,

              height: 46,

              boxShadow: "0 10px 25px rgba(0,0,0,.08)",

              "&:hover": {
                bgcolor: "#fff",
              },
            }}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>
        )}

        {/* Next */}

        {images.length > 1 && (
          <IconButton
            onClick={nextImage}
            sx={{
              position: "absolute",

              right: 22,

              top: "50%",

              transform: "translateY(-50%)",

              bgcolor: "#fff",

              width: 46,

              height: 46,

              boxShadow: "0 10px 25px rgba(0,0,0,.08)",

              "&:hover": {
                bgcolor: "#fff",
              },
            }}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        )}

        {/* Main Product Image */}

        <Fade in timeout={300} key={selectedIndex}>
          <Box
            component="img"
            src={images[selectedIndex]}
            alt={product.name}
            draggable={false}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform .25s ease, transform-origin .25s ease",
              ...zoomStyle,
            }}
          />
        </Fade>
      </Box>
      {/* ---------------- Thumbnail Gallery ---------------- */}

      {images.length > 1 && (
        <Box
          sx={{
            mt: 3,

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            gap: 2,

            flexWrap: "wrap",
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              onClick={() => setSelectedIndex(index)}
              sx={{
                width: {
                  xs: 70,
                  sm: 82,
                  md: 95,
                },

                height: {
                  xs: 70,
                  sm: 82,
                  md: 95,
                },

                borderRadius: 3,

                overflow: "hidden",

                cursor: "pointer",

                bgcolor: "#FAF7F2",

                border:
                  selectedIndex === index
                    ? "2px solid #B78962"
                    : "1px solid #E8DED3",

                transition: ".35s",

                boxShadow:
                  selectedIndex === index
                    ? "0 10px 25px rgba(183,137,98,.20)"
                    : "0 3px 10px rgba(0,0,0,.04)",

                "&:hover": {
                  transform: "translateY(-5px)",

                  borderColor: "#B78962",

                  boxShadow: "0 12px 25px rgba(183,137,98,.22)",
                },
              }}
            >
              <Box
                component="img"
                src={image}
                alt={`${product.name}-${index}`}
                sx={{
                  width: "100%",

                  height: "100%",

                  objectFit: "cover",

                  transition: ".35s",

                  "&:hover": {
                    transform: "scale(1.08)",
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductGallery;
