import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { currency } from "remask";

// styles
import {
  Container,
  DivRadioButtons,
  DivResult,
  Form,
  InputRadio,
  Label,
  P,
  Span,
  Subtitle,
} from "./styles";
// components
import { CustomHead } from "@/layout/CustomHead";
import { H1 } from "@/components/H1";
import { Input } from "@/components/Input";
import { DotSpinner } from "@/components/DotSpinner";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
// types
import { IInterestCalculationData } from "@/dtos/interestCalculation";

export default function InterestCalculation() {
  const [titlePage] = useState<string>("Interest Calculation");
  const [interestCalculationData, setInterestCalculationData] =
    useState<IInterestCalculationData>();
  const [interestCalculationResult, setInterestCalculationResult] =
    useState<IInterestCalculationData>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const DELAY_TIME: number = 3; // in seconds

  // handle change input
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checkRegex = /^(?!.*[,].*,)[0-9,\s]*$/;
      // get input value
      let value: string = event.target.value.trim();
      // get input name
      const name = event.target.name;
      // check value
      if (!checkRegex.test(value) && name !== "typeOfInterest") return;
      // if is investmentMonths then only integer number is accepted
      if (name === "investmentMonths" && value) value = "" + parseFloat(value);
      // set data value
      setInterestCalculationData({
        ...interestCalculationData,
        [name]: value,
      });
    },
    [interestCalculationData],
  );

  const calculateSimpleInterestAmount = useCallback(
    ({
      interestRateNumber,
      investmentMonthsNumber,
      initialInvestmentNumber,
    }: any) => {
      // get investment amount
      const investmentAmount: string =
        "" +
        (1 + (interestRateNumber * investmentMonthsNumber) / 100) *
          initialInvestmentNumber;

      return investmentAmount;
    },
    [],
  );
  const calculateCompoundInterestAmount = useCallback(
    ({
      interestRateNumber,
      investmentMonthsNumber,
      initialInvestmentNumber,
    }: any) => {
      const investmentAmount: string =
        "" +
        initialInvestmentNumber *
          Math.pow(1 + interestRateNumber / 100, investmentMonthsNumber);

      return investmentAmount;
    },
    [],
  );

  const calculateAmount = useCallback(() => {
    const {
      initialInvestment,
      interestRate,
      investmentMonths,
    }: IInterestCalculationData =
      interestCalculationData as IInterestCalculationData;

    // check if values exists
    if (!initialInvestment || !interestRate || !investmentMonths) return;

    // convert values to number
    const initialInvestmentNumber = parseFloat(
      initialInvestment.replace(",", "."),
    );
    const interestRateNumber = parseFloat(interestRate.replace(",", "."));
    const investmentMonthsNumber = parseFloat(investmentMonths);

    const payload = {
      initialInvestmentNumber,
      interestRateNumber,
      investmentMonthsNumber,
    };

    const investmentAmount: string =
      interestCalculationData?.typeOfInterest === "simple_interest"
        ? calculateSimpleInterestAmount(payload)
        : calculateCompoundInterestAmount(payload);

    // set value result and show on screen
    setTimeout(() => {
      setInterestCalculationResult({
        ...interestCalculationData,
        investmentAmount,
        showResult: true,
      });
      // hide spinner
      setShowSpinner(false);
    }, DELAY_TIME * 1000);
  }, [
    calculateCompoundInterestAmount,
    calculateSimpleInterestAmount,
    interestCalculationData,
  ]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // hide result
      setInterestCalculationResult({
        ...interestCalculationData,
        showResult: false,
      });
      // show spinner
      setShowSpinner(true);
      // set calculate interest amount
      calculateAmount();
    },
    [calculateAmount, interestCalculationData],
  );

  const getCurrencyFormat = useCallback((value: string | undefined) => {
    if (!value) return;
    const valueNumber = parseFloat(value.replace(",", "."));
    return currency.mask({
      locale: "en-US",
      currency: "USD",
      value: valueNumber,
    });
  }, []);

  useEffect(() => {
    const initialData: IInterestCalculationData = {
      typeOfInterest: "simple_interest",
    };
    setInterestCalculationData(initialData);
  }, []);

  return (
    <>
      <CustomHead title={titlePage} />
      <Header link="/" />
      <Container>
        <H1>{titlePage}</H1>
        <Subtitle>
          Enter your investment data and click the button to view your final
          amount at the end of the period.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Initial investment in dollars ($)"
            value={interestCalculationData?.initialInvestment ?? ""}
            name="initialInvestment"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />
          <Input
            type="text"
            placeholder="Investment time in months"
            value={interestCalculationData?.investmentMonths ?? ""}
            name="investmentMonths"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />

          <Input
            type="text"
            placeholder="Interest rate in percent (%)"
            value={interestCalculationData?.interestRate ?? ""}
            name="interestRate"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />
          <DivRadioButtons>
            <Label>
              <InputRadio
                type={"radio"}
                name={"typeOfInterest"}
                value={"simple_interest"}
                defaultChecked
                onChange={handleChangeInput}
              ></InputRadio>
              Simple interest
            </Label>
            <Label>
              <InputRadio
                type={"radio"}
                name={"typeOfInterest"}
                value={"compound_interest"}
                onChange={handleChangeInput}
              ></InputRadio>
              Compound interest
            </Label>
          </DivRadioButtons>

          <Button
            customTitle="Calculate average"
            customColor="secondary"
            disabled={showSpinner}
          />
        </Form>
        {interestCalculationResult?.showResult && (
          <DivResult>
            <P>
              With the initial investment of{" "}
              <b>
                {getCurrencyFormat(
                  interestCalculationResult?.initialInvestment,
                )}
              </b>
              , at an interest rate of{" "}
              <b>{interestCalculationResult.interestRate}%</b> over{" "}
              <b>{interestCalculationResult.investmentMonths}</b> months, your
              total amount will be
            </P>
            <Span>
              {getCurrencyFormat(interestCalculationResult?.investmentAmount)}
            </Span>
          </DivResult>
        )}
        {showSpinner && <DotSpinner />}
      </Container>
    </>
  );
}
