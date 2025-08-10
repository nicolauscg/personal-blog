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
}

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
    titleAsPlainText: (pageProp.properties.Name.title as NotionRichText[])
      .map((richText) => richText.plain_text)
      .join(" "),
    tags: pageProp.properties.Tags.multi_select as NotionTag[],
    lastEditedDateTime: pageProp.properties.Published.date?.start || (null as string | null),
    createdDateTime: pageProp.properties.Created.created_time as string,
    thumbnailUrl: null as string | null,
    published: pageProp.properties.Public.checkbox as boolean,
  };
};
