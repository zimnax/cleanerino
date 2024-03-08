/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const productList = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: left;
`;

const ProductList = ({ children }) => {
    return <div css={productList}></div>
}

export default ProductList