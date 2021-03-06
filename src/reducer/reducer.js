import { groupDataByCategory } from "../utils/helpers";

const defaultSearchInputReducerState = {
  categoryIndex: null,
  productIndex: null,
  showSuggestions: false,
  filteredSuggestions: [],
  categoryMap: [],
  currentInput: "",
  searchQuery: "",
  error: false,
  errorMessage: "",
};

const searchInputReducer = (state, action) => {
  const { categoryIndex, productIndex, categoryMap } = state;
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
        errorMessage: action.errorMessage,
      };
    case "SET_DEFAULT_STATE":
      return defaultSearchInputReducerState;
    case "ON_CHANGE":
      const mappedCategories = groupDataByCategory(action.filteredSuggestions);
      return {
        ...state,
        categoryIndex: null,
        productIndex: null,
        showSuggestions: true,
        filteredSuggestions: action.filteredSuggestions,
        categoryMap: mappedCategories,
        currentInput: action.currentInput,
        searchQuery: action.currentInput,
        currentSelectedURL:
          mappedCategories.length > 0 ? mappedCategories[0][1][0].url : "",
      };
    case "ON_CLICK":
      return {
        ...state,
        categoryIndex: null,
        productIndex: null,
        showSuggestions: false,
        filteredSuggestions: [],
        currentInput: "",
        categoryMap: [],
      };
    case "ON_ENTER_PRESS":
      //enter key
      return {
        ...state,
        categoryIndex: null,
        productIndex: null,
        showSuggestions: false,
        currentInput: "",
        categoryMap: [],
      };
    case "ON_KEY_UP":
      if (categoryIndex === null && productIndex === null) {
        const lastCategoryIndex = categoryMap.length - 1;
        return {
          ...state,
          categoryIndex: lastCategoryIndex,
          productIndex: categoryMap[lastCategoryIndex][1].length - 1,
          currentSelectedURL:
            categoryMap[lastCategoryIndex][1][
              categoryMap[lastCategoryIndex][1].length - 1
            ].url,
          currentInput:
            categoryMap[lastCategoryIndex][1][
              categoryMap[lastCategoryIndex][1].length - 1
            ].name,
        };
      }
      if (categoryIndex === 0 && productIndex === 0) {
        return { ...state, categoryIndex: null, productIndex: null };
      }
      if (productIndex === 0) {
        const previousCategoryIndex = categoryIndex - 1;
        return {
          ...state,
          categoryIndex: previousCategoryIndex,
          productIndex: categoryMap[previousCategoryIndex][1].length - 1,
          currentSelectedURL:
            state.categoryMap[previousCategoryIndex][1][
              categoryMap[previousCategoryIndex][1].length - 1
            ].url,
          currentInput:
            state.categoryMap[previousCategoryIndex][1][
              categoryMap[previousCategoryIndex][1].length - 1
            ].name,
        };
      } else {
        return {
          ...state,
          productIndex: productIndex - 1,
          currentSelectedURL:
            state.categoryMap[categoryIndex][1][productIndex - 1].url,
          currentInput:
            state.categoryMap[categoryIndex][1][productIndex - 1].name,
        };
      }
    case "ON_KEY_DOWN":
      const isLastIndex =
        categoryIndex === categoryMap.length - 1 &&
        categoryMap[categoryIndex][1].length - 1 === productIndex;
      if (categoryIndex === null && productIndex === null) {
        return {
          ...state,
          categoryIndex: 0,
          productIndex: 0,
          currentSelectedURL: categoryMap[0][1][0].url,
          currentInput: categoryMap[0][1][0].name,
        };
      }
      if (isLastIndex) {
        return { ...state, categoryIndex: null, productIndex: null };
      }

      if (categoryMap[categoryIndex][1].length - 1 === productIndex) {
        return {
          ...state,
          categoryIndex: categoryIndex + 1,
          productIndex: 0,
          currentSelectedURL: state.categoryMap[categoryIndex + 1][1][0].url,
          currentInput: state.categoryMap[categoryIndex + 1][1][0].name,
        };
      } else {
        return {
          ...state,
          productIndex: productIndex + 1,
          currentSelectedURL:
            state.categoryMap[categoryIndex][1][productIndex + 1].url,
          currentInput:
            state.categoryMap[categoryIndex][1][productIndex + 1].name,
        };
      }
    default:
      return defaultSearchInputReducerState;
  }
};

export { searchInputReducer };
