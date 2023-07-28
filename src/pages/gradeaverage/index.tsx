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
import { IGradeAverage } from "@/dtos/gradeAverage";

export default function GradeAverage() {
  const [titlePage] = useState<string>("Grade Average");
  const [gradeAverageData, setGradeAverageData] = useState<IGradeAverage>();
  const [gradeAverageResult, setGradeAverageResult] = useState<IGradeAverage>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const DELAY_TIME: number = 3; // in seconds

  // handle change input
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checkRegex = /^(?!.*[,].*,)[0-9,\s]*$/;
      // get input value
      let value = event.target.value.trim();
      // get input name
      const name = event.target.name;
      // check value
      if (!checkRegex.test(value)) return;
      // value number
      let auxValueNumber = parseFloat(value.replace(",", "."));
      // check if value is between 0 and 10
      if (auxValueNumber > 10)
        return toast.warn("The grade should be between 0 and 10");
      // set data value
      setGradeAverageData({
        ...gradeAverageData,
        [name]: value,
      });
    },
    [gradeAverageData],
  );

  // calculate average
  const calculateAverage = useCallback(() => {
    const { firstGrade, secondGrade, thirdGrade }: IGradeAverage =
      gradeAverageData as IGradeAverage;
    // Check if all attributes exist
    if (
      (!firstGrade && firstGrade !== "0") ||
      (!secondGrade && secondGrade !== "0") ||
      (!thirdGrade && thirdGrade !== "0")
    )
      return setShowSpinner(false);

    // convert value to number
    const firstGradeNumber = parseFloat(firstGrade?.replace(",", "."));
    const secondGradeNumber = parseFloat(secondGrade?.replace(",", "."));
    const thirdGradeNumber = parseFloat(thirdGrade?.replace(",", "."));

    // grade average
    let gradeAverage: string = (
      (firstGradeNumber + secondGradeNumber + thirdGradeNumber) /
      3
    ).toFixed(2);

    // set value result and show on screen
    setTimeout(() => {
      setGradeAverageResult({
        ...gradeAverageData,
        gradeAverage,
        showResult: true,
      });
      // hide spinner
      setShowSpinner(false);
    }, DELAY_TIME * 1000);
  }, [gradeAverageData]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // hide grade average result
      setGradeAverageResult({
        ...gradeAverageData,
        showResult: false,
      });
      // show spinner
      setShowSpinner(true);
      // set calculate average
      calculateAverage();
    },
    [calculateAverage, gradeAverageData],
  );

  return (
    <>
      <CustomHead title={titlePage} />
      <Header link="/" />
      <Container>
        <H1>{titlePage}</H1>
        <Subtitle>
          Please enter the grades of your three subjects and click the button to
          calculate the average with up to two decimal places.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Your first grade"
            value={gradeAverageData?.firstGrade ?? ""}
            name="firstGrade"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />
          <Input
            type="text"
            placeholder="Your second grade"
            value={gradeAverageData?.secondGrade ?? ""}
            name="secondGrade"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />
          <Input
            type="text"
            placeholder="Your third grade"
            value={gradeAverageData?.thirdGrade ?? ""}
            name="thirdGrade"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />
          <Button
            customTitle="Calculate average"
            customColor="secondary"
            disabled={showSpinner}
          />
        </Form>
        {gradeAverageResult?.showResult && (
          <DivResult>
            <P>
              The average of the grades <b>{gradeAverageResult?.firstGrade}</b>,{" "}
              <b>{gradeAverageResult?.secondGrade}</b> and{" "}
              <b>{gradeAverageResult?.thirdGrade}</b> is
            </P>
            <Span>{gradeAverageResult?.gradeAverage}</Span>
          </DivResult>
        )}
        {showSpinner && <DotSpinner />}
      </Container>
    </>
  );
}
