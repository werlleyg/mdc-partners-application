import styled from "@emotion/styled";

export const Container = styled.main`
  text-align: center;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Subtitle = styled.p`
  color: var(--subtitle-color);
  width: min(100%, 32rem);
  margin-inline: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export const DivResult = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const P = styled.p`
  margin: 0rem;
  padding: 0rem;

  b {
    background-color: rgba(var(--dark-rgb-color), 0.1);
    padding: 0rem 0.25rem;
    border-radius: 0.2rem;
  }
`;
export const Span = styled.span`
  font-size: 3rem;
  font-weight: 800;
  margin-inline: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
`;

export default Container;
