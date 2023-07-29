import styled from "@emotion/styled";

export const Container = styled.footer`
  width: min(100% - 2rem, var(--max-width));
  margin-inline: auto;
  padding: 1rem 0;
`;
export const P = styled.p`
  color: var(--subtitle-color);
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;

  a {
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 0.125rem;
  }
`;
