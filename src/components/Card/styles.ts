import styled from "@emotion/styled";

export const ButtonCard = styled.div`
  width: min(100%, 16rem);
  aspect-ratio: 1/1;
  display: flex;
  color: var(--primary-color);
  background-color: var(--white-color);
  box-shadow: 0rem 0.5rem 2.5rem rgba(0, 0, 0, 0.1);
  border: 0;
  transition: ease-in-out var(--transition-time);

  a {
    flex: 1;

    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    .icon__custom {
      font-size: 3rem;
    }
  }

  :hover {
    transform: translateY(-0.2rem);
    box-shadow: 0rem 1rem 1.5rem rgba(0, 0, 0, 0.1);
    background-color: var(--primary-color);
    color: var(--white-color);
  }
`;
