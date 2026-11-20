import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/button/Button";

const NotFoundContainer = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <p className="eyebrow">Ошибка 404</p>
      <h1>Страница<br />не найдена</h1>
      <p className="text">
        Возможно, вещь уже разобрали или ссылка устарела. Вернитесь в каталог —
        там всё на месте.
      </p>
      <div className="actions">
        <Button width="240px" onClick={() => navigate("/catalog")}>
          В каталог
        </Button>
        <Button width="200px" variant="ghost" onClick={() => navigate("/")}>
          На главную
        </Button>
      </div>
    </div>
  );
};

export const NotFound = styled(NotFoundContainer)`
  width: var(--page-width);
  margin: 0 auto;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;

  & .eyebrow {
    margin: 0;
  }

  & h1 {
    margin: 0;
    font-size: clamp(48px, 8vw, 108px);
    line-height: 1;
  }

  & .text {
    max-width: 420px;
    margin: 0;
    font-size: 14px;
    line-height: 1.7;
    color: var(--grey-color);
  }

  & .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 12px;
  }
`;
