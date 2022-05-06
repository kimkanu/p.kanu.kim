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
    "https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png",
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

  docker:
    "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic-1280x1095.png.webp",
  postgresql:
    "https://wiki.postgresql.org/images/3/30/PostgreSQL_logo.3colors.120x120.png",
  "express.js":
    "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
  typeorm:
    "https://opencollective-production.s3-us-west-1.amazonaws.com/a90da2c0-a82c-11e7-8125-a1bea2bef08c.png",
  "passport.js":
    "data:image/png;base64,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",
  tailwindcss:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png",
  "recoil.js":
    "data:image/png;base64,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",
  workbox: "https://cdn.worldvectorlogo.com/logos/workbox-1.svg",
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLImageElement>(null);
  const centerRef = useRef<HTMLImageElement>(null);
  const rightRef = useRef<HTMLImageElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

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

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

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
