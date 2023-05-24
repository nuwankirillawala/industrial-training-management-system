import React from "react";
import { Box, ButtonBase } from "@mui/material";

export const ClickableTile = ({
  width,
  height,
  backgroundColor,
  children,
  sx,
  flex,
  padding,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <ButtonBase onClick={handleClick}>
      <Box
        backgroundColor={backgroundColor ? backgroundColor : "#FFF"}
        width={width}
        height={height}
        borderRadius={2}
        sx={{ overflow: "auto", ...sx }}
        padding={padding ? padding : "20px"}
        flex={flex}
      >
        {children}
      </Box>
    </ButtonBase>
  );
};
