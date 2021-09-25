import React from "react";
import styled from "styled-components";
import { SearchInput } from "../components";

const Autocomplete = () => {
  return (
    <Container>
      <SearchInput />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #edc7b7;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export { Autocomplete };
