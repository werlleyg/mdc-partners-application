import { IButton } from "@/dtos/button";
import styled from "@emotion/styled";

export const ButtonCustom = styled.button<IButton>`
  width: min(
    100%,
    ${(props) => (props.customWidth ? props.customWidth : "32rem")}
  );
  margin-inline: auto;
  border-radius: var(--border-radius);
  border: 0;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--white-color);
  background-color: ${(props) =>
    props.customColor === "primary"
      ? "var(--primary-color)"
      : "var(--secondary-color)"};

  transition: var(--transition-time);

  :hover {
    transform: translateY(-0.2rem);
    box-shadow: 0rem 1rem 1.5rem rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
`;
