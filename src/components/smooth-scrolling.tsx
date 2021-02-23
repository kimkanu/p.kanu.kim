// Original code: https://github.com/guilhermerodz/react-smooth-scrolling

import { h } from "preact";
import { useEffect, useRef, useCallback } from "preact/hooks";
import { isMobile } from "react-device-detect";

import { FC } from "../types/component";

interface SmoothProviderProps {
  /**
   * Default ease is `0.1`. More ease means more stiffness.
   */
  ease?: number;
  /**
   * Enable distortion
   */
  skew: boolean;
}

const data = {
  current: 0,
  previous: 0,
  rounded: 0,
};

export const SmoothProvider: FC<SmoothProviderProps> = ({
  ease = 0.15,
  skew,
  children,
  ...props
}) => {
  useRef();

  // Ref for parent div and scrolling div
  const app = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);

  // Scrolling
  const skewScrolling = useCallback(() => {
    // Set Current to the scroll position amount
    data.current = window.scrollY;
    // Set Previous to the scroll previous position
    data.previous += (data.current - data.previous) * ease;
    // Set rounded to
    data.rounded = Math.round(data.previous * 100) / 100;

    // Difference between
    const difference = data.current - data.rounded;
    const acceleration = difference / window.innerWidth;
    const velocity = acceleration;
    const skewing = skew ? velocity * 9 : 0;

    // Assign skew and smooth scrolling to the scroll container

    if (scrollContainer.current?.style) {
      const translate3d = `translate3d(0, ${-(
        data.rounded - data.current
      )}px, 0)`;
      const skewY = `skewY(${skewing}deg)`;
      scrollContainer.current.style.transform = `${translate3d} ${skewY}`;
    }

    // loop vai raf
    requestAnimationFrame(skewScrolling);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, skew]);

  // Run scrollrender once page is loaded.
  useEffect(() => {
    requestAnimationFrame(skewScrolling);
  }, [skewScrolling]);

  return isMobile ? (
    <div
      ref={app}
      style={{
        overflowAnchor: "auto",
      }}
      {...props}
    >
      {children}
    </div>
  ) : (
    <div
      ref={app}
      style={{
        overflowAnchor: "auto",
      }}
      {...props}
    >
      <div ref={scrollContainer}>{children}</div>
    </div>
  );
};
