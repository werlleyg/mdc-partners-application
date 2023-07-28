import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { toast } from "react-toastify";

// styles
import { Container, DivResult, Form, P, Span, Subtitle } from "./styles";
// components
import { CustomHead } from "@/layout/CustomHead";
import { H1 } from "@/components/H1";
import { Input } from "@/components/Input";
import { DotSpinner } from "@/components/DotSpinner";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
// types
import { ICalculator } from "@/dtos/calculator";

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
    const { firstNumber, secondNumber, operator }: ICalculator =
      calculatorData as ICalculator;

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
          <Input
            type="number"
            placeholder="First number (Ex.: 1, 2, 3...)"
            value={calculatorData?.firstNumber ?? ""}
            name="firstNumber"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />
          <Input
            type="number"
            placeholder="Second number (Ex.: 1, 2, 3...)"
            value={calculatorData?.secondNumber ?? ""}
            name="secondNumber"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />
          <Input
            type="text"
            placeholder="Operator (Ex.: +, -, * or /)"
            value={calculatorData?.operator ?? ""}
            name="operator"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />
          <Button
            customTitle="Calculate"
            customColor="secondary"
            disabled={showSpinner}
          />
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
