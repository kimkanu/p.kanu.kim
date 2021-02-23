import { Fragment, h } from "preact";
import { FC } from "../../types/component";
import Logo from "../../components/logo";
import anime from "animejs";
import styles from "./style.css";
import { useEffect, useRef, useState } from "preact/hooks";
import { SmoothProvider } from "../../components/smooth-scrolling";
import HomeContent from "./content";
import { useSelector } from "react-redux";
import { RootState } from "../../configure-store";

function getBackground(section: number): string {
  switch (section) {
    case 0:
      return "transparent";
    case 1:
      return "rgb(255, 231, 228)";
    case 2:
      return "rgb(25, 26, 28)";
    default:
      return "";
  }
}

const Home: FC = () => {
  const homeSection = useSelector((state: RootState) => state.homeSection);
  const [isLoadingFinished, setLoadingFinished] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingFinished(true);
    }, 4100);
    return (): void => {
      clearTimeout(timeout);
    };
  }, []);

  return isLoadingFinished ? (
    <Fragment>
      <SmoothProvider class={styles.home} skew>
        <Loading loaded />
        <HomeContent />
      </SmoothProvider>
      <div
        style={{
          position: "fixed",
          zIndex: 0,
          width: "100vw",
          height: "calc(var(--vh, 1vh) * 100)",
          top: 0,
          left: 0,
          background: getBackground(homeSection),
          transition: "background 0.78s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </Fragment>
  ) : (
    <div style={{ maxWidth: "100%", maxHeight: "100%", overflow: "hidden" }}>
      <Loading />
    </div>
  );
};

const Loading: FC<{ loaded?: boolean }> = ({ loaded = false }) => {
  const textRef = useRef<{ base: HTMLDivElement }>();
  const imageRef = useRef<{ base: SVGSVGElement }>();
  const arrowRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (loaded) return;

    anime
      .timeline()
      .add({
        targets: textRef.current.base,
        height: [0, 30],
        easing: "easeInOutExpo",
        duration: 1200,
      })
      .add(
        {
          targets: imageRef.current.base,
          scale: [1, 1.4],
          paddingTop: [0, 16],
          paddingBottom: [22, 32],
          easing: "easeInOutExpo",
          duration: 1200,
        },
        0
      )
      .add(
        {
          targets: arrowRef.current,
          opacity: ["0%", "100%"],
          easing: "easeInOutExpo",
          delay: 3700,
          duration: 400,
        },
        0
      );
  }, [loaded]);

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(var(--vh, 1vh) * 100)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo.Image
          ref={imageRef}
          style={{
            width: "clamp(72px, 20vw, 96px)",
            transform: loaded ? "scale(1.4)" : "scale(1)",
            paddingTop: loaded ? 16 : 0,
            paddingBottom: loaded ? 32 : 22,
          }}
        />
        <Logo.Text ref={textRef} key={0} loaded={loaded} delay={1200} />
      </div>
      <div
        ref={arrowRef}
        style={{
          position: "absolute",
          bottom: 32,
          opacity: loaded ? "100%" : 0,
        }}
      >
        <svg width="32" height="48" viewBox="0 0 32 48">
          <line
            x1="16"
            y1="0"
            x2="16"
            y2="48"
            style="stroke: var(--gray-800); stroke-width: 1px;"
          />
          <path
            d="M16 48 C 16 39, 24 34, 28 32"
            style="stroke: var(--gray-800); stroke-width: 1px; fill: transparent;"
          />
        </svg>
        <span
          style={{
            color: "var(--gray-800)",
            fontSize: "0.92rem",
            position: "absolute",
            whiteSpace: "nowrap",
            transform: "rotate(-45deg)",
            left: "1rem",
            bottom: "4rem",
          }}
        >
          Scroll to navigate
        </span>
      </div>
    </div>
  );
};

export default Home;
