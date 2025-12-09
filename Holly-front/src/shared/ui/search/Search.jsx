import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Input, Price } from '../';
import { useDebounce } from '../../hooks/use-debounse';
import { useProductLabels } from '../../hooks/use-product-labels';
import { allProductsSelector } from '../../../entities/selectors';
import styled from 'styled-components';

const SearchContainer = ({ className }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const debouncedSearch = useDebounce(search, 500);
  const { getCategoryName, getSeasonName } = useProductLabels();
  const { allProducts } = useSelector(allProductsSelector);

  useEffect(() => {
    setResultSearch(
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [debouncedSearch, allProducts]);

  return (
    <div className={className}>
      <div className="search-input">
        <Input
          placeholder="Поиск"
          width="200px"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="search-icon">
          <Icon id="search" color="#050505ff" size="18" />
        </div>
      </div>
      {resultSearch.length > 0 && search && (
        <div className="search-result">
          {resultSearch.map((product) => (
            <div
              className="search-list"
              key={product.id}
              onClick={() => {
                setSearch('');
                setResultSearch([]);
                navigate(`/catalog/${product.id}`);
              }}
            >
              <div className="search-item">
                <img src={product.images[0]} alt="" />
                <div className="search-item-info">
                  <h4>{product.name}</h4>
                  <p>{getCategoryName(product.categoryId)}</p>
                  <p>{getSeasonName(product.seasonId)}</p>
                </div>
                <Price post={product} justifyContent="end" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Search = styled(SearchContainer)`
  & .search-result {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    top: 110px;
    left: 70px;
    width: 550px;
    height: auto;
    max-height: 500px;
    overflow-y: scroll;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    z-index: 10;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    & p {
      width: 100px;
      margin: 0;
      cursor: pointer;
    }
  }

  & .search-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin: 10px 0;
    padding: 10px;
    width: 500px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    gap: 30px;
    & img {
      width: 70px;
      height: 100px;
      border-radius: 10px;
    }
  }
  & .search-item-info {
    margin: 0 10px;
    & h4 {
      margin: 0;
    }
    & p {
      margin: 0;
      color: var(--grey-color);
    }
  }

  & .search-input {
    position: relative;
    top: 0px;
    width: 500px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .search-icon {
    position: absolute;
    right: 120px;
    bottom: 8px;
    z-index: 10;
  }
`;
