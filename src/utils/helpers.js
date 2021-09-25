const truncateSearchResults = (searchResults) => {
  if (window.innerWidth <= 768) {
    return searchResults.slice(0, 5);
  } else {
    return searchResults.slice(0, 10);
  }
};

const groupDataByCategory = (data) => {
  const uniqueData = truncateSearchResults(
    data.reduce((prevValue, currentValue) => {
      if (!prevValue.some((product) => product.name === currentValue.name)) {
        prevValue.push(currentValue);
      }
      return prevValue;
    }, [])
  );

  const sortedGroupedData = uniqueData
    .reduce((prevValue, currentValue) => {
      if (prevValue.length === 0) {
        prevValue.push([`${currentValue.type}`, [currentValue]]);
        return prevValue;
      }
      const hasSameCategoryIndex = prevValue.findIndex((product) => {
        return product[0] === currentValue.type;
      });
      if (hasSameCategoryIndex > -1) {
        prevValue[hasSameCategoryIndex][1].push(currentValue);
        return prevValue;
      } else {
        prevValue.push([`${currentValue.type}`, [currentValue]]);
        return prevValue;
      }
    }, [])
    .sort((a, b) => {
      return a[0] > b[0] ? 1 : -1;
    });

  return sortedGroupedData;
};

export { truncateSearchResults, groupDataByCategory };
