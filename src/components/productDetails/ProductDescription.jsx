import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Rating,
  Stack,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

import { getReviews } from "../../database/reviewService";

// =====================================================
// PRODUCT DESCRIPTION
// =====================================================

const ProductDescription = ({ product, activeTab }) => {
  // =====================================================
  // REVIEW STATE
  // =====================================================

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewError, setReviewError] = useState("");

  // =====================================================
  // PRODUCT ID
  // =====================================================

  const productId =
    product?._id ||
    product?.id ||
    product?.productId;

  // =====================================================
  // SPLIT DATA HELPER
  // =====================================================

  const splitItems = (data) => {
    if (!data) return [];

    // If already an array
    if (Array.isArray(data)) {
      return data
        .flatMap((item) =>
          String(item || "").split(
            /[,|\n•]+/
          )
        )
        .map((item) =>
          item
            .replace(/^\d+[\.\)]\s*/, "")
            .replace(/^[-•]\s*/, "")
            .trim()
        )
        .filter(Boolean);
    }

    // If string
    return String(data)
      .split(/[,|\n•]+/)
      .map((item) =>
        item
          .replace(/^\d+[\.\)]\s*/, "")
          .replace(/^[-•]\s*/, "")
          .trim()
      )
      .filter(Boolean);
  };

  // =====================================================
  // DATA
  // =====================================================

  const ingredients = splitItems(
    product?.keyIngredients
  );

  const benefits = splitItems(
    product?.benefits
  );

  const howToUse = splitItems(
    product?.howToUse
  );

  // =====================================================
  // LOAD PRODUCT REVIEWS
  // =====================================================

  useEffect(() => {
    if (activeTab === 4 && productId) {
      loadProductReviews();
    }
  }, [activeTab, productId]);

  const loadProductReviews = async () => {
    try {
      setLoadingReviews(true);
      setReviewError("");

      const data = await getReviews();

      const reviewList = Array.isArray(data)
        ? data
        : [];

      // Filter reviews for current product
      const productReviews = reviewList.filter(
        (review) => {
          const reviewProductId =
            review?.productId?._id ||
            review?.productId?.id ||
            review?.productId ||
            review?.product?._id ||
            review?.product?.id ||
            review?.product ||
            "";

          return (
            String(reviewProductId) ===
            String(productId)
          );
        }
      );

      // Show approved reviews only
      const approvedReviews =
        productReviews.filter((review) => {
          if (!review.status) return true;

          return (
            String(
              review.status
            ).toLowerCase() === "approved"
          );
        });

      setReviews(approvedReviews);
    } catch (error) {
      console.error(
        "Failed to load product reviews:",
        error
      );

      setReviewError(
        "Unable to load reviews."
      );

      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

  // =====================================================
  // REVIEW AVERAGE
  // =====================================================

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce(
      (sum, review) => {
        const rating =
          Number(review?.rating) || 0;

        return sum + rating;
      },
      0
    );

    return total / reviews.length;
  }, [reviews]);

  // =====================================================
  // COMMON PAPER STYLE
  // =====================================================

  const paperSx = {
    p: {
      xs: 3,
      md: 5,
      lg: 6,
    },

    borderRadius: 4,

    border: "1px solid #ECE6DD",

    background:
      "linear-gradient(180deg, #FFFFFF 0%, #FCFAF7 100%)",

    boxShadow:
      "0 8px 30px rgba(30,47,43,0.04)",
  };

  // =====================================================
  // GET USER NAME
  // =====================================================

  const getReviewerName = (review) => {
    return (
      review?.user?.name ||
      review?.user?.fullName ||
      review?.customer?.name ||
      review?.customer?.fullName ||
      review?.userName ||
      review?.name ||
      "Customer"
    );
  };

  // =====================================================
  // GET REVIEW TEXT
  // =====================================================

  const getReviewText = (review) => {
    return (
      review?.comment ||
      review?.review ||
      review?.message ||
      review?.description ||
      "No review comment provided."
    );
  };

  // =====================================================
  // GET INITIAL
  // =====================================================

  const getInitial = (name) => {
    return String(name || "C")
      .charAt(0)
      .toUpperCase();
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatReviewDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // DESCRIPTION
  // =====================================================

  if (activeTab === 0) {
    return (
      <Paper elevation={0} sx={paperSx}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            mb: 3.5,
          }}
        >
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              bgcolor: "#F7EFE8",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <AutoAwesomeRoundedIcon
              sx={{
                color: "#B89478",
                fontSize: 23,
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: "#B89478",
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              GlowCare
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 22,
                  md: 26,
                },
                fontWeight: 650,
                color: "#1E2F2B",
              }}
            >
              Product Description
            </Typography>
          </Box>
        </Stack>

        <Divider
          sx={{
            mb: 4,
            borderColor: "#EEE7DF",
          }}
        />

        <Box
          sx={{
            maxWidth: 1000,
          }}
        >
          <Typography
            sx={{
              color: "#626262",
              fontSize: {
                xs: 15,
                md: 16,
              },
              lineHeight: 2,
            }}
          >
            {product?.description ||
              "No description available."}
          </Typography>
        </Box>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{
            mt: 5,
          }}
        >
          <Box
            sx={{
              flex: 1,
              p: 2.5,
              borderRadius: 3,
              bgcolor: "#F9F5F0",
              border:
                "1px solid #EEE5DA",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "#999",
                mb: 0.7,
                textTransform:
                  "uppercase",
                letterSpacing: 0.8,
              }}
            >
              Texture
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                color: "#5A3B28",
              }}
            >
              {product?.texture || "-"}
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2.5,
              borderRadius: 3,
              bgcolor: "#F9F5F0",
              border:
                "1px solid #EEE5DA",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "#999",
                mb: 0.7,
                textTransform:
                  "uppercase",
                letterSpacing: 0.8,
              }}
            >
              Fragrance
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                color: "#5A3B28",
              }}
            >
              {product?.fragrance || "-"}
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2.5,
              borderRadius: 3,
              bgcolor: "#F9F5F0",
              border:
                "1px solid #EEE5DA",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "#999",
                mb: 0.7,
                textTransform:
                  "uppercase",
                letterSpacing: 0.8,
              }}
            >
              pH Value
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                color: "#5A3B28",
              }}
            >
              {product?.phValue || "-"}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    );
  }

  // =====================================================
  // KEY INGREDIENTS
  // =====================================================

  if (activeTab === 1) {
    return (
      <Paper elevation={0} sx={paperSx}>
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: "#B89478",
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            What's Inside
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 28,
              },
              fontWeight: 650,
              color: "#1E2F2B",
            }}
          >
            Key Ingredients
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#777",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 650,
            }}
          >
            Carefully selected ingredients
            designed to support your skin
            and enhance your daily skincare
            routine.
          </Typography>
        </Box>

        {ingredients.length > 0 ? (
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },

              gap: 2,
            }}
          >
            {ingredients.map(
              (ingredient, index) => (
                <Box
                  key={`${ingredient}-${index}`}
                  sx={{
                    minHeight: 100,

                    p: 2.5,

                    borderRadius: 3,

                    backgroundColor:
                      "#FAF7F2",

                    border:
                      "1px solid #EEE5DA",

                    display: "flex",
                    alignItems: "center",

                    transition:
                      "all .25s ease",

                    "&:hover": {
                      transform:
                        "translateY(-3px)",

                      borderColor:
                        "#C9A987",

                      boxShadow:
                        "0 8px 20px rgba(184,148,120,.12)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      bgcolor:
                        "#F0E5D8",

                      display: "flex",
                      justifyContent:
                        "center",

                      alignItems:
                        "center",

                      mr: 2,

                      flexShrink: 0,
                    }}
                  >
                    <SpaRoundedIcon
                      sx={{
                        color:
                          "#B89478",
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color:
                          "#3D3D3D",

                        fontSize: 15,
                      }}
                    >
                      {ingredient}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.4,
                        fontSize: 12,
                        color:
                          "#999",
                      }}
                    >
                      Skin-loving ingredient
                    </Typography>
                  </Box>
                </Box>
              )
            )}
          </Box>
        ) : (
          <Typography
            color="text.secondary"
          >
            No ingredient information
            available.
          </Typography>
        )}
      </Paper>
    );
  }

  // =====================================================
  // BENEFITS
  // =====================================================

  if (activeTab === 2) {
    return (
      <Paper elevation={0} sx={paperSx}>
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: "#B89478",
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Why You'll Love It
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 28,
              },
              fontWeight: 650,
              color: "#1E2F2B",
            }}
          >
            Product Benefits
          </Typography>
        </Box>

        {benefits.length > 0 ? (
          <List disablePadding>
            {benefits.map(
              (benefit, index) => (
                <ListItem
                  key={index}
                  disableGutters
                  sx={{
                    py: 2.2,

                    borderBottom:
                      index !==
                      benefits.length - 1
                        ? "1px solid #EEE8E1"
                        : "none",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 52,
                    }}
                  >
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        bgcolor:
                          "#F6EEE6",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                      }}
                    >
                      <CheckCircleRoundedIcon
                        sx={{
                          color:
                            "#B89478",
                          fontSize: 22,
                        }}
                      />
                    </Box>
                  </ListItemIcon>

                  <ListItemText
                    primary={benefit}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#444",
                        lineHeight: 1.7,
                      },
                    }}
                  />
                </ListItem>
              )
            )}
          </List>
        ) : (
          <Typography
            color="text.secondary"
          >
            No benefits information
            available.
          </Typography>
        )}
      </Paper>
    );
  }

  // =====================================================
  // HOW TO USE
  // =====================================================

  if (activeTab === 3) {
    return (
      <Paper elevation={0} sx={paperSx}>
        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: "#B89478",
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase",
            }}
          >
            Simple Routine
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 28,
              },
              fontWeight: 650,
              color: "#1E2F2B",
            }}
          >
            How To Use
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#777",
              fontSize: 15,
              lineHeight: 1.7,
            }}
          >
            Follow these simple steps to
            get the best results from your
            skincare routine.
          </Typography>
        </Box>

        {howToUse.length > 0 ? (
          <Stack spacing={3}>
            {howToUse.map(
              (step, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems:
                      "flex-start",

                    gap: 2,
                    p: 2,

                    borderRadius: 3,

                    backgroundColor:
                      index % 2 === 0
                        ? "#FAF7F2"
                        : "#FCFAF7",

                    border:
                      "1px solid #EEE5DA",

                    transition:
                      "all .25s ease",

                    "&:hover": {
                      borderColor:
                        "#C9A987",

                      transform:
                        "translateY(-2px)",

                      boxShadow:
                        "0 8px 20px rgba(184,148,120,.10)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      minWidth: 46,

                      borderRadius:
                        "50%",

                      backgroundColor:
                        "#1E2F2B",

                      color: "#fff",

                      display: "flex",

                      justifyContent:
                        "center",

                      alignItems:
                        "center",

                      fontSize: 15,
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 17,
                        fontWeight: 650,
                        color:
                          "#1E2F2B",
                        mb: 0.2,
                      }}
                    >
                      Step {index + 1}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 15.5,
                        color: "#666",
                        lineHeight: 1.8,
                        wordBreak:
                          "break-word",
                      }}
                    >
                      {step}
                    </Typography>
                  </Box>
                </Box>
              )
            )}
          </Stack>
        ) : (
          <Box
            sx={{
              py: 5,
              textAlign: "center",
              backgroundColor:
                "#FAF7F2",
              borderRadius: 3,
            }}
          >
            <Typography
              color="text.secondary"
            >
              No usage instructions
              available.
            </Typography>
          </Box>
        )}
      </Paper>
    );
  }

  // =====================================================
  // REVIEWS
  // =====================================================

  if (activeTab === 4) {
    return (
      <Paper elevation={0} sx={paperSx}>
        {/* HEADER */}

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            md: "center",
          }}
          spacing={2}
          sx={{
            mb: 5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: "#B89478",
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform:
                  "uppercase",
                mb: 1,
              }}
            >
              Customer Experience
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 24,
                  md: 28,
                },
                fontWeight: 650,
                color: "#1E2F2B",
              }}
            >
              Customer Reviews
            </Typography>

            {!loadingReviews &&
              reviews.length > 0 && (
                <Typography
                  sx={{
                    mt: 0.7,
                    fontSize: 13,
                    color: "#888",
                  }}
                >
                  Based on{" "}
                  {reviews.length}{" "}
                  {reviews.length === 1
                    ? "review"
                    : "reviews"}
                </Typography>
              )}
          </Box>

          {reviews.length > 0 && (
            <Box
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 3,
                bgcolor: "#FAF5EF",
                border:
                  "1px solid #EEE5DA",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <StarRoundedIcon
                  sx={{
                    color: "#C18A45",
                  }}
                />

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#5A3B28",
                  }}
                >
                  {averageRating.toFixed(1)}
                </Typography>

                <Typography
                  sx={{
                    color: "#888",
                    fontSize: 13,
                  }}
                >
                  / 5
                </Typography>
              </Stack>
            </Box>
          )}
        </Stack>

        {/* LOADING */}

        {loadingReviews && (
          <Box
            sx={{
              py: 6,
              display: "flex",
              justifyContent:
                "center",
            }}
          >
            <CircularProgress
              sx={{
                color: "#1E2F2B",
              }}
            />
          </Box>
        )}

        {/* ERROR */}

        {!loadingReviews &&
          reviewError && (
            <Box
              sx={{
                py: 5,
                textAlign:
                  "center",
                borderRadius: 3,
                backgroundColor:
                  "#FAF7F2",
              }}
            >
              <Typography
                color="text.secondary"
              >
                {reviewError}
              </Typography>
            </Box>
          )}

        {/* NO REVIEWS */}

        {!loadingReviews &&
          !reviewError &&
          reviews.length === 0 && (
            <Box
              sx={{
                py: 6,
                textAlign:
                  "center",
                borderRadius: 3,
                backgroundColor:
                  "#FAF7F2",
                border:
                  "1px solid #EEE5DA",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#1E2F2B",
                  mb: 0.7,
                }}
              >
                No reviews yet
              </Typography>

              <Typography
                sx={{
                  color: "#888",
                  fontSize: 14,
                }}
              >
                Be the first to share
                your experience with this
                product.
              </Typography>
            </Box>
          )}

        {/* REAL REVIEWS */}

        {!loadingReviews &&
          !reviewError &&
          reviews.map(
            (review, index) => {
              const reviewerName =
                getReviewerName(review);

              const reviewText =
                getReviewText(review);

              const reviewRating =
                Number(
                  review?.rating
                ) || 0;

              const reviewDate =
                formatReviewDate(
                  review?.createdAt ||
                    review?.date
                );

              return (
                <Box
                  key={
                    review?._id ||
                    review?.id ||
                    index
                  }
                  sx={{
                    py:
                      index === 0
                        ? 0
                        : 4,

                    borderTop:
                      index !== 0
                        ? "1px solid #EEE8E1"
                        : "none",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                  >
                    {/* AVATAR */}

                    <Avatar
                      sx={{
                        width: 46,
                        height: 46,
                        bgcolor:
                          "#EBDCCD",
                        color:
                          "#7A5238",
                        fontWeight: 700,
                      }}
                    >
                      {getInitial(
                        reviewerName
                      )}
                    </Avatar>

                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <Stack
                        direction={{
                          xs: "column",
                          sm: "row",
                        }}
                        justifyContent="space-between"
                        alignItems={{
                          xs: "flex-start",
                          sm: "center",
                        }}
                        spacing={1}
                        mb={1}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 650,
                              color:
                                "#333",
                            }}
                          >
                            {reviewerName}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 12,
                              color:
                                "#999",
                              mt: 0.3,
                            }}
                          >
                            {reviewDate ||
                              "Verified Customer"}
                          </Typography>
                        </Box>

                        <Rating
                          value={
                            reviewRating
                          }
                          readOnly
                          precision={0.5}
                          size="small"
                          sx={{
                            "& .MuiRating-iconFilled":
                              {
                                color:
                                  "#C18A45",
                              },
                          }}
                        />
                      </Stack>

                      <Box
                        sx={{
                          position:
                            "relative",

                          mt: 2,
                          pl: 3,
                        }}
                      >
                        <FormatQuoteRoundedIcon
                          sx={{
                            position:
                              "absolute",

                            left: 0,
                            top: 0,

                            color:
                              "#DCC8B4",

                            fontSize: 22,
                          }}
                        />

                        <Typography
                          sx={{
                            color:
                              "#666",

                            lineHeight: 1.8,

                            fontSize: 15,

                            wordBreak:
                              "break-word",
                          }}
                        >
                          {reviewText}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              );
            }
          )}
      </Paper>
    );
  }

  // =====================================================
  // FALLBACK
  // =====================================================

  return (
    <Paper elevation={0} sx={paperSx}>
      <Typography color="text.secondary">
        No information available.
      </Typography>
    </Paper>
  );
};

export default ProductDescription;