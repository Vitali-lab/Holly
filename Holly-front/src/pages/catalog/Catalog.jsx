import { useEffect, useMemo, useState } from 'react';
import { PostsList } from './components/posts-list/PostsList';
import { useSelector } from 'react-redux';
import { Filtration } from './components/filtration/Filtration';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getProducts } from '../../bff/api/back-end/get-products';
import { scrollTop } from '../../utils/scrollTop';
import { setCurrentPage } from '../../actions/set-current-page';
import { ITEMS_PER_PAGE } from '../../constants/item-per-page';
import { Icon } from '../../components';
import { allProductsSelector } from '../../selectors/all-products-selector';
import { pluralize } from '../../utils/pluralize';

const CatalogContainer = ({ className }) => {
  const dispatch = useDispatch();
  const { products, currentPage, filters } = useSelector(allProductsSelector);
  const { seasons, categories, minPrice, maxPrice } = filters;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        await dispatch(getProducts());
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
    scrollTop();
  }, [seasons, categories, minPrice, maxPrice, dispatch]);

  const productsFiltered = useMemo(() => {
    const selectedSeasons = filters.seasons || [];
    const selectedCategories = filters.categories || [];
    const minPrice = filters.minPrice ? Number(filters.minPrice) : null;
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;

    return products.filter((product) => {
      const seasonOk =
        selectedSeasons.length === 0 || selectedSeasons.includes(String(product.seasonId));
      const categoryOk =
        selectedCategories.length === 0 || selectedCategories.includes(String(product.categoryId));
      const minOk = minPrice === null || product.price >= minPrice;
      const maxOk = maxPrice === null || product.price <= maxPrice;

      return seasonOk && categoryOk && minOk && maxOk;
    });
  }, [products, filters]);

  const totalPages = Math.max(1, Math.ceil(productsFiltered.length / ITEMS_PER_PAGE()));

  useEffect(() => {
    if (currentPage > totalPages) {
      dispatch(setCurrentPage(totalPages));
    }
  }, [currentPage, totalPages, dispatch]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE();
  const currentProducts = productsFiltered.slice(startIndex, startIndex + ITEMS_PER_PAGE());

  const changePage = (page) => {
    scrollTop();
    dispatch(setCurrentPage(page));
  };

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className={className}>
      <header className="catalog-header">
        <div className="catalog-heading">
          <p className="eyebrow">Каталог · Holly Garment</p>
          <h1>Все вещи</h1>
        </div>
        <p className="catalog-note">
          Спокойная база и вещи с характером. Фильтруйте по сезону, категории и
          цене — мы покажем только то, что есть в наличии.
        </p>
      </header>

      <div className="products-container">
        <Filtration filters={filters} allProducts={products} productsFiltered={productsFiltered} />

        <div className="products-main">
          <div className="products-meta">
            <span>
              {productsFiltered.length}{' '}
              {pluralize(productsFiltered.length, ['вещь', 'вещи', 'вещей'])}
            </span>
            <span>
              Страница {currentPage} из {totalPages}
            </span>
          </div>

          {isLoading && products.length === 0 ? (
            <div className="skeleton-list">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="skeleton-card" key={index} />
              ))}
            </div>
          ) : currentProducts.length > 0 ? (
            <PostsList products={currentProducts} />
          ) : (
            <div className="error">
              <h3>Ничего не нашлось</h3>
              <p>Попробуйте изменить фильтры или сбросить их.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                type="button"
                className="pagination-arrow"
                disabled={!canGoPrev}
                aria-label="Предыдущая страница"
                onClick={() => canGoPrev && changePage(currentPage - 1)}
              >
                <Icon id="angle-left" size="16" color="var(--ink)" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={currentPage === page ? 'active' : ''}
                  disabled={currentPage === page}
                  onClick={() => changePage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="pagination-arrow"
                disabled={!canGoNext}
                aria-label="Следующая страница"
                onClick={() => canGoNext && changePage(currentPage + 1)}
              >
                <Icon id="angle-right" size="16" color="var(--ink)" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Catalog = styled(CatalogContainer)`
  width: var(--page-width);
  margin: 0 auto;

  & .catalog-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 40px;
    padding-bottom: clamp(24px, 3vw, 40px);
    border-bottom: 1px solid var(--line-strong);
  }

  & .catalog-heading {
    & .eyebrow {
      margin-bottom: 14px;
    }

    & h1 {
      margin: 0;
      font-size: clamp(40px, 5vw, 68px);
      line-height: 1;
    }
  }

  & .catalog-note {
    margin: 0;
    max-width: 340px;
    color: var(--grey-color);
    font-size: 13px;
    line-height: 1.75;
    text-align: right;
  }

  & .products-container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: clamp(28px, 4vw, 64px);
    width: 100%;
    min-height: 60vh;
    padding-top: clamp(28px, 4vw, 48px);
  }

  & .products-main {
    flex: 1;
    min-width: 0;
  }

  & .products-meta {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 22px;
    color: var(--grey-color);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  & .skeleton-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 2.2vw, 32px);
  }

  & .skeleton-card {
    aspect-ratio: 3 / 4;
    background: linear-gradient(
      100deg,
      var(--paper-deep) 30%,
      var(--line) 50%,
      var(--paper-deep) 70%
    );
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite linear;
  }

  @keyframes shimmer {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  & .error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    min-height: 280px;
    padding: 32px 0;

    & h3 {
      margin: 0;
      font-size: 28px;
    }

    & p {
      margin: 0;
      color: var(--grey-color);
    }
  }

  & .pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: clamp(40px, 6vw, 72px) 0 0;
    gap: 8px;

    & button {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      height: 40px;
      padding: 0 10px;
      border: 1px solid transparent;
      border-radius: 0;
      background: transparent;
      color: var(--ink);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition:
        border-color 0.2s ease,
        background-color 0.2s ease,
        opacity 0.2s ease;

      &:hover:not(:disabled) {
        border-color: var(--line-strong);
      }

      &.active {
        border-color: var(--ink);
        font-weight: 700;
      }

      &:disabled {
        cursor: default;
      }
    }
  }

  & .pagination .pagination-arrow {
    border: 1px solid var(--line-strong);

    &:disabled {
      opacity: 0.3;
    }
  }

  @media (max-width: 992px) {
    & .catalog-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 18px;
    }

    & .catalog-note {
      text-align: left;
    }

    & .products-container {
      flex-direction: column;
    }

    & .skeleton-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 576px) {
    & .skeleton-list {
      grid-template-columns: 1fr;
    }

    & .products-meta {
      flex-direction: column;
      gap: 6px;
    }
  }
`;
