import { alpha, styled } from "@mui/material/styles";
import { ReactNode } from "react";

interface HighlightProps {
  children: ReactNode;
  colorHex: string;
}

const StyledMark = styled("mark")<HighlightProps>(({ colorHex }) => {
  return {
    fontWeight: "bolder",
    background: `
    linear-gradient(
      104deg,
      ${alpha(colorHex, 0)} 0.9%,
      ${alpha(colorHex, 0.8)} 2.4%,
      ${alpha(colorHex, 0.5)} 5.8%,
      ${alpha(colorHex, 0.2)} 93%,
      ${alpha(colorHex, 0.5)} 96%,
      ${alpha(colorHex, 0)} 98%
    ),
    linear-gradient(
      183deg,
      ${alpha(colorHex, 0)} 0%,
      ${alpha(colorHex, 0.1)} 7.9%,
      ${alpha(colorHex, 0)} 15%
    )`,
    padding: "0.1rem 0.25rem",
    boxDecorationBreak: "clone",
    margin: 0,
    borderRadius: "7.5px",
  };
});

export default StyledMark;
