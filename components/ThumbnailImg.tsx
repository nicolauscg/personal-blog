import Image from "next/image";
import { useMemo } from "react";

interface ThumbnailImgProps {
  url?: string | null;
  fallbackWithGreyBg?: boolean;
  widthRatio?: number;
  heightRatio?: number;
}

export default function ThumbnailImg(props: ThumbnailImgProps) {
  const {
    url = null,
    fallbackWithGreyBg = false,
    widthRatio = 0,
    heightRatio = 0,
  } = props;

  const outerDivClassName: string = useMemo(() => {
    const classNames = [];
    if (url || fallbackWithGreyBg) {
      classNames.push("relative", "w-full", "rounded-lg", "self-center");

      if (widthRatio || heightRatio) {
        classNames.push(
          `aspect-w-${widthRatio || 1}`,
          `aspect-h-${heightRatio || 1}`
        );
      }
    }

    if (!url && fallbackWithGreyBg) {
      classNames.push("bg-gray-300");
    }

    return classNames.join(" ");
  }, [url, fallbackWithGreyBg, widthRatio, heightRatio]);

  return (
    <div className={outerDivClassName}>
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
