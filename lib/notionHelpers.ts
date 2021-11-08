import { NotionTextColor } from "./types";

const notionTagColorToMuiColor: {
  [key in NotionTextColor]:
    | "default"
    | "success"
    | "warning"
    | "info"
    | "error"
    | "primary"
    | "secondary"
    | undefined;
} = {
  default: "default",
  gray: "default",
  brown: "success",
  orange: "warning",
  yellow: "warning",
  green: "success",
  blue: "info",
  purple: "info",
  pink: "error",
  red: "error",
};

export const parseNotionTextColor = (color: NotionTextColor) => {
  return notionTagColorToMuiColor[color];
};

export const parseDateTime = (dateTime: string) => {
  const date = new Date(dateTime);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
