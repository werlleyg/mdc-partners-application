import styled from "@emotion/styled";

export const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.25rem;

  div {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--secondary-color);
    margin: 0rem 0.3125rem;
    opacity: 0;
    animation: scaleInOutAnimation 1.5s infinite;
  }

  div:nth-of-type(2) {
    animation-delay: 0.5s;
  }
  div:nth-of-type(3) {
    animation-delay: 1s;
  }

  @keyframes scaleInOutAnimation {
    0%,
    100% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.5);
    }
  }
`;
