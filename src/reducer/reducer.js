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
      return defaultSearchInputReducerState;
    case "ON_CHANGE":
      const mappedCategories = groupDataByCategory(action.filteredSuggestions);
      return {
        ...state,
        categoryIndex: 0,
        productIndex: 0,
        showSuggestions: true,
        filteredSuggestions: action.filteredSuggestions,
        categoryMap: mappedCategories,
        currentInput: action.currentInput,
        currentSelectedURL:
          mappedCategories.length > 0 ? mappedCategories[0][1][0].url : "",
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
          currentSelectedURL:
            state.categoryMap[previousCategoryIndex][1][
              categoryMap[previousCategoryIndex][1].length - 1
            ].url,
        };
      } else {
        return {
          ...state,
          productIndex: productIndex - 1,
          currentSelectedURL:
            state.categoryMap[categoryIndex][1][productIndex - 1].url,
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
          currentSelectedURL: state.categoryMap[categoryIndex + 1][1][0].url,
        };
      } else {
        return {
          ...state,
          productIndex: productIndex + 1,
          currentSelectedURL:
            state.categoryMap[categoryIndex][1][productIndex + 1].url,
        };
      }
    default:
      return defaultSearchInputReducerState;
  }
};

export { searchInputReducer };
