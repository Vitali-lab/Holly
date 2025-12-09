import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { selectCategories, seasonsSelector } from '../../entities/selectors';

export const useProductLabels = () => {
  const { categories } = useSelector(selectCategories);
  const { seasons } = useSelector(seasonsSelector);

  const getCategoryName = useCallback(
    (id) => {
      const category = categories?.find((item) => item.id === id);
      return category?.name;
    },
    [categories]
  );

  const getSeasonName = useCallback(
    (id) => {
      const season = seasons?.find((item) => item.id === id);
      return season?.name;
    },
    [seasons]
  );

  return { getCategoryName, getSeasonName };
};
