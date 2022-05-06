import { h } from "preact";
import { FC } from "../../../types/component";
import ProjectTemplate from "./template";

const Blearn: FC = () => (
  <ProjectTemplate
    style={{
      height: "min(50vw, 731px)",
    }}
    left={{ src: "https://i.imgur.com/XzK3r1m.png", heightPercentage: 50 }}
    center={{
      src: "https://i.imgur.com/RdUlctL.png",
      heightPercentage: 60,
    }}
    right={{ src: "https://i.imgur.com/awlI4YC.png", heightPercentage: 50 }}
    title="3. Blearn"
    titleGradient="linear-gradient(110deg, #af83f9, #af83f9, #ff8aad, #ff8aad)"
    demoHref="https://cs492c.herokuapp.com"
    repoHref="https://github.com/2021-fall-cs492c-team-10/monorepo"
    skillStack={[
      "docker",
      "postgresql",
      "typescript",
      "express.js",
      "socket.io",
      "typeorm",
      "passport.js",
      "react",
      "tailwindcss",
      "recoil.js",
      "workbox",
    ]}
  >
    <strong style={{ color: "var(--gray-800)" }}>Blearn!</strong> is a service
    to help doing blended learning, which is a mixture of on- and offline
    learning experiences. You may{" "}
    <strong style={{ color: "var(--gray-800)" }}>
      chat, with texts, images, or voices, and share YouTube videos
    </strong>{" "}
    with students. This project is done in{" "}
    <strong style={{ color: "var(--gray-800)" }}>
      Naver's FE development class
    </strong>
    , held in fall, 2021.
  </ProjectTemplate>
);

export default Blearn;
