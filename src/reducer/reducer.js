import { groupDataByCategory } from "../utils/helpers";

const defaultSearchInputReducerState = {
  categoryIndex: 0,
  productIndex: 0,
  showSuggestions: false,
  filteredSuggestions: [],
  currentInput: "",
  categoryMap: [],
};

const searchInputReducer = (state, action) => {
  const { categoryIndex, productIndex, categoryMap } = state;
  switch (action.type) {
    case "SET_DEFAULT_STATE":
      console.log("DEFAULT SET");
      return defaultSearchInputReducerState;
    case "ON_CHANGE":
      return {
        ...state,
        categoryIndex: 0,
        productIndex: 0,
        showSuggestions: true,
        filteredSuggestions: action.filteredSuggestions,
        categoryMap: groupDataByCategory(action.filteredSuggestions),
        currentInput: action.currentInput,
      };
    case "ON_CLICK":
      return {
        ...state,
        categoryIndex: 0,
        productIndex: 0,
        showSuggestions: false,
        filteredSuggestions: [],
        currentInput: "",
        categoryMap: [],
      };
    case "ON_ENTER_PRESS":
      //enter key
      return {
        ...state,
        categoryIndex: 0,
        productIndex: 0,
        showSuggestions: false,
        currentInput: "",
        categoryMap: [],
      };
    case "ON_KEY_UP":
      if (categoryIndex === 0 && productIndex === 0) {
        return { ...state };
      }
      if (productIndex === 0) {
        const previousCategoryIndex = categoryIndex - 1;
        return {
          ...state,
          categoryIndex: previousCategoryIndex,
          productIndex: categoryMap[previousCategoryIndex][1].length - 1,
        };
      } else {
        return {
          ...state,
          productIndex: productIndex - 1,
        };
      }
    case "ON_KEY_DOWN":
      const isLastIndex =
        categoryIndex === categoryMap.length - 1 &&
        categoryMap[categoryIndex][1].length - 1 === productIndex;
      if (isLastIndex) {
        return { ...state };
      }
      if (categoryMap[categoryIndex][1].length - 1 === productIndex) {
        return {
          ...state,
          categoryIndex: categoryIndex + 1,
          productIndex: 0,
        };
      } else {
        return {
          ...state,
          productIndex: productIndex + 1,
        };
      }
    default:
      return defaultSearchInputReducerState;
  }
};

export { searchInputReducer };
