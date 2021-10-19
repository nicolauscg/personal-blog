import Head from "next/head";
import Link from "next/link";
import MuiLink from "@mui/material/Link";
import { InferGetStaticPropsType } from "next";
import { Container, Typography } from "@mui/material";
import { revalidateDurationInSec } from "../../components/contants";
import { RichText } from "../../components/RichText";
import { getDatabase } from "../../lib/notion";

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
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          All posts
        </Typography>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Typography variant="h6" component="h2">
                <RichText text={(post.properties.Name as any).title} />
              </Typography>
              <Link href={`/blog/${post.id}`}>
                <a>
                  <MuiLink>
                    <Typography>read post</Typography>
                  </MuiLink>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId!);

  return {
    props: {
      posts: database,
    },
    revalidate: revalidateDurationInSec,
  };
};
