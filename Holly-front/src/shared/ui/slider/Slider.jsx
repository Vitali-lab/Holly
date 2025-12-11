import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ProductCard } from '../../../features/product/components/ProductCard';
import Loader from '../loader/Loader';
import Slider from 'react-slick';
import styled from 'styled-components';

const ProductsSliderContainer = ({ className, products }) => {
  if (!products) {
    return <Loader />;
  }

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 1000,
    cssEase: 'ease',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className={className}>
      {products.length >= 4 ? (
        <Slider {...settings}>
          {products.map((post) => (
            <ProductCard key={post.id} post={post} />
          ))}
        </Slider>
      ) : (
        <div className="products-slider">
          {products.map((post) => (
            <ProductCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export const ProductsSlider = styled(ProductsSliderContainer)`
  width: 100%;
  max-width: 1450px;
  margin: 0 auto;
  padding: 0 clamp(12px, 4vw, 32px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & .info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  & .slick-prev {
    left: clamp(-40px, -4vw, -20px);
  }

  & .slick-next {
    right: clamp(-40px, -4vw, -20px);
  }

  & .slick-slider {
    width: 100%;
    max-width: 100%;
  }

  & .slick-list {
    overflow: hidden;
    margin: 0 auto;
    padding: 0 4px;
  }

  & .slick-prev:before,
  & .slick-next:before {
    color: #000;
    font-size: 40px;
  }

  & .products-slide {
    max-width: 1450px;
    margin: 20px 0;
  }

  & .slick-slide {
    width: 100px;
    display: flex;
    justify-content: center;
    padding: 0 10px;
    box-sizing: border-box;
  }

  & .products-slider {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    margin: 20px 0;
    width: 100%;
  }

  & .slide {
    margin: 0 auto;
    width: min(320px, 100%);
    max-width: 100%;
    padding: 8px;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;
    transition: transform 0.3s ease;

    & p {
      margin: 10px 0 0 0;
    }
  }

  & .slide img {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    & .slick-slider {
      width: 100%;
      max-width: 100%;
    }

    & .slick-prev,
    & .slick-next {
      display: none;
    }
  }

  @media (max-width: 576px) {
    width: 100%;
    padding: 0 10px;
    & .slick-slider {
      width: 100%;
      max-width: 100%;
      margin-bottom: 40px;
    }

    & .slick-list {
      padding: 0;
    }

    & .products-slider {
      gap: 12px;
    }
  }
`;
