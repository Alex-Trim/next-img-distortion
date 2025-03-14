import React from "react";
import { Curtains } from "curtainsjs";

// Инициализация initialState с проверкой на наличие window и document
const initialState = {
  curtains:
    typeof window !== "undefined"
      ? new Curtains({
          pixelRatio: Math.min(1.5, window.devicePixelRatio),
        })
      : null,
  container: null,
  watchScroll:
    typeof LocomotiveScroll !== "undefined"
      ? document.querySelector("#main-container")
      : null,
  scrollEffect: 0,
};

const CurtainsContext = React.createContext(initialState);
const { Provider } = CurtainsContext;

const CurtainsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "SET_CURTAINS_CONTAINER":
        return {
          ...state,
          container: action.payload,
        };

      case "SET_SCROLL_EFFECT": {
        return {
          ...state,
          scrollEffect: action.payload,
        };
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { CurtainsContext, CurtainsProvider };
