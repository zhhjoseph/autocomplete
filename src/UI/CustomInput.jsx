import React from "react";
import styled from "styled-components";
import { BASIC_MOBILE_MEDIA_QUERY, SECONDARY_COLOR } from "../Styles";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const CustomInput = ({ type = "text", search, width, ...props }) => {
  return (
    <InputContainer width={width}>
      {props.value && <ClearIcon size={20} onClick={props.clearValue} />}
      {search && <StyledSearchIcon color={"black"} />}
      <StyledCustomInput search={search} type={type} {...props} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "100%")};
  @media ${BASIC_MOBILE_MEDIA_QUERY} {
    width: 300px;
  }
`;

const StyledSearchIcon = styled(BsSearch)`
  position: absolute;
  right: -25px;
  top: 15px;
`;

const ClearIcon = styled(AiOutlineClose)`
  position: absolute;
  right: 0px;
  top: 14px;
  transition: color 0.3s ease;
  :hover {
    cursor: pointer;
    color: red;
  }
`;

const StyledCustomInput = styled.input`
  height: 45px;
  padding: ${(props) => (props.search ? "0px 40px 0px 8px" : "0px 8px")};
  width: 100%;
  line-height: 25px;
  font-size: 16px;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
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
