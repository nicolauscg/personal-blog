import { Button } from "@mui/material";
import Link from "next/link";
import { getPageContent, queryDatabase, getPageProp } from "../../lib/notionApi";
import { revalidateDurationInSec } from "../../lib/contants";
import { InferGetStaticPropsType } from "next";
import { ArrowBack } from "@mui/icons-material";
import { NotionPage } from "../../components/NotionPage";
import { getPageTitle } from "notion-utils";
import Head from "next/head";

export default function BlogPost({ recordMap, postTitle }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>nicolauscg | {postTitle}</title>
      </Head>
      <NotionPage
        recordMap={recordMap}
        pageHeader={
          <Button startIcon={<ArrowBack />}>
            <Link href="/blog">
              <span className="normal-case">Back to all posts</span>
            </Link>
          </Button>
        }
      />
    </>
  )
}

// TODO use title as slug for better SEO
export async function getStaticPaths() {
  // On production envs, statically generate public blog posts,
  // on dev envs, skip static generation.
  const paths =
    process.env.NODE_ENV === "development"
      ? []
      : (
          await queryDatabase({
            database_id: process.env.BLOG_DATABASE_ID!,
            filter: {
              property: "Public",
              checkbox: {
                equals: true,
              },
            },
          })
        ).results.map((page) => ({
          params: { postId: page.id },
        }));

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = async (context: any) => {
  const postId = context.params?.postId as string;

  // Check if the official Notion API token can access this page id,
  // this is done to only render pages created by the token's author.
  try {
    await getPageProp(postId)
  } catch (e) {
    console.error("Failed to get page prop for postId " + postId + ", error: " + e)
    return {
      notFound: true,
      revalidate: revalidateDurationInSec
    }
  }

  // Get page content and title using unofficial Notion API client
  const recordMap = await getPageContent(postId)
  const postTitle = getPageTitle(recordMap) || "blog post";

  return {
    props: {
      recordMap,
      postTitle
    },
    revalidate: revalidateDurationInSec
  }
}