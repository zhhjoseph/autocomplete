import React from "react";
import styled from "styled-components";
import { Autocomplete, NavBar } from "../components";

const Main = () => {
  return (
    <Container>
      <NavBar>
        <Autocomplete />
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

export { Main };
