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

export const DivDeck = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0 auto;
  width: min(100%, 40rem);
  align-items: center;
  justify-content: center;
`;

export const DivResultCard = styled.div`
  background-color: var(--white-color);
  min-width: 7rem;
  color: var(--primary-color);
  text-align: center;
  padding: 1.25rem;
  font-weight: 600;
  box-shadow: 0rem 0.5rem 2.5rem rgba(var(--dark-rgb-color), 0.1);

  animation: floatingAnimation var(--transition-time) forwards;

  @keyframes floatingAnimation {
    0% {
      opacity: 0;
      transform: translateY(20%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

export default Container;
