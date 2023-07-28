// styles
import { ButtonCustom } from "./styles";
// types
import { IButton } from "@/dtos/button";

export function Button(props: IButton) {
  const { customTitle } = props;

  return <ButtonCustom {...props}>{customTitle}</ButtonCustom>;
}
