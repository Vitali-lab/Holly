import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '../../../../shared/ui';
import { useState } from 'react';

const NavigateBarContainer = ({ className }) => {
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
  return (
    <div className={className}>
      <div className="header-navigate">
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={'/'}>
          Главная
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={'/catalog'}>
          Каталог
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={'/about-us'}>
          О нас
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={'/delivery'}>
          Доставка
        </NavLink>
      </div>
      <div className="burger-menu">
        <Icon
          id="bars"
          color="var(--black-color)"
          size="35"
          onClick={() => setIsOpenBurgerMenu(!isOpenBurgerMenu)}
        />
        {isOpenBurgerMenu && (
          <div className="burger-menu-list">
            <Link to={'/'} onClick={() => setIsOpenBurgerMenu(false)}>
              Главная
            </Link>
            <Link to={'/catalog'} onClick={() => setIsOpenBurgerMenu(false)}>
              Каталог
            </Link>
            <Link to={'/about-us'} onClick={() => setIsOpenBurgerMenu(false)}>
              О нас
            </Link>
            <Link to={'/delivery'} onClick={() => setIsOpenBurgerMenu(false)}>
              Доставка
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export const NavigateBar = styled(NavigateBarContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  height: 40px;
  width: 40%;
  background-color: var(--white-color);
  padding: 0;

  & .header-navigate {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 80px;
    background-color: var(--white-color);
    padding: 0;

    & a {
      text-decoration: none;
      color: black;
      padding: 0px;
      font-weight: 500;
      font-size: 14px;
    }
    & .active {
      font-weight: 600;
      color: var(--main-color);
      animation: active ease 0.5s;
    }
  }

  & .burger-menu {
    display: none;
  }

  @media (max-width: 1200px) {
    position: fixed;
    top: 0px;
    left: -360px;

    background-color: var(--white-color);
    z-index: 2000;

    & .header-navigate {
      display: none;
    }

    & .burger-menu {
      position: absolute;
      top: 0px;
      right: 0px;

      background-color: var(--white-color);
      z-index: 2000;
      display: flex;
    }
    & .burger-menu-list {
      position: absolute;
      top: 70px;
      left: -30px;
      width: 200px;
      height: 300px;
      background-color: #fffffff3;
      z-index: 2000;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-radius: 13px;
      gap: 10px;
      & a {
        text-decoration: none;
        color: var(--black-color);
        padding: 10px 20px;
        width: 100px;
        border-radius: 10px;
        font-weight: 700;
        font-size: 23px;
      }
    }
  }
  @media (max-width: 768px) {
  }

  @media (max-width: 576px) {
    & .burger-menu {
      position: absolute;
      width: 30px;
      height: 40px;
      top: 0px;
      left: 380px;
      z-index: 20000;
    }
  }

  @media (max-width: 480px) {
  }
`;
