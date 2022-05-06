import anime from "animejs";
import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { useSelector, useStore } from "react-redux";
import Arrow from "../../components/arrow";
import { RootActionTypes, RootState } from "../../configure-store";
import { FC } from "../../types/component";
import AlphaGoStop from "./projects/alpha-go-stop";
import Blearn from "./projects/blearn";
import FitBuddy from "./projects/fit-buddy";
import MoreOnGithub from "./projects/more-on-github";

function observerCallback(
  store: ReturnType<typeof useStore>,
  level: number
): IntersectionObserverCallback {
  let prevY: number | null = null;
  let prevRatio = 0;
  return (entries): void => {
    const currentY = Math.min(
      ...entries.map((entry) => entry.boundingClientRect.y)
    );
    const entry = entries.find(
      (entry) => entry.boundingClientRect.y === currentY
    );
    if (!entry) return;
    const currentRatio = entry.intersectionRatio;
    const isIntersecting = entry.isIntersecting;

    // Scrolling down/up
    if (prevY === null) {
      prevY = Infinity;
      return;
    }
    if (currentY <= prevY) {
      if (currentRatio > prevRatio && isIntersecting) {
        // Scrolling down enter
        store.dispatch({ type: "SET_HOME_SECTION", section: level + 1 });
      }
    } else if (currentRatio < prevRatio && !isIntersecting) {
      // Scrolling up leave
      store.dispatch({ type: "SET_HOME_SECTION", section: level });
    }

    prevY = currentY;
    prevRatio = currentRatio;
  };
}

