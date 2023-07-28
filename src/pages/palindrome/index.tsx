import { ChangeEvent, FormEvent, useCallback, useState } from "react";

// styles
import { Container, DivResult, Form, P, Span, Subtitle } from "./styles";
// components
import { CustomHead } from "@/layout/CustomHead";
import { H1 } from "@/components/H1";
import { InputCustom } from "@/components/Input/styles";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { DotSpinner } from "@/components/DotSpinner";

// types
import { IPalindromeData } from "@/dtos/palindrome";

export default function Palindrome() {
  const [titlePage] = useState<string>("Palindrome");
  const [palindromeData, setPalindromeData] = useState<IPalindromeData>();
  const [palindromeDataResult, setPalindromeDataResult] =
    useState<IPalindromeData>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const DELAY_TIME: number = 3; // in seconds

  // handle change input
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      // get input value
      let value = event.target.value.trim();
      // get input name
      const name = event.target.name;
      // set data value
      setPalindromeData({ ...palindromeData, [name]: value });
    },
    [palindromeData],
  );

  // check if the value is a palindrome
  const isPalindrome = useCallback(() => {
    const { value } = palindromeData as IPalindromeData;

    // split value
    const arrayValue: string[] = value?.toLocaleLowerCase().split("") || [];

    // default base number value
    const baseNumber: number = Math.floor(arrayValue.length / 2) - 1;

    // isPalindrome default value
    let isPalindrome: boolean = true;

    for (let i = 0; i <= baseNumber; i++) {
      if (arrayValue[i] !== arrayValue[arrayValue.length - i - 1])
        isPalindrome = false;
    }

    // set palindrome result and show on screen
    setTimeout(() => {
      setPalindromeDataResult({
        ...palindromeData,
        showResult: true,
        isPalindrome,
      });
      // hide spinner
      setShowSpinner(false);
    }, DELAY_TIME * 1000);
  }, [palindromeData]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // show spinner
      setShowSpinner(true);
      // hide show result
      setPalindromeDataResult({
        ...palindromeData,
        showResult: false,
      });

      // is palindrome
      isPalindrome();
    },
    [isPalindrome, palindromeData],
  );

  return (
    <>
      <CustomHead title={titlePage} />
      <Header link="/" />
      <Container>
        <H1>{titlePage}</H1>
        <Subtitle>
          Please provide a word or a set of characters, and I will check if it
          is a palindrome.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <InputCustom
            type="text"
            placeholder="Value"
            value={palindromeData?.value ?? ""}
            name="value"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />

          <Button
            customTitle="Check if is palindrome"
            customColor="secondary"
            disabled={showSpinner}
          />
        </Form>

        <DivResult showContent={palindromeDataResult?.showResult}>
          <P>
            The value <b>{palindromeDataResult?.value}</b>
          </P>
          <Span>
            is {!palindromeDataResult?.isPalindrome && "not"} a palindrome
          </Span>
        </DivResult>

        {showSpinner && <DotSpinner />}
      </Container>
    </>
  );
}
