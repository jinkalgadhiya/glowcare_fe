import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Container,
  Dialog,
  DialogContent,
} from "@mui/material";

import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  validateSkinImage,
  analyzeSkin,
} from "../database/skinAnalysisApi";

const SkinAnalysis = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  // Camera refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingImage, setCheckingImage] = useState(false);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [cameraLoading, setCameraLoading] = useState(false);

  // Maximum image size = 5 MB
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  // =====================================================
  // CLEAN CAMERA STREAM
  // =====================================================

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Stop camera when component is removed
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // =====================================================
  // HANDLE IMAGE
  // =====================================================

  const handleImage = async (file) => {
    if (!file) return;

    setError("");

    // =========================================
    // FILE TYPE
    // =========================================

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Please upload a clear JPG, JPEG, or PNG image."
      );
      return;
    }

    // =========================================
    // FILE SIZE
    // =========================================

    if (file.size > MAX_FILE_SIZE) {
      setError(
        "Image size should be less than 5 MB."
      );
      return;
    }

    // =========================================
    // READ IMAGE
    // =========================================

    const imageUrl = URL.createObjectURL(file);

    const image = new Image();

    image.onload = async () => {
      const width = image.width;
      const height = image.height;

      URL.revokeObjectURL(imageUrl);

      // =========================================
      // EXTREME ASPECT RATIO
      // =========================================

      const aspectRatio = width / height;

      if (
        aspectRatio > 2.2 ||
        aspectRatio < 0.45
      ) {
        setError(
          "Please upload a properly framed face photo."
        );
        return;
      }

      // =========================================
      // BACKEND AI VALIDATION
      // =========================================

      try {
        setCheckingImage(true);
        setError("");

        console.log(
          "Checking photo suitability..."
        );

        const validation =
          await validateSkinImage(file);

        console.log(
          "Photo validation:",
          validation
        );

        // =======================================
        // REJECT PHOTO
        // =======================================

        if (
          !validation?.success ||
          !validation?.valid
        ) {
          setError(
            validation?.message ||
              "This photo is not suitable for skin analysis. Please upload a clear, closer photo of your face."
          );

          return;
        }

        // =======================================
        // PHOTO ACCEPTED
        // =======================================

        if (selectedImage?.preview) {
          URL.revokeObjectURL(
            selectedImage.preview
          );
        }

        const previewUrl =
          URL.createObjectURL(file);

        setSelectedImage({
          file,
          preview: previewUrl,
        });

        setError("");

        console.log(
          "Photo accepted for skin analysis."
        );
      } catch (validationError) {
        console.error(
          "Photo validation error:",
          validationError
        );

        setError(
          validationError?.response?.data
            ?.message ||
            "Unable to check this photo. Please try again."
        );
      } finally {
        setCheckingImage(false);
      }
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);

      setError(
        "Unable to read this image. Please upload another clear face photo."
      );
    };

    image.src = imageUrl;
  };

  // =====================================================
  // UPLOAD PHOTO
  // =====================================================

  const handleUploadClick = () => {
    if (loading || checkingImage) return;

    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    handleImage(file);

    // Allows selecting same file again
    event.target.value = "";
  };

  // =====================================================
  // OPEN CAMERA
  // =====================================================

  const handleCameraClick = async () => {
    if (loading || cameraLoading || checkingImage) {
      return;
    }

    setCameraError("");
    setCameraLoading(true);
    setCameraOpen(true);

    try {
      if (
        !navigator.mediaDevices?.getUserMedia
      ) {
        throw new Error(
          "Camera is not supported by this browser."
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: {
              facingMode: "user",
              width: {
                ideal: 1280,
              },
              height: {
                ideal: 720,
              },
            },
            audio: false,
          }
        );

      streamRef.current = stream;

      // Wait for dialog/video to render
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject =
            stream;

          videoRef.current
            .play()
            .catch((error) => {
              console.error(
                "Camera video play error:",
                error
              );
            });
        }
      }, 100);
    } catch (error) {
      console.error(
        "Camera error:",
        error
      );

      setCameraError(
        "Unable to access your camera. Please allow camera permission and try again."
      );
    } finally {
      setCameraLoading(false);
    }
  };

  // =====================================================
  // CAPTURE CAMERA PHOTO
  // =====================================================

  const handleCapturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      setCameraError(
        "Camera is not ready. Please try again."
      );
      return;
    }

    if (
      !video.videoWidth ||
      !video.videoHeight
    ) {
      setCameraError(
        "Camera is still starting. Please wait a moment."
      );
      return;
    }

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
      setCameraError(
        "Unable to capture the photo. Please try again."
      );
      return;
    }

    // Mirror image because front camera preview is mirrored
    context.translate(width, 0);
    context.scale(-1, 1);

    context.drawImage(
      video,
      0,
      0,
      width,
      height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setCameraError(
            "Unable to capture the photo. Please try again."
          );
          return;
        }

        const file = new File(
          [blob],
          `glowcare-skin-${Date.now()}.jpg`,
          {
            type: "image/jpeg",
          }
        );

        stopCamera();

        setCameraOpen(false);

        handleImage(file);
      },
      "image/jpeg",
      0.92
    );
  };

  // =====================================================
  // CLOSE CAMERA
  // =====================================================

  const handleCloseCamera = () => {
    stopCamera();

    setCameraOpen(false);

    setCameraError("");
  };

  // =====================================================
  // RETRY CAMERA
  // =====================================================

  const handleRetryCamera = () => {
    stopCamera();

    setCameraError("");

    handleCameraClick();
  };

  // =====================================================
  // REMOVE PHOTO
  // =====================================================

  const handleRemoveImage = () => {
    if (loading || checkingImage) return;

    if (selectedImage?.preview) {
      URL.revokeObjectURL(
        selectedImage.preview
      );
    }

    setSelectedImage(null);
    setError("");
  };

  // =====================================================
  // ANALYZE PHOTO
  // =====================================================

  const handleContinue = async () => {
    // -----------------------------------------
    // NO IMAGE
    // -----------------------------------------

    if (!selectedImage?.file) {
      setError(
        "Please upload or take a photo first."
      );

      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log(
        "Sending image for skin analysis..."
      );

      // -----------------------------------------
      // SEND IMAGE TO BACKEND
      // -----------------------------------------

      const result =
        await analyzeSkin(
          selectedImage.file
        );

      console.log(
        "Skin analysis response:",
        result
      );

      // -----------------------------------------
      // CHECK BACKEND RESPONSE
      // -----------------------------------------

      if (!result?.success) {
        setError(
          result?.message ||
            "Unable to analyze your skin right now."
        );

        return;
      }

      // -----------------------------------------
      // RESULT NAVIGATION
      // -----------------------------------------

      navigate(
        "/skin-analysis/result",
        {
          state: {
            image: selectedImage.preview,
            analysis: result,
          },
        }
      );
    } catch (error) {
      console.error(
        "Skin analysis error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to analyze this image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar />

      {/* =====================================================
          SKIN ANALYSIS PAGE
      ====================================================== */}

      <Box
        sx={{
          width: "100%",
          minHeight:
            "calc(100vh - 80px)",
          backgroundColor: "#FCFAF7",
          color: "#1E2F2B",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: "1250px",
            px: {
              xs: 2.5,
              sm: 4,
              md: 6,
            },
            py: {
              xs: 5,
              sm: 6,
              md: 9,
            },
          }}
        >
          {/* =====================================================
              PAGE INTRO
          ====================================================== */}

          <Box
            sx={{
              textAlign: "center",
              mb: {
                xs: 5,
                md: 7,
              },
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <AutoAwesomeOutlinedIcon
                sx={{
                  fontSize: 17,
                  color: "#1E2F2B",
                }}
              />

              <Typography
                sx={{
                  fontSize: "11px",
                  letterSpacing: "2.5px",
                  fontWeight: 600,
                  textTransform:
                    "uppercase",
                  color: "#1E2F2B",
                }}
              >
                GlowCare Skin Advisor
              </Typography>
            </Box>

            <Typography
              sx={{
                fontFamily:
                  "Georgia, serif",
                fontSize: {
                  xs: "38px",
                  sm: "48px",
                  md: "50px",
                },
                lineHeight: 1.1,
                fontWeight: 400,
                color: "#1E2F2B",
                mb: 2,
              }}
            >
              Let&apos;s understand
              <br />
              your skin.
            </Typography>

            <Typography
              sx={{
                maxWidth: "600px",
                mx: "auto",
                fontSize: {
                  xs: "13px",
                  sm: "14px",
                  md: "15px",
                },
                lineHeight: 1.8,
                color: "#68635C",
              }}
            >
              Upload a clear photo of
              your face and GlowCare will
              help you discover skincare
              products suited to your
              visible skin characteristics.
            </Typography>
          </Box>

          {/* =====================================================
              ANALYSIS CARD
          ====================================================== */}

          <Box
            sx={{
              maxWidth: "1050px",
              mx: "auto",
              backgroundColor: "#FFFFFF",
              border:
                "1px solid #E5DED4",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr",
                },
              }}
            >
              {/* =================================================
                  LEFT - IMAGE
              ================================================== */}

              <Box
                sx={{
                  backgroundColor:
                    "#ECE5DB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  p: {
                    xs: 3,
                    sm: 4,
                    md: 5,
                  },
                  minHeight: {
                    xs: "430px",
                    md: "540px",
                  },
                }}
              >
                {!selectedImage ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: {
                        xs: "370px",
                        sm: "400px",
                        md: "450px",
                      },
                      border:
                        "1px dashed rgba(30,47,43,0.35)",
                      borderRadius: "12px",
                      display: "flex",
                      flexDirection:
                        "column",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      backgroundColor:
                        "rgba(255,255,255,0.35)",
                      textAlign: "center",
                      px: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 82,
                        height: 82,
                        borderRadius:
                          "50%",
                        backgroundColor:
                          "#F7F3ED",
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        mb: 3,
                      }}
                    >
                      <CameraAltOutlinedIcon
                        sx={{
                          fontSize: 36,
                          color:
                            "#1E2F2B",
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        fontFamily:
                          "Georgia, serif",
                        fontSize: {
                          xs: "22px",
                          sm: "24px",
                        },
                        color:
                          "#1E2F2B",
                        mb: 1,
                      }}
                    >
                      Your photo goes
                      here
                    </Typography>

                    <Typography
                      sx={{
                        fontSize:
                          "12px",
                        color:
                          "#77716A",
                        maxWidth:
                          "280px",
                        lineHeight:
                          1.7,
                      }}
                    >
                      Upload a clear
                      front-facing photo
                      with good lighting
                      for better analysis.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: {
                        xs: "450px",
                        sm: "480px",
                        md: "540px",
                      },
                      position:
                        "relative",
                      borderRadius:
                        "12px",
                      overflow:
                        "hidden",
                      backgroundColor:
                        "#E8E0D5",
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        selectedImage.preview
                      }
                      alt="Selected skin analysis"
                      sx={{
                        width:
                          "100%",
                        height:
                          "100%",
                        objectFit:
                          "cover",
                        objectPosition:
                          "center",
                      }}
                    />

                    <IconButton
                      onClick={
                        handleRemoveImage
                      }
                      disabled={
                        loading ||
                        checkingImage
                      }
                      sx={{
                        position:
                          "absolute",
                        top: 12,
                        right: 12,
                        width: 38,
                        height: 38,
                        backgroundColor:
                          "rgba(255,255,255,0.92)",
                        color:
                          "#1E2F2B",

                        "&:hover": {
                          backgroundColor:
                            "#FFFFFF",
                        },
                      }}
                    >
                      <CloseIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    </IconButton>

                    <Box
                      sx={{
                        position:
                          "absolute",
                        left: 15,
                        bottom: 15,
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius:
                          "30px",
                        backgroundColor:
                          "rgba(255,255,255,0.92)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 17,
                          height: 17,
                          borderRadius:
                            "50%",
                          border:
                            "1.5px solid #1E2F2B",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius:
                              "50%",
                            backgroundColor:
                              "#1E2F2B",
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          fontSize:
                            "11px",
                          fontWeight:
                            600,
                          color:
                            "#1E2F2B",
                        }}
                      >
                        Photo ready
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* =================================================
                  RIGHT - OPTIONS
              ================================================== */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection:
                    "column",
                  justifyContent:
                    "center",
                  px: {
                    xs: 3,
                    sm: 5,
                    md: 6,
                  },
                  py: {
                    xs: 5,
                    sm: 6,
                    md: 7,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily:
                      "Georgia, serif",
                    fontSize: {
                      xs: "26px",
                      md: "30px",
                    },
                    color:
                      "#1E2F2B",
                    mb: 1.5,
                  }}
                >
                  Add your photo
                </Typography>

                <Typography
                  sx={{
                    fontSize: "13px",
                    lineHeight: 1.7,
                    color:
                      "#77716A",
                    mb: 4,
                  }}
                >
                  Choose how you would
                  like to provide your
                  photo for the skin
                  analysis.
                </Typography>

                {/* =================================================
                    UPLOAD
                ================================================== */}

                <Button
                  variant="outlined"
                  startIcon={
                    <CloudUploadOutlinedIcon />
                  }
                  onClick={
                    handleUploadClick
                  }
                  disabled={
                    loading ||
                    checkingImage
                  }
                  fullWidth
                  sx={{
                    justifyContent:
                      "flex-start",
                    textTransform:
                      "none",
                    borderColor:
                      "#D7D0C5",
                    color:
                      "#1E2F2B",
                    borderRadius:
                      "8px",
                    px: 2.5,
                    py: 2,
                    fontSize:
                      "14px",
                    fontWeight: 500,

                    "&:hover": {
                      borderColor:
                        "#1E2F2B",
                      backgroundColor:
                        "#F8F5F0",
                    },
                  }}
                >
                  <Box
                    sx={{
                      textAlign:
                        "left",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize:
                          "14px",
                        fontWeight:
                          600,
                      }}
                    >
                      Upload from device
                    </Typography>

                    <Typography
                      sx={{
                        fontSize:
                          "10px",
                        color:
                          "#88827A",
                        mt: 0.3,
                      }}
                    >
                      JPG, JPEG or PNG ·
                      Max 5 MB
                    </Typography>
                  </Box>
                </Button>

                {/* HIDDEN FILE INPUT */}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={
                    handleFileChange
                  }
                  style={{
                    display: "none",
                  }}
                />

                {/* =================================================
                    OR
                ================================================== */}

                <Box
                  sx={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: 2,
                    my: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      height: "1px",
                      backgroundColor:
                        "#E5DED4",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize:
                        "10px",
                      color:
                        "#99928A",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        "1px",
                    }}
                  >
                    or
                  </Typography>

                  <Box
                    sx={{
                      flex: 1,
                      height: "1px",
                      backgroundColor:
                        "#E5DED4",
                    }}
                  />
                </Box>

                {/* =================================================
                    CAMERA
                ================================================== */}

                <Button
                  variant="outlined"
                  startIcon={
                    <CameraAltOutlinedIcon />
                  }
                  onClick={
                    handleCameraClick
                  }
                  disabled={
                    loading ||
                    checkingImage
                  }
                  fullWidth
                  sx={{
                    justifyContent:
                      "flex-start",
                    textTransform:
                      "none",
                    borderColor:
                      "#D7D0C5",
                    color:
                      "#1E2F2B",
                    borderRadius:
                      "8px",
                    px: 2.5,
                    py: 2,
                    fontSize:
                      "14px",
                    fontWeight: 500,

                    "&:hover": {
                      borderColor:
                        "#1E2F2B",
                      backgroundColor:
                        "#F8F5F0",
                    },
                  }}
                >
                  <Box
                    sx={{
                      textAlign:
                        "left",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize:
                          "14px",
                        fontWeight:
                          600,
                      }}
                    >
                      Take a photo
                    </Typography>

                    <Typography
                      sx={{
                        fontSize:
                          "10px",
                        color:
                          "#88827A",
                        mt: 0.3,
                      }}
                    >
                      Use your device camera
                    </Typography>
                  </Box>
                </Button>
              </Box>
            </Box>

            {/* =====================================================
                BOTTOM ACTION
            ====================================================== */}

            <Box
              sx={{
                borderTop:
                  "1px solid #E8E2D9",
                px: {
                  xs: 3,
                  sm: 5,
                  md: 6,
                },
                py: 3,
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
                gap: 2,
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                }}
              >
                {error ? (
                  <Typography
                    sx={{
                      fontSize:
                        "12px",
                      color:
                        "#A44A3F",
                    }}
                  >
                    {error}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      fontSize:
                        "11px",
                      color:
                        "#89837B",
                    }}
                  >
                    {checkingImage
                      ? "Checking your photo..."
                      : loading
                        ? "Analyzing your photo..."
                        : selectedImage
                          ? "Your photo is ready for analysis."
                          : "Upload a photo to continue."}
                  </Typography>
                )}
              </Box>

              <Button
                variant="contained"
                onClick={
                  handleContinue
                }
                disabled={
                  !selectedImage ||
                  loading ||
                  checkingImage
                }
                endIcon={
                  loading ? null : (
                    <ArrowForwardIcon />
                  )
                }
                sx={{
                  minWidth:
                    "190px",
                  backgroundColor:
                    "#1E2F2B",
                  color:
                    "#FFFFFF",
                  px: 3,
                  py: 1.5,
                  borderRadius:
                    "5px",
                  textTransform:
                    "none",
                  fontSize:
                    "13px",
                  fontWeight: 500,
                  boxShadow:
                    "none",

                  "&:hover": {
                    backgroundColor:
                      "#16251F",
                    boxShadow:
                      "none",
                  },

                  "&:disabled": {
                    backgroundColor:
                      "#B8B5AE",
                    color:
                      "#FFFFFF",
                  },
                }}
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze My Skin"}
              </Button>
            </Box>
          </Box>

          {/* =====================================================
              DISCLAIMER
          ====================================================== */}

          <Typography
            sx={{
              mt: 3,
              textAlign:
                "center",
              fontSize:
                "10px",
              color:
                "#8A847C",
              maxWidth:
                "700px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            GlowCare&apos;s skin analysis
            provides cosmetic skincare
            recommendations based on
            visible characteristics. It is
            not a medical diagnosis or
            medical advice.
          </Typography>
        </Container>
      </Box>

      {/* =====================================================
          CAMERA DIALOG
      ====================================================== */}

      <Dialog
        open={cameraOpen}
        onClose={
          handleCloseCamera
        }
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius:
              "14px",
            backgroundColor:
              "#FCFAF7",
            overflow:
              "hidden",
          },
        }}
      >
        {/* CAMERA HEADER */}

        <Box
          sx={{
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            px: 3,
            py: 2,
            borderBottom:
              "1px solid #E5DED4",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily:
                  "Georgia, serif",
                fontSize:
                  "22px",
                color:
                  "#1E2F2B",
              }}
            >
              Take your photo
            </Typography>

            <Typography
              sx={{
                fontSize:
                  "10px",
                color:
                  "#77716A",
                mt: 0.3,
              }}
            >
              Position your face
              inside the frame
            </Typography>
          </Box>

          <IconButton
            onClick={
              handleCloseCamera
            }
            sx={{
              color:
                "#1E2F2B",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent
          sx={{
            p: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          {/* CAMERA PREVIEW */}

          <Box
            sx={{
              position:
                "relative",
              width: "100%",
              aspectRatio:
                "4 / 3",
              backgroundColor:
                "#1E2F2B",
              borderRadius:
                "12px",
              overflow:
                "hidden",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{
                width:
                  "100%",
                height:
                  "100%",
                objectFit:
                  "cover",
                transform:
                  "scaleX(-1)",
              }}
            />

            {/* FACE GUIDE */}

            <Box
              sx={{
                position:
                  "absolute",
                inset: 0,
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                pointerEvents:
                  "none",
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "55%",
                    sm: "42%",
                  },
                  height: {
                    xs: "70%",
                    sm: "72%",
                  },
                  border:
                    "2px solid rgba(255,255,255,0.85)",
                  borderRadius:
                    "50%",
                }}
              />
            </Box>

            {/* CAMERA ERROR */}

            {cameraError && (
              <Box
                sx={{
                  position:
                    "absolute",
                  inset: 0,
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  backgroundColor:
                    "rgba(30,47,43,0.88)",
                  px: 4,
                  textAlign:
                    "center",
                }}
              >
                <Box>
                  <CameraAltOutlinedIcon
                    sx={{
                      fontSize:
                        38,
                      color:
                        "#FFFFFF",
                      mb: 1,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize:
                        "12px",
                      lineHeight:
                        1.6,
                      color:
                        "#FFFFFF",
                      mb: 2,
                    }}
                  >
                    {
                      cameraError
                    }
                  </Typography>

                  <Button
                    variant="outlined"
                    startIcon={
                      <ReplayIcon />
                    }
                    onClick={
                      handleRetryCamera
                    }
                    sx={{
                      color:
                        "#FFFFFF",
                      borderColor:
                        "rgba(255,255,255,0.6)",
                      textTransform:
                        "none",

                      "&:hover": {
                        borderColor:
                          "#FFFFFF",
                        backgroundColor:
                          "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    Try Again
                  </Button>
                </Box>
              </Box>
            )}

            {/* CAMERA STARTING */}

            {cameraLoading && (
              <Box
                sx={{
                  position:
                    "absolute",
                  inset: 0,
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  backgroundColor:
                    "rgba(30,47,43,0.85)",
                }}
              >
                <Typography
                  sx={{
                    color:
                      "#FFFFFF",
                    fontSize:
                      "12px",
                  }}
                >
                  Starting camera...
                </Typography>
              </Box>
            )}
          </Box>

          {/* CAMERA INSTRUCTIONS */}

          <Typography
            sx={{
              textAlign:
                "center",
              fontSize:
                "10px",
              color:
                "#77716A",
              lineHeight:
                1.6,
              mt: 2,
            }}
          >
            Keep your face centered
            inside the guide, look
            directly at the camera,
            use good lighting, and
            remove heavy filters.
          </Typography>

          {/* CAPTURE BUTTON */}

          <Box
            sx={{
              display:
                "flex",
              justifyContent:
                "center",
              mt: 2.5,
            }}
          >
            <Button
              variant="contained"
              onClick={
                handleCapturePhoto
              }
              disabled={
                cameraLoading ||
                !!cameraError
              }
              startIcon={
                <CameraAltOutlinedIcon />
              }
              sx={{
                backgroundColor:
                  "#1E2F2B",
                color:
                  "#FFFFFF",
                px: 4,
                py: 1.4,
                borderRadius:
                  "5px",
                textTransform:
                  "none",
                fontSize:
                  "12px",
                boxShadow:
                  "none",

                "&:hover": {
                  backgroundColor:
                    "#16251F",
                  boxShadow:
                    "none",
                },

                "&:disabled": {
                  backgroundColor:
                    "#B8B5AE",
                  color:
                    "#FFFFFF",
                },
              }}
            >
              Capture Photo
            </Button>
          </Box>

          {/* HIDDEN CANVAS */}

          <canvas
            ref={canvasRef}
            style={{
              display: "none",
            }}
          />
        </DialogContent>
      </Dialog>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />
    </>
  );
};

export default SkinAnalysis;