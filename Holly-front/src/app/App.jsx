import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Header, Footer } from '../widgets/layouts';
import { AppRouter } from './router/AppRouter';
import { fetchCategories } from '../features/categories/categories';
import { fetchAllProducts } from '../features/products/products';
import { fetchUser } from '../features/user/user';
import { fetchSeasons } from '../features/seasons/seasons';
import { ScrollTopButton } from '../shared/ui/scroll-top-button/ScrollTopButton';
import styled from 'styled-components';

const AppContainer = ({ className }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCategories());
    dispatch(fetchAllProducts());
    dispatch(fetchSeasons());

    if (!sessionStorage.getItem('products')) {
      sessionStorage.setItem('products', JSON.stringify([]));
    }
  }, [dispatch]);

  return (
    <>
      <div className={className}>
        <ToastContainer />
        <Header />
        <AppRouter />
        <ScrollTopButton />
      </div>
      <Footer />
    </>
  );
};

export const App = styled(AppContainer)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: min(1280px, 100%);
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px 50px;
  background-color: #ffffffff;
  margin-top: 200px;
  margin-bottom: 100px;
  border-radius: 16px;
  box-shadow: 0px 7px 40px rgba(15, 23, 42, 0.08);

  @media (max-width: 1400px) {
    width: min(1200px, 96%);
  }

  @media (max-width: 1300px) {
    width: min(1100px, 96%);
  }

  @media (max-width: 1200px) {
    width: min(1000px, 96%);
  }

  @media (max-width: 992px) {
    padding: 24px;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    margin-top: 120px;
    padding: 16px;
    min-height: auto;
    box-shadow: none;
  }

  @media (max-width: 430px) {
    width: min(430px, 100%);
    margin-top: 10px;
    padding: 0px;
  }
  @media (max-width: 390px) {
    width: min(390px, 100%);
    margin-top: 10px;
    padding: 0px;
  }
`;
