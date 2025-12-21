import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 542.39868 128.64"
      className={`${className} block`}
      preserveAspectRatio="xMidYMid meet"
      aria-label="Adhhak Logo"
    >
      <defs>
        <clipPath id="clipPath22" clipPathUnits="userSpaceOnUse">
          <path d="M 0,0 H 1080 V 1080 H 0 Z" />
        </clipPath>
        <clipPath id="clipPath34" clipPathUnits="userSpaceOnUse">
          <path d="M 0,1080 H 1080 V 0 H 0 Z" />
        </clipPath>
      </defs>
      <g transform="matrix(1.3333333,0,0,-1.3333333,-0.21466666,128.69067)">
        <g transform="scale(1.0008)">
          <g transform="translate(-339.12,-480.239)">
            <g>
              <g clipPath="url(#clipPath22)">
                <g transform="translate(356.3256,513.5308)">
                  <path
                    style={{ fill: "#467ac5", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                    d="M 0,0 18.201,39.685 22.526,29.599 24.78,24.35 35.219,0 Z m 25.78,30.476 -5.137,11.993 h -4.972 l -26.958,-59.234 h 3.708 l 6.149,13.481 h 37.914 l 5.814,-13.481 h 3.707 z"
                  />
                </g>
                <g>
                  <g clipPath="url(#clipPath34)">
                    <g transform="translate(437.1265,499.3784)">
                      <path
                        style={{ fill: "#467ac5", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                        d="m 0,0 h -25.109 v 54.009 h 24.768 c 17.695,0 26.627,-12.217 26.627,-26.964 C 26.286,12.305 17.689,0 0,0 M -0.341,56.704 H -28.393 V -2.613 H 0 c 20.049,0 29.741,13.311 29.741,29.658 0,16.348 -10.028,29.659 -30.082,29.659"
                      />
                    </g>
                    <g transform="translate(529.0433,556.082)">
                      <path
                        style={{ fill: "#467ac5", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                        d="M 0,0 V -33.195 H -49.542 V 0 h -3.284 v -59.316 h 3.284 V -35.89 H 0 V -59.316 H 3.284 V 0 Z"
                      />
                    </g>
                    <g transform="translate(545.5554,559.96)">
                      <path
                        style={{ fill: "#467ac5", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                        d="m 0,0 h -4.719 v -4.213 h 2.106 c -0.082,-2.701 -0.588,-5.649 -1.942,-7.25 h 1.772 C -0.847,-8.68 0.253,-3.289 0,0"
                      />
                    </g>
                    <g transform="translate(606.8901,556.082)">
                      <path
                        style={{ fill: "#467ac5", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                        d="M 0,0 V -33.195 H -49.542 V 0 h -3.284 v -59.316 h 3.284 V -35.89 H 0 V -59.316 H 3.284 V 0 Z"
                      />
                    </g>
                    <g transform="translate(627.7803,513.5308)">
                      <path
                        style={{ fill: "#467ac5", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                        d="M 0,0 18.201,39.685 35.219,0 Z m 20.643,42.469 h -4.972 l -26.958,-59.234 h 3.708 l 6.149,13.481 h 37.914 l 5.814,-13.481 h 3.707 z"
                      />
                    </g>
                    <g transform="translate(703.1851,527.0123)">
                      <path
                        style={{ fill: "#467ac5", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                        d="M 0,0 V 0.253 C 14.152,2.442 27.534,12.487 27.534,28.999 H 23.915 C 23.915,9.957 3.96,1.348 -13.735,1.348 h -5.978 v 27.639 h -3.29 v -59.234 h 3.29 v 28.646 h 8.509 c 20.978,0 38.926,-10.951 38.926,-28.646 h 3.619 C 31.341,-12.634 15.335,-1.095 0,0"
                      />
                    </g>
                    <g transform="translate(697.0377,550.5369)">
                      <path
                        style={{ fill: "#467ac6", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                        d="M 0,0 C 3.217,0 3.223,5 0,5 -3.217,5 -3.223,0 0,0"
                      />
                    </g>
                    <g transform="translate(713.402,550.5369)">
                      <path
                        style={{ fill: "#467ac6", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                        d="M 0,0 C 3.217,0 3.223,5 0,5 -3.217,5 -3.223,0 0,0"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

