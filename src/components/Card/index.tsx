import { ReactNode } from "react";

import { ButtonCard } from "./styles";
import { ICard } from "@/dtos/card";

export function Card({ title, Icon, description }: ICard) {
  return (
    <ButtonCard title={title}>
      <Icon className={"icon__custom"} />
      <h3>{title}</h3>
      <p>{description}</p>
    </ButtonCard>
  );
}
