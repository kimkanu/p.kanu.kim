import { h } from "preact";
import { FC } from "../../../types/component";
import ProjectTemplate from "./template";

const FitBuddy: FC = () => (
  <ProjectTemplate
    style={{
      height: "min(70vw, 1024px)",
    }}
    left={{ src: "https://i.imgur.com/wnYvD4I.png", heightPercentage: 80 }}
    center={{
      src: "https://i.imgur.com/ptLcHPi.png",
      heightPercentage: 100,
    }}
    right={{ src: "https://i.imgur.com/gpgonih.png", heightPercentage: 80 }}
    title="1. FitBuddy"
    titleGradient="linear-gradient(110deg, #f98f46, #f98f46, #429bf4, #429bf4)"
    demoHref="https://inventure-kaist.netlify.app"
    repoHref="https://github.com/kimkanu/inventure-frontend"
    skillStack={["typescript", "react", "material-ui", "firebase", "i18next"]}
  >
    <strong style={{ color: "var(--gray-800)" }}>FitBuddy by inVenture</strong>{" "}
    is a project for the introduction to human-computer interaction class. It is
    a web-app that helps you to do the workout in a proper and entertaining way.
    We followed the design processes proposed in the classes and made the
    software considering ways to improve{" "}
    <strong style={{ color: "var(--gray-800)" }}>user experiences.</strong>
  </ProjectTemplate>
);

export default FitBuddy;
