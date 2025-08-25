import { InferGetStaticPropsType } from "next";
import { revalidateDurationInSec } from "../../lib/contants";
import { getPageContent } from "../../lib/notionApi";
import { NotionPage } from "../../components/NotionPage";

export default function BlogIndex({
  recordMap,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <NotionPage
    recordMap={recordMap}
    className={"blog-index-page"}
  />
}

export const getStaticProps = async () => {
  const recordMap = await getPageContent(process.env.BLOG_INDEX_PAGE_ID!)

  return {
    props: {
      recordMap,
    },
    revalidate: revalidateDurationInSec
  }
}
