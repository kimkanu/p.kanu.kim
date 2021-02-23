import { FunctionalComponent, h } from "preact";

export type FC<P = {}> = FunctionalComponent<
  P & {
    style?: h.JSX.CSSProperties;
    class?: string;
  }
>;
