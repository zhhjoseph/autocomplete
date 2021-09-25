import { Main } from "./screens";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <Main />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  background: #f5f9ff;
`;

export default App;
