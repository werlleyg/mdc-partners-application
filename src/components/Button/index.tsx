import { ReactNode } from "react";

import { ButtonCustom } from "./styles";
import { IButton } from "@/dtos/button";

export function Button(props: IButton) {
  const { customTitle } = props;

  return <ButtonCustom {...props}>{customTitle}</ButtonCustom>;
}
