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
  return (
    <SuggestionList>
      {categoryMap.map((category, index) => {
        return (
          <Fragment key={category[0]}>
            <li>{category[0].replace(/_/g, " ")}</li>
            <ProductsList productMap={category[1]} />
          </Fragment>
        );
      })}
    </SuggestionList>
  );
};

const SearchInput = () => {
  const [searchState, dispatch] = useReducer(searchInputReducer, initialState);
  const { products } = data;
  const { filteredSuggestions, categoryMap, showSuggestions, currentInput } =
    searchState;

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

const SuggestionList = styled.ul`
  position: fixed;
  list-style: outside none none;
  background: white;
  top: 75px;
  z-index: 2;
  width: 700px;
  padding: 0;
  li:hover {
    background-color: #008f68;
    color: #fae042;
    cursor: pointer;
    font-weight: 700;
  }
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
