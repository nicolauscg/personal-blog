import { Client } from "@notionhq/client";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from "notion-client";
import { NotionBlogPost, NotionRichText, NotionTag } from "./types";

const officialNotionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

const unofficialNotionClient = new NotionAPI();

export const queryDatabase = async (args: QueryDatabaseParameters) => {
  return officialNotionClient.databases.query(args);
};

export const getPageProp = async (pageId: string) => {
  return officialNotionClient.pages.retrieve({
    page_id: pageId,
  });
};

export const getPageContent = async (pageId: string) => {
  return unofficialNotionClient.getPage(pageId);
};

export const parseBlogPostProp = (pageProp: any): NotionBlogPost => {
  return {
    id: pageProp.id as string,
    title: pageProp.properties.Name.title as NotionRichText[],
    tags: pageProp.properties.Tags["multi_select"] as NotionTag[],
    lastEditedDateTime: pageProp.properties["Last edited time"][
      "last_edited_time"
    ] as string,
    createdDateTime: pageProp.properties["Created time"][
      "created_time"
    ] as string,
    thumbnailUrl:
      pageProp.properties.Thumbnail.files?.[0]?.file?.url ||
      (null as string | null),
    published: pageProp.properties.Published.checkbox as boolean,
  };
};
