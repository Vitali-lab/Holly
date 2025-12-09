import styled from 'styled-components';

const NotFoundContainer = ({ className }) => {
  return (
    <div className={className}>
      <h1>404</h1>
      <p>Упс... Кажется, такой страницы нет :(</p>
    </div>
  );
};

export const NotFound = styled(NotFoundContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100vh;
  color: var(--main-color);
  & h1 {
    font-size: 9rem;
    margin-bottom: 0px;
  }
  & p {
    font-size: 2rem;
    color: var(--grey-color);
  }
`;
