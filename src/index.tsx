import { FunctionalComponent, h } from "preact";
import { Provider } from "react-redux";
import "./style/index.css";
import App from "./components/app";

import configureStore from "./configure-store";

const store = configureStore();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const P = Provider as any;

const AppWithStore: FunctionalComponent = () => (
  <P store={store}>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
      rel="stylesheet"
    />
    <App />
  </P>
);

export default AppWithStore;
