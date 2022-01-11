import Image from "next/image";

interface ThumbnailImgProps {
  url?: string | null;
  fallbackWithGreyBg?: boolean;
  shorterHeight?: boolean;
}

export default function ThumbnailImg(props: ThumbnailImgProps) {
  const {
    url = null,
    fallbackWithGreyBg = false,
    shorterHeight = false,
  } = props;

  return (
    <div
      className={`${
        url || fallbackWithGreyBg
          ? `elative w-full aspect-w-${
              shorterHeight ? 3 : 2
            } aspect-h-1 rounded-lg self-center`
          : ""
      } ${!url && fallbackWithGreyBg ? "bg-gray-400" : ""}`}
    >
      {url && (
        <Image
          src={url}
          alt="blog post thumbnail"
          layout="fill"
          objectFit="contain"
          objectPosition="center center"
        />
      )}
    </div>
  );
}
