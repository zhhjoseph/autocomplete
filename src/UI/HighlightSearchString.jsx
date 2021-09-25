import React from "react";
import styled from "styled-components";

const HighlightSearchString = ({ label = "", searchString }) => {
  if (searchString) {
    let index = label.toLowerCase().indexOf(searchString.toLowerCase());

    if (index !== -1) {
      let length = searchString.length;

      let prefix = label.substring(0, index);
      let suffix = label.substring(index + length);
      let match = label.substring(index, index + length);

      return (
        <StyledBoldSearchString>
          {prefix}
          <StyledRegularSearchString>{match}</StyledRegularSearchString>
          {suffix}
        </StyledBoldSearchString>
      );
    }
  }

  return <span>{label}</span>;
};

const StyledRegularSearchString = styled.span`
  font-weight: 300;
`;
const StyledBoldSearchString = styled.span`
  font-weight: bold;
`;

export { HighlightSearchString };
