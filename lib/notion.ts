import { Client } from "@notionhq/client";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from "notion-client";

const officialNotionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

const unofficialNotionClient = new NotionAPI();

export const queryDatabase = async (args: QueryDatabaseParameters) => {
  return officialNotionClient.databases.query(args);
};

export const getPage = async (pageId: string) => {
  return unofficialNotionClient.getPage(pageId);
};
