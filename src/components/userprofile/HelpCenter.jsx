import React from "react";
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const HelpCenter = () => {
  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "Go to My Orders section and click on View Order to check the latest status.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Orders can be cancelled before they are shipped. Visit My Orders and select Cancel Order.",
    },
    {
      question: "How do I return a product?",
      answer:
        "You can request a return within 7 days of delivery from your order details page.",
    },
    {
      question: "How do I apply a coupon?",
      answer:
        "Apply your coupon code during checkout in the Coupon section.",
    },
    {
      question: "When will I receive my refund?",
      answer:
        "Refunds are usually processed within 5-7 business days after approval.",
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #E8E1D8",
        backgroundColor: "#fff",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          px: {
            xs: 3,
            md: 5,
          },
          py: {
            xs: 4,
            md: 5,
          },
          background:
            "linear-gradient(135deg, #F8F3EC 0%, #EFE7DC 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Circle */}

        <Box
          sx={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            backgroundColor: "rgba(184,148,120,0.10)",
            right: -60,
            top: -70,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "rgba(184,148,120,0.08)",
            right: 80,
            bottom: -60,
          }}
        />

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={3}
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Icon */}

          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              backgroundColor: "#1E2F2B",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              boxShadow: "0 10px 25px rgba(30,47,43,0.15)",
            }}
          >
            <SupportAgentOutlinedIcon
              sx={{
                color: "#fff",
                fontSize: 32,
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#B89478",
                mb: 1,
              }}
            >
              Customer Support
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 28,
                  md: 34,
                },
                fontWeight: 600,
                color: "#1E2F2B",
                lineHeight: 1.2,
              }}
            >
              Help Center
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#777168",
                fontSize: 15,
                lineHeight: 1.7,
                maxWidth: 600,
              }}
            >
              Find answers to common questions or get in touch with our
              support team.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <Box
        sx={{
          p: {
            xs: 3,
            md: 5,
          },
        }}
      >
        {/* FAQ Heading */}

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "#B89478",
              mb: 0.8,
            }}
          >
            Quick Answers
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 22,
                md: 26,
              },
              fontWeight: 600,
              color: "#1E2F2B",
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Typography
            sx={{
              mt: 0.8,
              color: "#777",
              fontSize: 14,
            }}
          >
            Everything you need to know about your GlowCare orders.
          </Typography>
        </Box>

        {/* FAQ LIST */}

        <Stack spacing={1.5}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              disableGutters
              elevation={0}
              sx={{
                border: "1px solid #ECE6DD",
                borderRadius: "14px !important",
                overflow: "hidden",
                backgroundColor: "#fff",

                "&:before": {
                  display: "none",
                },

                "&.Mui-expanded": {
                  borderColor: "#D8C3AD",
                  backgroundColor: "#FCFAF7",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreRoundedIcon
                    sx={{
                      color: "#B89478",
                    }}
                  />
                }
                sx={{
                  px: 2.5,
                  minHeight: 64,

                  "&.Mui-expanded": {
                    minHeight: 64,
                  },

                  "& .MuiAccordionSummary-content": {
                    my: 1.5,
                    alignItems: "center",
                    gap: 1.5,
                  },

                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    my: 1.5,
                  },
                }}
              >
                {/* Question Number */}

                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: "#F5EDE4",
                    color: "#A86C45",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Box>

                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#2B332F",
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  px: 2.5,
                  pt: 0,
                  pb: 2.5,
                }}
              >
                <Box
                  sx={{
                    ml: {
                      xs: 0,
                      sm: 5.25,
                    },
                    pl: 2,
                    borderLeft: "2px solid #D8C3AD",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#6F6F6F",
                      fontSize: 14,
                      lineHeight: 1.8,
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>

        {/* =====================================================
            CONTACT SUPPORT
        ===================================================== */}

        <Box
          sx={{
            mt: 6,
            borderRadius: 4,
            background:
              "linear-gradient(135deg, #1E2F2B 0%, #29433C 100%)",
            p: {
              xs: 3,
              md: 4,
            },
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative Circle */}

          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.04)",
              right: -70,
              top: -80,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              justifyContent="space-between"
              spacing={4}
            >
              {/* Left */}

              <Box>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  mb={1.5}
                >
                  <ChatBubbleOutlineRoundedIcon
                    sx={{
                      color: "#D8B99A",
                      fontSize: 25,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 22,
                      fontWeight: 600,
                    }}
                  >
                    Still Need Help?
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.70)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    maxWidth: 480,
                  }}
                >
                  Our support team is here to help you with your orders,
                  returns, refunds, and any other questions.
                </Typography>

                <Button
                  startIcon={<SupportAgentOutlinedIcon />}
                  variant="contained"
                  sx={{
                    mt: 3,
                    px: 3,
                    py: 1.2,
                    borderRadius: "30px",
                    backgroundColor: "#B89478",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 600,

                    "&:hover": {
                      backgroundColor: "#A88366",
                    },
                  }}
                >
                  Contact Support
                </Button>
              </Box>

              {/* Contact Details */}

              <Stack
                spacing={2}
                sx={{
                  minWidth: {
                    xs: "100%",
                    md: 280,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.08)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <EmailOutlinedIcon
                      sx={{
                        fontSize: 20,
                        color: "#D8B99A",
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      Email
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "#fff",
                      }}
                    >
                      support@glowcare.com
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.08)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PhoneOutlinedIcon
                      sx={{
                        fontSize: 20,
                        color: "#D8B99A",
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      Phone
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "#fff",
                      }}
                    >
                      +91 98765 43210
                    </Typography>
                  </Box>
                </Box>

                <Divider
                  sx={{
                    borderColor: "rgba(255,255,255,0.10)",
                  }}
                />

                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeRoundedIcon
                    sx={{
                      fontSize: 19,
                      color: "#D8B99A",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    Support available Monday – Saturday
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default HelpCenter;