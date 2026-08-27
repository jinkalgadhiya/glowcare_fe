import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  MenuItem,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { useThemeContext } from "../../context/ThemeContext";
import CustomTextField from "../../../components/common/CustomTextField";

const initialForm = {
  code: "",
  description: "",
  discountType: "percentage",
  discountValue: "",
  maximumDiscount: "",
  minimumOrderAmount: "",
  startDate: "",
  expiryDate: "",
  usageLimit: "",
  isActive: true,
};

const AddCoupon = ({ open, onClose, coupon, onSave }) => {
  const { darkMode } = useThemeContext();

  const [formData, setFormData] = useState(initialForm);

  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);

  // =====================================================
  // LOAD EDIT DATA
  // =====================================================

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || "",

        description: coupon.description || "",

        discountType: coupon.discountType || "percentage",

        discountValue: coupon.discountValue ?? "",

        maximumDiscount: coupon.maximumDiscount ?? "",

        minimumOrderAmount: coupon.minimumOrderAmount ?? "",

        startDate: coupon.startDate ? coupon.startDate.slice(0, 10) : "",

        expiryDate: coupon.expiryDate ? coupon.expiryDate.slice(0, 10) : "",

        usageLimit: coupon.usageLimit ?? "",

        isActive: coupon.isActive ?? true,
      });
    } else {
      setFormData({
        ...initialForm,
      });
    }

    setError("");
  }, [coupon, open]);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // SAVE COUPON
  // =====================================================

  const handleSave = async () => {
    // -------------------------------
    // REQUIRED FIELDS
    // -------------------------------

    if (
      !formData.code.trim() ||
      !formData.discountValue ||
      !formData.startDate ||
      !formData.expiryDate
    ) {
      setError("Please fill all required fields.");

      return;
    }

    // -------------------------------
    // DISCOUNT VALUE
    // -------------------------------

    if (Number(formData.discountValue) <= 0) {
      setError("Discount value must be greater than 0.");

      return;
    }

    // -------------------------------
    // PERCENTAGE
    // -------------------------------

    if (
      formData.discountType === "percentage" &&
      Number(formData.discountValue) > 100
    ) {
      setError("Percentage discount cannot exceed 100%.");

      return;
    }

    // -------------------------------
    // DATE VALIDATION
    // -------------------------------

    if (new Date(formData.expiryDate) <= new Date(formData.startDate)) {
      setError("Expiry date must be after start date.");

      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...formData,

        code: formData.code.trim().toUpperCase(),

        description: formData.description.trim(),

        discountValue: Number(formData.discountValue),

        maximumDiscount:
          formData.maximumDiscount === ""
            ? null
            : Number(formData.maximumDiscount),

        minimumOrderAmount: Number(formData.minimumOrderAmount || 0),

        usageLimit:
          formData.usageLimit === "" ? null : Number(formData.usageLimit),
      };

      await onSave(payload);

      setFormData({
        ...initialForm,
      });

      setError("");
    } catch (err) {
      console.error("Failed to save coupon:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save coupon. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,

          backgroundColor: darkMode ? "#252525" : "#FFFFFF",

          color: darkMode ? "#FFFFFF" : "#222",

          border: darkMode ? "1px solid #3D3D3D" : "1px solid #E5DED4",

          boxShadow: darkMode
            ? "0 20px 60px rgba(0,0,0,.55)"
            : "0 20px 60px rgba(0,0,0,.18)",

          overflow: "hidden",
        },
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <Box
        sx={{
          px: {
            xs: 3,
            sm: 4,
          },

          py: 3,

          background: darkMode
            ? "linear-gradient(135deg, #302D2A 0%, #292624 100%)"
            : "linear-gradient(135deg, #F3EBDD 0%, #E8DDCC 100%)",

          borderBottom: darkMode ? "1px solid #454545" : "1px solid #DED3C4",

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

              color: darkMode ? "#FFFFFF" : "#1E2F2B",
            }}
          >
            {coupon ? "Edit Coupon" : "Create Coupon"}
          </Typography>

          <Typography
            sx={{
              mt: 0.7,

              fontSize: 14,

              color: darkMode ? "#BDBDBD" : "#756E65",
            }}
          >
            {coupon
              ? "Update your GlowCare coupon details."
              : "Create a discount coupon for GlowCare customers."}
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          disabled={saving}
          sx={{
            color: darkMode ? "#FFFFFF" : "#625B53",

            width: 40,
            height: 40,

            "&:hover": {
              backgroundColor: darkMode ? "#3A3A3A" : "rgba(30,47,43,.08)",
            },
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </Box>

      {/* =================================================
          CONTENT
      ================================================= */}

      <DialogContent
        sx={{
          p: {
            xs: 3,
            sm: 4,
          },

          backgroundColor: darkMode ? "#252525" : "#FFFFFF",
        }}
      >
        {/* =================================================
            SECTION TITLE
        ================================================= */}

        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,

            color: darkMode ? "#FFFFFF" : "#222",

            mb: 1,
          }}
        >
          Coupon Details
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            color: darkMode ? "#AFAFAF" : "#777",

            mb: 2.5,
          }}
        >
          Enter the discount and usage details for this coupon.
        </Typography>

        <Divider
          sx={{
            mb: 3,

            borderColor: darkMode ? "#3D3D3D" : "#E7DDD2",
          }}
        />

        {/* =================================================
            FORM
        ================================================= */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },

            gap: 2.5,
          }}
        >
          {/* COUPON CODE */}

          <CustomTextField
            label="Coupon Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="WELCOME10"
            fullWidth
          />

          {/* DESCRIPTION */}

          <CustomTextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="10% off on your order"
            fullWidth
          />

          {/* DISCOUNT TYPE */}

          <CustomTextField
            select
            label="Discount Type"
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="percentage">Percentage</MenuItem>

            <MenuItem value="fixed">Fixed Amount</MenuItem>
          </CustomTextField>

          {/* DISCOUNT VALUE */}

          <CustomTextField
            label={
              formData.discountType === "percentage"
                ? "Discount (%)"
                : "Discount Amount (₹)"
            }
            name="discountValue"
            type="number"
            value={formData.discountValue}
            onChange={handleChange}
            fullWidth
          />

          {/* MINIMUM ORDER */}

          <CustomTextField
            label="Minimum Order Amount (₹)"
            name="minimumOrderAmount"
            type="number"
            value={formData.minimumOrderAmount}
            onChange={handleChange}
            fullWidth
          />

          {/* MAXIMUM DISCOUNT */}

          <CustomTextField
            label="Maximum Discount (₹)"
            name="maximumDiscount"
            type="number"
            value={formData.maximumDiscount}
            onChange={handleChange}
            disabled={formData.discountType !== "percentage"}
            fullWidth
          />

          {/* START DATE */}

          <CustomTextField
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          {/* EXPIRY DATE */}

          <CustomTextField
            label="Expiry Date"
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          {/* USAGE LIMIT */}

          <CustomTextField
            label="Usage Limit"
            name="usageLimit"
            type="number"
            value={formData.usageLimit}
            onChange={handleChange}
            placeholder="Leave empty for unlimited"
            fullWidth
          />
        </Box>

        {/* =================================================
            ACTIVE COUPON
        ================================================= */}

        <FormControlLabel
          sx={{
            mt: 2,

            color: darkMode ? "#FFFFFF" : "#444",
          }}
          control={
            <Switch
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,

                  isActive: e.target.checked,
                }))
              }
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#B89478",
                },

                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#B89478",
                },
              }}
            />
          }
          label="Active Coupon"
        />

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <Box
            sx={{
              mt: 2,

              p: 1.5,

              borderRadius: 2,

              backgroundColor: darkMode ? "#3A2826" : "#F8EEEC",

              border: darkMode ? "1px solid #62403A" : "1px solid #E8D0CA",
            }}
          >
            <Typography
              sx={{
                color: darkMode ? "#FFB4A8" : "#7A4038",

                fontSize: 13,
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        {/* =================================================
            ACTION BUTTONS
        ================================================= */}

        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 4,

            pt: 2.5,

            borderTop: darkMode ? "1px solid #3D3D3D" : "1px solid #E7DDD2",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={saving}
            sx={{
              minWidth: 120,
              height: 44,

              textTransform: "none",

              borderRadius: 2,

              color: "#B89478",

              borderColor: "#B89478",

              fontWeight: 600,

              "&:hover": {
                backgroundColor: darkMode ? "#333" : "#F5F1EC",

                borderColor: "#A88366",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            sx={{
              minWidth: 170,
              height: 44,

              backgroundColor: "#B89478",

              color: "#FFFFFF",

              textTransform: "none",

              borderRadius: 2,

              fontWeight: 600,

              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#A88366",

                boxShadow: "none",
              },
            }}
          >
            {saving ? "Saving..." : coupon ? "Update Coupon" : "Save Coupon"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoupon;
