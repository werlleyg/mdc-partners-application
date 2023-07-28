import styled from "@emotion/styled";

export const Container = styled.header`
  width: min(100% - 2rem, var(--max-width));
  margin-inline: auto;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 1rem 0;
`;

export const ButtonReturn = styled.div`
  width: auto;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    border-radius: var(--border-radius);
    border: 0;
    padding: 0.5rem 1.25rem 0.5rem 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--secondary-color);
    border: 1px solid var(--secondary-color);
    transition: var(--transition-time);
    :hover {
      color: var(--white-color);
      background-color: var(--secondary-color);
    }
  }
`;
