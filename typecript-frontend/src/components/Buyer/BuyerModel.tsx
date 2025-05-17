"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Modal,
  Paper,
  Avatar,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import colors from "@/theme/color";

const BuyerOnboardingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<string>("");
  const [promoConsent, setPromoConsent] = useState<string>("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const categories = [
    "Electronic & Gadgets",
    "Home & Kitchen",
    "Sports & Outdoors",
    "Fashion & Accessories",
    "Health & Beauty",
    "other",
  ];

  const handleInterestChange = (category: string) => {
    setInterests((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleSave = () => {
    console.log("Interests:", interests);
    console.log("Shopping Frequency:", frequency);
    console.log("Promo Consent:", promoConsent);
    onClose();
  };

  return (
    <Modal open onClose={onClose}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" px={2}>
        <Paper
          sx={{
            p: isSmallScreen ? 2 : 4,
            maxWidth: 600,
            width: "100%",
            borderRadius: 3,
            boxShadow: 4,
            position: "relative",
          }}
        >
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            fontWeight="bold"
            textAlign="center"
            mb={3}
          >
            Let’s get to know You!
          </Typography>

          {step === 1 && (
            <>
              <Typography variant="body1" mb={2}>
                1. What categories are you most interested in? (Select all that apply)
              </Typography>
              <Box display="flex" flexDirection="column" gap={1} sx={{ color: colors.textPrimary }}>
                {categories.map((cat) => (
                  <FormControlLabel
                    key={cat}
                    control={
                      <Checkbox
                        checked={interests.includes(cat)}
                        onChange={() => handleInterestChange(cat)}
                      />
                    }
                    label={cat}
                  />
                ))}
              </Box>
              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button
                  variant="contained"
                  onClick={() => setStep(2)}
                  disabled={interests.length === 0}
                  sx={{ bgcolor: colors.primary, color: colors.textPrimary, px: 4, borderRadius: 2 }}
                >
                  Next
                </Button>
              </Box>
            </>
          )}

          {step === 2 && (
            <>
              <Typography variant="body1" mb={2}>
                2. How often do you shop online?
              </Typography>
              <RadioGroup
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                {["Daily", "Weekly", "Monthly", "Rarely"].map((option) => (
                  <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
              <Box display="flex" justifyContent="space-between" mt={3}>
                <Button onClick={() => setStep(1)}>Back</Button>
                <Button
                  variant="contained"
                  onClick={() => setStep(3)}
                  disabled={!frequency}
                  sx={{ bgcolor: colors.primary, color: colors.textPrimary }}
                >
                  Next
                </Button>
              </Box>
            </>
          )}

          {step === 3 && (
            <>
              <Typography variant="body1" mb={2}>
                3. Are you interested in receiving promotional emails?
              </Typography>
              <RadioGroup
                value={promoConsent}
                onChange={(e) => setPromoConsent(e.target.value)}
              >
                {["Yes", "No"].map((option) => (
                  <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
              <Box display="flex" justifyContent="space-between" mt={3} gap={2}>
                <Button onClick={() => setStep(2)}>Back</Button>
                <Stack direction="row" spacing={2}>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={!promoConsent}
                    sx={{ bgcolor: colors.primary, color: colors.textPrimary }}
                  >
                    Save Changes
                  </Button>
                </Stack>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Modal>
  );
};

export default BuyerOnboardingModal;
