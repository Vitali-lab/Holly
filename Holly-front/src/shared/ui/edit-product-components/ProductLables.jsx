import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Select } from '../../ui';
import { fetchCategories } from '../../../features/categories/categories';
import { fetchSeasons } from '../../../features/seasons/seasons';
import styled from 'styled-components';

const ProductLablesContainer = ({
  className,
  categories,
  category,
  setCategory,
  seasons,
  season,
  setSeason,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSeasons());
  }, [dispatch]);

  return (
    <div className={className}>
      <div className="lables">
        <Select selectItems={categories} selectValue={category} selectFunc={setCategory}>
          Категория
        </Select>
        <Select selectItems={seasons} selectValue={season} selectFunc={setSeason}>
          Сезон
        </Select>
      </div>
    </div>
  );
};

export const ProductLables = styled(ProductLablesContainer)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  gap: 30px;
  margin-bottom: 30px;
  & .lables {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    box-shadow: var(--box-shadow);
    gap: 10px;
    padding: 30px;
    border-radius: 10px;
    font-size: 20px;
    color: var(--grey-color);
    font-weight: 700;
    & select {
      width: 190px;
      height: 35px;
      border-radius: 10px;
      border: 1px solid #ccccccff;
      padding: 0px 10px;
      font-size: 15px;
    }
  }
`;
