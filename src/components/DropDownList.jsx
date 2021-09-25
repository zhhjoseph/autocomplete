import React, { Fragment } from "react";
import styled from "styled-components";
import { SECONDARY_BLUE_COLOR, BASIC_MOBILE_MEDIA_QUERY } from "../Styles";
import { HighlightSearchString } from "../UI";

const ProductsList = ({
  productMap,
  currentCategoryIndex,
  categoryIndex,
  productIndex,
  searchQuery,
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
              <StyledLink href={product.name} target="_blank">
                {HighlightSearchString({
                  label: product.name,
                  searchString: searchQuery,
                })}
              </StyledLink>
            </StyledProductListItem>
          );
        })}
      </StyledProductList>
    </Fragment>
  );
};

const DropDownList = ({
  categoryMap,
  categoryIndex,
  productIndex,
  searchQuery,
}) => {
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
              searchQuery={searchQuery}
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
  border-bottom: 1px solid rgb(0, 0, 0, 0.5);
`;

const StyledProductList = styled.ul`
  list-style: none;
  padding: 0;
  li:hover {
    background-color: rgb(0, 0, 0, 0.2);
  }
  /* li:hover {
    text-decoration: underline;
    cursor: pointer;
    font-weight: 700;
  } */
`;

const StyledProductListItem = styled.li`
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 35px;
  background-color: ${(props) =>
    props.isSelected ? `${SECONDARY_BLUE_COLOR}` : "white"};
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
`;

const StyledLink = styled.a`
  color: black;
  text-decoration: none;
`;

export { DropDownList };
