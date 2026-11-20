import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../bff/api/back-end/add-to-cart";
import { notifyError, notifySuccess } from "../../func/notification";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SizesContainer = ({
  className,
  sizesKeys,
  product,
  activeButton,
  setActiveButton,
  setOpenSizesId,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.user.currentUser?.cart);
  const navigate = useNavigate();

  const onSubmit = (size) => {
    setActiveButton(size);
    if (location.pathname === "/catalog" && currentUser) {
      if (!currentUser) {
        notifyError("Войдите в аккаунт чтобы добавить в корзину");
        return;
      }
      const selectedSize = size;
      const customId = `${product.id}-${selectedSize}`;
      const isInCart = cart.find(
        (item) => item.customId === customId && item.size === selectedSize,
      );

      if (!isInCart) {
        dispatch(
          addToCart(
            currentUser.id,
            product.id,
            customId,
            selectedSize,
            1,
            product.sale,
          ),
        );
        notifySuccess(
          `${product.name} размера ${selectedSize} добавлен в корзину`,
          () => {
            navigate("/cart");
          },
        );
        setOpenSizesId(null);
        setActiveButton(null);
      } else {
        notifyError(
          `${product.name} размера ${selectedSize} уже есть в корзине`,
          () => {
            navigate("/cart");
          },
        );
        setOpenSizesId(null);
      }
    }
  };

  if (location.pathname === "/catalog" && currentUser) {
    return (
      <div className={className}>
        {sizesKeys.length < 0 ? (
          <p>Нет в наличии</p>
        ) : (
          sizesKeys.map((size, index) => {
            if (product.sizes[size] !== 0)
              return (
                <button
                  className={activeButton === size ? "active" : "not-active"}
                  onClick={() => {
                    onSubmit(size);
                  }}
                  key={index}
                >
                  {size}
                </button>
              );
          })
        )}
      </div>
    );
  } else {
    return (
      <div className={className}>
        {sizesKeys.length < 0 ? (
          <p>Нет в наличии</p>
        ) : (
          sizesKeys.map((size, index) => {
            if (product.sizes[size] !== 0)
              return (
                <button
                  className={
                    activeButton === size
                      ? "active-in-product"
                      : "not-active-in-product"
                  }
                  onClick={() => {
                    onSubmit(size);
                  }}
                  key={index}
                >
                  {size}
                </button>
              );
          })
        )}
      </div>
    );
  }
};

export const Sizes = styled(SizesContainer)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  & button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    border: 1px solid var(--line-strong);
    background-color: transparent;
    color: var(--ink);
    font-family: var(--font-body);
    font-size: 12px;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      border-color: var(--ink);
    }
  }

  & .active-in-product {
    width: 52px;
    height: 48px;
    border-color: var(--ink);
    background-color: var(--ink);
    color: var(--paper);
  }

  & .not-active-in-product {
    width: 52px;
    height: 48px;
  }

  & .active {
    width: 34px;
    height: 34px;
    border-color: var(--ink);
    background-color: var(--ink);
    color: var(--paper);
  }

  & .not-active {
    width: 34px;
    height: 34px;
  }
`;
