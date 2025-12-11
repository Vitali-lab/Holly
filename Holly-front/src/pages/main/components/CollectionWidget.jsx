import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { seasonsSelector, allProductsSelector } from '../../../entities/selectors';
import { acSetFilterSeason } from '../../../features/products/productsSlice';
import { COLLECTION } from '../../../shared/config/appInfo';
import Loader from '../../../shared/ui/loader/Loader';
import styled from 'styled-components';

const CollectionWidgetContainer = ({ className }) => {
  const { allProducts, isLoading: allProductsIsLoading } = useSelector(allProductsSelector);
  const { seasons, isLoading: seasonsIsLoading } = useSelector(seasonsSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const totalPages = 1;
  const winterSeason = seasons?.find((s) => s.name === 'Зима');
  const summerSeason = seasons?.find((s) => s.name === 'Лето');
  const autumnSeason = seasons?.find((s) => s.name === 'Осень');
  const springSeason = seasons?.find((s) => s.name === 'Весна');

  const { winter, summer, autumn, spring } = COLLECTION(
    allProducts,
    winterSeason,
    summerSeason,
    autumnSeason,
    springSeason
  );

  const widgetVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages]);

  if (allProductsIsLoading || seasonsIsLoading) {
    return <Loader />;
  }
  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={widgetVariants}
          className="collections"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => {
            navigate(`/catalog`);
            dispatch(acSetFilterSeason(autumnSeason.id));
          }}
        >
          <img src={autumn.products[page].images[0]} />
          <h2>{autumn.name}</h2>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={widgetVariants}
          className="collections"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => {
            navigate(`/catalog`);
            dispatch(acSetFilterSeason(summerSeason.id));
          }}
        >
          <img src={summer?.products[page].images[0]} />
          <h2>{summer.name}</h2>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={widgetVariants}
          className="collections"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => {
            navigate(`/catalog`);
            dispatch(acSetFilterSeason(winterSeason.id));
          }}
        >
          <img src={winter.products[page].images[0]} />
          <h2>{winter.name}</h2>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={widgetVariants}
          className="collections"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => {
            navigate(`/catalog`);
            dispatch(acSetFilterSeason(springSeason.id));
          }}
        >
          <img src={spring.products[page].images[0]} />
          <h2>{spring.name}</h2>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const CollectionWidget = styled(CollectionWidgetContainer)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  & .collections {
    cursor: pointer;
    position: relative;
    width: 280px;
    height: 400px;
    background-color: transparent;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24) inset;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
    & h2 {
      position: absolute;
      bottom: 10px;
      left: 50px;
      font-size: 60px;
      color: white;
      text-shadow: 0px 1px 10px rgba(0, 0, 0, 0.6);
    }
    & img {
      width: 100%;
      height: 100%;
      border-radius: 30px;
      object-fit: cover;
    }
  }

  @media (max-width: 500px) {
    flex-wrap: wrap;
    & .collections {
      width: 250px;
      height: 400px;
    }
  }
`;
