import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({
  label,
  value,
  onChange,
  error = false,
  helperText = "",
  type = "text",
  placeholder = "",
  name,
  id,
  required = false,
  disabled = false,
  fullWidth = true,
  variant = "outlined",
  size = "medium",
  multiline = false,
  rows,
  InputProps,
  slotProps,
  sx = {},
  ...props
}) => {
  return (
    <TextField
      {...props}
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      multiline={multiline}
      rows={rows}
      InputProps={InputProps}
      slotProps={slotProps}
      sx={{
        "& .MuiInputLabel-root": {
          color: "text.secondary",
        },

        "& .MuiInputLabel-root.Mui-focused": {
          color: "primary.main",
        },

        "& .MuiOutlinedInput-root": {
          borderRadius: 2,

          backgroundColor: "background.paper",

          "& fieldset": {
            borderColor: "divider",
          },

          "&:hover fieldset": {
            borderColor: "primary.main",
          },

          "&.Mui-focused fieldset": {
            borderColor: "primary.main",
            borderWidth: 2,
          },
        },

        "& .MuiInputBase-input": {
          color: "text.primary",
        },

        "& .MuiInputBase-input::placeholder": {
          color: "text.secondary",
          opacity: 1,
        },

        "& .MuiFormHelperText-root": {
          marginLeft: 0,
        },

        ...sx,
      }}
    />
  );
};

export default CustomTextField;