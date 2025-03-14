"use client";
import React from "react";
import { CurtainSlider } from "@/shared/components/curtain-slider";
import useLocoScroll from "@/shared/hooks/useLocoScroll";

export default function Home() {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setIsReady(true); // Активируем хук после монтирования
  }, []);

  useLocoScroll(isReady);
  return (
    <>
      <main data-scroll-container id="main-container">
        <CurtainSlider />
      </main>
    </>
  );
}
