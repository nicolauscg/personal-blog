import Link from "next/link";
import Image from "next/image";
import { Button, Chip, Stack, Typography } from "@mui/material";
import {
  queryDatabase,
  getPageContent,
  getPageProp,
  parseBlogPostProp,
} from "../../lib/notionApi";
import { parseNotionTextColor, parseDateTime } from "../../lib/notionHelpers";
import { revalidateDurationInSec } from "../../lib/contants";
import { RichText } from "../../components/RichText";
import { InferGetStaticPropsType } from "next";
import { Container } from "@mui/material";
import { NotionRenderer, Code } from "react-notion-x";
import { ArrowBack } from "@mui/icons-material";
import ThumbnailImg from "../../components/ThumbnailImg";

export default function BlogPost({
  post,
  pageRecordMap,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!post || !pageRecordMap) {
    return <></>;
  }

  return (
    <Container maxWidth="md" className="flex flex-col">
      <div className="flex">
        <Button startIcon={<ArrowBack />}>
          <Link href="/blog">
            <span className="normal-case">Back to all posts</span>
          </Link>
        </Button>
      </div>
      <ThumbnailImg url={post.thumbnailUrl} shorterHeight />
      <div className="my-4 flex flex-col items-center">
        <Stack direction="row" spacing={1}>
          {post.tags.map((tag) => (
            <Chip
              key={tag.id}
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
          collectionRow: () => <></>,
          collection: () => <></>,
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
            database_id: process.env.BLOG_DATABASE_ID!,
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
