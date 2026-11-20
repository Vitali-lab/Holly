import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProductCard } from "../../components/product-card/ProductCard";
import { Button } from "../../components/button/Button";
import { Icon } from "../../components/icon/Icon";
import { useEffect } from "react";
import { scrollTop } from "../../utils/scrollTop";
import { productsSelector, userSelector } from "../../selectors";
import { pluralize } from "../../utils/pluralize";

const FavoritesContainer = ({ className }) => {
  const currentUser = useSelector(userSelector);
  const products = useSelector(productsSelector);
  const navigate = useNavigate();

  useEffect(() => {
    scrollTop();
  }, []);

  if (!currentUser) {
    return (
      <div className={className}>
        <header className="favorites-header">
          <p className="eyebrow">Личное</p>
          <h1>Избранное</h1>
        </header>
        <div className="empty">
          <span className="empty-icon">
            <Icon id="heart-o" size="28" color="currentColor" />
          </span>
          <p>Войдите в аккаунт, чтобы сохранять понравившиеся вещи.</p>
          <Button width="280px" onClick={() => navigate("/catalog")}>
            Перейти в каталог
          </Button>
        </div>
      </div>
    );
  }

  const userFavorites = products.filter((product) => {
    return currentUser.favorites.find((fav) => fav.id === product.id);
  });

  return (
    <div className={className}>
      <header className="favorites-header">
        <div>
          <p className="eyebrow">Личное</p>
          <h1>Избранное</h1>
        </div>
        <div className="header-meta">
          <span className="count">
            {userFavorites.length}{" "}
            {pluralize(userFavorites.length, ["вещь", "вещи", "вещей"])}
          </span>
          <button type="button" onClick={() => navigate("/catalog")}>
            Продолжить покупки
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </header>

      {userFavorites.length > 0 ? (
        <div className="favorites">
          {userFavorites.map((post) => (
            <ProductCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <span className="empty-icon">
            <Icon id="heart-o" size="28" color="currentColor" />
          </span>
          <p>Пока здесь пусто. Отмечайте вещи сердечком — они появятся тут.</p>
          <Button width="280px" onClick={() => navigate("/catalog")}>
            Смотреть каталог
          </Button>
        </div>
      )}
    </div>
  );
};

export const Favorites = styled(FavoritesContainer)`
  width: var(--page-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 3vw, 40px);

  & .favorites-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin-bottom: 14px;
    }

    & h1 {
      margin: 0;
      font-size: clamp(38px, 4.6vw, 62px);
      line-height: 1;
    }
  }

  & .header-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;

    & .count {
      color: var(--grey-color);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    & button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 0 0 4px;
      border: none;
      border-bottom: 1px solid var(--ink);
      background: none;
      color: var(--ink);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      transition: gap 0.2s ease;

      &:hover {
        gap: 14px;
      }
    }
  }

  & .favorites {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(24px, 3vw, 44px) clamp(16px, 2.2vw, 32px);
  }

  & .empty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    padding: clamp(32px, 5vw, 64px);
    background-color: var(--paper-deep);
  }

  & .empty-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border: 1px solid var(--line-strong);
    border-radius: 50%;
    color: var(--ink);
  }

  & .empty p {
    max-width: 420px;
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(20px, 2.6vw, 30px);
    line-height: 1.25;
    color: var(--ink);
  }

  @media (max-width: 992px) {
    & .favorites {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 576px) {
    & .favorites-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    & .header-meta {
      align-items: flex-start;
    }

    & .favorites {
      gap: 28px 14px;
    }
  }
`;
