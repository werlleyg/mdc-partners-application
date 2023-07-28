// styles
import { InputCustom } from "./styles";
// types
import { IInput } from "@/dtos/input";

export function Input(props: IInput) {
  return <InputCustom {...props} />;
}
