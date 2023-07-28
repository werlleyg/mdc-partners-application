import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { toast } from "react-toastify";

// styles
import { Container, DivResult, Form, P, Span, Subtitle } from "./styles";
// components
import { CustomHead } from "@/layout/CustomHead";
import { H1 } from "@/components/H1";
import { InputCustom } from "@/components/Input/styles";
import { DotSpinner } from "@/components/DotSpinner";
// types
import { ICalculator } from "@/dtos/calculator";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";

export default function SimpleCalculator() {
  const [titlePage] = useState<string>("Simple Calculator");
  const [calculatorData, setCalculatorData] = useState<ICalculator>();
  const [calculationResult, setCalculationResult] = useState<ICalculator>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const DELAY_TIME: number = 3; // in seconds

  // handle change input
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checkRegex = /^$|^[+\-*/]$/;
      // get input value
      let value = event.target.value.trim();
      // get input name
      const name = event.target.name;

      // check if name is operator and check regex value
      if (name === "operator" && !checkRegex.test(value)) {
        value = "";
        toast.warn("The operator must be +, -, *, or /");
      }

      // set data value
      setCalculatorData({ ...calculatorData, [name]: value });
    },
    [calculatorData],
  );

  const calculator = useCallback(() => {
    const {
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      operator,
    }: ICalculator = calculatorData as ICalculator;

    // Check if all attributes exist
    if (!firstNumber || !secondNumber || !operator) return;

    let result: number;

    // compare operator character
    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        if (secondNumber == 0)
          return toast.warn(
            "For this operation, the second number cannot be equal to 0.",
          );
        result = firstNumber / secondNumber;
        break;
      default:
        return toast.error("Calculation error");
    }

    // set calculate result and show on screen
    setTimeout(() => {
      setCalculationResult({ ...calculatorData, result });
      // hide spinner
      setShowSpinner(false);
    }, DELAY_TIME * 1000);
  }, [calculatorData]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // show spinner
      setShowSpinner(true);
      // hide show result
      setCalculationResult({ ...calculatorData, result: undefined });
      // set calculator
      calculator();
    },
    [calculator, calculatorData],
  );

  return (
    <>
      <CustomHead title={titlePage} />
      <Header link="/" />
      <Container>
        <H1>{titlePage}</H1>
        <Subtitle>
          Simple calculator that performs mathematical operations with two
          numbers selected by the user.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <InputCustom
            type="number"
            placeholder="First number (Ex.: 1, 2, 3...)"
            value={calculatorData?.firstNumber ?? ""}
            name="firstNumber"
            onChange={handleChangeInput}
            required
          />
          <InputCustom
            type="number"
            placeholder="Second number (Ex.: 1, 2, 3...)"
            value={calculatorData?.secondNumber ?? ""}
            name="secondNumber"
            onChange={handleChangeInput}
            required
          />
          <InputCustom
            type="text"
            placeholder="Operator (Ex.: +, -, * or /)"
            value={calculatorData?.operator ?? ""}
            name="operator"
            onChange={handleChangeInput}
            required
          />
          <Button customTitle="Calculate" customColor="secondary" />
        </Form>
        {calculationResult?.result && (
          <DivResult>
            <P>
              The result of <b>{calculationResult?.firstNumber}</b>{" "}
              {calculationResult?.operator}{" "}
              <b>{calculationResult?.secondNumber}</b> is
            </P>
            <Span>{calculationResult?.result}</Span>
          </DivResult>
        )}
        {showSpinner && <DotSpinner />}
      </Container>
    </>
  );
}
