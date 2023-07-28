import Link from "next/link";
import { H1Custom } from "./styles";

interface IH1 {
  children: string;
}

export function H1({ children }: IH1) {
  return <H1Custom>{children}</H1Custom>;
}
