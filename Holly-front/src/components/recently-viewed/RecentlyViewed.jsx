import styled from "styled-components";
import { ProductsSlider } from "../slider/Slider";
import { pluralize } from "../../utils/pluralize";

const RecentlyViewedContainer = ({ className }) => {
  let views = [];

  if (sessionStorage.getItem("products")) {
    views = JSON.parse(sessionStorage.getItem("products"));
  }

  return (
    <section className={className}>
      <header className="section-header">
        <div>
          <p className="eyebrow">История</p>
          <h2 className="section-title">Недавно просмотренные</h2>
        </div>
        {views.length > 0 && (
          <span className="count">
            {views.length} {pluralize(views.length, ["вещь", "вещи", "вещей"])}
          </span>
        )}
      </header>

      {views.length === 0 ? (
        <div className="nothing">
          <p>Здесь появятся вещи, которые вы открывали.</p>
        </div>
      ) : (
        <ProductsSlider key={views.id} products={views.slice(0, 8)} />
      )}
    </section>
  );
};

export const RecentlyViewed = styled(RecentlyViewedContainer)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: transparent;

  & .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    padding-bottom: 24px;
    margin-bottom: 32px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin-bottom: 10px;
    }
  }

  & .count {
    color: var(--grey-color);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  & .nothing {
    display: flex;
    align-items: center;
    padding: 32px 0 8px;

    & p {
      margin: 0;
      color: var(--grey-color);
      font-size: 14px;
    }
  }

  @media (max-width: 576px) {
    & .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }
  }
`;