const Title: FC = ({ style, children }) => {
  return (
    <h1
      style={{
        font: style?.font,
        fontSize: style?.fontSize,
        fontWeight: style?.fontWeight,
        fontFamily: style?.fontFamily,
        fontKerning: style?.fontKerning,
        ...style,
        opacity: 1,
        background: undefined,
        lineHeight: "88%",
        margin: "0.5em 0",
      }}
    >
      <span
        style={{
          display: "inline-block",
          position: "absolute",
          zIndex: 2,
          color: style?.color,
          opacity: style?.opacity ?? 1,
          transition: "opacity 0.48s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {children}
      </span>
      <span
        style={{
          background: style?.background,
          backgroundImage: style?.backgroundImage,
          backgroundColor: style?.backgroundColor,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          opacity:
            1 -
            (typeof style?.opacity === "string"
              ? parseFloat(style?.opacity) *
                (style?.opacity.endsWith("%") ? 0.01 : 1)
              : style?.opacity ?? 1),
          transition: "opacity 0.48s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {children}
      </span>
    </h1>
  );
};

const TechStackRow: FC = ({ style, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const homeSection = useSelector((state: RootState) => state.homeSection);

  useEffect(() => {
    if (!ref.current) return;

    let animation: anime.AnimeInstance;

    if (homeSection !== 2) {
      animation = anime({
        targets: ref.current.children,
        opacity: [1, 0],
        duration: 380,
        easing: "easeInOutExpo",
      });
      return (): void => {
        animation?.pause();
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!ref.current) return;

        animation?.seek(10000);

        if (entry.isIntersecting) {
          animation = anime({
            targets: ref.current.children,
            opacity: [0, 1],
            translateY: ["3em", "0em"],
            duration: 380,
            easing: "easeInOutExpo",
          });
        } else {
          animation = anime({
            targets: ref.current.children,
            opacity: [1, 0],
            translateY: ["0em", "3em"],
            duration: 380,
            easing: "easeInOutExpo",
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);

    return (): void => {
      animation?.seek(10000);
      observer.disconnect();
    };
  }, [homeSection]);

  return (
    <div style={style} ref={ref}>
      {children}
    </div>
  );
};

const Separator: FC = () => (
  <svg
    style={{ margin: "6rem calc(50% - 16px)" }}
    width="32"
    height="96"
    viewBox="0 0 32 96"
  >
    <line
      x1="16"
      y1="0"
      x2="16"
      y2="96"
      style="stroke: var(--gray-800); stroke-width: 1px;"
    />
  </svg>
);

const HomeContent: FC = () => {
  const firstSection = useRef<HTMLDivElement>(null);
  const secondSection = useRef<HTMLDivElement>(null);
  const thirdSection = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);
  const store = useStore<RootState, RootActionTypes>();
  const homeSection = useSelector((state: RootState) => state.homeSection);

  useEffect(() => {
    if (!firstSection.current) return;
    if (!secondSection.current) return;
    if (!thirdSection.current) return;
    if (!lastRef.current) return;

    const firstSectionObserver = new IntersectionObserver(
      observerCallback(store, 0),
      { threshold: 1 }
    );
    firstSectionObserver.observe(firstSection.current);

    const secondSectionObserver = new IntersectionObserver(
      observerCallback(store, 1),
      { threshold: 1 }
    );
    secondSectionObserver.observe(secondSection.current);

    const thirdSectionObserver = new IntersectionObserver(
      observerCallback(store, 2),
      { threshold: 1 }
    );
    thirdSectionObserver.observe(thirdSection.current);
    thirdSectionObserver.observe(lastRef.current);

    return (): void => {
      firstSectionObserver.disconnect();
      secondSectionObserver.disconnect();
      thirdSectionObserver.disconnect();
    };
  }, [store]);

  return (
    <div
      style={{
        position: "relative",
        padding:
          "calc(var(--vh, 1vh) * 25) max(32px, 12vw, calc(50vw - 1024px)) calc(var(--vh, 1vh) * 33)",
      }}
    >
      {/* Projects */}
      <section>
        <div
          ref={firstSection}
          style={{
            transform: "translateY(calc(var(--vh, 1vh) * 50)",
            width: "1px",
            height: "1px",
          }}
        />
        <Title
          style={{
            fontSize: "clamp(2.5rem, calc(6.5vw + 1rem), 10rem)",
            backgroundImage:
              "linear-gradient(-70deg, rgb(247, 171, 105), rgb(242, 71, 120))",
            color: "var(--gray-700)",
            opacity: homeSection === 1 ? 0 : 1,
          }}
        >
          Projects.
        </Title>
        {/* Projects */}
        <FitBuddy />
        <AlphaGoStop />
        <Blearn />
        <MoreOnGithub />
      </section>

      <Separator />

      {/* Technical Stacks */}
      <section>
        <div
          ref={secondSection}
          style={{
            transform: "translateY(calc(var(--vh, 1vh) * 50)",
            width: "1px",
            height: "1px",
          }}
        />
        <Title
          style={{
            fontSize: "clamp(2.5rem, calc(6.5vw + 1rem), 10rem)",
            backgroundImage: "linear-gradient(-70deg, #b721ff, #21d4fd)",
            color: "var(--gray-700)",
            opacity: homeSection === 2 ? 0 : 1,
          }}
        >
          Technical
          <br />
          Skill Set.
        </Title>

        <TechStackRow
          style={{
            color: "white",
          }}
        >
          <div
            style={{
              overflowX: "auto",
            }}
          >
            <pre
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(1rem, 0.2rem + 1.614vw, 3rem)",
                width: "min-content",
                margin: "0.5em auto",
                minWidth: "100%",
              }}
            >
              {`Skill                            Proficiency
----------------------------------------------
HTML/CSS                         Advanced
 └ CSS3 (flexbox, grid, etc.)
 └ TailwindCSS

JavaScript                       Advanced
 └ Language: ESNext/TypeScript
 └ Frontend: React/Gatsby
 └ Backend:  NodeJS

Functional Programming           Advanced
 └ Frontend: Elm/Reason(React)
 └ Backend:  Haskell

Other Skills
 └ Data Science/ML (Python/R)    Intermediate
 └ Rust                          Intermediate
 └ Kotlin/Scala                  Beginner
 └ WebAuthn/WebRTC/WASM          Beginner
 └ Kubernetes                    Beginner
 └ PHP/Laravel                   Beginner
 └ TeX                           Advanced
`}
            </pre>
          </div>
        </TechStackRow>
      </section>

      <Separator />

      {/* Contact */}
      <section>
        <div
          ref={thirdSection}
          style={{
            transform: "translateY(calc(var(--vh, 1vh) * 50)",
            width: "1px",
            height: "1px",
          }}
        />
        <a
          href={((): string => {
            const coded = "n4@TwA7.TFn";
            const key =
              "EWZXNjD8tnBUbzy1riVKAcokSdqpFus5G2TMh6fQ7eg0Ya93vxIl4RPLwCHOmJ";
            const shift = coded.length;
            let link = "";
            for (let i = 0; i < coded.length; i++) {
              if (key.indexOf(coded.charAt(i)) == -1) {
                link += coded.charAt(i);
              } else {
                link += key.charAt(
                  (key.indexOf(coded.charAt(i)) - shift + key.length) %
                    key.length
                );
              }
            }
            return `mailto:${link}`;
          })()}
          style={{
            textDecoration: "none",
            outline: "none",
            display: "inline-block",
          }}
        >
          <Title
            style={{
              fontSize: "clamp(2.5rem, calc(6.5vw + 1rem), 10rem)",
              backgroundImage: "linear-gradient(-70deg, #537895, #09203f)",
              color: "var(--gray-700)",
              opacity: homeSection === 3 ? 0 : 1,
            }}
          >
            Contact
            <br />
            Me
            <Arrow
              color={
                homeSection === 3 ? "hsl(207.6, 32%, 38.6%)" : "var(--gray-700)"
              }
            />
          </Title>
        </a>
      </section>

      <div
        ref={lastRef}
        style={{
          transform: "translateY(calc(var(--vh, 1vh) * 33 - 6rem))",
          width: "1px",
          height: "1px",
        }}
      />
    </div>
  );
};

export default HomeContent;
