import { alpha, styled } from "@mui/material/styles";
import { ReactNode } from "react";

interface HighlightProps {
  children: ReactNode;
}

const StyledMark = styled("mark")<HighlightProps>(({ theme }) => {
  return {
    fontWeight: "bolder",
    background: `
    linear-gradient(
      104deg,
      ${alpha(theme.palette.primary.main, 0)} 0.9%,
      ${alpha(theme.palette.primary.main, 0.8)} 2.4%,
      ${alpha(theme.palette.primary.main, 0.5)} 5.8%,
      ${alpha(theme.palette.primary.main, 0.2)} 93%,
      ${alpha(theme.palette.primary.main, 0.5)} 96%,
      ${alpha(theme.palette.primary.main, 0)} 98%
    ),
    linear-gradient(
      183deg,
      ${alpha(theme.palette.primary.main, 0)} 0%,
      ${alpha(theme.palette.primary.main, 0.1)} 7.9%,
      ${alpha(theme.palette.primary.main, 0)} 15%
    )`,
    padding: "0.1rem 0.25rem",
    boxDecorationBreak: "clone",
    margin: 0,
    borderRadius: "7.5px",
  };
});

export default StyledMark;
