import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../features/user/user';
import { notifyError, notifySuccess } from '../../lib/notification';
import { currentUserSelector } from '../../../entities/selectors';
import styled from 'styled-components';

const SizesContainer = ({
  className,
  sizesKeys,
  product,
  currentSize,
  setcurrentSize,
  setOpenSizesId,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const cart = currentUser?.cart || [];
  const navigate = useNavigate();

  const onSubmit = (size) => {
    setcurrentSize(size);
    if (location.pathname === '/catalog' && currentUser) {
      if (!currentUser) {
        notifyError('Войдите в аккаунт чтобы добавить в корзину');
        return;
      }
      const selectedSize = size;
      const customId = `${product.id}-${selectedSize}`;
      const isInCart = cart.find(
        (item) => item.customId === customId && item.size === selectedSize
      );

      if (!isInCart) {
        const cartItem = {
          productId: product.id,
          customId,
          size: selectedSize,
          count: 1,
          sale: product.sale,
        };
        dispatch(addToCart({ cartItem, userId: currentUser.id }));
        notifySuccess(`${product.name} размера ${selectedSize} добавлен в корзину`, () => {
          navigate('/cart');
        });
        setOpenSizesId(null);
        setcurrentSize(null);
      } else {
        notifyError(`${product.name} размера ${selectedSize} уже есть в корзине`, () => {
          navigate('/cart');
        });
        setOpenSizesId(null);
      }
    }
  };

  if (location.pathname === '/catalog' && currentUser) {
    return (
      <div className={className}>
        {sizesKeys.length < 0 ? (
          <p>Нет в наличии</p>
        ) : (
          sizesKeys.map((size, index) => {
            if (product.sizes[size] !== 0)
              return (
                <button
                  className={currentSize === size ? 'active' : 'not-active'}
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
                  className={currentSize === size ? 'active-in-product' : 'not-active-in-product'}
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
  flex-direction: row;
  justify-content: start;
  align-items: center;

  gap: 10px;

  & .active-in-product {
    width: 50px;
    height: 50px;
    border-radius: 0px;
    border: 1px solid #000000ff;
    background-color: var(--main-color);
    color: var(--text-color);
    font-size: 15px;
    cursor: pointer;
    transition: all ease 0.5s;
  }

  & .not-active-in-product {
    width: 50px;
    height: 50px;
    border-radius: 0px;
    border: 1px solid #000000ff;
    background-color: transparent;
    color: #0f0f0fff;
    font-size: 15px;
    cursor: pointer;
    transition: all ease 0.5s;
    &:hover {
      transition: all ease 0.5s;
      background-color: var(--main-color);
      color: var(--text-color);
    }
  }

  & .active {
    width: 30px;
    height: 30px;
    border-radius: 0px;
    border: 1px solid #000000ff;
    background-color: var(--main-color);
    color: var(--text-color);
    font-size: 15px;
    cursor: pointer;
    transition: all ease 0.5s;
  }

  & .not-active {
    width: 30px;
    height: 30px;
    border-radius: 0px;
    border: 1px solid #000000ff;
    background-color: transparent;
    color: #0f0f0fff;
    font-size: 15px;
    cursor: pointer;
    transition: all ease 0.5s;
    &:hover {
      transition: all ease 0.5s;
      background-color: var(--main-color);
      color: var(--text-color);
    }
  }
`;
