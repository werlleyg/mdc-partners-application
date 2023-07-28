import { ChangeEvent, FormEvent, useCallback, useState } from "react";

// styles
import { Container, DivResult, Form, P, Span, Subtitle } from "./styles";
// components
import { CustomHead } from "@/layout/CustomHead";
import { H1 } from "@/components/H1";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { DotSpinner } from "@/components/DotSpinner";

// types
import { IFactorialNumberData } from "@/dtos/factorial";

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
      // get input value
      let value = event.target.value.trim();
      // get input name
      const name = event.target.name;
      // check if the value is of integer type and greater than or equal to 0
      if (!checkRegex.test(value)) return;
      // set number value
      setFactorialNumberData({ ...factorialNumberData, [name]: value });
    },
    [factorialNumberData],
  );

  // get factorial of number N
  const getFactorialOfNumberN = useCallback(() => {
    const number = factorialNumberData?.number as number;

    // default value factorial result
    let factorialResult: number = 1;

    // iterate values to find the factorial
    for (let i = number; i > 0; i--) {
      factorialResult = factorialResult * i;
    }

    // set factorial result and show on screen
    setTimeout(() => {
      setFactorialResult({
        ...factorialNumberData,
        showResult: true,
        factorialResult,
      });
      // hide spinner
      setShowSpinner(false);
    }, DELAY_TIME * 1000);
  }, [factorialNumberData]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // show spinner
      setShowSpinner(true);
      // hide show result
      setFactorialResult({
        ...factorialNumberData,
        showResult: false,
      });

      // get factorial
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
          Please enter the number, and the factorial will be calculated when you
          press the button.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Number"
            value={factorialNumberData?.number ?? ""}
            name="number"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />

          <Button
            customTitle="Calculate fatorial"
            customColor="secondary"
            disabled={showSpinner}
          />
        </Form>

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
