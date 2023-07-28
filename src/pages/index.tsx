import { useState } from "react";

// styles
import { Deck, Main } from "./styles";

// components
import { CustomHead } from "@/layout/CustomHead";
import { Card } from "@/components/Card";

// types
import { ICard } from "@/dtos/card";

// icons
import { BsFillCalculatorFill } from "react-icons/bs";

export default function Home() {
  const [cardData] = useState<ICard[]>([
    {
      title: "Simple Calculator",
      Icon: BsFillCalculatorFill,
      link: "/simplecalculator",
    },
  ]);
  return (
    <>
      <CustomHead />
      <Main>
        <Deck>
          {cardData.map((card) => (
            <Card {...card} key={card.title} />
          ))}
        </Deck>
      </Main>
    </>
  );
}
