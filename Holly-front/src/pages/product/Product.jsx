import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { notifySuccess, notifyError } from '../../shared/lib/notification';
import { Button, Sizes, Price, RecentlyViewed, SimilarProducts } from '../../shared/ui';
import { Rating, Comments, Description, Images } from './components';
import { useToggleFavorites } from '../../shared/hooks/use-toggle-favorites';
import { addToCart } from '../../features/user/user';
import { useProductLabels } from '../../shared/hooks/use-product-labels';
import { scrollTop } from '../../shared/utils/scrollTop';
import { fetchProduct } from '../../features/products/products';
import Loader from '../../shared/ui/loader/Loader';
import styled, { keyframes } from 'styled-components';

const openAnimation = keyframes`
from{
    
    opacity: 0;
    transform: translateY(-30px);
}
to{
    opacity: 1;
    transform: translateY(0px);
}
`;

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
  margin: 30px 0 0 0;
  animation: ${openAnimation} 0.5s ease;
`;

const AboutCurrentSizeDiv = styled.div`
  font-size: 10px;
  margin: 0px;
  width: 100%;
  animation: ${openAnimation} 0.5s ease;
  & p {
    font-size: 15px;
    margin: 20px 0 0 0px;
  }
`;

const ProductContainer = ({ className }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);
  const product = useSelector((state) => state.product?.product);
  const cart = useSelector((state) => state.user.currentUser?.cart);

  const [currentSize, setcurrentSize] = useState('');
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(null);

  const { toggleFavorites, isUserLike } = useToggleFavorites();
  const { getCategoryName } = useProductLabels();

  useEffect(() => {
    dispatch(fetchProduct(params.id));
    scrollTop();
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product?.rating?.users && currentUser?.id) {
      const userRatingObj = product.rating.users.find((user) => user.userId === currentUser.id);
      if (userRatingObj) setUserRating(userRatingObj.userRating);
    }
  }, [product, currentUser]);

  if (!product || Object.keys(product).length === 0) {
    return <Loader />;
  }

  const sizesKeys = Object.keys(product?.sizes || {});

  const addCartItem = () => {
    if (!currentSize) {
      notifyError('Выберите размер');
      return;
    }
    if (!currentUser) {
      notifyError('Войдите в аккаунт чтобы добавить в корзину');
      return;
    }
    const exists = cart?.find(
      (item) => item.customId === `${product.id}-${currentSize}` && item.size === currentSize
    );

    const cartItem = {
      productId: product.id,
      customId: `${product.id}-${currentSize}`,
      size: currentSize,
      count: 1,
      sale: product.sale,
    };

    if (!exists) {
      dispatch(addToCart({ cartItem, userId: currentUser.id }));
      setcurrentSize('');
      notifySuccess(`${product.name} размера ${currentSize} добавлен в корзину`, () =>
        navigate('/cart')
      );
    } else {
      notifyError(`${product.name} размера ${currentSize} уже есть в корзине`);
    }
  };

  return (
    <div className={className}>
      <div className="product-main">
        <div className="images">
          <Images product={product} />
        </div>
        <div className="information">
          <h1>{product.name}</h1>
          <div className="header-rating">
            <p>{getCategoryName(product.categoryId)}</p>
          </div>
          <div>
            <Price post={product} size={'24'} />
          </div>

          <Sizes
            sizesKeys={sizesKeys}
            product={product}
            currentSize={currentSize}
            setcurrentSize={setcurrentSize}
          />

          {currentSize && (
            <AboutCurrentSizeDiv>
              <p>Выбран размер: {currentSize}</p>
            </AboutCurrentSizeDiv>
          )}

          <ButtonsDiv>
            <Button disabled={!currentSize} width="350px" onClick={addCartItem}>
              {currentSize
                ? `Добавить в корзину: ${product.name} размер: ${currentSize}`
                : 'Выберите размер'}
            </Button>
            <Button width="350px" onClick={() => toggleFavorites(product)}>
              {isUserLike(product) ? 'Убрать из избранного' : 'Добавить в избранное'}
            </Button>
          </ButtonsDiv>

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

      <Description product={product} />
      <Comments product={product} />
      <SimilarProducts product={product} />
      <RecentlyViewed />
    </div>
  );
};

export const Product = styled(ProductContainer)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${openAnimation} ease 0.7s;

  .product-main {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    gap: 80px;
    align-items: flex-start;
  }

  .images {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .information {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 40px 0 0 0;
    & h1 {
      font-size: 30px;
      font-weight: bold;
      margin: 0;
    }

    & h4 {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
    p {
      font-size: 16px;
      margin: 0;
      color: var(--grey-color);
    }
  }

  .price {
    font-size: 20px;
    font-weight: bold;
  }

  @media (max-width: 1024px) {
    .product-main {
      flex-direction: column;
      align-items: center;
    }
    .images,
    .information {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    .product-main {
      flex-direction: column;
      align-items: center;
    }
    .images,
    .information {
      width: 100%;
    }
  }

  @media (max-width: 430px) {
    margin: 60px auto;
    .product-main {
      width: min(430px, 100%);
      margin: 0 auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }
    & .information {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .images,
    .information {
      width: 100%;
    }
  }
`;
