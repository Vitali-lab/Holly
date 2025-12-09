import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/holly.jpg';
import styled from 'styled-components';

const LogoContainer = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={className} onClick={() => navigate('/')}>
      <img src={logo} alt="" />
    </div>
  );
};

export const Logo = styled(LogoContainer)`
  font-size: 30px;
  color: var(--black-color);
  margin: ${({ margin = '0 0 0 50px' }) => margin};
  display: flex;
  margin: 0 auto;
  cursor: pointer;
  width: 100px;

  & img {
    width: ${({ width = '200px' }) => width};
    height: ${({ height = '100px' }) => height};
  }
  & h1 {
    margin: 0px;
  }

  @media (max-width: 992px) {
    & img {
      width: 200px;
      height: 100px;
    }
  }

  @media (max-width: 500px) {
    & img {
      width: 150px;
      height: 90px;
    }
  }
`;
