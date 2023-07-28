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
import { TbNumbers } from "react-icons/tb";
import { FaExclamation, FaSync, FaHashtag } from "react-icons/fa";
import { AiOutlineFontColors } from "react-icons/ai";

export default function Home() {
  const [cardData] = useState<ICard[]>([
    {
      title: "Simple Calculator",
      Icon: BsFillCalculatorFill,
      link: "/simplecalculator",
    },
    {
      title: "Prime Number",
      Icon: TbNumbers,
      link: "/primenumber",
    },
    {
      title: "Factorial",
      Icon: FaExclamation,
      link: "/factorial",
    },
    {
      title: "Palindrome",
      Icon: FaSync,
      link: "/palindrome",
    },
    {
      title: "Table",
      Icon: FaHashtag,
      link: "/table",
    },
    {
      title: "Vowel Counter",
      Icon: AiOutlineFontColors,
      link: "/vowelcounter",
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
