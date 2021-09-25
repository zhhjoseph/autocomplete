import React, { Fragment } from "react";
import styled from "styled-components";
import { SECONDARY_BLUE_COLOR, BASIC_MOBILE_MEDIA_QUERY } from "../Styles";

const ProductsList = ({
  productMap,
  currentCategoryIndex,
  categoryIndex,
  productIndex,
}) => {
  return (
    <Fragment>
      <StyledProductList>
        {productMap.map((product, currentProductIndex) => {
          const isSelected =
            currentCategoryIndex === categoryIndex &&
            productIndex === currentProductIndex;
          return (
            <StyledProductListItem key={product.name} isSelected={isSelected}>
              {product.name}
            </StyledProductListItem>
          );
        })}
      </StyledProductList>
    </Fragment>
  );
};

const DropDownList = ({ categoryMap, categoryIndex, productIndex }) => {
  return (
    <StyledCategoryList>
      {categoryMap.map((category, currentCategoryIndex) => {
        return (
          <Fragment key={category[0]}>
            <StyledCategoryListItem>
              {category[0].replace(/_/g, " ")}
            </StyledCategoryListItem>
            <ProductsList
              productMap={category[1]}
              currentCategoryIndex={currentCategoryIndex}
              categoryIndex={categoryIndex}
              productIndex={productIndex}
            />
          </Fragment>
        );
      })}
    </StyledCategoryList>
  );
};

const StyledCategoryList = styled.ul`
  position: fixed;
  list-style: none;
  background: white;
  top: 75px;
  z-index: 2;
  width: 400px;
  border-radius: 6px;
  padding: 0px 0px 15px 0px;
  @media ${BASIC_MOBILE_MEDIA_QUERY} {
    width: 300px;
  }
`;

const StyledCategoryListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  font-weight: 500;
  height: 40px;
  padding-left: 5px;
`;

const StyledProductList = styled.ul`
  list-style: none;
  padding: 0;
  li:hover {
    text-decoration: underline;
    cursor: pointer;
    font-weight: 700;
  }
`;

const StyledProductListItem = styled.li`
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 35px;
  background-color: ${(props) =>
    props.isSelected ? `${SECONDARY_BLUE_COLOR}` : "white"};
`;

export { DropDownList };
