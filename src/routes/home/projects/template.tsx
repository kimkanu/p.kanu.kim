import anime from "animejs";
import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import styles from "./project.css";
import { FC } from "../../../types/component";
import Arrow from "../../../components/arrow";

interface SizedImage {
  src: string;
  heightPercentage: number;
}

interface ProjectTemplateProps {
  left: SizedImage;
  center: SizedImage;
  right: SizedImage;
  title: string;
  titleGradient: string;
  demoHref: string;
  repoHref: string;
  skillStack: string[];
}

const skillStackMap: Record<string, string> = {
  react:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xNi41IC0xNS4yMzE3NCAzMyAzMC40NjM0OCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6IzIwMjMyYSI+DQogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+DQogIDxnIHN0cm9rZT0iIzYxZGFmYiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIj4NCiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiLz4NCiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPg0KICAgIDxlbGxpcHNlIHJ4PSIxMSIgcnk9IjQuMiIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwKSIvPg0KICA8L2c+DQo8L3N2Zz4=",
  pytorch: "https://pytorch.org/assets/images/pytorch-logo.png",
  "material-ui": "https://material-ui.com/static/logo.png",
  firebase:
    "https://firebase.google.com/images/brand-guidelines/logo-logomark.png",
  i18next: "https://avatars.githubusercontent.com/u/8546082",
  typescript:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
  python:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gkCqEpxhK1Bejs3_Cg8Eav5Cz0t28Kklgg&usqp=CAU",
  flask:
    "data:image/png;base64,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",
  "socket.io": "https://avatars.githubusercontent.com/u/10566080?s=400&v=4",
  heroku:
    "https://dailysmarty-production.s3.amazonaws.com/uploads/post/img/509/feature_thumb_heroku-logo.jpg",
};

const ProjectTemplate: FC<ProjectTemplateProps> = ({
  style,
  left,
  center,
  right,
  title,
  titleGradient,
  demoHref,
  repoHref,
  skillStack,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const leftRef = useRef<HTMLImageElement>();
  const centerRef = useRef<HTMLImageElement>();
  const rightRef = useRef<HTMLImageElement>();
  const descRef = useRef<HTMLDivElement>();

  useEffect(() => {
    let animation: anime.AnimeInstance;
    let prevRatio = 0;
    let prevY: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        animation?.seek(10000);

        const currentY = entry.boundingClientRect.y;
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
            animation = anime
              .timeline({ delay: 200, easing: "easeInOutExpo" })
              .add({
                targets: leftRef.current,
                opacity: [0, 1],
                duration: 380,
              })
              .add(
                {
                  targets: rightRef.current,
                  opacity: [0, 1],
                  duration: 380,
                },
                200
              )
              .add(
                {
                  targets: centerRef.current,
                  opacity: [0, 1],
                  duration: 480,
                },
                340
              )
              .add(
                {
                  targets: descRef.current,
                  opacity: [0, 1],
                  duration: 480,
                },
                640
              );
          }
        } else if (currentRatio < prevRatio && !isIntersecting) {
          // Scrolling up leave
            animation = anime({
            targets: [
              leftRef.current,
              centerRef.current,
              rightRef.current,
              descRef.current,
            ],
            opacity: [1, 0],
            duration: 180,
            easing: "easeInOutExpo",
          });
        } else {
            animation = anime({
            targets: [
              leftRef.current,
              centerRef.current,
              rightRef.current,
              descRef.current,
            ],
            opacity: [1, 1],
            duration: 1,
            easing: "easeInOutExpo",
          });
        }

        prevY = currentY;
        prevRatio = currentRatio;
      },
      { threshold: 0.12 }
    );

    observer.observe(wrapperRef.current);

    return (): void => {
      animation?.seek(10000);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <div class={styles.imageWrapper} style={style}>
        <img
          ref={leftRef}
          style={{
            height: `${left.heightPercentage}%`,
            opacity: 0,
            top: `${(100 - left.heightPercentage) / 2}%`,
            left: "-5vw",
          }}
          src={left.src}
        />
        <img
          ref={centerRef}
          style={{
            zIndex: 3,
            height: `${center.heightPercentage}%`,
            opacity: 0,
            left: "50%",
            transform: "translateX(-50%)",
            top: `${(100 - center.heightPercentage) / 2}%`,
          }}
          src={center.src}
        />
        <img
          ref={rightRef}
          style={{
            height: `${right.heightPercentage}%`,
            opacity: 0,
            top: `${(100 - right.heightPercentage) / 2}%`,
            right: "-5vw",
          }}
          src={right.src}
        />
      </div>
      <div ref={descRef} class={styles.desc}>
        <h2 style={{ backgroundImage: titleGradient }}>{title}</h2>
        <p>{children}</p>

        {/* Skill stack */}
        {skillStack.length === 0 ? null : (
          <div
            class={styles.stackWrapper}
            style={{
              maxWidth: `calc(${skillStack.length} * 4em + ${
                skillStack.length - 1
              } * 1em)`,
            }}
          >
            {skillStack.map((skill, i) => (
              <div
                key={i}
                style={
                  skillStack.length === 1
                    ? {}
                    : {
                        left: `calc(${(100 / (skillStack.length - 1)) * i}% - ${
                          (4 / (skillStack.length - 1)) * i
                        }em)`,
                      }
                }
              >
                <img
                  src={skillStackMap[skill]}
                  alt={`Icon for ${skill}`}
                  title={skill}
                />
              </div>
            ))}
          </div>
        )}

        <div class={styles.button}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={demoHref}
            style={{
              padding: "0.4em 0.6em",
              fontWeight: "bold",
              fontSize: "1.2em",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              backgroundImage:
                "linear-gradient(-70deg, rgb(255, 135, 89), rgb(255, 97, 89), rgb(230, 26, 84))",
            }}
          >
            Play Demo <Arrow color="rgb(255, 135, 89)" />
          </a>
        </div>
        <div class={styles.button}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={repoHref}
            style={{
              padding: "0.4em 0.6em",
              fontWeight: "bold",
              fontSize: "1.2em",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              backgroundImage:
                "linear-gradient(-70deg, rgb(255, 135, 89), rgb(255, 97, 89), rgb(230, 26, 84))",
            }}
          >
            Browse the Project <Arrow color="rgb(255, 135, 89)" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectTemplate;
