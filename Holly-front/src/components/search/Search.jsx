import { useSelector } from "react-redux";
import { Icon } from "../icon/Icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { productsSelector } from "../../selectors";
import { useProductLabels } from "../../hooks/use-product-labels";

const SearchContainer = ({ className }) => {
  const [search, setSearch] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const navigate = useNavigate();
  const { getCategoryName, getSeasonName } = useProductLabels();

  const products = useSelector(productsSelector);

  const onSearch = (value) => {
    setSearch(value);
    setResultSearch(
      products.filter((product) => {
        return (
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          getCategoryName(product.categoryId)
            ?.toLowerCase()
            .includes(value.toLowerCase()) ||
          getSeasonName(product.seasonId)
            ?.toLowerCase()
            .includes(value.toLowerCase())
        );
      }),
    );
  };

  return (
    <div className={className}>
      <div className="search-input">
        <Icon id="search" color="var(--ink)" size="13" />
        <input
          type="search"
          placeholder="Поиск"
          aria-label="Поиск по каталогу"
          value={search}
          onChange={({ target }) => onSearch(target.value)}
        />
      </div>
      {resultSearch.length > 0 && search && (
        <div className="search-result">
          {resultSearch.slice(0, 6).map((product) => (
            <button
              type="button"
              className="search-list"
              key={product.id}
              onClick={() => {
                setSearch("");
                setResultSearch([]);
                navigate(`/catalog/${product.id}`);
              }}
            >
              <img src={product.images[0]} alt="" loading="lazy" />
              <span className="search-item">
                <span>{product.name}</span>
                <small>{product.price} руб.</small>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const Search = styled(SearchContainer)`
  position: relative;

  & .search-input {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 200px;
    padding: 9px 14px;
    border: 1px solid var(--line-strong);
    border-radius: 999px;
    background-color: transparent;
    transition: border-color 0.2s ease, width 0.25s ease;

    &:focus-within {
      border-color: var(--ink);
    }

    & input {
      width: 100%;
      border: none;
      background: transparent;
      font-size: 13px;
      letter-spacing: 0.04em;
      padding: 0;
      outline: none;

      &::placeholder {
        color: var(--grey-color);
      }

      &::-webkit-search-cancel-button {
        display: none;
      }
    }
  }

  & .search-result {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    z-index: 30;
    width: 330px;
    max-height: 420px;
    overflow-y: auto;
    padding: 6px;
    background-color: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    box-shadow: var(--box-shadow);
  }

  & .search-list {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 8px;
    border: none;
    background: transparent;
    border-radius: var(--radius-sm);
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--paper);
    }

    & img {
      width: 44px;
      height: 58px;
      object-fit: cover;
      border-radius: 2px;
    }
  }

  & .search-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 13px;
    color: var(--ink);

    & small {
      color: var(--grey-color);
      font-size: 12px;
    }
  }

  @media (max-width: 1100px) {
    width: 100%;

    & .search-input {
      width: 100%;
    }

    & .search-result {
      left: 0;
      right: auto;
      width: 100%;
    }
  }
`;
