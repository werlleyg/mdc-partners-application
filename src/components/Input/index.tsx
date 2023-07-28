import { InputCustom } from "./styles";

import { IInput } from "@/dtos/input";

export function Input(props: IInput) {
  return <InputCustom {...props} />;
}
