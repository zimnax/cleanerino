/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const frame = css`
  padding-bottom: 40px; /* Example padding */
  margin: auto;
  width: 1140px;
`;

const Frame = ({ children }) => {
  return <div css={frame}>{children}</div>;
};

export default Frame;
