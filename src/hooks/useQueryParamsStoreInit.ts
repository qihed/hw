import { useEffect } from 'react';
import { useLocation } from 'react-router';
import rootStore from 'store/instance';

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();

  useEffect(() => {
    rootStore.query.setSearch(search);
  }, [search]);
};
