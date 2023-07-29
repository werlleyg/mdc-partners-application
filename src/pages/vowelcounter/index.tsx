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
import { IVowelCounterData } from "@/dtos/vowelCounter";

// utils
import { removeAccentVowels } from "@/utils/removeAccentVowels";

export default function VowelCounter() {
  const [titlePage] = useState<string>("Vowel Counter");
  const [vowelCounterData, setVowelCounterData] = useState<IVowelCounterData>();
  const [vowelCounterResult, setVowelCounterResult] =
    useState<IVowelCounterData>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const DELAY_TIME: number = 3; // in seconds

  // handle change input
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      // get input value
      let value = event.target.value;
      // get input name
      const name = event.target.name;
      // set data value
      setVowelCounterData({
        ...vowelCounterData,
        [name]: value,
      });
    },
    [vowelCounterData],
  );

  // count vowels in data value
  const countVowels = useCallback(() => {
    const { value } = vowelCounterData as IVowelCounterData;

    // check if value exists
    if (!value) return;

    // remove vowel accent
    const auxValue = removeAccentVowels(value);

    const valueArray: string[] = auxValue.toLowerCase().split("");
    const vowels: string[] = ["a", "e", "i", "o", "u"];

    const totalVowels = valueArray.reduce(
      (total, vowel) => total + (vowels.includes(vowel) ? 1 : 0),
      0,
    );

    setTimeout(() => {
      // set result in state
      setVowelCounterResult({
        ...vowelCounterData,
        showResult: true,
        totalVowels,
      });
      // hide spinner
      setShowSpinner(false);
    }, DELAY_TIME * 1000);
  }, [vowelCounterData]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // sbow spinner
      setShowSpinner(true);

      //count vowels in data value
      countVowels();
    },
    [countVowels],
  );

  return (
    <>
      <CustomHead title={titlePage} />
      <Header link="/" />
      <Container>
        <H1>{titlePage}</H1>
        <Subtitle>
          Please enter a sequence of characters, and click the button to get the
          number of vowels.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <InputCustom
            type="text"
            placeholder="Text"
            value={vowelCounterData?.value ?? ""}
            name="value"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />

          <Button
            customTitle="Count vowels"
            customColor="secondary"
            disabled={showSpinner}
          />
        </Form>

        <DivResult showContent={vowelCounterResult?.showResult}>
          <P>
            The number of vowels in <b>{vowelCounterResult?.value}</b> is
          </P>
          <Span>{vowelCounterResult?.totalVowels}</Span>
        </DivResult>

        {showSpinner && <DotSpinner />}
      </Container>
    </>
  );
}
