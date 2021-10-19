import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { revalidateDurationInSec } from "../../components/contants";
import { RichText } from "../../components/RichText";
import { getDatabase } from "../../lib/notion";

export const databaseId = process.env.BLOG_DATABASE_ID;

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ol>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.id}`}>
            <a>
              <RichText text={(post.properties.Name as any).title} />
            </a>
          </Link>
        </li>
      ))}
    </ol>
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
