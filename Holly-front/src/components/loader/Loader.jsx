import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="bulb"></div>
      <p>Загрузка</p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;

  .bulb {
    display: block;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 2px solid var(--line-strong);
    border-top-color: var(--ink);
    background-color: transparent;
    animation: rotate 0.9s linear infinite;
  }

  & p {
    margin: 0;
    color: var(--grey-color);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.24em;
    text-transform: uppercase;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
