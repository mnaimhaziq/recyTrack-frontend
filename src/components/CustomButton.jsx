import { Button, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const CustomButton = ({ nonMobileText, mobileText, onClick, type,disabled }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();
  return (
    <Button
    type={type}
    disabled={disabled}
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        color: "#000000",
        backgroundColor: theme.palette.primary.light,
      }}
    >
      {isNonMobile ? nonMobileText : mobileText}
    </Button>
  );
};

export default CustomButton;
