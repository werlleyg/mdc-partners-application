import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { toast } from "react-toastify";

// styles
import { Container, DivResult, Form, P, Span, Subtitle } from "./styles";
// components
import { CustomHead } from "@/layout/CustomHead";
import { H1 } from "@/components/H1";
import { InputCustom } from "@/components/Input/styles";
// types
import { ICalculator } from "@/dtos/calculator";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";

export default function SimpleCalculator() {
  const [titlePage] = useState<string>("Simple Calculator");
  const [calculatorData, setCalculatorData] = useState<ICalculator>();
  const [calculationResult, setCalculationResult] = useState<ICalculator>();

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
    const { first_number, second_number, operator }: ICalculator =
      calculatorData as ICalculator;

    // Check if all attributes exist
    if (!first_number || !second_number || !operator) return;

    let result: number;

    // compare operator character
    switch (operator) {
      case "+":
        result = first_number + second_number;
        break;
      case "-":
        result = first_number - second_number;
        break;
      case "*":
        result = first_number * second_number;
        break;
      case "/":
        if (second_number == 0)
          return toast.warn(
            "For this operation, the second number cannot be equal to 0.",
          );
        result = first_number / second_number;
        break;
      default:
        return toast.error("Calculation error");
    }

    setCalculationResult({ ...calculatorData, result });
  }, [calculatorData]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      calculator();
    },
    [calculator],
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
            value={calculatorData?.first_number ?? ""}
            name="first_number"
            onChange={handleChangeInput}
            required
          />
          <InputCustom
            type="number"
            placeholder="Second number (Ex.: 1, 2, 3...)"
            value={calculatorData?.second_number ?? ""}
            name="second_number"
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
              The result of <b>{calculationResult?.first_number}</b>{" "}
              {calculationResult?.operator}{" "}
              <b>{calculationResult?.second_number}</b> is
            </P>
            <Span>{calculationResult?.result}</Span>
          </DivResult>
        )}
      </Container>
    </>
  );
}
