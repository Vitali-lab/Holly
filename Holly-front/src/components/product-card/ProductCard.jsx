import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useProductLabels } from "../../hooks/use-product-labels";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Loader from "../loader/Loader";
import { Icon } from "../icon/Icon";
import { Sizes } from "../sizes/Sizes";
import { useLocation } from "react-router-dom";
import { useToggleFavorites } from "../../hooks/use-toggle-favorites";
import { SalePrice } from "../sale-price/SalePrice";

const fadeIn = keyframes`
  from {
    transform: translateY(-8px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ProductCardContainer = ({
  className,
  post,
  openSizesId,
  setOpenSizesId,
  activeButton,
  setActiveButton,
}) => {
  const navigate = useNavigate();
  const { getCategoryName } = useProductLabels();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { toggleFavorites, isUserLike } = useToggleFavorites();
  const location = useLocation();

  const onProductClick = (id) => {
    const storage = JSON.parse(sessionStorage.getItem("products")) || [];

    if (post && !storage.find((item) => item.id === id)) {
      storage.push(post);
    }

    sessionStorage.setItem("products", JSON.stringify(storage));
    navigate(`/catalog/${id}`);
  };

  if (!post) {
    return <Loader />;
  }

  const hasSale = post.sale !== null && post.sale !== undefined && post.sale > 0;

  return (
    <div className={className} key={post.id}>
      <motion.article
        key={post.id}
        className="post"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="image-container">
          <button
            type="button"
            className="image-button"
            onClick={() => onProductClick(post.id)}
            aria-label={`Открыть ${post.name}`}
          >
            <img src={post.images[0]} alt={post.name} loading="lazy" />
          </button>

          {hasSale && (
            <span className="sale">−{post.sale}%</span>
          )}

          <button
            type="button"
            className="favorite"
            aria-label={
              isUserLike(post) ? "Убрать из избранного" : "Добавить в избранное"
            }
            onClick={() => toggleFavorites(post)}
          >
            <Icon
              id={isUserLike(post) ? "heart" : "heart-o"}
              color={isUserLike(post) ? "var(--red-color)" : "var(--ink)"}
              size="15"
            />
          </button>

          {currentUser && location.pathname === "/catalog" && (
            <button
              type="button"
              className="add-button"
              onClick={() =>
                setOpenSizesId(openSizesId === post.id ? null : post.id)
              }
            >
              <Icon id="shopping-bag" size="13" color="var(--ink)" />
              <span>В корзину</span>
            </button>
          )}

          {openSizesId === post.id && (
            <div className="sizes-popover" id="sizes-div">
              <Sizes
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                product={post}
                sizesKeys={Object.keys(post.sizes)}
                setOpenSizesId={setOpenSizesId}
              />
            </div>
          )}
        </div>

        <div className="info" onClick={() => onProductClick(post.id)}>
          <p className="category">{getCategoryName(post.categoryId)}</p>
          <h2>{post.name}</h2>
          <SalePrice post={post} size="14" />
        </div>
      </motion.article>
    </div>
  );
};

export const ProductCard = styled(ProductCardContainer)`
  width: 100%;

  & .post {
    display: flex;
    flex-direction: column;
    gap: 14px;
    cursor: pointer;
  }

  & .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background-color: var(--paper-deep);
  }

  & .image-button {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    }
  }

  &:hover .image-button img {
    transform: scale(1.045);
  }

  & .sale {
    position: absolute;
    top: 14px;
    left: 14px;
    padding: 6px 10px;
    background-color: var(--ink);
    color: var(--paper);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
  }

  & .favorite {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: rgba(246, 243, 236, 0.9);
    backdrop-filter: blur(6px);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--paper);
    }
  }

  & .add-button {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border: none;
    background-color: rgba(246, 243, 236, 0.94);
    backdrop-filter: blur(6px);
    color: var(--ink);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    opacity: 0;
    transform: translateY(8px);
    transition:
      opacity 0.25s ease,
      transform 0.25s ease,
      background-color 0.2s ease;

    &:hover {
      background-color: var(--surface);
    }
  }

  &:hover .add-button {
    opacity: 1;
    transform: translateY(0);
  }

  & .sizes-popover {
    position: absolute;
    left: 50%;
    bottom: 56px;
    z-index: 20;
    width: min(300px, 92%);
    padding: 14px;
    transform: translateX(-50%);
    background-color: var(--surface);
    border: 1px solid var(--line);
    box-shadow: var(--box-shadow);
    animation: ${fadeIn} 0.25s ease;
  }

  & .info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  & .category {
    margin: 0;
    color: var(--grey-color);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  & h2 {
    margin: 0;
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: 0;
  }

  @media (hover: none) {
    & .add-button {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 576px) {
    & h2 {
      font-size: 14px;
    }

    & .sale {
      top: 10px;
      left: 10px;
    }

    & .favorite {
      top: 8px;
      right: 8px;
    }
  }
`;
