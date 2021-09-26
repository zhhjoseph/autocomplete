import React, { useReducer } from "react";
import styled from "styled-components";
import { DropDownList } from ".";
import data from "../data/products.json";
import { searchInputReducer } from "../reducer";
import { CustomInput } from "../UI";

const initialState = {
  categoryIndex: null,
  productIndex: null,
  showSuggestions: false,
  filteredSuggestions: [],
  currentInput: "",
  searchQuery: "",
  categoryMap: [],
  currentSelectedURL: "",
};

const Autocomplete = (props) => {
  const [searchState, dispatch] = useReducer(searchInputReducer, initialState);
  const { products } = data;
  const {
    filteredSuggestions,
    categoryMap,
    showSuggestions,
    currentInput,
    categoryIndex,
    productIndex,
    currentSelectedURL,
    searchQuery,
  } = searchState;

  const onChange = (e) => {
    const userInput = e.currentTarget.value;

    //for demo purposes if autocomplete component throws an error.
    if (userInput === "error") {
      throw new Error("This is a dummy error");
    }
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
      window.open(currentSelectedURL, "_blank");
      dispatch({ type: "ON_ENTER_PRESS" });
    } else if (e.keyCode === 38) {
      dispatch({ type: "ON_KEY_UP" });
    } else if (e.keyCode === 40) {
      dispatch({ type: "ON_KEY_DOWN" });
    }
  };

  console.log("props", props);

  return (
    <SearchBarDiv>
      {showSuggestions && <BackgroundDim />}
      <StyledSearchBar
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={
          props.error
            ? "Something went wrong with your search"
            : "Begin search here"
        }
        clearValue={() => dispatch({ type: "SET_DEFAULT_STATE" })}
        value={currentInput}
        width={"382px"}
        search
      />

      {filteredSuggestions && categoryMap.length > 0 && (
        <DropDownList
          categoryMap={categoryMap}
          categoryIndex={categoryIndex}
          productIndex={productIndex}
          searchQuery={searchQuery}
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
  float: right;
`;

const StyledSearchBar = styled(CustomInput)`
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
