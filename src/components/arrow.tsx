import { h } from "preact";
import { FC } from "../types/component";

const Arrow: FC<{ color?: string }> = ({ style, color }) => (
  <svg
    style={{
      verticalAlign: "text-top",
      width: style?.width ?? "1.3em",
      height: style?.height ?? "1.3em",
      ...style,
    }}
    viewBox="0 0 16 16"
  >
    <path
      clip-rule="evenodd"
      d="m8.21967 2.96967c.29289-.29289.76777-.29289 1.06066 0l4.24997 4.25c.2929.29289.2929.76777 0 1.06066l-4.24997 4.24997c-.29289.2929-.76777.2929-1.06066 0s-.29289-.7677 0-1.0606l2.96963-2.9697h-7.4393c-.41421 0-.75-.33579-.75-.75s.33579-.75.75-.75h7.4393l-2.96963-2.96967c-.29289-.29289-.29289-.76777 0-1.06066z"
      fill-rule="evenodd"
      style={{
        fill: color,
        transition: "fill 0.38s cubic-bezier(0.8, 0, 0.8, 1)",
      }}
    />
  </svg>
);

export default Arrow;
