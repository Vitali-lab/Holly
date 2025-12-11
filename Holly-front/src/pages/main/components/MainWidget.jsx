import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainWidgetContainer = ({ className, bigText, smallText, link }) => {
  const navigate = useNavigate();
  return (
    <div className={className} onClick={() => navigate('/catalog')}>
      <h2>{bigText}</h2>
      <p>{smallText}</p>
      <img src={link} alt="" />
    </div>
  );
};

export const MainWidget = styled(MainWidgetContainer)`
  position: relative;
  width: ${({ width = '1350px' }) => width};
  height: ${({ height = '650px' }) => height};
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24) inset;
  cursor: pointer;

  & img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
  & h2 {
    position: absolute;
    bottom: 150px;
    left: 40px;
    font-size: 70px;
    color: white;
    text-shadow: 0px 1px 10px rgba(0, 0, 0, 0.6);
  }

  & p {
    position: absolute;
    bottom: 40px;
    width: 90%;
    left: 45px;
    text-align: left;
    white-space: normal;
    overflow-wrap: break-word;
    font-size: 35px;
    color: var(--white-color);
    text-shadow: 0px 1px 10px rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 1550px) {
    width: 1200px;
    height: 600px;
    & h2 {
      font-size: 50px;
    }
    & p {
      font-size: 30px;
    }
  }

  @media (max-width: 1200px) {
    width: 1100px;
    height: 550px;
    & h2 {
      font-size: 50px;
    }
    & p {
      font-size: 30px;
    }
  }
  @media (max-width: 576px) {
    width: min(450px, 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0px;
    height: 400px;
    border-radius: 10px;

    & img {
      width: 100%;
      height: 100%;
      border-radius: 0px;
      object-fit: cover;
    }

    & h2 {
      font-size: 30px;
      bottom: 120px;
      left: 20px;
    }
    & p {
      font-size: 15px;
      font-weight: 600;
      left: 20px;
    }
  }
`;
