import Link from "next/link";
import { Container, P } from "./styles";

export function CustomFooter() {
  return (
    <Container>
      <P>
        Developed with love ❤️ by{" "}
        <Link href={"https://linkedin.com/in/werlleyg"} target="_blank">
          Werlley Ponte
        </Link>
      </P>
    </Container>
  );
}
