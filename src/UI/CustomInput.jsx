import React from "react";
import styled from "styled-components";
import { SECONDARY_COLOR } from "../Styles";

const CustomInput = ({ type = "text", ...props }) => {
  return <StyledCustomInput type={type} {...props} />;
};

const StyledCustomInput = styled.input`
  height: 45px;
  padding: 0px 8px;
  width: 100%;
  line-height: 25px;
  font-size: 16px;
  font-weight: 500;
  font-family: inherit;
  border-radius: 6px;
  min-width: 300px;
  border: 1px solid #cdd9ed;
  background: ${SECONDARY_COLOR};
  transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #275efe;
  }
`;

export { CustomInput };
