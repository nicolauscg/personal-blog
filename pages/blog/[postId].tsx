import { Fragment } from "react";
import { getDatabase, getPage, getBlocks } from "../../lib/notion";
import { databaseId } from "./index";
import { RichText } from "../../components/RichText";
import { revalidateDurationInSec } from "../../components/contants";
import { InferGetStaticPropsType } from "next";

const renderBlock = (block: any) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p>
          <RichText text={value.text} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          <RichText text={value.text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <RichText text={value.text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <RichText text={value.text} />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li>
          <RichText text={value.text} />
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <RichText text={value.text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <RichText text={value.text} />
          </summary>
          {value.children?.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption.length ? value.caption[0].plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    default:
      return (
        <span>
          `❌ Unsupported block ($
          {type === "unsupported" ? "unsupported by Notion API" : type})`
        </span>
      );
  }
};

export default function BlogPost({
  page,
  blocks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!page || !blocks) {
    return <div />;
  }
  return (
    <article>
      <h1>
        <RichText text={(page.properties.Name as any).title} />
      </h1>
      <section>
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </section>
    </article>
  );
}

// TODO use title as slug for better SEO
export const getStaticPaths = async () => {
  const paths =
    process.env.NODE_ENV === "development"
      ? []
      : (await getDatabase(databaseId!)).map((page) => ({
          params: { postId: page.id },
        }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: any) => {
  var postId = context.params?.postId as string;

  const page = await getPage(postId);
  const blocks = await getBlocks(postId);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !(block as any)[block.type].children) {
      (block as any)[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: revalidateDurationInSec,
  };
};
