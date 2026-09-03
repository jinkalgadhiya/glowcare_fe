import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  Box,
  TextField,
} from "@mui/material";

import { updateReturnStatus } from "../../../database/returnService";

import { useThemeContext } from "../../context/ThemeContext";

const UpdateReturnStatus = ({
  open,
  onClose,
  returnRequest,
  onStatusUpdated,
}) => {
  const { darkMode } = useThemeContext();

  // ======================================================
  // STATES
  // ======================================================

  const [status, setStatus] = useState("");

  const [refundStatus, setRefundStatus] =
    useState("");

  const [adminNote, setAdminNote] =
    useState("");

  const [saving, setSaving] = useState(false);

  // ======================================================
  // SET CURRENT VALUES
  // ======================================================

  useEffect(() => {
    if (returnRequest) {
      setStatus(
        returnRequest.status || "Pending",
      );

      setRefundStatus(
        returnRequest.refundStatus ||
          "Not Initiated",
      );

      setAdminNote(
        returnRequest.adminNote || "",
      );
    }
  }, [returnRequest]);

  // ======================================================
  // GET RETURN ID
  // ======================================================

  const getReturnId = () => {
    return (
      returnRequest?._id ||
      returnRequest?.id
    );
  };

  // ======================================================
  // SAVE
  // ======================================================

  const handleSave = async () => {
    if (!returnRequest) return;

    const returnId = getReturnId();

    if (!returnId) {
      console.error(
        "Return request ID is missing",
      );

      return;
    }

    try {
      setSaving(true);

      const updatedData = {
        status,
        refundStatus,
        adminNote,
      };

      const updatedReturn =
        await updateReturnStatus(
          returnId,
          updatedData,
        );

      onStatusUpdated?.(updatedReturn);

      onClose();
    } catch (error) {
      console.error(
        "Failed to update return status:",
        error,
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================================
  // STATUS COLOR
  // ======================================================

  const getStatusColor = (value) => {
    switch (
      value?.toLowerCase()
    ) {
      case "pending":
        return "warning";

      case "approved":
        return "info";

      case "rejected":
        return "error";

      case "pickup scheduled":
        return "secondary";

      case "picked up":
        return "secondary";

      case "received":
        return "info";

      case "refunded":
        return "success";

      case "cancelled":
        return "error";

      default:
        return "default";
    }
  };

  // ======================================================
  // RETURN UI
  // ======================================================

  return (
    <Dialog
      open={open}
      onClose={
        saving
          ? undefined
          : onClose
      }
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: darkMode
            ? "#252525 !important"
            : "#fff",

          color: darkMode
            ? "#fff"
            : "#222",

          borderRadius: 3,
        },
      }}
      PaperProps={{
        sx: {
          p: 1,
        },
      }}
    >
      {/* HEADER */}

      <DialogTitle sx={{ pb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,

            color: darkMode
              ? "#fff"
              : "#222",
          }}
        >
          Update Return Status
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 0.5,

            color: darkMode
              ? "#AFAFAF"
              : "#777",
          }}
        >
          Update the return request status.
        </Typography>
      </DialogTitle>

      {/* CONTENT */}

      <DialogContent
        sx={{
          pt: "12px !important",
        }}
      >
        <Stack spacing={3}>
          {/* CURRENT STATUS */}

          <Box>
            <Typography
              sx={{
                mb: 1,

                fontSize: 13,

                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              }}
            >
              Current Return Status
            </Typography>

            <Chip
              label={
                returnRequest?.status ||
                "Pending"
              }
              color={getStatusColor(
                returnRequest?.status,
              )}
            />
          </Box>

          {/* NEW RETURN STATUS */}

          <FormControl
            fullWidth
            size="small"
            sx={{
              "& .MuiInputLabel-root": {
                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#B89478",
              },

              "& .MuiOutlinedInput-root": {
                color: darkMode
                  ? "#fff"
                  : "#222",

                "& fieldset": {
                  borderColor: darkMode
                    ? "#555"
                    : "#ccc",
                },

                "&:hover fieldset": {
                  borderColor:
                    "#B89478",
                },

                "&.Mui-focused fieldset": {
                  borderColor:
                    "#B89478",
                },
              },

              "& .MuiSvgIcon-root": {
                color: darkMode
                  ? "#fff"
                  : "#222",
              },
            }}
          >
            <InputLabel>
              Return Status
            </InputLabel>

            <Select
              value={status}
              label="Return Status"
              onChange={(e) =>
                setStatus(
                  e.target.value,
                )
              }
              disabled={saving}
            >
              <MenuItem value="Pending">
                Pending
              </MenuItem>

              <MenuItem value="Approved">
                Approved
              </MenuItem>

              <MenuItem value="Rejected">
                Rejected
              </MenuItem>

              <MenuItem value="Pickup Scheduled">
                Pickup Scheduled
              </MenuItem>

              <MenuItem value="Picked Up">
                Picked Up
              </MenuItem>

              <MenuItem value="Received">
                Received
              </MenuItem>

              <MenuItem value="Refunded">
                Refunded
              </MenuItem>

              <MenuItem value="Cancelled">
                Cancelled
              </MenuItem>
            </Select>
          </FormControl>

          {/* REFUND STATUS */}

          <FormControl
            fullWidth
            size="small"
            sx={{
              "& .MuiInputLabel-root": {
                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#B89478",
              },

              "& .MuiOutlinedInput-root": {
                color: darkMode
                  ? "#fff"
                  : "#222",

                "& fieldset": {
                  borderColor: darkMode
                    ? "#555"
                    : "#ccc",
                },

                "&:hover fieldset": {
                  borderColor:
                    "#B89478",
                },

                "&.Mui-focused fieldset": {
                  borderColor:
                    "#B89478",
                },
              },

              "& .MuiSvgIcon-root": {
                color: darkMode
                  ? "#fff"
                  : "#222",
              },
            }}
          >
            <InputLabel>
              Refund Status
            </InputLabel>

            <Select
              value={refundStatus}
              label="Refund Status"
              onChange={(e) =>
                setRefundStatus(
                  e.target.value,
                )
              }
              disabled={saving}
            >
              <MenuItem value="Not Initiated">
                Not Initiated
              </MenuItem>

              <MenuItem value="Pending">
                Pending
              </MenuItem>

              <MenuItem value="Processed">
                Processed
              </MenuItem>

              <MenuItem value="Completed">
                Completed
              </MenuItem>
            </Select>
          </FormControl>

          {/* ADMIN NOTE */}

          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Admin Note"
            value={adminNote}
            onChange={(e) =>
              setAdminNote(
                e.target.value,
              )
            }
            disabled={saving}
            placeholder="Add a note for the customer..."
            sx={{
              "& .MuiInputLabel-root": {
                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#B89478",
              },

              "& .MuiOutlinedInput-root": {
                color: darkMode
                  ? "#fff"
                  : "#222",

                "& fieldset": {
                  borderColor: darkMode
                    ? "#555"
                    : "#ccc",
                },

                "&:hover fieldset": {
                  borderColor:
                    "#B89478",
                },

                "&.Mui-focused fieldset": {
                  borderColor:
                    "#B89478",
                },
              },
            }}
          />
        </Stack>
      </DialogContent>

      {/* ACTIONS */}

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          pt: 1,

          justifyContent:
            "flex-end",

          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={saving}
          sx={{
            textTransform: "none",

            borderRadius: 2,

            borderColor:
              "#B89478",

            color: "#B89478",

            "&:hover": {
              borderColor:
                "#A88366",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={
            saving || !status
          }
          sx={{
            bgcolor: "#B89478",

            textTransform:
              "none",

            borderRadius: 2,

            boxShadow: "none",

            "&:hover": {
              bgcolor: "#A88366",

              boxShadow: "none",
            },
          }}
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateReturnStatus;