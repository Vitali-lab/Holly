import { ProductsSlider } from '../slider/Slider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const RecentlyViewedContainer = ({ className }) => {
  let views = [];

  if (sessionStorage.getItem('products')) {
    views = JSON.parse(sessionStorage.getItem('products'));
  }

  return (
    <div className={className}>
      <h1>Недавно просмотренные</h1>
      <div className={views.length > 5 ? 'products-slide' : 'products'}>
        {views.length === 0 && <div className="nothing">Вы ничего не просматривали</div>}
        <ProductsSlider key={views.id} products={views} />
      </div>
    </div>
  );
};

export const RecentlyViewed = styled(RecentlyViewedContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  padding: 0 10px;
  background-color: var(--white-color);
  margin: 50px 0 50px 0;

  & h1 {
    text-align: center;
    font-size: 40px;
  }

  & .nothing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    margin-top: 50px;
    width: 100%;
  }

  & .products-slide {
    width: 100%;
    margin: 20px 0 0 0;
  }

  @media (max-width: 500px) {
    padding: 0;
    h2 {
      font-size: 20px;
    }
    & .slide {
      width: 100%;
      max-width: 400px;
    }
    & .slide img {
      height: 300px;
    }
  }
  @media (max-width: 400px) {
    width: min(390px, 100%);
    & .slide {
      width: 100%;
      max-width: 390px;
    }
    & .slide img {
      height: 200px;
    }
  }
`;
