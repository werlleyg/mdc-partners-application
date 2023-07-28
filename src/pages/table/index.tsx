import { ChangeEvent, FormEvent, useCallback, useState } from "react";

// styles
import { Container, DivDeck, DivResultCard, Form, Subtitle } from "./styles";
// components
import { CustomHead } from "@/layout/CustomHead";
import { H1 } from "@/components/H1";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { DotSpinner } from "@/components/DotSpinner";

// types
import { ITableData, ITableResult } from "@/dtos/table";

export default function Table() {
  const [titlePage] = useState<string>("Table");
  const [tableData, setTableData] = useState<ITableData>();
  const [tableDataResult, setTableDataResult] = useState<ITableData>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const DELAY_TIME: number = 3; // in seconds
  const MAX_NUMBER: number = 10;

  // handle change input
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checkRegex = /^\s*?\d*(\.\d+)?\s*$/;
      // get input value
      let value = event.target.value.trim();
      // get input name
      const name = event.target.name;
      // check if value is type number
      if (!checkRegex.test(value)) return;
      // set data value
      setTableData({
        ...tableData,
        [name]: value,
      });
    },
    [tableData],
  );

  // generate value table
  const generateTable = useCallback(() => {
    const { number } = tableData as ITableData;

    // check if number exists
    if (!number) return;

    // tableResult default value
    const tableResult: ITableResult[] = [];

    for (let i = 1; i <= MAX_NUMBER; i++) {
      const auxResult: ITableResult = {
        multiplicationFactor: i,
        result: i * number,
      };
      tableResult.push(auxResult);
    }

    setTimeout(() => {
      // set result in state
      setTableDataResult({ ...tableData, showResult: true, tableResult });
      // hide spinner
      setShowSpinner(false);
    }, DELAY_TIME * 1000);
  }, [tableData]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // sbow spinner
      setShowSpinner(true);

      // generate table values
      generateTable();
    },
    [generateTable],
  );

  return (
    <>
      <CustomHead title={titlePage} />
      <Header link="/" />
      <Container>
        <H1>{titlePage}</H1>
        <Subtitle>
          Please enter a number and click the button to get its multiplication
          table from 1 to 10.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Number"
            value={tableData?.number ?? ""}
            name="number"
            onChange={handleChangeInput}
            disabled={showSpinner}
            required
          />

          <Button
            customTitle="Generate table"
            customColor="secondary"
            disabled={showSpinner}
          />
        </Form>

        <DivDeck>
          {tableDataResult?.tableResult?.map((resultData, idx) => (
            <DivResultCard key={idx}>
              {tableDataResult.number} x {resultData.multiplicationFactor} ={" "}
              {resultData.result}
            </DivResultCard>
          ))}
        </DivDeck>

        {showSpinner && <DotSpinner />}
      </Container>
    </>
  );
}
