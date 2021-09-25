import React from "react";
import styled from "styled-components";

const NavBar = ({ children }) => {
  return <StyledNavBar>{children}</StyledNavBar>;
};

const StyledNavBar = styled.nav`
  display: flex;
  position: relative;
  width: 100%;
  height: 75px;
  padding: 0px 16px 0px 12px;
  background: blue;
`;

export { NavBar };
