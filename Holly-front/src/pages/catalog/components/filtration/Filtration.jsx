import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Input, Icon } from "../../../../components";
import { setFilters } from "../../../../actions/set-filters";
import { categorySelector, seasonSelector } from "../../../../selectors";

const defaultFiltersState = {
  seasons: [],
  categories: [],
  minPrice: "",
  maxPrice: "",
};

const FiltrationContainer = ({
  className,
  filters = defaultFiltersState,
  allProducts = [],
  productsFiltered = [],
}) => {
  const allCategories = useSelector(categorySelector);
  const allSeasons = useSelector(seasonSelector);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const season = params.get("season");
    if (season) {
      const currentSeason = allSeasons.find((s) => s.name === season);
      if (currentSeason) {
        dispatch(setFilters({ seasons: [String(currentSeason.id)] }));
      }
    }
  }, [location, allSeasons, dispatch]);

  const resetFilters = () => {
    dispatch(setFilters(defaultFiltersState));
  };

  const toggleSeason = (id, checked) => {
    dispatch(
      setFilters({
        seasons: checked
          ? [...(filters.seasons || []), String(id)]
          : (filters.seasons || []).filter((s) => s !== String(id)),
      }),
    );
  };

  const toggleCategory = (id, checked) => {
    dispatch(
      setFilters({
        categories: checked
          ? [...(filters.categories || []), String(id)]
          : (filters.categories || []).filter((c) => c !== String(id)),
      }),
    );
  };

  const removeSeason = (id) => {
    dispatch(
      setFilters({
        seasons: (filters.seasons || []).filter((s) => s !== id),
      }),
    );
  };

  const removeCategory = (id) => {
    dispatch(
      setFilters({
        categories: (filters.categories || []).filter((c) => c !== id),
      }),
    );
  };

  const countBySeason = (id) =>
    allProducts.filter((product) => String(product.seasonId) === String(id))
      .length;

  const countByCategory = (id) =>
    allProducts.filter((product) => String(product.categoryId) === String(id))
      .length;

  const selectedSeasons = filters.seasons || [];
  const selectedCategories = filters.categories || [];

  const filtersActive =
    selectedSeasons.length > 0 ||
    selectedCategories.length > 0 ||
    !!filters.minPrice ||
    !!filters.maxPrice;

  const getSeasonName = (id) =>
    allSeasons.find((season) => String(season.id) === id)?.name;

  const getCategoryName = (id) =>
    allCategories.find((category) => String(category.id) === id)?.name;

  return (
    <aside className={className}>
      <div className="filter-card">
        <header className="filter-header">
          <div className="filter-title">
            <Icon id="filter" size="16" color="currentColor" />
            <p>Фильтр</p>
          </div>
          <span className="filter-counter">{productsFiltered.length} из {allProducts.length}</span>
        </header>

        {filtersActive && (
          <div className="filter-active">
            {selectedSeasons.map((id) => (
              <button
                type="button"
                key={`season-${id}`}
                className="chip"
                onClick={() => removeSeason(id)}
              >
                {getSeasonName(id)}
                <Icon id="close" size="10" color="currentColor" />
              </button>
            ))}
            {selectedCategories.map((id) => (
              <button
                type="button"
                key={`category-${id}`}
                className="chip"
                onClick={() => removeCategory(id)}
              >
                {getCategoryName(id)}
                <Icon id="close" size="10" color="currentColor" />
              </button>
            ))}
            {(filters.minPrice || filters.maxPrice) && (
              <button
                type="button"
                className="chip"
                onClick={() => dispatch(setFilters({ minPrice: "", maxPrice: "" }))}
              >
                {filters.minPrice || "0"} — {filters.maxPrice || "∞"} BYN
                <Icon id="close" size="10" color="currentColor" />
              </button>
            )}
            <button type="button" className="reset" onClick={resetFilters}>
              Сбросить всё
            </button>
          </div>
        )}

        <section className="filter-section">
          <h3>Сезон</h3>
          <div className="filter-options">
            {allSeasons.map((season) => {
              const isChecked = selectedSeasons.includes(String(season.id));

              return (
                <label key={season.id} className={isChecked ? "checked" : ""}>
                  <input
                    type="checkbox"
                    name={season.id}
                    checked={isChecked}
                    onChange={({ target }) =>
                      toggleSeason(season.id, target.checked)
                    }
                  />
                  <span className="check">
                    {isChecked && <Icon id="check" size="10" color="currentColor" />}
                  </span>
                  <span className="option-name">{season.name}</span>
                  <span className="option-count">{countBySeason(season.id)}</span>
                </label>
              );
            })}
          </div>
        </section>

        <section className="filter-section">
          <h3>Категории</h3>
          <div className="filter-options">
            {allCategories.map((category) => {
              const isChecked = selectedCategories.includes(String(category.id));

              return (
                <label key={category.id} className={isChecked ? "checked" : ""}>
                  <input
                    type="checkbox"
                    name={category.id}
                    checked={isChecked}
                    onChange={({ target }) =>
                      toggleCategory(category.id, target.checked)
                    }
                  />
                  <span className="check">
                    {isChecked && <Icon id="check" size="10" color="currentColor" />}
                  </span>
                  <span className="option-name">{category.name}</span>
                  <span className="option-count">{countByCategory(category.id)}</span>
                </label>
              );
            })}
          </div>
        </section>

        <section className="filter-section">
          <h3>Цена, BYN</h3>
          <div className="price-inputs">
            <Input
              text="От"
              type="number"
              width="100%"
              value={filters.minPrice}
              onChange={({ target }) =>
                dispatch(setFilters({ minPrice: target.value }))
              }
            />
            <span className="price-divider" aria-hidden="true">
              —
            </span>
            <Input
              text="До"
              type="number"
              width="100%"
              value={filters.maxPrice}
              onChange={({ target }) =>
                dispatch(setFilters({ maxPrice: target.value }))
              }
            />
          </div>
        </section>
      </div>
    </aside>
  );
};

