"use client";
import React from "react";

import WebPlane from "@/shared/components/plane";
import Canvas from "@/shared/components/canvas";
import { CurtainsProvider } from "@/shared/store/reduxStore";

import dumbData from "@/shared/dumb/data-img";

export const CurtainSlider = () => {
  return (
    <CurtainsProvider data-scroll-section>
      <div className="banner top" />
      <div id="page-content">
        {dumbData.map(({ url, title, description }, index) => (
          <WebPlane
            key={url}
            index={index}
            url={url}
            title={title}
            description={description}
          />
        ))}
      </div>

      <Canvas />

      <div className="banner bottom" />
    </CurtainsProvider>
  );
};
