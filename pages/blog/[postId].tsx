import Link from "next/link";
import { queryDatabase, getPage } from "../../lib/notion";
import { databaseId } from "./index";
import { revalidateDurationInSec } from "../../components/contants";
import { InferGetStaticPropsType } from "next";
import { Container, Typography } from "@mui/material";
import { NotionRenderer, Code } from "react-notion-x";

export default function BlogPost({
  pageRecordMap,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container maxWidth="md">
      <NotionRenderer
        recordMap={pageRecordMap}
        darkMode={false}
        components={{
          pageLink: ({
            href,
            as,
            passHref,
            prefetch,
            replace,
            scroll,
            shallow,
            locale,
            ...props
          }: any) => (
            <Link
              href={href}
              as={as}
              passHref={passHref}
              prefetch={prefetch}
              replace={replace}
              scroll={scroll}
              shallow={shallow}
              locale={locale}
            >
              <a {...props} />
            </Link>
          ),
          code: Code,
        }}
      />
    </Container>
  );
}

// TODO use title as slug for better SEO
export const getStaticPaths = async () => {
  const paths =
    process.env.NODE_ENV === "development"
      ? []
      : (
          await queryDatabase({
            database_id: databaseId!,
          })
        ).results.map((page) => ({
          params: { postId: page.id },
        }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: any) => {
  const postId = context.params?.postId as string;
  const pageRecordMap = await getPage(postId);

  return {
    props: {
      pageRecordMap,
    },
    revalidate: revalidateDurationInSec,
  };
};
