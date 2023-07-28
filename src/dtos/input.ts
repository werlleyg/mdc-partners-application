import { ChangeEvent } from "react";

export interface IInput {
  placeholder: string;
  width?: string;
  type: "number" | "text";
  name: string;
  required: boolean;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