export const Filtration = styled(FiltrationContainer)`
  width: clamp(230px, 19vw, 270px);
  flex-shrink: 0;

  & .filter-card {
    position: sticky;
    top: calc(var(--header-offset) + 24px);
    display: flex;
    flex-direction: column;
    gap: 26px;
    padding-right: 28px;
    border-right: 1px solid var(--line);
  }

  & .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--line);
  }

  & .filter-title {
    display: flex;
    align-items: center;
    gap: 9px;

    & p {
      margin: 0;
      color: var(--ink);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
  }

  & .filter-counter {
    color: var(--grey-color);
    font-size: 11px;
    white-space: nowrap;
  }

  & .filter-active {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: -8px;
  }

  & .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border: 1px solid var(--line-strong);
    background: transparent;
    color: var(--ink);
    font-size: 10px;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;

    &:hover {
      border-color: var(--ink);
      background-color: var(--paper-deep);
    }
  }

  & .reset {
    padding: 4px 0;
    border: none;
    border-bottom: 1px solid var(--ink);
    background: none;
    color: var(--ink);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
  }

  & .filter-section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & h3 {
      margin: 0;
      font-family: var(--font-body);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--grey-color);
    }
  }

  & .filter-options {
    display: flex;
    flex-direction: column;
    gap: 2px;

    & label {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 7px 0;
      color: var(--ink-soft);
      font-size: 13px;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover,
      &.checked {
        color: var(--ink);
      }
    }

    & input {
      position: absolute;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
    }

    & .check {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15px;
      height: 15px;
      border: 1px solid var(--line-strong);
      color: var(--paper);
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease;
    }

    & input:checked + .check {
      border-color: var(--ink);
      background-color: var(--ink);
    }

    & input:focus-visible + .check {
      outline: 2px solid var(--ink);
      outline-offset: 2px;
    }

    & .option-name {
      flex: 1;
    }

    & .option-count {
      color: var(--grey-color);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
  }

  & .price-inputs {
    display: flex;
    align-items: flex-end;
    gap: 8px;

    & label {
      width: 100%;
    }

    & input {
      height: 36px;
      font-size: 13px;
    }
  }

  & .price-divider {
    padding-bottom: 12px;
    color: var(--grey-color);
    font-size: 12px;
  }

  @media (max-width: 992px) {
    width: 100%;

    & .filter-card {
      position: static;
      padding: 0 0 22px;
      border-right: none;
      border-bottom: 1px solid var(--line-strong);
    }

    & .filter-options {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 24px;
    }

    & .price-inputs {
      max-width: 360px;
    }
  }
`;
