import { ChangeEvent, FormEvent, useCallback, useState } from "react";

// styles
import { Container, DivResult, Form, P, Span, Subtitle } from "./styles";
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
  const [factorialResult, setFactorialResult] =
    useState<IFactorialNumberData>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const DELAY_TIME: number = 3; // in seconds

  // handle change input
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checkRegex = /^(\d+(\.\d*)?|\.\d+)?$/g;
      let value = event.target.value.trim();
      const name = event.target.name;
      // check if the value is of integer type and greater than or equal to 0
      if (!checkRegex.test(value)) return;

      setFactorialNumberData({ ...factorialNumberData, [name]: value });
    },
    [factorialNumberData],
  );

  const getFactorialOfNumberN = useCallback(() => {
    const number = factorialNumberData?.number as number;

    let factorialResult: number = 1;

    for (let i = number; i > 0; i--) {
      factorialResult = factorialResult * i;
    }
    console.log(factorialNumberData);

    setTimeout(() => {
      setFactorialResult({
        ...factorialNumberData,
        showResult: true,
        factorialResult,
      });
      setShowSpinner(false);
    }, DELAY_TIME * 1000);
  }, [factorialNumberData]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setShowSpinner(true);
      setFactorialResult({
        ...factorialNumberData,
        showResult: false,
      });

      getFactorialOfNumberN();
    },
    [getFactorialOfNumberN, factorialNumberData],
  );

  return (
    <>
      <CustomHead title={titlePage} />
      <Header link="/" />
      <Container>
        <H1>{titlePage}</H1>
        <Subtitle>
          Please enter the number, and the factorial will be calculated
          automatically.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <InputCustom
            type="text"
            placeholder="Number"
            value={factorialNumberData?.number ?? ""}
            name="number"
            onChange={handleChangeInput}
            required
          />

          <Button customTitle="Calculate fatorial" customColor="secondary" />
        </Form>
        {factorialNumberData?.showResult}

        <DivResult showContent={factorialResult?.showResult}>
          <P>
            The result of <b>{factorialResult?.number}!</b> is
          </P>
          <Span>{factorialResult?.factorialResult}</Span>
        </DivResult>

        {showSpinner && <DotSpinner />}
      </Container>
    </>
  );
}
