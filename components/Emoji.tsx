interface EmojiProps {
  label?: string;
  symbol: any;
}

export default function Emoji(props: EmojiProps) {
  const { label = "", symbol } = props;

  return (
    <span
      className="emoji"
      role="img"
      aria-label={label}
      aria-hidden={label !== ""}
    >
      {symbol}
    </span>
  );
}
