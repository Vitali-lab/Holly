import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProductCard } from '../../../../features/product/components/ProductCard';
import Loader from '../../../../shared/ui/loader/Loader';
import styled from 'styled-components';
import { Icon } from '../../../../shared/ui';

const PostsListContainer = ({ className, products, isLoadingProducts, setIsOpenFilters }) => {
  const [openSizesId, setOpenSizesId] = useState(null);
  const [currentSize, setcurrentSize] = useState('');

  if (isLoadingProducts) {
    return <Loader />;
  }

  return (
    <div className={className}>
      {Array.isArray(products) && (
        <AnimatePresence>
          <div className="open-filters" onClick={() => setIsOpenFilters(true)}>
            <Icon id="filter" size="30"></Icon>
            <p>Открыть фильтры</p>
          </div>
          {products.map((post) => (
            <ProductCard
              key={post.id}
              post={post}
              openSizesId={openSizesId}
              setOpenSizesId={setOpenSizesId}
              currentSize={currentSize}
              setcurrentSize={setcurrentSize}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export const PostsList = styled(PostsListContainer)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 34px;

  padding: 10px 0 0px;

  & .open-filters {
    display: none;
    cursor: pointer;
    position: sticky;
    top: 130px;
    left: 10px;
  }

  & i {
    cursor: pointer;
  }

  & i:active {
    transition: all ease 0.2s;
    transform: scale(0.7);
  }

  & .pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  @media (max-width: 1600px) {
    width: min(1280px, 100%);
    gap: 30px;

    & .filter-card {
      padding: 30px;
    }
  }

  @media (max-width: 1440px) {
    margin: 0 15px;
    & .filter-card {
      padding: 40px;
    }
  }
  @media (max-width: 1300px) {
    width: max(100px, 100%);
    gap: 30px;
    & .filter-card {
      padding: 60px;
    }
  }

  @media (max-width: 992px) {
    & .filter-card {
      padding: 60px;
      margin-left: 80px;
    }
  }
  @media (max-width: 768px) {
    & .filter-card {
      padding: 60px;
      margin-left: 80px;
    }
  }
  @media (max-width: 500px) {
    & .filter-card {
      padding: 60px;
      margin-left: 0px;
    }
  }

  @media (max-width: 430px) {
    margin: 0px auto;
    width: min(430px, 100%);
    justify-content: center;
    gap: 3px;
    & .open-filters {
      display: flex;
      position: absolute;
      top: 130px;
      left: 10px;
    }
  }
`;
