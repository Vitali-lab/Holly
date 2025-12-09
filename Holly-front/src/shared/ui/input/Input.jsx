import styled from 'styled-components';

const InputContainer = ({ className, ...props }) => {
  return (
    <div className={className}>
      <input {...props} />
    </div>
  );
};

export const Input = styled(InputContainer)`
  & input {
    width: ${({ width = '300px' }) => width};
    margin: ${({ margin = '0 0 0 0' }) => margin};
    height: 10px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--grey-color);
    z-index: 10;
    color: #363535ff;
    font-size: 15px;

    padding: 10px;

    &:focus {
      outline: none;
    }
  }
`;
