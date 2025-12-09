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
    left: -60px;
  }

  & .slick-next {
    right: -60px;
  }

  & .slick-slider {
    width: 100%;
  }

  & .slick-list {
    overflow: hidden;
    margin: 0 auto;
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
    padding: 0 10px;
    box-sizing: border-box;
  }

  & .products-slider {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    margin: 20px 0;
  }

  & .slide {
    margin: 0 auto;
    max-width: 300px;
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

  @media (max-width: 1200px) {
    & .slick-slider {
      width: 100%;
      max-width: 1000px;
    }
  }

  @media (max-width: 992px) {
    & .slick-slider {
      width: 100%;
      max-width: 800px;
    }
  }

  @media (max-width: 768px) {
    & .slick-slider {
      width: 100%;
      max-width: 600px;
    }
  }

  @media (max-width: 576px) {
    width: max(300px, 100%);
    & .slick-slider {
      width: 100%;
      max-width: 300px;
      margin-bottom: 50px;
    }
  }
`;
