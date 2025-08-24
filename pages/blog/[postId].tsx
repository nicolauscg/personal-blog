import { Button } from "@mui/material";
import Link from "next/link";
import { getPageContent, queryDatabase } from "../../lib/notionApi";
import { revalidateDurationInSec } from "../../lib/contants";
import { InferGetStaticPropsType } from "next";
import { ArrowBack } from "@mui/icons-material";
import { NotionPage } from "../../components/NotionPage";

export default function BlogPost({ recordMap }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <NotionPage
    recordMap={recordMap}
    pageHeader={
      <Button startIcon={<ArrowBack />}>
        <Link href="/blog">
          <span className="normal-case">Back to all posts</span>
        </Link>
      </Button>
    }
  />
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
  const recordMap = await getPageContent(postId)

  return {
    props: {
      recordMap,
    },
    revalidate: revalidateDurationInSec
  }
}