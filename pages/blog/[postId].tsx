import Link from "next/link";
import { Chip, Stack, Typography } from "@mui/material";
import {
  queryDatabase,
  getPageContent,
  getPageProp,
  parseBlogPostProp,
} from "../../lib/notionApi";
import { parseNotionTextColor, parseDateTime } from "../../lib/notionHelpers";
import { databaseId } from "./index";
import { revalidateDurationInSec } from "../../lib/contants";
import { RichText } from "../../components/RichText";
import { InferGetStaticPropsType } from "next";
import { Container } from "@mui/material";
import { NotionRenderer, Code, CollectionRow } from "react-notion-x";

export default function BlogPost({
  post,
  pageRecordMap,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!post || !pageRecordMap) {
    return <></>;
  }

  return (
    <Container maxWidth="md">
      {post.thumbnailUrl && (
        <div
          className="w-full aspect-w-2 aspect-h-1 rounded-lg"
          style={{
            backgroundImage: `url(${post.thumbnailUrl})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      )}
      <div className="my-4 flex flex-col items-center">
        <Stack direction="row" spacing={1}>
          {post.tags.map((tag) => (
            <Chip
              className="border-2"
              label={tag.name}
              variant="outlined"
              size="small"
              color={parseNotionTextColor(tag.color)}
            />
          ))}
        </Stack>
        <Typography variant="h3" component="h1">
          <RichText text={post.title} />
        </Typography>
        <Typography variant="subtitle1">
          {parseDateTime(post.lastEditedDateTime)}
        </Typography>
      </div>
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
          collectionRow: CollectionRow,
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

  const pageProp = await getPageProp(postId);
  const post = parseBlogPostProp(pageProp);

  const pageRecordMap = await getPageContent(postId);

  return {
    props: {
      post,
      pageRecordMap,
    },
    revalidate: revalidateDurationInSec,
  };
};
