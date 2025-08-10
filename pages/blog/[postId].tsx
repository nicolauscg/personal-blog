import { Button } from "@mui/material";
import Link from "next/link";
import { getPageContent } from "../../lib/notionApi";
import { revalidateDurationInSec } from "../../lib/contants";
import { InferGetStaticPropsType } from "next";
import { NotionRenderer } from "react-notion-x";
import { ArrowBack } from "@mui/icons-material";

export default function BlogPost({ recordMap }: InferGetStaticPropsType<typeof getStaticProps>) {
  // TODO add support for code blocks
  return <NotionRenderer
    recordMap={recordMap}
    fullPage={true}
    darkMode={false}
    pageHeader={
      <Button startIcon={<ArrowBack />}>
        <Link href="/blog">
          <span className="normal-case">Back to all posts</span>
        </Link>
      </Button>
    }
  />
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
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