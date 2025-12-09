import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCategory,
  fetchCategories,
  postCategory,
} from '../../features/categories/categories';
import { deleteSeason, fetchSeasons, addSeason } from '../../features/seasons/seasons';
import { Params } from './components/Params';
import { AddParams } from './components/AddParams';
import { selectCategories, seasonsSelector } from '../../entities/selectors';
import Loader from '../../shared/ui/loader/Loader';
import styled from 'styled-components';

const EditParamsContainer = ({ className }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSeasons());
  }, [dispatch]);

  const { seasons, isLoading: isLoadingSeasons } = useSelector(seasonsSelector);
  const { categories, isLoading: isLoadingCategories } = useSelector(selectCategories);
  const [newCategory, setNewCategory] = useState('');
  const [newSeason, setNewSeason] = useState('');
  const isLoading = isLoadingSeasons || isLoadingCategories;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={className}>
      <h1>Редактирование параметров</h1>
      <div className="container">
        <Params params={categories} type="category" deleteFunc={deleteCategory} />
        <Params params={seasons} type="season" deleteFunc={deleteSeason} />
        <div className="add-params-block">
          <AddParams
            postFunc={postCategory}
            inputValue={newCategory}
            setInputValue={setNewCategory}
            text="новой категории"
          />
          <AddParams
            postFunc={addSeason}
            inputValue={newSeason}
            setInputValue={setNewSeason}
            text="нового сезона"
          />
        </div>
      </div>
    </div>
  );
};

export const EditParams = styled(EditParamsContainer)`
  width: 100%;
  padding: 40px;

  & .add-params-block {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  & .container {
    margin-top: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: start;
    gap: 20px;
  }
`;
