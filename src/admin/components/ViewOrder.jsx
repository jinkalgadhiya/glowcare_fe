import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  Divider,
  Avatar,
} from "@mui/material";

const ViewOrder = ({ open, handleClose, order }) => {
  if (!order) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: 24,
        }}
      >
        Order Details
      </DialogTitle>

      <DialogContent dividers>

        {/* Order Information */}

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Order Information
          </Typography>

          <Typography>
            <strong>Order ID:</strong> {order.id}
          </Typography>

          <Typography>
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleString()}
          </Typography>

          <Typography>
            <strong>Status:</strong> {order.status}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Customer */}

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Customer Details
          </Typography>

          <Typography>
            <strong>Name:</strong> {order.customer.fullName}
          </Typography>

          <Typography>
            <strong>Email:</strong> {order.customer.email}
          </Typography>

          <Typography>
            <strong>Phone:</strong> {order.customer.phone}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Shipping */}

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>

          <Typography>{order.customer.address}</Typography>

          <Typography>
            {order.customer.city}, {order.customer.state}
          </Typography>

          <Typography>{order.customer.pincode}</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Ordered Products */}

        <Typography
          variant="h6"
          gutterBottom
        >
          Ordered Products
        </Typography>

        {order.items.map((item) => (
          <Box
            key={`${item.productId}-${item.variantId}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              py: 2,
            }}
          >
            <Avatar
              src={item.image}
              variant="rounded"
              sx={{
                width: 70,
                height: 70,
              }}
            />

            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={600}>
                {item.name}
              </Typography>

              <Typography color="text.secondary">
                {item.size}
              </Typography>

              <Typography color="text.secondary">
                Qty : {item.quantity}
              </Typography>
            </Box>

            <Typography fontWeight={600}>
              ₹{item.price * item.quantity}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        {/* Price */}

        <Typography
          variant="h6"
          gutterBottom
        >
          Price Details
        </Typography>

        <Typography>
          Subtotal : ₹{order.pricing.subtotal}
        </Typography>

        <Typography>
          Shipping : ₹{order.pricing.shipping}
        </Typography>

        <Typography>
          GST : ₹{order.pricing.gst}
        </Typography>

        <Typography>
          Discount : ₹{order.pricing.discount}
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
            mt: 1,
          }}
        >
          Grand Total : ₹{order.pricing.total}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Payment */}

        <Typography variant="h6">
          Payment
        </Typography>

        <Typography>
          {order.paymentMethod}
        </Typography>

        <Typography
          sx={{
            mt: 2,
          }}
          variant="h6"
        >
          Delivery Method
        </Typography>

        <Typography>
          {order.deliveryMethod}
        </Typography>

      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
        >
          Close
        </Button>
      </DialogActions>

    </Dialog>
  );
};

export default ViewOrder;