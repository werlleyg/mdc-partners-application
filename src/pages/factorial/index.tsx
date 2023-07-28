import { ChangeEvent, FormEvent, useCallback, useState } from "react";

// styles
import {
  Container,
  DivDeck,
  DivNumber,
  DivResult,
  Form,
  SpanDivider,
  Subtitle,
} from "./styles";
// components
import { CustomHead } from "@/layout/CustomHead";
import { H1 } from "@/components/H1";
import { InputCustom } from "@/components/Input/styles";
// types
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { DotSpinner } from "@/components/DotSpinner";

interface IFactorialNumberData {
  number?: number;
  factorialResult?: number;
  showResult?: boolean;
}

export default function Factorial() {
  const [titlePage] = useState<string>("Factorial");
  const [factorialNumberData, setFactorialNumberData] =
    useState<IFactorialNumberData>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const DELAY_TIME: number = 3; // in seconds

  // handle change input
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checkRegex = /^\d*$/g;
      let value = event.target.value.trim();
      const name = event.target.name;
      // check if value is type number
      if (!checkRegex.test(value)) return;

      setFactorialNumberData({ ...factorialNumberData, [name]: value });
    },
    [],
  );

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  return (
    <>
      <CustomHead title={titlePage} />
      <Header link='/' />
      <Container>
        <H1>{titlePage}</H1>
        <Subtitle>
          Please enter the number, and the factorial will be calculated
          automatically.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <InputCustom
            type='number'
            placeholder='Number'
            value={factorialNumberData?.number ?? ""}
            name='number'
            onChange={handleChangeInput}
            required
          />

          <Button customTitle='Calculate fatorial' customColor='secondary' />
        </Form>

        <DivResult showContent={factorialNumberData?.showResult}></DivResult>

        {showSpinner && <DotSpinner />}
      </Container>
    </>
  );
}
