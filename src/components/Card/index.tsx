// link
import Link from "next/link";
// styles
import { ButtonCard } from "./styles";
// types
import { ICard } from "@/dtos/card";

export function Card({ title, Icon, description, link }: ICard) {
  return (
    <ButtonCard>
      <Link href={link} title={title}>
        <Icon className={"icon__custom"} />
        <h3>{title}</h3>
        <p>{description}</p>
      </Link>
    </ButtonCard>
  );
}
