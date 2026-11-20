import { NavLink } from "react-router-dom";
import styled from "styled-components";

const links = [
  { to: "/", label: "Главная" },
  { to: "/catalog", label: "Каталог" },
  { to: "/about-us", label: "О нас" },
  { to: "/delivery", label: "Доставка" },
];

const NavigateBarContainer = ({ className, onNavigate }) => {
  return (
    <nav className={className} aria-label="Основная навигация">
      {links.map((link) => (
        <NavLink
          key={link.to}
          className={({ isActive }) => (isActive ? "active" : "")}
          to={link.to}
          onClick={onNavigate}
          end={link.to === "/"}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export const NavigateBar = styled(NavigateBarContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: clamp(18px, 2.6vw, 40px);

  & a {
    position: relative;
    padding: 6px 0;
    color: var(--ink);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.2s ease;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: var(--ink);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.25s ease;
    }

    &:hover {
      color: var(--ink);
    }

    &:hover::after,
    &.active::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 576px) {
    & a {
      font-size: 11px;
      letter-spacing: 0.12em;
    }
  }
`;
