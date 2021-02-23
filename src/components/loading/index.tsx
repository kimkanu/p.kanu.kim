import { h } from "preact";
import { FC } from "../../types/component";
import Logo from "../../components/logo";
import styles from "./style.css";

export interface LoadingProps {
  progress: number;
}

const Loading: FC<LoadingProps> = ({ style, progress }) => {
  return (
    <div class={styles.loading} style={style}>
      <div>
        <Logo.Image style={{ width: "clamp(72px, 20vw, 96px)" }} />
        <div class={styles.bar}>
          <div
            style={{
              width: `calc(${Math.min(1, Math.max(0, progress)) * 100}% - 2px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
