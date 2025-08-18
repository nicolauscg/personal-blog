import { Button } from "@mui/material";
import Link from "next/link";
import { getPageContent } from "../../lib/notionApi";
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