import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../auth/Auth";
import { Registration } from "../registration/Regictration";
import { NavigateBar } from "./components/navigate-bar/NavigateBar";
import { ControlPanel } from "./components/control-panel/ControlPanel";
import { Logo } from "../logo/Logo";
import { Icon } from "../icon/Icon";
import { Search } from "../search/Search";
import styled from "styled-components";

const HeaderContainer = ({ className }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {isAuthOpen && (
        <Auth
          setIsAuthOpen={setIsAuthOpen}
          setIsRegistrationOpen={setIsRegistrationOpen}
        />
      )}
      {isRegistrationOpen && (
        <Registration setIsRegistrationOpen={setIsRegistrationOpen} />
      )}
      <header className={className}>
        <div className="topbar">
          <div className="topbar-inner">
            <p>Бесплатная доставка по Беларуси от 200 BYN</p>
            <div className="topbar-meta">
              <a href="tel:+375291234567">+375 29 123-45-67</a>
              <span className="topbar-address">Минск, ул. Ленина, 10</span>
            </div>
          </div>
        </div>

        <div className="mainbar">
          <div className="mainbar-inner">
            <button
              type="button"
              className="menu-toggle"
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Icon id={isMenuOpen ? "close" : "bars"} size="18" />
            </button>

            <div className="desktop-nav">
              <NavigateBar />
            </div>

            <div className="header-logo">
              <Logo width="132px" onClick={closeMenu} />
            </div>

            <div className="header-actions">
              <ControlPanel setIsAuthOpen={setIsAuthOpen} />
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-search">
              <Search />
            </div>
            <NavigateBar onNavigate={closeMenu} />
            <div className="mobile-menu-footer">
              <a href="tel:+375291234567">+375 29 123-45-67</a>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  navigate("/cart");
                }}
              >
                Корзина
              </button>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  navigate("/favorites");
                }}
              >
                Избранное
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export const Header = styled(HeaderContainer)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 40;
  background-color: var(--paper);
  border-bottom: 1px solid var(--line);

  & .topbar {
    background-color: var(--ink);
    color: var(--paper);
  }

  & .topbar-inner {
    width: var(--page-width);
    margin: 0 auto;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    & p {
      margin: 0;
      color: rgba(246, 243, 236, 0.78);
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
  }

  & .topbar-meta {
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 11px;
    letter-spacing: 0.06em;

    & a {
      color: var(--paper);
      text-decoration: none;

      &:hover {
        opacity: 0.7;
      }
    }

    & span {
      color: rgba(246, 243, 236, 0.6);
    }
  }

  & .mainbar {
    width: 100%;
    background-color: var(--paper);
  }

  & .mainbar-inner {
    position: relative;
    width: var(--page-width);
    margin: 0 auto;
    min-height: 76px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 24px;
  }

  & .header-logo {
    grid-column: 2;
    justify-self: center;
  }

  & .desktop-nav {
    grid-column: 1;
    justify-self: start;
    display: flex;
  }

  & .header-actions {
    grid-column: 3;
    justify-self: end;
    display: flex;
    justify-content: flex-end;
  }

  & .menu-toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    padding: 0;
    border: 1px solid var(--line-strong);
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    position: absolute;
    left: 16px;
    z-index: 2;
  }

  & .mobile-menu {
    display: none;
  }

  @media (max-width: 992px) {
    & .mainbar-inner {
      grid-template-columns: 1fr auto 1fr;
      gap: 12px;
    }

    & .menu-toggle {
      display: flex;
    }

    & .desktop-nav {
      display: none;
    }

    & .mobile-menu {
      display: flex;
      flex-direction: column;
      gap: 22px;
      max-height: calc(100vh - var(--header-offset));
      overflow-y: auto;
      padding: 20px 16px 26px;
      border-top: 1px solid var(--line);
      background-color: var(--paper);
    }

    & .mobile-menu-search {
      display: flex;
    }

    & .mobile-menu-footer {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
      padding-top: 16px;
      border-top: 1px solid var(--line);
      font-size: 13px;

      & a {
        color: var(--ink);
        text-decoration: none;
      }

      & button {
        padding: 0;
        border: none;
        background: none;
        color: var(--ink);
        font-size: 13px;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 768px) {
    & .topbar-inner {
      min-height: 28px;
      justify-content: center;

      & p {
        font-size: 9px;
        letter-spacing: 0.12em;
        text-align: center;
      }
    }

    & .topbar-meta {
      display: none;
    }

    & .mainbar-inner {
      min-height: 64px;
    }
  }
`;
