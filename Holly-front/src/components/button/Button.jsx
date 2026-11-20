import styled from "styled-components";

const normalizeWidth = (width) => {
  if (typeof width === "number" || /^\d+$/.test(String(width))) {
    return `${width}px`;
  }
  return width;
};

const ButtonContainer = ({ className, children, onClick, disabled, type, variant }) => {
  return (
    <div className={className}>
      <button
        className={`button${variant === "ghost" ? " ghost" : ""}`}
        onClick={onClick}
        disabled={disabled}
        type={type || "button"}
      >
        {children}
      </button>
    </div>
  );
};

export const Button = styled(ButtonContainer)`
  width: ${({ width = "100%" }) => normalizeWidth(width)};
  display: inline-flex;

  & .button {
    width: 100%;
    min-height: 50px;
    padding: 14px 28px;
    border: 1px solid var(--ink);
    border-radius: 0;
    background-color: var(--ink);
    color: var(--paper);
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    line-height: 1.3;
    cursor: pointer;
    transition:
      background-color 0.25s ease,
      color 0.25s ease,
      opacity 0.25s ease;

    &:hover {
      background-color: transparent;
      color: var(--ink);
    }

    &:active {
      transform: translateY(1px);
    }

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
      background-color: var(--ink);
      color: var(--paper);
    }

    &.ghost {
      background-color: transparent;
      color: var(--ink);

      &:hover:not(:disabled) {
        background-color: var(--ink);
        color: var(--paper);
      }
    }
  }
`;
