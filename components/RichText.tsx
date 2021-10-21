import { NotionRichText } from "../lib/types";

export const RichText = ({ text }: { text: NotionRichText[] }) => {
  return (
    <>
      {text.map((value) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          text,
        } = value;
        return (
          <span
            className={[
              bold ? "font-bold" : "",
              code ? "font-mono bg-gray-200 py-1 px-2 rounded" : "",
              italic ? "italic" : "",
              strikethrough ? "line-through" : "",
              underline ? "underline" : "",
            ].join(" ")}
            // TODO check if "_background" suffix color work
            style={color !== "default" ? { color } : {}}
          >
            {text.link ? (
              <a href={text.link.url}>{text.content}</a>
            ) : (
              text.content
            )}
          </span>
        );
      })}
    </>
  );
};
