import React from "react";
import styled from "styled-components";
import { ReactComponent as Points } from "../img/puntos.svg";

const Background = () => {
  return (
    <>
      <UpPoints />
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fillOpacity="1"
          d="M0,224L48,197.3C96,171,192,117,288,106.7C384,96,480,128,576,154.7C672,181,768,203,864,218.7C960,235,1056,245,1152,224C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </Svg>
      <DownPoints />
    </>
  );
};

const Svg = styled.svg`
  height: 50vh;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 0;
  path {
    fill: rgba(135, 182, 194, 0.15);
  }
`;

const UpPoints = styled(Points)`
  position: fixed;
  z-index: 1;
  top: 2.5rem; /* 40px */
  left: 2.5rem; /* 40px */
`;

const DownPoints = styled(Points)`
  position: fixed;
  z-index: 1;
  bottom: 2.5rem; /* 40px */
  right: 2.5rem; /* 40px */
`;

export default Background;
