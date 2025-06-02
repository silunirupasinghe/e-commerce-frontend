"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Collapse,
} from "@mui/material";
import colors from "@/theme/color"; // Assuming this exists in your project

// TypeScript Interfaces
interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
}

interface CompanyInfo {
  companyName: string;
  companyAddress: string;
  city: string;
  telephoneNumber?: string;
  whatsappBusinessNumber: string;
  vatNumber: string;
  uploadVatCertificate: string;
  companyEmail: string;
  brNumber: string;
  uploadBrCertificate: string;
}

interface InterestInfo {
  interestedCategories: string[];
  termsAccepted: boolean;
}

interface FormData {
  personalInfo: PersonalInfo;
  companyInfo: CompanyInfo;
  interestInfo: InterestInfo;
}

export default function BecomeASellerPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    companyInfo: {
      companyName: "",
      companyAddress: "",
      city: "",
      telephoneNumber: "",
      whatsappBusinessNumber: "",
      vatNumber: "",
      uploadVatCertificate: "",
      companyEmail: "",
      brNumber: "",
      uploadBrCertificate: "",
    },
    interestInfo: {
      interestedCategories: [],
      termsAccepted: false,
    },
  });

  const router = useRouter();

  const steps = [
    "Personal Information",
    "Company Information",
    "Select Interest",
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log("Form submitted:", formData);
      router.push("/seller/dashboard");
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (
    section: keyof FormData,
    field: string,
    value: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleCheckboxChange = (category: string, checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      interestInfo: {
        ...prevData.interestInfo,
        interestedCategories: checked
          ? [...prevData.interestInfo.interestedCategories, category]
          : prevData.interestInfo.interestedCategories.filter(
              (cat) => cat !== category
            ),
      },
    }));
  };

  const handleTermsChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      interestInfo: {
        ...prevData.interestInfo,
        termsAccepted: checked,
      },
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: 600, md: 800 },
          width: "100%",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: { xs: 1, sm: 3 },
          p: { xs: 2, sm: 3, md: 5 },
          backgroundColor: colors.lightGray,
          boxShadow: "none",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: colors.black,
            mb: { xs: 2, sm: 3, md: 4 },
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Become a Seller
        </Typography>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: { xs: 2, sm: 3, md: 4 },
            "& .MuiStepLabel-label": {
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
            },
            "& .MuiStepIcon-root": {
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
              color: "gray",
              "&.Mui-active": {
                color: colors.primary,
              },
              "&.Mui-completed": {
                color: colors.primary,
              },
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Personal Information Section */}
        <Collapse in={activeStep === 0}>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            <Box
              sx={{
                display: { xs: "grid", md: "flex" },
                flexDirection: "row",
                gap: { xs: 1.5, sm: 2 },
                mb: { xs: 1.5, sm: 2 },
              }}
            >
              <TextField
                label="First Name"
                name="personalInfo.firstName"
                value={formData.personalInfo.firstName}
                onChange={(e) =>
                  handleChange("personalInfo", "firstName", e.target.value)
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.white,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
              <TextField
                label="Last Name"
                name="personalInfo.lastName"
                value={formData.personalInfo.lastName}
                onChange={(e) =>
                  handleChange("personalInfo", "lastName", e.target.value)
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.white,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: { xs: "grid", md: "flex" },
                flexDirection: "row",
                gap: { xs: 1.5, sm: 2 },
                mb: { xs: 1.5, sm: 2 },
              }}
            >
              <TextField
                label="Email"
                name="personalInfo.email"
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) =>
                  handleChange("personalInfo", "email", e.target.value)
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.white,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
              <TextField
                label="Address"
                name="personalInfo.address"
                type="address"
                value={formData.personalInfo.address}
                onChange={(e) =>
                  handleChange("personalInfo", "address", e.target.value)
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.white,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              <TextField
                label="Password"
                name="personalInfo.password"
                type="password"
                value={formData.personalInfo.password}
                onChange={(e) =>
                  handleChange("personalInfo", "password", e.target.value)
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.white,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
              <TextField
                label="Confirm Password"
                name="personalInfo.confirmPassword"
                type="password"
                value={formData.personalInfo.confirmPassword}
                onChange={(e) =>
                  handleChange(
                    "personalInfo",
                    "confirmPassword",
                    e.target.value
                  )
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.white,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
            </Box>
          </Box>
        </Collapse>

        {/* Company Information Section */}
        <Collapse in={activeStep === 1}>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            <Box
              sx={{
                display: { xs: "grid", md: "flex" },
                flexDirection: "row",
                gap: { xs: 1.5, sm: 2 },
                mb: { xs: 1.5, sm: 2 },
              }}
            >
              <TextField
                label="Company Name"
                name="companyInfo.companyName"
                value={formData.companyInfo.companyName}
                onChange={(e) =>
                  handleChange("companyInfo", "companyName", e.target.value)
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.lightGray,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
              <TextField
                label="Address"
                name="companyInfo.companyAddress"
                value={formData.companyInfo.companyAddress}
                onChange={(e) =>
                  handleChange("companyInfo", "companyAddress", e.target.value)
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.lightGray,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: { xs: "grid", md: "flex" },
                flexDirection: "row",
                gap: { xs: 1.5, sm: 2 },
                mb: { xs: 1.5, sm: 2 },
              }}
            >
              <TextField
                label="Company Email"
                name="companyInfo.companyEmail"
                type="email"
                value={formData.companyInfo.companyEmail}
                onChange={(e) =>
                  handleChange("companyInfo", "companyEmail", e.target.value)
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.lightGray,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
              <TextField
                label="City"
                name="companyInfo.city"
                value={formData.companyInfo.city}
                onChange={(e) =>
                  handleChange("companyInfo", "city", e.target.value)
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.lightGray,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: { xs: "grid", md: "flex" },
                flexDirection: "row",
                gap: { xs: 1.5, sm: 2 },
                mb: { xs: 1.5, sm: 2 },
              }}
            >
              <TextField
                label="Telephone Number"
                name="companyInfo.telephoneNumber"
                value={formData.companyInfo.telephoneNumber}
                onChange={(e) =>
                  handleChange("companyInfo", "telephoneNumber", e.target.value)
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.lightGray,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
              <TextField
                label="WhatsApp Business Number"
                name="companyInfo.whatsappBusinessNumber"
                type="tel"
                value={formData.companyInfo.whatsappBusinessNumber}
                onChange={(e) =>
                  handleChange(
                    "companyInfo",
                    "whatsappBusinessNumber",
                    e.target.value
                  )
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.lightGray,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: { xs: "grid", md: "flex" },
                flexDirection: "row",
                gap: { xs: 1.5, sm: 2 },
                mb: { xs: 1.5, sm: 2 },
              }}
            >
              
              <TextField
                label="BR Number"
                name="companyInfo.brNumber"
                value={formData.companyInfo.brNumber}
                onChange={(e) =>
                  handleChange("companyInfo", "brNumber", e.target.value)
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.lightGray,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
              <TextField
                label="VAT Number"
                name="companyInfo.vatNumber"
                value={formData.companyInfo.vatNumber}
                onChange={(e) =>
                  handleChange("companyInfo", "vatNumber", e.target.value)
                }
                fullWidth
                required
                variant="outlined"
                sx={{
                  bgcolor: colors.lightGray,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: { xs: "grid", md: "flex" },
                flexDirection: "row",
                gap: { xs: 1.5, sm: 2 },
                mb: { xs: 1.5, sm: 2 },
              }}
            >
              
              <TextField
                label="Upload VAT Certificate"
                name="companyInfo.uploadVatCertificate"
                value={formData.companyInfo.uploadVatCertificate}
                onChange={(e) =>
                  handleChange(
                    "companyInfo",
                    "uploadVatCertificate",
                    e.target.value
                  )
                }
                fullWidth
                variant="outlined"
                disabled
                placeholder="Upload file"
                sx={{
                  bgcolor: colors.lightGray,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
              <TextField
                label="Upload BR Certificate"
                name="companyInfo.uploadBrCertificate"
                value={formData.companyInfo.uploadBrCertificate}
                onChange={(e) =>
                  handleChange(
                    "companyInfo",
                    "uploadBrCertificate",
                    e.target.value
                  )
                }
                fullWidth
                variant="outlined"
                disabled
                placeholder="Upload file"
                sx={{
                  bgcolor: colors.lightGray,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
            </Box>
          </Box>
        </Collapse>

        {/* Select Interest Section */}
        <Collapse in={activeStep === 2}>
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 1, sm: 2 },
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              Interested Product Categories
            </Typography>
            <Box
              sx={{
                display: "flex", flexDirection: "column",
                gap: { xs: 0.5, sm: 1 },
              }}
            >
              {[
                "Tec & Electronics",
                "Automotive",
                "Sports & Outdoors",
                "Books",
              ].map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={formData.interestInfo.interestedCategories.includes(
                        category
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(category, e.target.checked)
                      }
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: { xs: "1.25rem", sm: "1.5rem" },
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {category}
                    </Typography>
                  }
                />
              ))}
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.interestInfo.termsAccepted}
                  onChange={(e) => handleTermsChange(e.target.checked)}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  I agree to the{" "}
                  <a href="#" style={{ color: colors.primary }}>
                    Terms and Conditions and Privacy Policy
                  </a>
                </Typography>
              }
              sx={{ mt: { xs: 1, sm: 2 } }}
            />
          </Box>
        </Collapse>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: { xs: 2, sm: 3, md: 4 },
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Button
            variant="contained"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{
              bgcolor: "#ffcc00",
              color: "black",
              "&:hover": { bgcolor: "#e6b800" },
              fontSize: { xs: "0.875rem", sm: "1rem" },
              py: { xs: 1, sm: 1.5 },
              px: { xs: 2, sm: 3 },
              minWidth: { xs: "100%", sm: "120px" },
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              (activeStep === 0 &&
                (!formData.personalInfo.firstName ||
                  !formData.personalInfo.lastName ||
                  !formData.personalInfo.email ||
                  !formData.personalInfo.password ||
                  !formData.personalInfo.confirmPassword ||
                  !formData.personalInfo.address)) ||
              (activeStep === 1 &&
                (!formData.companyInfo.companyName ||
                  !formData.companyInfo.companyAddress ||
                  !formData.companyInfo.city ||
                  !formData.companyInfo.whatsappBusinessNumber ||
                  !formData.companyInfo.vatNumber ||
                  !formData.companyInfo.companyEmail ||
                  !formData.companyInfo.brNumber)) ||
              (activeStep === 2 &&
                (formData.interestInfo.interestedCategories.length === 0 ||
                  !formData.interestInfo.termsAccepted))
            }
            sx={{
              bgcolor: colors.primary,
              boxShadow: "none",
              color: "black",
              "&:hover": { bgcolor: "#e6b800" },
              fontSize: { xs: "0.875rem", sm: "1rem" },
              py: { xs: 1, sm: 1.5 },
              px: { xs: 2, sm: 3 },
              minWidth: { xs: "100%", sm: "120px" },
            }}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
