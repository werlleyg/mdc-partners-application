import { ReactNode } from "react";

import { ButtonReturn, Container } from "./styles";
import Link from "next/link";

import { IoIosArrowBack } from "react-icons/io";

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
