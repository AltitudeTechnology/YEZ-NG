import styled from "styled-components";

export default styled.img.attrs({
  src: "/static/images/home-slider/overlay.png",
  alt: "YEZ"
})`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 250px;
  width: 400px;
  margin-top: -125px; /* Half the height */
  margin-left: -200px; /* Half the width */
  transition: all 1s ease;
  -moz-transition: all 1s ease;
  -ms-transition: all 1s ease;
  -webkit-transition: all 1s ease;
  :hover {
    transform: scale(1.2);
    -moz-transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -o-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=1.5, M12=0, M21=0, M22=1.5, SizingMethod='auto expand')";
  }
  @media (max-width: 500px) {
    height: 220px;
    width: 320px;
    margin-top: -110px; /* Half the height */
    margin-left: -160px; /* Half the width */
  }
  @media (max-width: 320px) {
    height: 210px;
    width: 280px;
    margin-top: -105px;
    margin-left: -140px;
  }
`;
