import { useEffect, useLayoutEffect, useState } from "react";
import { getProduct } from "../../bff/api/get-product";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notifySuccess, notifyError } from "../../func/notification";
import { useToggleFavorites } from "../../hooks/use-toggle-favorites";
import styled, { keyframes } from "styled-components";
import { Button } from "../../components/button/Button";
import { Sizes } from "../../components/sizes/Sizes";
import { addToCart } from "../../bff/api/back-end/add-to-cart";
import { Link, useNavigate } from "react-router-dom";
import { SimilarProducts } from "../../components/similar-products/SimilarProducts";
import { Comments } from "./components/Comments";
import { Rating } from "./components/Rating";
import Loader from "../../components/loader/Loader";
import { RecentlyViewed } from "../../components/recently-viewed/RecentlyViewed";
import { Description } from "./components/Description";
import { useProductLabels } from "../../hooks/use-product-labels";
import { Images } from "./components/Images";
import { SalePrice } from "../../components/sale-price/SalePrice";
import { scrollTop } from "../../utils/scrollTop";

const openAnimation = keyframes`
from {
  opacity: 0;
  transform: translateY(16px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

const ProductContainer = ({ className }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);
  const product = useSelector((state) => state.product?.product);
  const cart = useSelector((state) => state.user.currentUser?.cart);

  const [activeButton, setActiveButton] = useState("");
  const [comment, setComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(null);

  const { toggleFavorites, isUserLike } = useToggleFavorites();
  const { getCategoryName } = useProductLabels();

  useLayoutEffect(() => {
    dispatch(getProduct(params.id));
    scrollTop();
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product?.rating?.users && currentUser?.id) {
      const userRatingObj = product.rating.users.find(
        (user) => user.userId === currentUser.id,
      );
      if (userRatingObj) setUserRating(userRatingObj.userRating);
    }
  }, [product, currentUser]);

  if (!product || Object.keys(product).length === 0) {
    return <Loader />;
  }

  const sizesKeys = Object.keys(product?.sizes || {});

  const addToCard = () => {
    if (!activeButton) {
      notifyError("Выберите размер");
      return;
    }
    if (!currentUser) {
      notifyError("Войдите в аккаунт чтобы добавить в корзину");
      return;
    }
    const exists = cart?.find(
      (item) =>
        item.customId === `${product.id}-${activeButton}` &&
        item.size === activeButton,
    );

    if (!exists) {
      dispatch(
        addToCart(
          currentUser.id,
          product.id,
          `${product.id}-${activeButton}`,
          activeButton,
          1,
          product.sale,
        ),
      );
      setActiveButton("");
      notifySuccess(
        `${product.name} размера ${activeButton} добавлен в корзину`,
        () => navigate("/cart"),
      );
    } else {
      notifyError(`${product.name} размера ${activeButton} уже есть в корзине`);
    }
  };

  return (
    <div className={className}>
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <Link to="/">Главная</Link>
        <span>/</span>
        <Link to="/catalog">Каталог</Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </nav>

      <div className="product-main">
        <div className="images">
          <Images product={product} />
        </div>

        <div className="information">
          <p className="category">{getCategoryName(product.categoryId)}</p>
          <h1>{product.name}</h1>

          <SalePrice post={product} size="24" />

          <div className="divider" />

          <div className="sizes-block">
            <div className="sizes-head">
              <span>Размер</span>
              <span className="sizes-hint">
                {activeButton ? `Выбран ${activeButton}` : "Выберите размер"}
              </span>
            </div>
            <Sizes
              sizesKeys={sizesKeys}
              product={product}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          </div>

          <div className="actions">
            <Button disabled={!activeButton} onClick={addToCard}>
              {activeButton ? "Добавить в корзину" : "Выберите размер"}
            </Button>
            <Button variant="ghost" onClick={() => toggleFavorites(product)}>
              {isUserLike(product)
                ? "Убрать из избранного"
                : "Добавить в избранное"}
            </Button>
          </div>

          <ul className="perks">
            <li>Доставка по Минску за 1–2 дня</li>
            <li>Возврат и обмен в течение 14 дней</li>
            <li>Оплата картой или при получении</li>
          </ul>

          {currentUser && (
            <Rating
              userRating={userRating}
              setUserRating={setUserRating}
              hover={hover}
              setHover={setHover}
              product={product}
              currentUser={currentUser}
              comment={comment}
              setComment={setComment}
            />
          )}
        </div>
      </div>

      <div className="product-extra">
        <Description product={product} />
        <Comments product={product} />
      </div>

      <SimilarProducts product={product} />
      <RecentlyViewed />
    </div>
  );
};

export const Product = styled(ProductContainer)`
  width: var(--page-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  animation: ${openAnimation} ease 0.6s;

  & > * + * {
    margin-top: clamp(48px, 6vw, 88px);
  }

  & > .breadcrumbs + .product-main {
    margin-top: clamp(20px, 2.5vw, 32px);
  }

  & .breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-bottom: clamp(24px, 3vw, 40px);
    color: var(--grey-color);
    font-size: 11px;
    letter-spacing: 0.04em;

    & a {
      color: var(--grey-color);
      text-decoration: none;

      &:hover {
        color: var(--ink);
      }
    }

    & .current {
      color: var(--ink);
    }
  }

  & .product-main {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(32px, 5vw, 80px);
    align-items: start;
  }

  & .information {
    position: sticky;
    top: calc(var(--header-offset) + 24px);
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-top: 8px;
  }

  & .category {
    margin: 0;
    color: var(--grey-color);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  & h1 {
    margin: 0;
    font-size: clamp(30px, 3.4vw, 48px);
    line-height: 1.08;
  }

  & .divider {
    height: 1px;
    background-color: var(--line);
    margin: 4px 0;
  }

  & .sizes-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;

    & .sizes-hint {
      color: var(--grey-color);
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: none;
    }
  }

  & .actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 6px;
  }

  & .perks {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 6px 0 0;
    padding: 18px 0 0;
    border-top: 1px solid var(--line);
    list-style: none;

    & li {
      position: relative;
      padding-left: 18px;
      color: var(--ink-soft);
      font-size: 12px;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 8px;
        width: 5px;
        height: 5px;
        background-color: var(--ink);
        border-radius: 50%;
      }
    }
  }

  & .product-extra {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(32px, 5vw, 80px);
    padding-top: clamp(32px, 4vw, 48px);
    border-top: 1px solid var(--line-strong);
  }

  @media (max-width: 992px) {
    & .product-main,
    & .product-extra {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    & .information {
      position: static;
    }
  }
`;
