import React from "react";
import styled from "styled-components";
import { PRIMARY_BLACK_COLOR } from "../Styles";

const NavBar = ({ children }) => {
  return <StyledNavBar>{children}</StyledNavBar>;
};

const StyledNavBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 75px;
  background: ${PRIMARY_BLACK_COLOR};
`;

export { NavBar };
