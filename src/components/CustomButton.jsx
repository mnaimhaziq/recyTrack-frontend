import { Button, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const CustomButton = ({
  backgroundColor,
  textColor,
  nonMobileText,
  mobileText,
  onClick,
  type,
  disabled,
  borderRadius,
  fontWeight,
  padding,
}) => {
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
        color: textColor || "#000000",
        backgroundColor: backgroundColor || theme.palette.primary.light,
        fontWeight: fontWeight,
        padding: padding,
        borderRadius: borderRadius,
        "&:hover": {
          backgroundColor: textColor,
          color: backgroundColor,
          borderColor: backgroundColor,
        },
      }}
    >
      {isNonMobile ? nonMobileText : (mobileText || nonMobileText)}
    </Button>
  );
};

export default CustomButton;
