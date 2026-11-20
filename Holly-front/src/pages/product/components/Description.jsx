import styled from "styled-components";

const DescriptionContainer = ({ className, product }) => {
  if (!product?.description) {
    return (
      <div className={className}>
        <p className="eyebrow">Описание</p>
        <h2>Детали</h2>
        <div className="description empty">Описание отсутствует</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="eyebrow">Описание</p>
      <h2>Детали</h2>
      <div className="description">{product.description}</div>
    </div>
  );
};

export const Description = styled(DescriptionContainer)`
  display: flex;
  flex-direction: column;
  gap: 14px;

  & .eyebrow {
    margin: 0;
  }

  & h2 {
    margin: 0;
    font-size: clamp(24px, 2.4vw, 32px);
  }

  & .description {
    max-width: 620px;
    margin-top: 6px;
    color: var(--ink-soft);
    font-size: 14px;
    line-height: 1.8;
    white-space: pre-line;
    word-break: break-word;

    &.empty {
      color: var(--grey-color);
    }
  }

  @media (max-width: 768px) {
    & .description {
      font-size: 13px;
    }
  }
`;
