// styles
import { ButtonReturn, Container } from "./styles";
// link
import Link from "next/link";
// icons
import { IoIosArrowBack } from "react-icons/io";
// types
interface IHeader {
  link: string;
}

export function Header({ link }: IHeader) {
  return (
    <Container>
      <ButtonReturn>
        <Link href={link}>
          <IoIosArrowBack /> Return
        </Link>
      </ButtonReturn>
    </Container>
  );
}
