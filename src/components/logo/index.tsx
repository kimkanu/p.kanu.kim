import anime from "animejs";
import { Fragment, h } from "preact";
import { useEffect, useRef } from "preact/hooks";

import { FC } from "../../types/component";
import styles from "./style.css";

const Image: FC = ({ style }) => {
  return (
    <svg style={{ width: "100%", ...style }} viewBox="0 0 2 2">
      <polygon points="0,0 0,2 2,2" style="fill: var(--gray-300)" />
      <polygon points="0,1 1,1 1,2" style="fill: var(--gray-600)" />
      <polygon points="1,1 2,1 2,2" style="fill: var(--gray-600)" />
    </svg>
  );
};

const Text: FC<{ loaded?: boolean; delay?: number }> = ({
  style,
  loaded = false,
  delay = 0,
}) => {
  const backgroundRef = useRef<HTMLDivElement>();
  const textRef = useRef<HTMLDivElement>();
  const nameRef = useRef<HTMLSpanElement>();
  const kimRef = useRef<HTMLSpanElement>();

  useEffect(() => {
    if (loaded) return;

    const timeout = setTimeout(() => {
      const width = nameRef.current.clientWidth;
      const kimWidth = kimRef.current.clientWidth;

      const measureDiv = document.createElement("div");
      measureDiv.style.display = "inline-block";
      measureDiv.style.height = "0px";
      measureDiv.style.fontSize = "clamp(1.5rem, 2.25vw, 3rem)";
      measureDiv.style.fontFamily = "Inter, sans-serif";
      measureDiv.style.fontWeight = "bold";
      measureDiv.innerText = "Keonwoo";
      document.body.appendChild(measureDiv);
      const nameWidth = measureDiv.clientWidth;
      measureDiv.style.fontWeight = "normal";
      measureDiv.innerText = "K im";
      const newKimWidth = measureDiv.clientWidth;

      document.body.removeChild(measureDiv);

      anime
        .timeline({ loop: false, easing: "easeOutExpo" })
        .add(
          {
            targets: backgroundRef.current,
            keyframes: [
              { width: "100%", duration: 380 },
              { translateX: "101%", duration: 380 },
            ],
          },
          0
        )
        .add(
          {
            targets: textRef.current,
            keyframes: [
              { opacity: "0%", duration: 380 },
              { opacity: "100%", duration: 0 },
            ],
          },
          0
        )
        .add(
          {
            targets: nameRef.current,
            keyframes: [
              { opacity: "100%", duration: 0 },
              {
                opacity: "0%",
                delay: 1500,
                duration: 280,
                easing: "easeInOutExpo",
              },
              { opacity: "100%", duration: 380 },
            ],
          },
          0
        )
        .add(
          {
            targets: nameRef.current,
            keyframes: [
              { width, duration: 0 },
              {
                width: nameWidth + 1,
                delay: 1200,
                duration:280,
              },
            ],
          },
          0
        )
        .add(
          {
            targets: kimRef.current,
            keyframes: [
              { opacity: "100%", duration: 0 },
              {
                opacity: "0%",
                delay: 1780,
                duration: 380,
              },
              { opacity: "100%", duration: 280 },
            ],
          },
          0
        )
        .add(
          {
            targets: kimRef.current,
            keyframes: [
              { width: kimWidth, duration: 0 },
              {
                width: newKimWidth,
                delay: 1300,
                duration: 580,
              },
            ],
          },
          0
        );

      setTimeout(() => {
        nameRef.current.innerHTML = "<strong>Keonwoo</strong>";
      }, 1680);

      setTimeout(() => {
        kimRef.current.innerText = " Kim";
      }, 2000);
    }, delay);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [delay, loaded]);

  return (
    <div class={styles.logo} style={style}>
      <div class={styles.background} ref={backgroundRef} />
      <div
        class={styles.text}
        ref={textRef}
        style={{ opacity: loaded ? "100%" : 0 }}
      >
        <span ref={nameRef} style={{ display: "inline-block" }}>
          {loaded ? (
            <Fragment>
              <strong>Keonwoo</strong>
            </Fragment>
          ) : (
            <Fragment>
              <strong>kanu</strong>.
            </Fragment>
          )}
        </span>
        <span
          ref={kimRef}
          style={{ display: "inline-block", textAlign: "right" }}
        >
          {loaded ? <span>&nbsp;Kim</span> : "kim"}
        </span>
      </div>
    </div>
  );
};

const Logo = {
  Image,
  Text,
};
export default Logo;
