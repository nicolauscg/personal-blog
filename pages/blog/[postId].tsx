import Link from "next/link";
import Image from "next/image";
import { Button, Chip, Stack, Typography, Alert } from "@mui/material";
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
import { ImageBlock } from "notion-types";

interface ImageFileIdToDimension {
  [fileId: string]: {
    width: number;
    height: number;
    isFullWidth: boolean;
  };
}

export default function BlogPost({
  post,
  pageRecordMap,
  imageFileIdToDimension,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!post || !pageRecordMap) {
    return <></>;
  }

  // only notion hosted images are supported, see comments in getStaticProps
  const getFileIdFromNotionImgUrl = (
    url: string
  ): { fileId?: string; errorMsg?: string } => {
    const isImgFromUnsplash = url.includes("images.unsplash.com");
    if (isImgFromUnsplash) {
      return {
        errorMsg:
          "image from unsplash not supported, use locally uploaded images",
      };
    }

    // url is of the form https://www.notion.so/image/<encoded aws url>
    const decodedUrl = decodeURIComponent(url.split("/").slice(-1).pop() || "");
    // assume if its from aws s3 bucket then its an image uplaoded from local
    const isNotionHostedImage =
      decodedUrl.includes("s3.") && decodedUrl.includes("amazonaws.com");
    if (!isNotionHostedImage) {
      return {
        errorMsg:
          "embed link images not supported, use locally uploaded images",
      };
    }

    // url is of the form .../<notion file id>/<file name and extension>
    const fileId = decodedUrl.split("/").slice(-2, -1).pop() || "";
    return { fileId };
  };

  return (
    <Container maxWidth="md" className="flex flex-col">
      <div className="flex">
        <Button startIcon={<ArrowBack />}>
          <Link href="/blog">
            <span className="normal-case">Back to all posts</span>
          </Link>
        </Button>
      </div>
      <ThumbnailImg url={post.thumbnailUrl} tailwindAspectRatio="shorter" />
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
        customImages
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
          image: ({ src }: { src: string }) => {
            const { fileId, errorMsg } = getFileIdFromNotionImgUrl(src);
            if (errorMsg) {
              return <Alert severity="error">{errorMsg}</Alert>;
            }

            const {
              width = 0,
              height = 0,
              isFullWidth = false,
            } = imageFileIdToDimension?.[fileId || ""] || {};

            return (
              <Image
                src={src}
                width={width}
                height={height}
                layout={isFullWidth ? "responsive" : "intrinsic"}
              />
            );
          },
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

  // only support notion hosted images (ones uploaded from local)
  // as embed link images do not have file id and
  // images from unsplash do not contain dimension information in record map
  const imageFileIdToDimension: ImageFileIdToDimension = Object.fromEntries(
    Object.entries(pageRecordMap.block)
      .filter(([blockId, blockData]) => {
        return (
          blockData.value.type === "image" &&
          (blockData.value.properties as any).title !== undefined
        );
      })
      .map(([blockId, blockData]) => {
        const imgBlock = blockData.value as ImageBlock;
        const fileId: string = imgBlock.file_ids?.[0] || "";
        const width: number = imgBlock.format?.block_width || 0;
        const height: number = Math.round(
          width * (imgBlock.format?.block_aspect_ratio || 0)
        );
        const isFullWidth: boolean = imgBlock.format?.block_page_width || false;

        return [fileId, { width, height, isFullWidth }];
      })
  );

  return {
    props: {
      post,
      pageRecordMap,
      imageFileIdToDimension,
    },
    revalidate: revalidateDurationInSec,
  };
};
