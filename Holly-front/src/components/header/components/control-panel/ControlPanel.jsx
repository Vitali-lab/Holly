import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../../../components";
import { Search } from "../../../../components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../bff/api/back-end/logout";
import { notifySuccess } from "../../../../func/notification";
import { currentUserSelector } from "../../../../selectors/current-user-selector";
import styled from "styled-components";

const ControlPanelContainer = ({ className, setIsAuthOpen }) => {
  const currentUser = useSelector(currentUserSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  useEffect(() => {
    setIsAccountOpen(false);
  }, [currentUser?.id]);

  const userLogout = () => {
    setIsAccountOpen(false);
    dispatch(logout());
    navigate("/");
    notifySuccess("Вы успешно вышли из аккаунта");
  };

  const go = (path) => {
    setIsAccountOpen(false);
    navigate(path);
  };

  return (
    <div className={className}>
      <div className="search">
        <Search />
      </div>

      <div className="icons">
        <button
          type="button"
          className="action"
          aria-label="Избранное"
          onClick={() => go("/favorites")}
        >
          <Icon id="heart-o" size="19" color="currentColor" />
          <span className="action-label">Избранное</span>
        </button>

        <button
          type="button"
          className="action shopping-bag"
          aria-label="Корзина"
          onClick={() => go("/cart")}
        >
          <Icon id="shopping-bag" size="19" color="currentColor" />
          <span className="action-label">Корзина</span>
          {(currentUser?.cart || []).length > 0 && (
            <span className="cart-count">{currentUser.cart.length}</span>
          )}
        </button>

        {!currentUser ? (
          <button
            type="button"
            className="action"
            onClick={() => setIsAuthOpen(true)}
          >
            <Icon id="user-o" size="19" color="currentColor" />
            <span className="action-label">Войти</span>
          </button>
        ) : (
          <div className="account" ref={accountRef}>
            <button
              type="button"
              className="account-toggle"
              aria-label="Аккаунт"
              aria-expanded={isAccountOpen}
              onClick={() => setIsAccountOpen((prev) => !prev)}
            >
              <span className="avatar">{currentUser.name.slice(0, 1)}</span>
              <span className="action-label">{currentUser.name}</span>
              <Icon
                id={isAccountOpen ? "angle-up" : "angle-down"}
                size="12"
                color="currentColor"
              />
            </button>

            {isAccountOpen && (
              <div className="account-menu">
                <p className="account-name">{currentUser.name}</p>
                <p className="account-email">{currentUser.email}</p>
                <div className="account-links">
                  <button
                    type="button"
                    onClick={() => go(`/user-cabinet/${currentUser.id}`)}
                  >
                    Личный кабинет
                  </button>
                  <button type="button" onClick={() => go("/favorites")}>
                    Избранное
                  </button>
                  {currentUser.role === 0 && (
                    <Link to="/admin-panel" onClick={() => setIsAccountOpen(false)}>
                      Админ-панель
                    </Link>
                  )}
                  <button type="button" className="logout" onClick={userLogout}>
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 18px;

  & .search {
    display: flex;
    align-items: center;
  }

  & .icons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: clamp(8px, 1.4vw, 18px);
  }

  & .action {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    height: 38px;
    padding: 0 6px;
    border: none;
    background: none;
    color: var(--ink);
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.62;
    }

    &:active {
      transform: scale(0.96);
    }
  }

  & .action-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  & .cart-count {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 16px;
    height: 16px;
    margin-left: -2px;
    padding: 0 4px;
    border-radius: 999px;
    background-color: var(--ink);
    color: var(--paper);
    font-size: 9px;
    font-weight: 700;
  }

  & .account {
    position: relative;
  }

  & .account-toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 38px;
    padding: 0 6px;
    border: none;
    background: none;
    color: var(--ink);
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  & .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid var(--ink);
    border-radius: 50%;
    font-family: var(--font-display);
    font-size: 13px;
  }

  & .account-menu {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    z-index: 50;
    width: 220px;
    padding: 18px;
    background-color: var(--surface);
    border: 1px solid var(--line);
    box-shadow: var(--box-shadow);
  }

  & .account-name {
    margin: 0;
    color: var(--ink);
    font-family: var(--font-display);
    font-size: 20px;
  }

  & .account-email {
    margin: 4px 0 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--line);
    color: var(--grey-color);
    font-size: 11px;
    word-break: break-all;
  }

  & .account-links {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & button,
    & a {
      padding: 9px 0;
      border: none;
      background: none;
      color: var(--ink);
      font-family: var(--font-body);
      font-size: 12px;
      text-align: left;
      text-decoration: none;
      cursor: pointer;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.6;
      }
    }

    & .logout {
      margin-top: 6px;
      padding-top: 14px;
      border-top: 1px solid var(--line);
      color: var(--red-color);
    }
  }

  @media (max-width: 1200px) {
    & .action-label {
      display: none;
    }

    & .account .action-label {
      display: none;
    }

    & .search {
      display: none;
    }
  }

  @media (max-width: 576px) {
    gap: 4px;

    & .icons {
      gap: 4px;
    }

    & .action {
      height: 34px;
      padding: 0 5px;
    }

    & .account-toggle {
      height: 34px;
      padding: 0 4px;

      & svg {
        display: none;
      }
    }
  }
`;
