import { h } from "preact";
import { FC } from "../../../types/component";
import ProjectTemplate from "./template";

const AlphaGoStop: FC = () => (
  <ProjectTemplate
    style={{
      height: "min(56vw, 816px)",
    }}
    left={{ src: "https://i.imgur.com/Hd7W10O.png", heightPercentage: 90 }}
    center={{
      src:
        "https://raw.githubusercontent.com/cs470-2020f-team36/report/main/game-screen-1.png",
      heightPercentage: 80,
    }}
    right={{ src: "https://i.imgur.com/HohO3J2.png", heightPercentage: 90 }}
    title="2. AlphaGoStop"
    titleGradient="linear-gradient(110deg, #3b7157, #3b7157, #ec1b24, #ec1b24)"
    demoHref="https://gostop.kanu.kim"
    repoHref="https://github.com/cs470-2020f-team36"
    skillStack={[
      "python",
      "pytorch",
      "flask",
      "socket.io",
      "typescript",
      "react",
      "heroku",
    ]}
  >
    <strong style={{ color: "var(--gray-800)" }}>AlphaGoStop</strong> is a
    project for the introduction to artificial interlligence class. The main
    logic is similar to Alpha(Go) Zero from DeepMind—It uses{" "}
    <strong style={{ color: "var(--gray-800)" }}>policy value MCTS</strong>,
    with a little differences: use of{" "}
    <strong style={{ color: "var(--gray-800)" }}>
      perfect information Monte-Carlo
    </strong>{" "}
    to deal imperfect information.
  </ProjectTemplate>
);

export default AlphaGoStop;
