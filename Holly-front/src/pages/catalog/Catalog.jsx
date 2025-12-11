import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Filtration, Pagination, PostsList } from './components';
import { scrollTop } from '../../shared/utils/scrollTop';
import { acSetCurrentPage } from '../../features/products/productsSlice';
import { ITEMS_PER_PAGE } from '../../shared/config/item-per-page';
import { allProductsSelector } from '../../entities/selectors';
import { fetchProducts } from '../../features/products/products';
import styled from 'styled-components';

const CatalogContainer = ({ className }) => {
  const dispatch = useDispatch();
  const {
    products,
    currentPage,
    filters,
    lastPage,
    totalCount,
    isLoading: isLoadingProducts,
  } = useSelector(allProductsSelector);
  const { seasons, categories, minPrice, maxPrice } = filters;
  const [isOpenFilters, setIsOpenFilters] = useState(true);

  const filtersChangeHandler = useMemo(
    () => ({
      limit: ITEMS_PER_PAGE || 10,
      page: currentPage || 1,
      seasons,
      categories,
      minPrice,
      maxPrice,
    }),
    [currentPage, seasons, categories, minPrice, maxPrice]
  );

  useEffect(() => {
    dispatch(fetchProducts(filtersChangeHandler));
    scrollTop();
    if (window.innerWidth < 500) {
      setIsOpenFilters(false);
    }
  }, [dispatch, filtersChangeHandler]);

  useEffect(() => {
    if (lastPage > 0 && currentPage > lastPage) {
      dispatch(acSetCurrentPage(lastPage));
    }
  }, [currentPage, lastPage, dispatch]);

  const changePage = (page) => {
    dispatch(acSetCurrentPage(page));
    scrollTop();
  };

  return (
    <div className={className}>
      <div className="products-container">
        <div className="filters-container">
          <Filtration
            filters={filters}
            filtersChangeHandler={filtersChangeHandler}
            allProducts={products}
            productsFiltered={products}
            totalCount={totalCount}
            isOpenFilters={isOpenFilters}
            setIsOpenFilters={setIsOpenFilters}
          />
        </div>
        {totalCount === 0 || products.length === 0 ? (
          <div className="nothing">
            <p>Ничего не найдено</p>
          </div>
        ) : (
          <div className="products-catalog">
            <PostsList
              isLoadingProducts={isLoadingProducts}
              products={products}
              setIsOpenFilters={setIsOpenFilters}
            />
          </div>
        )}
      </div>
      <Pagination changePage={changePage} currentPage={currentPage} lastPage={lastPage} />
    </div>
  );
};

export const Catalog = styled(CatalogContainer)`
  & .filters-container {
    position: sticky;
    top: 10px;
  }

  & .products-container {
    display: flex;
    width: 100%;
    max-width: 1300px;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
  }

  & .products-catalog {
    min-width: 1300px;
  }

  & .nothing {
    width: 980px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    margin-top: 50px;
    color: var(--grey-color);
  }

  & .error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 100%;
    min-height: 300px;
    margin: 0 auto;
    padding: 24px;
    text-align: center;
    font-size: clamp(18px, 3vw, 28px);
  }

  & .pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: clamp(32px, 6vw, 80px) 0;
    gap: 12px;

    & button {
      cursor: pointer;
      background: var(--main-color);
      border: none;
      border-radius: 10px;
      padding: 8px 14px;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      transition: all ease 0.3s;

      &.active {
        background: #8a898983;
      }

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }
  }

  & .pagination .disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  @media (max-width: 1300px) {
    & .products-container {
      width: max(500px, 100%);
      gap: 0px;
      margin: 0 auto;
    }
    & .filters-container {
      position: static;
      top: 10px;
    }
    & .products {
      min-width: 70%;
    }
  }

  @media (max-width: 992px) {
    & .products-container {
      gap: 32px;
    }
  }

  @media (max-width: 768px) {
    & .pagination {
      gap: 8px;
    }
  }

  @media (max-width: 576px) {
    margin: 150px 0;
    width: 100%;
    & .products-container {
      width: max(450px, 100%);
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    & .filters-container {
      position: static;
      top: 10px;
    }

    & .nothing {
      width: 100%;
    }
    & .pagination {
      margin: 20px 0;
    }
  }
  @media (max-width: 430px) {
    max-width: 100%;
    & .products-container {
      width: max(430px, 100%);
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    & .products {
      min-width: 430px;
    }
    & .filters-container {
      position: static;
      top: 10px;
    }

    & .nothing {
      width: 100%;
    }
    & .pagination {
      margin: 20px 0;
    }
  }
  @media (max-width: 390px) {
    max-width: 100%;
    & .products-container {
      width: max(390px, 100%);
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    & .filters-container {
      position: static;
      top: 10px;
    }

    & .nothing {
      width: 100%;
    }
    & .pagination {
      margin: 20px 0;
    }
  }
`;
