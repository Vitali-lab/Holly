import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProductCard } from "../../../components/product-card/ProductCard";

const ProductsWigetContainer = ({ className }) => {
  const products = useSelector((state) => state.products.products);
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <header className="section-header">
        <div>
          <p className="eyebrow">Выбор редакции</p>
          <h2 className="section-title">Избранное сезона</h2>
        </div>
        <button type="button" onClick={() => navigate("/catalog")}>
          Весь каталог
          <span aria-hidden="true">→</span>
        </button>
      </header>

      <div className="grid">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} post={product} />
        ))}
      </div>
    </section>
  );
};

export const ProductsWiget = styled(ProductsWigetContainer)`
  width: 100%;

  & .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line-strong);
    margin-bottom: 32px;

    & .eyebrow {
      margin-bottom: 10px;
    }

    & button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 0 0 4px;
      border: none;
      border-bottom: 1px solid var(--ink);
      background: none;
      color: var(--ink);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      white-space: nowrap;
      cursor: pointer;
      transition: gap 0.2s ease;

      &:hover {
        gap: 14px;
      }
    }
  }

  & .grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(16px, 2.2vw, 32px);
  }

  @media (max-width: 992px) {
    & .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 24px 16px;
    }
  }

  @media (max-width: 576px) {
    & .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }
`;
