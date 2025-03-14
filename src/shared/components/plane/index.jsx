"use client";
import React, { useContext, useRef, useLayoutEffect } from "react";
import { Plane } from "curtainsjs";

import style from "./Plane.module.scss";
import { CurtainsContext } from "@/shared/store/reduxStore";
import { vs, fs } from "@/shared/shaders/shaders";
// vertex and fragment shaders

const WebPlane = ({ url, title, index, description }) => {
  const { state } = useContext(CurtainsContext);
  const { scrollEffect } = state;
  const planeEl = useRef();
  const someRef = useRef({ scrollEffect: 0 });

  useLayoutEffect(() => {
    const curtains = state.curtains;
    if (state.container) {
      const planeParams = {
        vertexShader: vs,
        fragmentShader: fs,
        widthSegments: 40,
        heightSegments: 40,
        uniforms: {
          direction: {
            name: "uDirection",
            type: "1f",
            value: 0,
          },
          time: {
            name: "uTime",
            type: "1f",
            value: 0,
          },
        },
      };

      const plane = new Plane(curtains, planeEl.current, planeParams);

      plane.onRender(() => {
        plane.uniforms.time.value++;

        plane.uniforms.direction.value = someRef.current.scrollEffect / 500;
      });

      // remove plane if we're unmounting the component
      return () => {
        plane.remove();
      };
    }
  }, [state.container, state.curtains]);

  React.useEffect(() => {
    someRef.current.scrollEffect = scrollEffect;
  }, [scrollEffect]);
  const direction = index % 2 === 0 ? style.direct : style.reverse;

  return (
    <div className={`${style.plane} ${style.plane__container} ${direction}`}>
      <div className={style.plane__details}>
        <h6>/{title}</h6>
        <div className={style.vertical_line} />
        <p>{description}</p>
      </div>
      <div className={style.plane__image} ref={planeEl}>
        <img
          src={url}
          alt=""
          crossOrigin="anonymous"
          data-sampler="planeTexture"
        />
      </div>
    </div>
  );
};

export default WebPlane;
