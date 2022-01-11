import Head from "next/head";
import { InferGetStaticPropsType } from "next";
import { Container, Typography, Stack } from "@mui/material";
import { revalidateDurationInSec } from "../../lib/contants";
import { parseBlogPostProp, queryDatabase } from "../../lib/notionApi";
import InfoCard from "../../components/InfoCard";

export default function BlogIndex({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>all posts | nicolauscg</title>
        <meta name="description" content="All blog posts" />
      </Head>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          All posts
        </Typography>
        <Stack spacing={2}>
          {posts.map((post) => (
            <InfoCard
              key={post.id}
              title={post.title}
              link={`/blog/${post.id}`}
              tags={post.tags}
              dateTime={post.lastEditedDateTime}
              thumbnailUrl={post.thumbnailUrl}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const pages = (
    await queryDatabase({
      database_id: process.env.BLOG_DATABASE_ID!,
      ...(process.env.NODE_ENV !== "development" && {
        filter: {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      }),
    })
  ).results;
  const posts = pages.map(parseBlogPostProp);

  return {
    props: {
      posts,
    },
    revalidate: revalidateDurationInSec,
  };
};
