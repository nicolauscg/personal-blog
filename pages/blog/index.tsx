import Head from "next/head";
import { InferGetStaticPropsType } from "next";
import { Container, Typography, Stack } from "@mui/material";
import { revalidateDurationInSec } from "../../lib/contants";
import { queryDatabase } from "../../lib/notion";
import InfoCard from "../../components/InfoCard";

export const databaseId = process.env.BLOG_DATABASE_ID;

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
              title={(post.properties.Name as any).title}
              link={`/blog/${post.id}`}
              tags={(post.properties as any).Tags["multi_select"]}
              dateTime={
                (post.properties as any)["Last edited time"]["last_edited_time"]
              }
              thumbnailUrl={
                (post.properties as any).Thumbnail.files?.[0]?.file?.url
              }
            />
          ))}
        </Stack>
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = (
    await queryDatabase({
      database_id: databaseId!,
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

  return {
    props: {
      posts,
    },
    revalidate: revalidateDurationInSec,
  };
};
