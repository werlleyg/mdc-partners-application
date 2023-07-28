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

export const SpanDivider = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: var(--subtitle-color);
`;

interface IDivResult {
  showContent?: boolean;
}

export const DivResult = styled.div<IDivResult>`
  overflow: hidden;
  max-height: ${(props) => (props.showContent ? "auto" : "0rem")};
  padding: ${(props) => (props.showContent ? "1rem 0rem" : "0rem")};

  transition: height ease-in-out 3s;
  b {
    background-color: rgba(var(--dark-rgb-color), 0.1);
    padding: 0rem 0.25rem;
    border-radius: 0.2rem;
  }
  span {
    font-size: 2rem;
    font-weight: 600;
  }
  .span__is-prime {
    color: var(--success-color);
  }
  .span__not-prime {
    color: var(--error-color);
  }
`;

export const DivDeck = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(5, minmax(3.75rem, 1fr));
  gap: 1rem;
  margin: 0 auto;
`;

export const DivNumber = styled.div`
  aspect-ratio: 1/1;
  background-color: var(--white-color);
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
