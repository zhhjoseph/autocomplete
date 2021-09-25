import React, { useReducer, Fragment } from "react";
import styled from "styled-components";
import data from "../data/products.json";
import { searchInputReducer } from "../reducer";
import { SECONDARY_COLOR, SECONDARY_BLUE_COLOR } from "../Styles";

const initialState = {
  categoryIndex: 0,
  productIndex: 0,
  showSuggestions: false,
  filteredSuggestions: [],
  currentInput: "",
  categoryMap: [],
  currentSelectedURL: "",
};

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

const CategoryList = ({ categoryMap, categoryIndex, productIndex }) => {
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

const SearchInput = () => {
  const [searchState, dispatch] = useReducer(searchInputReducer, initialState);
  const { products } = data;
  const {
    filteredSuggestions,
    categoryMap,
    showSuggestions,
    currentInput,
    categoryIndex,
    productIndex,
  } = searchState;

  const onChange = (e) => {
    const userInput = e.currentTarget.value;
    if (userInput === "") {
      dispatch({ type: "SET_DEFAULT_STATE" });
      return;
    }

    const filteredSuggestions = products.filter((product) => {
      return product.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
    });

    dispatch({
      type: "ON_CHANGE",
      filteredSuggestions: filteredSuggestions,
      currentInput: userInput,
    });
  };

  const onKeyDown = (e) => {
    if (!currentInput) {
      return;
    }
    if (e.keyCode === 13) {
      dispatch({ type: "ON_ENTER_PRESS" });
    } else if (e.keyCode === 38) {
      dispatch({ type: "ON_KEY_UP" });
    } else if (e.keyCode === 40) {
      dispatch({ type: "ON_KEY_DOWN" });
    }
  };

  console.log("state", searchState);

  return (
    <SearchBarDiv>
      {showSuggestions && <BackgroundDim />}
      <StyledSearchBar
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={"Begin search here"}
        value={currentInput}
      />
      {filteredSuggestions && categoryMap.length > 0 && (
        <CategoryList
          categoryMap={categoryMap}
          categoryIndex={categoryIndex}
          productIndex={productIndex}
        />
      )}
    </SearchBarDiv>
  );
};

const SearchBarDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const StyledCategoryList = styled.ul`
  position: fixed;
  list-style: none;
  background: white;
  top: 75px;
  z-index: 2;
  width: 400px;
  border-radius: 6px;
  padding: 0px 0px 15px 0px;
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
  background-color: ${(props) =>
    props.isSelected ? `${SECONDARY_BLUE_COLOR}` : "white"};
`;

const StyledSearchBar = styled.input`
  z-index: 2;
  height: 45px;
  padding: 0px 8px;
  width: 382px;
  line-height: 25px;
  font-size: 16px;
  font-weight: 500;
  font-family: inherit;
  border-radius: 6px;
  min-width: 300px;
  border: 1px solid #cdd9ed;
  background: ${SECONDARY_COLOR};
  transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #275efe;
  }
`;

const BackgroundDim = styled.div`
  height: calc(100vh - 75px);
  overflow: hidden;
  width: 100%;
  left: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  top: 75px;
  z-index: 1;
`;

export { SearchInput };
