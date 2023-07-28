import { IInput } from "@/dtos/input";
import styled from "@emotion/styled";

export const InputCustom = styled.input<IInput>`
  width: min(100%, ${(props) => (props.width ? props.width : "32rem")});
  margin-inline: auto;
  border-radius: var(--border-radius);
  border: 0;
  padding: 0.75rem 1.25rem;
  font-size: 1.25rem;
  box-shadow: 0rem 0.5rem 2.5rem rgba(var(--dark-rgb-color), 0.1);
  text-align: center;
  color: var(--primary-color);

  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
`;
