import { useState } from "react";

// styles
import { Deck, Main } from "./styles";

// components
import { CustomHead } from "@/layout/CustomHead";
import { Card } from "@/components/Card";
import { MyHeader } from "@/layout/MyHeader";

// types
import { ICard } from "@/dtos/card";

// icons
import { BsFillCalculatorFill } from "react-icons/bs";
import { TbNumbers } from "react-icons/tb";
import { FaExclamation, FaSync, FaHashtag } from "react-icons/fa";
import { AiOutlineFontColors } from "react-icons/ai";
import { IoMdSchool } from "react-icons/io";
import { IoCashOutline } from "react-icons/io5";

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
    {
      title: "Grade Average",
      Icon: IoMdSchool,
      link: "/gradeaverage",
    },
    {
      title: "Interest Calculation",
      Icon: IoCashOutline,
      link: "/interestcalculation",
    },
  ]);
  return (
    <>
      <CustomHead />
      <Main>
        <MyHeader />
        <Deck>
          {cardData.map((card) => (
            <Card {...card} key={card.title} />
          ))}
        </Deck>
      </Main>
    </>
  );
}
