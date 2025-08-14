import Image from "next/legacy/image";
import { useMemo } from "react";

interface ThumbnailImgProps {
  url?: string | null;
  fallbackWithGreyBg?: boolean;
  tailwindAspectRatio?: string;
}

export default function ThumbnailImg(props: ThumbnailImgProps) {
  const {
    url = null,
    fallbackWithGreyBg = false,
    tailwindAspectRatio = "",
  } = props;

  const outerDivClassName: string = useMemo(() => {
    const classNames = [];
    if (url || fallbackWithGreyBg) {
      classNames.push("relative", "w-full", "rounded-lg", "self-center");

      // do not generate class name dynamically, else tailwind will not detect
      // its usage and not generate the styling
      switch (tailwindAspectRatio) {
        case "rectangle":
          classNames.push("aspect-rectangle");
          break;
        case "shorter":
          classNames.push("aspect-shorter");
          break;
        default:
      }
    }

    if (!url && fallbackWithGreyBg) {
      classNames.push("bg-gray-300");
    }

    return classNames.join(" ");
  }, [url, fallbackWithGreyBg, tailwindAspectRatio]);

  return (
    <div className={outerDivClassName}>
      {url && (
        <Image
          src={url}
          alt="blog post thumbnail"
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
        />
      )}
    </div>
  );
}
