import styled from 'styled-components';

const ButtonContainer = ({ className, children, onClick, disabled }) => {
  return (
    <div className={className}>
      <button
        className={disabled ? 'button-disabled' : 'button'}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export const Button = styled(ButtonContainer)`
  & .button {
    position: relative;
    width: ${({ width = '100px' }) => width};
    height: ${({ height = '45px' }) => height};
    background-color: var(--main-color);
    color: var(--text-color);
    font-size: 15px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all ease 0.5s;
    &:hover {
      transition: all ease 0.5s;
      box-shadow: 0px 0px 10px 5px rgba(251, 251, 251, 0.94);
    }
    &:active {
      transition: all ease 0.5s;
      transform: scale(0.9);
    }
  }
  & .button-disabled {
    width: ${({ width = '100px' }) => width};
    height: ${({ height = '45px' }) => height};
    background-color: var(--grey-color);
    color: var(--text-color);
    font-size: 15px;
    border: none;
    border-radius: 10px;
    cursor: not-allowed;
    transition: all ease 0.5s;
  }
`;
