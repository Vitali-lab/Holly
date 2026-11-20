import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoContainer = ({ className, onClick }) => {
  const navigate = useNavigate();

  return (
    <div
      className={className}
      onClick={() => {
        if (onClick) onClick();
        navigate("/");
      }}
      role="link"
      aria-label="Holly — на главную"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") navigate("/");
      }}
    >
      <img src={logo} alt="Holly" />
    </div>
  );
};

export const Logo = styled(LogoContainer)`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: ${({ width = "132px" }) => width};

  & img {
    width: 100%;
    height: auto;
    mix-blend-mode: multiply;
    user-select: none;
  }

  @media (max-width: 768px) {
    width: ${({ width = "104px" }) => width};
  }
`;
