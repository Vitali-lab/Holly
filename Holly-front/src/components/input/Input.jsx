import styled from "styled-components";

const InputContainer = ({ className, text, ...props }) => {
  return (
    <label className={className}>
      {text && <span className="title">{text}</span>}
      <input {...props} />
    </label>
  );
};

export const Input = styled(InputContainer)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ width = "300px" }) => width};

  & .title {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--grey-color);
    transition: color 0.2s ease;
  }

  & input {
    width: 100%;
    height: 44px;
    padding: 8px 0;
    border: none;
    border-bottom: 1px solid var(--line-strong);
    border-radius: 0;
    background-color: transparent;
    color: var(--ink);
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-bottom-color: var(--ink);
    }

    &::placeholder {
      color: var(--grey-color);
    }
  }

  &:focus-within .title {
    color: var(--ink);
  }
`;
