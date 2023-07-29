import styled from "@emotion/styled";

export const Container = styled.main`
  text-align: center;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100%;
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

interface IDivResult {
  showContent?: boolean;
}

export const DivResult = styled.div<IDivResult>`
  overflow-y: hidden;
  max-height: ${(props) => (props.showContent ? "auto" : "0rem")};
  padding: ${(props) => (props.showContent ? "1rem 0rem" : "0rem")};
  word-wrap: break-word;

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
