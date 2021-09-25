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
    <Fragment>
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
    </Fragment>
  );
};

const SearchInput = () => {
  const [searchState, dispatch] = useReducer(searchInputReducer, initialState);
  const { products } = data;
  const { filteredSuggestions, categoryMap } = searchState;

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
    <Fragment>
      <input type="text" onChange={onChange} />
      {filteredSuggestions && categoryMap.length > 0 && (
        <CategoryList categoryMap={categoryMap} />
      )}
    </Fragment>
  );
};

export { SearchInput };
