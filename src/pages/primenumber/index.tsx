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
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { DotSpinner } from "@/components/DotSpinner";
// types
import { IPrimeNumberData } from "@/dtos/primeNumber";

export default function PrimeNumber() {
  const [titlePage] = useState<string>("Prime Number");
  const [primeNumberData, setPrimeNumberData] = useState<IPrimeNumberData>();
  const [listNumberData, setListNumberData] = useState<number[]>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const DELAY_TIME: number = 3; // in seconds

  // handle change input
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checkRegex = /^\d*$/g;
      // get input value
      let value = event.target.value.trim();
      // get input name
      const name = event.target.name;
      // check if value is type number
      if (!checkRegex.test(value)) return;
      // set number value and rest isPrime and ShowResult values
      setPrimeNumberData({
        ...primeNumberData,
        [name]: value,
        isPrime: false,
        showResult: false,
      });
    },
    [primeNumberData],
  );

  const numberIsPrime = useCallback((currentNumber: number) => {
    // if the number is less than or equal to 1, it is not prime
    if (currentNumber <= 1) return false;

    // if the number is divisible by any integer i between 2 and its square root, then it is not a prime number
    for (let i = 2; i <= Math.sqrt(currentNumber); i++) {
      if (currentNumber % i === 0) {
        return false;
      }
    }
    return true;
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // check number in primenumberdata
      if (!primeNumberData?.number) return;

      // show spinner
      setShowSpinner(true);

      // check if number is prime
      const isPrime: boolean = numberIsPrime(primeNumberData?.number);

      setTimeout(() => {
        // set result in state
        setPrimeNumberData({ ...primeNumberData, showResult: true, isPrime });
        // hide spinner
        setShowSpinner(false);
      }, DELAY_TIME * 1000);
    },
    [primeNumberData, numberIsPrime],
  );

  const findFirstNPrimeNumbers = useCallback(
    (maxNumber: number) => {
      // show spinner
      setShowSpinner(true);

      // set counter and initial number
      let counter: number = 0;
      let initialNumber = (listNumberData[listNumberData.length - 1] || 0) + 2;

      for (let i = initialNumber; counter < maxNumber; i++) {
        // check if number is prime
        if (numberIsPrime(i)) {
          setTimeout(() => {
            // hide spinner
            setShowSpinner(false);
            // set result in state
            setListNumberData((prev) => [...prev, i]);
          }, DELAY_TIME * 1000);
          counter++;
        }
      }
    },
    [numberIsPrime, listNumberData],
  );

  const handleSetShowPrimeNumbers = useCallback(() => {
    findFirstNPrimeNumbers(10);
  }, [findFirstNPrimeNumbers]);

  return (
    <>
      <CustomHead title={titlePage} />
      <Header link="/" />
      <Container>
        <H1>{titlePage}</H1>
        <Subtitle>
          Please enter a number to check if it is prime, or I can generate the
          first 10 prime numbers automatically.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="number"
            placeholder="Number"
            value={primeNumberData?.number ?? ""}
            name="number"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />

          <Button
            customTitle="Check if it is prime"
            customColor="secondary"
            disabled={showSpinner}
          />
        </Form>

        <DivResult showContent={primeNumberData?.showResult}>
          <p>
            {primeNumberData?.isPrime ? "Yes" : "Not"}, number{" "}
            <b>{primeNumberData?.number}</b>{" "}
          </p>
          <span
            className={
              primeNumberData?.isPrime ? "span__is-prime" : "span__not-prime"
            }
          >
            {" "}
            {primeNumberData?.isPrime ? "" : "not"} is prime
          </span>
        </DivResult>

        <SpanDivider>or</SpanDivider>

        <Button
          customTitle={`Generate ${
            listNumberData.length > 0 ? "more" : "the first"
          } 10 prime numbers`}
          customColor="secondary"
          onClick={handleSetShowPrimeNumbers}
          disabled={showSpinner}
        />
        <DivDeck>
          {listNumberData?.map((primeNumber) => (
            <DivNumber key={primeNumber}>{primeNumber}</DivNumber>
          ))}
        </DivDeck>

        {showSpinner && <DotSpinner />}
      </Container>
    </>
  );
}
