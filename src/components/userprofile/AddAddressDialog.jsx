import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const AddressDialog = ({
  open,
  onClose,
  editingAddress,
  formData,
  setFormData,
  handleChange,
  error,
  handleSave,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "760px",
          borderRadius: "22px",
          overflow: "hidden",
          backgroundColor: "#FFFDFC",
          border: "1px solid #E2D8CB",
          boxShadow: "0 24px 70px rgba(30,47,43,0.18)",
        },
      }}
    >
      {/* ==================================================
          HEADER
      ================================================== */}

      <Box
        sx={{
          px: {
            xs: 3,
            sm: 4,
          },
          py: 3,
          background:
            "linear-gradient(135deg, #F3EBDD 0%, #E8DDCC 100%)",
          borderBottom: "1px solid #DED3C4",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 24,
                  sm: 28,
                },
                fontWeight: 700,
                color: "#1E2F2B",
                lineHeight: 1.2,
              }}
            >
              {editingAddress ? "Edit Address" : "Add New Address"}
            </Typography>

            <Typography
              sx={{
                mt: 0.8,
                fontSize: 14,
                color: "#756E65",
              }}
            >
              {editingAddress
                ? "Update your delivery information"
                : "Add a delivery address for your GlowCare orders"}
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              width: 38,
              height: 38,
              mt: -0.5,
              color: "#625B53",
              borderRadius: "50%",

              "&:hover": {
                backgroundColor: "rgba(30,47,43,0.08)",
              },
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <DialogContent
        sx={{
          px: {
            xs: 3,
            sm: 4,
          },
          py: 1.5,
          backgroundColor: "#FFFDFC",
        }}
      >
        {/* ==================================================
            ADDRESS TYPE
        ================================================== */}

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              mb: 1.2,
              fontSize: 13,
              fontWeight: 700,
              color: "#4F4942",
              letterSpacing: 0.3,
            }}
          >
            Address Type
          </Typography>

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              p: 0.5,
              borderRadius: "13px",
              backgroundColor: "#F4EFE7",
              border: "1px solid #DDD3C6",
            }}
          >
            {["Home", "Work"].map((type) => {
              const selected = formData.addressType === type;

              return (
                <Button
                  key={type}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      addressType: type,
                    }))
                  }
                  startIcon={
                    type === "Home" ? (
                      <HomeOutlinedIcon
                        sx={{
                          fontSize: "18px !important",
                        }}
                      />
                    ) : (
                      <BusinessOutlinedIcon
                        sx={{
                          fontSize: "18px !important",
                        }}
                      />
                    )
                  }
                  sx={{
                    minWidth: 112,
                    height: 40,
                    px: 2,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: 13,
                    fontWeight: 600,

                    color: selected ? "#FFFFFF" : "#625B53",

                    backgroundColor: selected
                      ? "#1E2F2B"
                      : "transparent",

                    boxShadow: selected
                      ? "0 4px 10px rgba(30,47,43,0.12)"
                      : "none",

                    "&:hover": {
                      backgroundColor: selected
                        ? "#294039"
                        : "#E9E2D8",
                    },
                  }}
                >
                  {type}
                </Button>
              );
            })}
          </Box>
        </Box>

        {/* ==================================================
            FORM
        ================================================== */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 2.2,
          }}
        >
          {/* FULL NAME */}

          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter recipient name"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "13px",
                backgroundColor: "#FAF7F2",

                "& fieldset": {
                  borderColor: "#DDD4C8",
                },

                "&:hover fieldset": {
                  borderColor: "#BBAFA2",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#1E2F2B",
                  borderWidth: "1px",
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1E2F2B",
              },
            }}
          />

          {/* PHONE */}

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter contact number"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "13px",
                backgroundColor: "#FAF7F2",

                "& fieldset": {
                  borderColor: "#DDD4C8",
                },

                "&:hover fieldset": {
                  borderColor: "#BBAFA2",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#1E2F2B",
                  borderWidth: "1px",
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1E2F2B",
              },
            }}
          />

          {/* STREET ADDRESS */}

          <Box
            sx={{
              gridColumn: {
                xs: "auto",
                sm: "1 / -1",
              },
            }}
          >
            <TextField
              fullWidth
              label="Street Address"
              name="addressLine"
              value={formData.addressLine}
              onChange={handleChange}
              placeholder="House / building / street / area / landmark"
              multiline
              minRows={2.5}
              helperText="Include your house or building number, street, area or nearby landmark."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "13px",
                  backgroundColor: "#FAF7F2",
                  alignItems: "flex-start",

                  "& fieldset": {
                    borderColor: "#DDD4C8",
                  },

                  "&:hover fieldset": {
                    borderColor: "#BBAFA2",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#1E2F2B",
                    borderWidth: "1px",
                  },
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1E2F2B",
                },

                "& .MuiFormHelperText-root": {
                  marginLeft: "2px",
                  color: "#8A8178",
                  fontSize: 11.5,
                },
              }}
            />
          </Box>

          {/* CITY */}

          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "13px",
                backgroundColor: "#FAF7F2",

                "& fieldset": {
                  borderColor: "#DDD4C8",
                },

                "&:hover fieldset": {
                  borderColor: "#BBAFA2",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#1E2F2B",
                  borderWidth: "1px",
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1E2F2B",
              },
            }}
          />

          {/* STATE */}

          <TextField
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "13px",
                backgroundColor: "#FAF7F2",

                "& fieldset": {
                  borderColor: "#DDD4C8",
                },

                "&:hover fieldset": {
                  borderColor: "#BBAFA2",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#1E2F2B",
                  borderWidth: "1px",
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1E2F2B",
              },
            }}
          />

          {/* PINCODE */}

          <TextField
            fullWidth
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="6-digit pincode"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "13px",
                backgroundColor: "#FAF7F2",

                "& fieldset": {
                  borderColor: "#DDD4C8",
                },

                "&:hover fieldset": {
                  borderColor: "#BBAFA2",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#1E2F2B",
                  borderWidth: "1px",
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1E2F2B",
              },
            }}
          />
        </Box>

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <Box
            sx={{
              mt: 2.5,
              px: 2,
              py: 1.3,
              borderRadius: "11px",
              backgroundColor: "#F8EEEC",
              border: "1px solid #E8D0CA",
            }}
          >
            <Typography
              sx={{
                color: "#7A4038",
                fontSize: 13,
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        {/* ==================================================
            FOOTER
        ================================================== */}

        <Box
          sx={{
            mt: 3.5,
            pt: 2.5,
            borderTop: "1px solid #E9E1D7",
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              minWidth: 105,
              height: 44,
              px: 3,
              borderRadius: "12px",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              color: "#5F5952",
              borderColor: "#D6CCC0",

              "&:hover": {
                backgroundColor: "#F6F1EA",
                borderColor: "#C8BCAF",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              minWidth: 135,
              height: 44,
              px: 3,
              borderRadius: "12px",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              backgroundColor: "#1E2F2B",
              color: "#FFFFFF",
              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#294039",
                boxShadow:
                  "0 6px 18px rgba(30,47,43,0.15)",
              },
            }}
          >
            {editingAddress ? "Save Changes" : "Save Address"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;