import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export interface NotionRichText {
  type: "text";
  text: {
    content: string;
    link: {
      url: string;
    } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: NotionAllColors;
  };
  plain_text: string;
  href: string | null;
}

export enum NotionTextColor {
  Default = "default",
  Gray = "gray",
  Brown = "brown",
  Orange = "orange",
  Yellow = "yellow",
  Green = "green",
  Blue = "blue",
  Purple = "purple",
  Pink = "pink",
  Red = "red",
}

export enum NotionBackgroundColor {
  GrayBackground = "gray_background",
  BrownBackground = "brown_background",
  OrangeBackground = "orange_background",
  YellowBackground = "yellow_background",
  GreenBackground = "green_background",
  BlueBackground = "blue_background",
  PurpleBackground = "purple_background",
  PinkBackground = "pink_background",
  RedBackground = "red_background",
}

export type NotionAllColors = NotionTextColor | NotionBackgroundColor;

export interface NotionTag {
  id: string;
  name: string;
  color: NotionTextColor;
}

export interface NotionBlogPost {
  id: string;
  title: NotionRichText[];
  tags: NotionTag[];
  lastEditedDateTime: string;
  createdDateTime: string;
  thumbnailUrl: string | null;
  published: boolean;
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type PagePropsWithLayout<T> = T & {
  Component: NextPageWithLayout;
};
