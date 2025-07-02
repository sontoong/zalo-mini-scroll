import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Page } from "zmp-ui";

const HomePage: FC = () => {
  const refreshCont = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [pullChange, setPullChange] = useState<number>();
  const [startPoint, setStartPoint] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAtTop = () =>
      scrollContainerRef.current !== null &&
      scrollContainerRef.current.scrollTop !== undefined
        ? scrollContainerRef.current.scrollTop <= 10
        : false;

    const pullStart = (e: TouchEvent) => {
      const touch_cord = e.touches[0].screenY;

      if (isAtTop()) {
        setIsPulling(true);
        setStartPoint(touch_cord);
      }
    };

    const pull = (e: TouchEvent) => {
      const touch_cord = e.touches[0].screenY;

      if (
        !isAtTop() ||
        !isPulling ||
        (!isPulling && touch_cord <= startPoint)
      ) {
        return;
      }

      const pullLength = Math.max(0, touch_cord - startPoint);
      if (pullChange !== undefined && pullLength < pullChange && isPulling) {
        return
      }
      setPullChange(pullLength);
    };

    const endPull = (e: TouchEvent) => {
      if (!isPulling) return;

      setIsPulling(false);
      if (pullChange !== undefined && pullChange > 220) {
        initLoading();
      }
      setStartPoint(0);
      setPullChange(0);
    };

    window.addEventListener("touchstart", pullStart);
    window.addEventListener("touchmove", pull);
    window.addEventListener("touchend", endPull);

    return () => {
      window.removeEventListener("touchstart", pullStart);
      window.removeEventListener("touchmove", pull);
      window.removeEventListener("touchend", endPull);
    };
  }, [isPulling, startPoint, pullChange]);

  const initLoading = () => {
    refreshCont.current?.classList.add("loading");
    setLoading(true);
    setTimeout(() => {
      refreshCont.current?.classList.remove("loading");
      setLoading(false);
      console.log("Reload");
    }, 1000);
  };

  return (
    <Page className="flex-1 bg-[#DDDDDD]">
      {/* Refresh indicator */}
      <div
        ref={refreshCont}
        className="flex justify-center -mt-[50px] items-center pb-[10px]"
        style={{ marginTop: (pullChange ?? 0) / 3.11 || "" }}
      >
        <div className="text-[#A1A1A1] text-4xl whitespace-nowrap">
          {loading
            ? "Loading"
            : pullChange !== undefined && pullChange >= 220
            ? "Release to refresh"
            : "Pull down to refresh"}
        </div>
      </div>
      {/* Main content */}
      <div
        ref={scrollContainerRef}
        className="body flex bg-white w-full flex-col p-[16px] gap-[20px] overflow-auto h-full"
      >
        <header className="flex flex-col text-center">
          <h1 className="text-4xl font-bold">Welcome to my app!</h1>
          <p>Pull down to refresh</p>
        </header>
        <div className="flex flex-col gap-[10px] w-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="w-full h-[40px] bg-gray-300"></div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default HomePage;
