import React from "react";
import styled from "styled-components";
import { SearchInput, NavBar } from "../components";

const Autocomplete = () => {
  return (
    <Container>
      <NavBar>
        <SearchInput />
      </NavBar>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export { Autocomplete };
