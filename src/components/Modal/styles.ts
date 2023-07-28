import styled from "@emotion/styled";

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: var(--white-color);
  animation: fade-in-animation var(--transition-time);
`;

export const DivHeader = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const ButtonCloseModal = styled.button`
  background-color: var(--transparent);
  border: 0;
  transition: var(--transition-time);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

  color: var(--primary-color);

  :hover {
    transform: rotate(90deg) scale(1.1);
  }
`;
