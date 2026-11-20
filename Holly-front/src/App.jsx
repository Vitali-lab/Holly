import { Header } from "./components";
import { Footer } from "./components";
import { useLayoutEffect } from "react";
import { getCategories } from "./bff/api/back-end/get-categories";
import { getSeasons } from "./bff/api/back-end/get-seasons";
import { useDispatch } from "react-redux";
import { getProducts } from "./bff/api/back-end/get-products";
import { ToastContainer } from "react-toastify";
import { getUserToken } from "./bff/api/back-end/get-user-token";
import { AppRouter } from "./components/router/AppRouter";
import styled from "styled-components";

const AppContainer = ({ className }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getUserToken());
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getSeasons());

    if (!sessionStorage.getItem("products")) {
      sessionStorage.setItem("products", JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <div className={className}>
        <ToastContainer />
        <Header />
        <main className="page">
          <AppRouter />
        </main>
      </div>
      <Footer
        links={[
          { href: "/catalog", label: "Каталог" },
          { href: "/about-us", label: "О нас" },
          { href: "/delivery", label: "Доставка" },
        ]}
        contacts={[
          "Телефон: +375 29 123-45-67",
          "Email: info@holly.by",
          "Адрес: Минск, ул. Ленина, 10",
        ]}
        copy="© 2019 - 2026 Holly-Minsk. Все права защищены."
      />
    </>
  );
};

export const App = styled(AppContainer)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: var(--header-offset);
  background-color: var(--paper);

  & .page {
    flex: 1;
    width: 100%;
    padding: clamp(32px, 5vw, 72px) 0 clamp(56px, 7vw, 110px);
  }

  @media (max-width: 992px) {
    & .page {
      padding-top: 40px;
    }
  }

  @media (max-width: 768px) {
    & .page {
      padding-bottom: 56px;
    }
  }
`;
