import { h } from "preact";
import styles from "./project.css";
import { FC } from "../../../types/component";
import Arrow from "../../../components/arrow";

const MoreOnGithub: FC = () => {
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          position: "relative",
          maxWidth: "1024px",
          margin: "6rem auto 4rem",
          fontSize: "clamp(1rem, 1.5vw, 2rem)",
        }}
      >
        <div class={styles.button}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/kimkanu"
            style={{
              padding: "0.4em 0.6em",
              fontWeight: "bold",
              fontSize: "1.2em",
              color: "var(--gray-800)",
            }}
          >
            Browse More Projects on Github <Arrow color="var(--gray-800)" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MoreOnGithub;
