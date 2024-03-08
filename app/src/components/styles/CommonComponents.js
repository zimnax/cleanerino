import { css } from "@emotion/react";
import { primary } from "../../theme";
import { secondary } from "../../theme";

export const subHeadubgs = {
  subheadingComponent: css`
    display: flex;
    justify-content: space-between; /* This will place the children at the left and right ends */
    align-items: center;
    margin: 20px 0;
    width: 100%;
  `,
  showMoreButton: css`
    text-decoration: none;
    color: ${primary};
    cursor: pointer;
  `,
  leafImage: css`
    margin-right: 10px; /* adjust spacing as needed */
    width: 30px; /* adjust size as needed */
    height: auto;
  `,
  textContainer: css`
    width: 390px;
    border-bottom: 2px solid ${primary};
    display: flex;
    gap: 10px; /* This will ensure there's a 10px gap between children */
    align-items: center;
  `,
  subHeadingText: css`
    text-color: ${secondary};
    margin: 0;
  `,
};
