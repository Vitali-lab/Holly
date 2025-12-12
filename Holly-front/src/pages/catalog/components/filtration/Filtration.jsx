import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button, Icon, Input } from '../../../../shared/ui';
import {
  acSetFilters,
  acSetFilterSeason,
  initialFilters,
} from '../../../../features/products/productsSlice';
import { selectCategories, seasonsSelector } from '../../../../entities/selectors';
import Loader from '../../../../shared/ui/loader/Loader';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FiltrationContainer = ({
  className,
  filters,
  totalCount,
  isOpenFilters,
  setIsOpenFilters,
}) => {
  const { categories: allCategories, isLoading: categoriesLoading } = useSelector(selectCategories);
  const { seasons: allSeasons, isLoading: seasonsLoading } = useSelector(seasonsSelector);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const season = params.get('season');
    if (season) {
      dispatch(acSetFilterSeason(season));
    }
  }, [location.search, dispatch]);

  const deleteFilters = () => {
    dispatch(acSetFilters(initialFilters));
  };

  const filtersActive =
    filters.seasons.length > 0 ||
    filters.categories.length > 0 ||
    !!filters.minPrice ||
    !!filters.maxPrice;

  if (seasonsLoading || categoriesLoading) {
    return <Loader />;
  }

  return (
    <>
      {isOpenFilters && (
        <aside className={className}>
          <div className="filter-card">
            <header className="filter-header">
              <p className="eyebrow">Фильтр каталога</p>
              {filtersActive && <Button onClick={deleteFilters}>Сбросить</Button>}
            </header>
            <p className="filter-counter">Найдено товаров: {totalCount}</p>

            <section className="filter-section">
              <h3>Сезон</h3>
              <div className="filter-options">
                {allSeasons.map((season) => (
                  <label key={season.id}>
                    <input
                      type="checkbox"
                      name={season.id}
                      checked={filters.seasons?.includes(String(season.id))}
                      onChange={({ target }) =>
                        dispatch(
                          acSetFilters({
                            seasons: target.checked
                              ? [...(filters.seasons || []), String(season.id)]
                              : (filters.seasons || []).filter((s) => s !== String(season.id)),
                          })
                        )
                      }
                    />
                    <span>{season.name}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="filter-section">
              <h3>Категории</h3>
              <div className="filter-options">
                {allCategories.map((category) => (
                  <label key={category.id}>
                    <input
                      type="checkbox"
                      name={category.id}
                      checked={filters.categories?.includes(String(category.id))}
                      onChange={({ target }) =>
                        dispatch(
                          acSetFilters({
                            categories: target.checked
                              ? [...(filters.categories || []), String(category.id)]
                              : (filters.categories || []).filter((c) => c !== String(category.id)),
                          })
                        )
                      }
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="filter-section">
              <h3>Цена</h3>
              <div className="price-inputs">
                <Input
                  placeholder="От"
                  type="number"
                  width="100%"
                  value={filters.minPrice}
                  onChange={({ target }) => dispatch(acSetFilters({ minPrice: target.value }))}
                />
                <Input
                  placeholder="До"
                  type="number"
                  width="100%"
                  value={filters.maxPrice}
                  onChange={({ target }) => dispatch(acSetFilters({ maxPrice: target.value }))}
                />
              </div>
              <div className="close-filters">
                <Icon id="close" onClick={() => setIsOpenFilters(false)} />
              </div>
            </section>
          </div>
        </aside>
      )}
    </>
  );
};
export const Filtration = styled(FiltrationContainer)`
  width: 300px;
  & .filter-card {
    position: sticky;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: 24px;
    padding: 24px;
    background: #ffffff;
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: 0 20px 35px rgba(15, 23, 42, 0.08);
    animation: ${fadeIn} 0.4s ease;
  }
  & .close-filters {
    display: none;
  }

  & .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    height: 20px;
  }

  & .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 12px;
    margin: 0 0 8px;
    color: rgba(15, 15, 15, 0.5);
  }

  & .filter-counter {
    margin: 0;
    font-size: 14px;
    width: 100%;
    color: rgba(15, 15, 15, 0.7);
  }

  & .filter-section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & h3 {
      margin: 0;
      font-size: 16px;
    }
  }

  & .filter-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;

    & label {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(15, 15, 15, 0.03);
      cursor: pointer;
    }
  }

  & .price-inputs {
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 0 0 50px 0;
  }

  @media (max-width: 1600px) {
    width: 300px;
    & .filter-card {
    }
  }

  @media (max-width: 1300px) {
    & .filter-card {
      position: static;
      width: 90%;
    }
  }

  @media (max-width: 768px) {
    width: min(400px, 100%);
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 20;
    padding: 18px 0;
    gap: 12px;

    & .price-inputs {
      flex-direction: column;
    }
    & .filter-card {
      position: static;
      width: 100%;
      border-radius: 0;
    }
    & .filter-card {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      padding: 12px;

      & h3 {
        margin: 0;
        font-size: 16px;
      }
    }
    & .close-filters {
      display: block;
      cursor: pointer;
      position: absolute;
      top: 40px;
      right: 0px;
    }

    & .filter-options {
      font-size: 15px;
      width: 50%;
      & label {
        padding: 5px 8px;
        width: 70%;
      }
    }
  }
`;
