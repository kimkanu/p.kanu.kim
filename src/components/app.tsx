import { h } from "preact";
import { FC } from "../types/component";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import NotFoundPage from "../routes/notfound";
import Loading from "./loading";
import { useEffect, useRef, useState } from "preact/hooks";
import { useSelector, useStore } from "react-redux";
import { RootActionTypes, RootState } from "../configure-store";
import anime from "animejs";
import useWindowSize from "../hooks/window-size";

const App: FC = () => {
  const store = useStore<RootState, RootActionTypes>();

  const [progress, setProgress] = useState(0);
  const [isLoadingStarted, setLoadingStarted] = useState(false);

  const { height } = useWindowSize();

  const loadingRef = useRef<{ base: HTMLDivElement }>();
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    const vh = height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [height]);

  useEffect(() => {
    // TODO: fetch assets
    anime({
      duration: 1000,
      update(anim) {
        setProgress(anim.progress / 100);
      },
    });
  }, []);

  useEffect(() => {
    if (progress >= 1 - 1e-6) {
      anime({
        targets: loadingRef.current.base,
        duration: 380,
        easing: "easeInOutExpo",
        opacity: [1, 0],
        begin() {
          setLoadingStarted(true);
        },
        complete() {
          store.dispatch({ type: "FINISH_LOADING" });
        },
      });
    }
  }, [store, progress]);

  return (
    <div id="app">
      {loading.status ? null : <Loading ref={loadingRef} progress={progress} />}
      {isLoadingStarted ? (
        <div style={{ top: 0, width: "100%", position: "absolute" }}>
          <Router>
            <Route path="/" component={Home} />
            <NotFoundPage default />
          </Router>
        </div>
      ) : null}
    </div>
  );
};

export default App;
