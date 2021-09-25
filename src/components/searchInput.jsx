import React, { useReducer, Fragment } from "react";
import styled from "styled-components";
import data from "../data/products.json";
import { searchInputReducer } from "../reducer";

const initialState = {
  categoryIndex: 0,
  productIndex: 0,
  showSuggestions: false,
  filteredSuggestions: [],
  currentInput: "",
  categoryMap: [],
};

const ProductsList = ({ productMap }) => {
  return (
    <Fragment>
      <ul>
        {productMap.map((product) => {
          return <li key={product.name}>{product.name}</li>;
        })}
      </ul>
    </Fragment>
  );
};

const CategoryList = ({ categoryMap }) => {
  console.log("CategoryMap", categoryMap);
  return (
    <ul>
      {categoryMap.map((category, index) => {
        return (
          <Fragment key={category[0]}>
            <li>{category[0].replace(/_/g, " ")}</li>
            <ProductsList productMap={category[1]} />
          </Fragment>
        );
      })}
    </ul>
  );
};

const SearchInput = () => {
  const [searchState, dispatch] = useReducer(searchInputReducer, initialState);
  const { products } = data;
  const { filteredSuggestions, categoryMap, showSuggestions } = searchState;

  const onChange = (e) => {
    const userInput = e.currentTarget.value.trim();
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

  return (
    <SearchBarDiv>
      {showSuggestions && <BackgroundDim />}
      <StyledSearchBar
        type="text"
        onChange={onChange}
        placeholder={"Begin search here"}
      />
      {filteredSuggestions && categoryMap.length > 0 && (
        <CategoryList categoryMap={categoryMap} />
      )}
    </SearchBarDiv>
  );
};

const SearchBarDiv = styled.div`
  margin-top: 20px;
  height: 25px;
  width: 100%;
`;

const StyledSearchBar = styled.input`
  position: fixed;
  z-index: 2;
  padding: 8px 16px;
  line-height: 25px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  width: 100%;
  border-radius: 6px;
  min-width: 300px;
  max-width: 500px;
  border: 1px solid #cdd9ed;
  background: #eef4ff;
  transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #275efe;
  }
`;

const BackgroundDim = styled.div`
  height: calc(100vh - 75px);
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  top: 75px;
  right: 0px;
  z-index: 1;
`;

export { SearchInput };
