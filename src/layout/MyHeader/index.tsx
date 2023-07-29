import { ReactNode } from "react";

import { Container } from "./styles";

export function MyHeader() {
  return (
    <Container>
      <b>Hello, dev!</b> How are you? <br />
      This application contains various tools for testing.
      <br />
      Select one of the options below and join me in this adventure.
    </Container>
  );
}
