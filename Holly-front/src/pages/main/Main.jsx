import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RecentlyViewed } from '../../shared/ui';
import { fetchAllProducts, fetchProducts } from '../../features/products/products';
import { AnimateMainWidget, MainWidget, CollectionWidget, ProductsWiget } from './components';
import { scrollTop } from '../../shared/utils/scrollTop';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ limit: 200, page: 1 }));
    dispatch(fetchAllProducts());
    scrollTop();
  }, [dispatch]);

  return (
    <div className={className}>
      <AnimateMainWidget />
      <div className="main-collections">
        <h1>Коллекции</h1>
        <CollectionWidget />
      </div>
      <MainWidget
        link={'https://images.pexels.com/photos/20763536/pexels-photo-20763536.jpeg'}
        bigText={'Зимняя сказка начинается здесь!'}
        smallText={
          'Только сейчас — грандиозная зимняя распродажа Holly.  Теплые пуховики, уютные свитшоты и элегантные платья — со скидками до 50%. '
        }
      />
      <div>
        <h1>Популярные товары</h1>
        <ProductsWiget />
      </div>
      <RecentlyViewed />
    </div>
  );
};

export const Main = styled(MainContainer)`
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 0 auto;

  & h1 {
    text-align: center;
    font-size: 40px;
  }

  & .main-collections {
    margin: 50px 0;
  }

  & .presentation {
    margin-top: 60px;
    position: relative;
    width: 100%;
    height: 200px;
    background-color: transparent;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24) inset;
    & img {
      width: 100%;
      height: 900px;
      border-radius: 30px;
    }
    & h2 {
      position: absolute;
      bottom: 40px;
      left: 50px;
      font-size: 90px;
      color: white;
      text-shadow: 0px 1px 10px rgba(0, 0, 0, 0.6);
    }
  }

  & .bolck {
    width: 100%;
    height: 700px;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
  }
  & .new-producrs {
    position: relative;
    width: 58%;
    height: 600px;
    background-color: transparent;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24) inset;
    & h2 {
      position: absolute;
      bottom: 10px;
      left: 50px;
      font-size: 40px;
    }
    & img {
      width: 100%;
      height: 600px;
      border-radius: 30px;
      object-fit: cover;
    }
  }

  @media (max-width: 1800px) {
    & .new-producrs {
      width: 100%;
    }
    & .collections {
      width: 100%;
      height: 400px;
    }
  }
  @media (max-width: 1300px) {
    & .new-producrs {
      width: 90%;
    }
    & .collections {
      flex-direction: row;
      width: 100%;
      height: 400px;
    }
  }
  @media (max-width: 430px) {
    margin: 100px 0;

    & .new-producrs {
      width: 90%;
    }
    & .collections {
      width: 90%;
      height: 500px;
    }
  }
`;
