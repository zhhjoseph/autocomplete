import React, { useReducer } from "react";
import styled from "styled-components";
import { DropDownList } from ".";
import data from "../data/products.json";
import { searchInputReducer } from "../reducer";
import { CustomInput } from "../UI";

const initialState = {
  categoryIndex: 0,
  productIndex: 0,
  showSuggestions: false,
  filteredSuggestions: [],
  currentInput: "",
  categoryMap: [],
  currentSelectedURL: "",
};

const Autocomplete = () => {
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
    console.log(e);
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
    if (categoryMap.length === 0) {
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
        <DropDownList
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

const StyledSearchBar = styled(CustomInput)`
  width: 382px;
  z-index: 2;
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

export { Autocomplete };
