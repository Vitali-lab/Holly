import styled from 'styled-components';
import { RecentlyViewed } from '../../components/recently-viewed/RecentlyViewed';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnimateMainWidget } from './components/MainWidget';
import { ProductsWiget } from './components/ProductsWiget';
import { categorySelector } from '../../selectors';

const categoryShowcase = [
  {
    id: '2',
    title: 'Верхняя одежда',
    image:
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '3',
    title: 'Платья',
    image:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'a029',
    title: 'Джинсы',
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '7',
    title: 'Сумки',
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80',
  },
];

const benefits = [
  {
    title: 'Доставка за 1–2 дня',
    text: 'Курьером по Минску и Европочтой по всей Беларуси.',
  },
  {
    title: 'Возврат 14 дней',
    text: 'Если вещь не подошла — вернём деньги без лишних вопросов.',
  },
  {
    title: 'Натуральные ткани',
    text: 'Шерсть, хлопок, лён и кожа от проверенных поставщиков.',
  },
];

const MainContainer = ({ className }) => {
  const categories = useSelector(categorySelector);
  const navigate = useNavigate();

  const getCategoryTitle = (id, fallback) =>
    categories?.find((category) => category.id === id)?.name || fallback;

  return (
    <div className={className}>
      <AnimateMainWidget />

      <div className="sections">
        <section className="benefits">
          {benefits.map((benefit, index) => (
            <div className="benefit" key={benefit.title}>
              <span className="benefit-index">0{index + 1}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </div>
          ))}
        </section>

        <section className="categories">
          <header className="section-header">
            <div>
              <p className="eyebrow">Каталог</p>
              <h2 className="section-title">Выберите своё</h2>
            </div>
            <p className="section-note">
              Четыре направления, из которых собирается весь гардероб.
            </p>
          </header>

          <div className="category-grid">
            {categoryShowcase.map((category, index) => (
              <button
                type="button"
                className="category-card"
                key={category.id}
                onClick={() => navigate('/catalog')}
              >
                <img
                  src={category.image}
                  alt={getCategoryTitle(category.id, category.title)}
                  loading="lazy"
                />
                <span className="category-overlay" />
                <span className="category-label">
                  <span className="category-index">0{index + 1}</span>
                  <span className="category-title">
                    {getCategoryTitle(category.id, category.title)}
                  </span>
                  <span className="category-arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <ProductsWiget />

        <section className="collection">
          <div className="collection-media">
            <img
              src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1400&q=85"
              alt="Коллекция Autumn Winter"
              loading="lazy"
            />
          </div>
          <div className="collection-copy">
            <p className="eyebrow">Коллекция · AW 2026</p>
            <h2>
              Вещи, которые
              <br />
              переживут сезон
            </h2>
            <p>
              Мы не гонимся за трендами. В новой коллекции — плотная шерсть,
              спокойные оттенки и силуэты, которые остаются уместными и через
              год, и через пять.
            </p>
            <button type="button" onClick={() => navigate('/catalog')}>
              Смотреть коллекцию
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        <RecentlyViewed />
      </div>
    </div>
  );
};

export const Main = styled(MainContainer)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;

  & .sections {
    width: var(--page-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: clamp(64px, 9vw, 120px);
    padding-top: clamp(48px, 6vw, 88px);
  }

  & .benefits {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(20px, 3vw, 48px);
    padding-bottom: clamp(32px, 4vw, 56px);
    border-bottom: 1px solid var(--line-strong);
  }

  & .benefit {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 20px;
    border-right: 1px solid var(--line);

    &:last-child {
      border-right: none;
    }

    & h3 {
      margin: 0;
      font-family: var(--font-body);
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.01em;
    }

    & p {
      margin: 0;
      max-width: 280px;
      color: var(--grey-color);
      font-size: 13px;
      line-height: 1.7;
    }
  }

  & .benefit-index {
    color: var(--grey-color);
    font-family: var(--font-display);
    font-size: 13px;
  }

  & .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 32px;
    padding-bottom: 24px;
    margin-bottom: 32px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin-bottom: 10px;
    }
  }

  & .section-note {
    margin: 0;
    max-width: 300px;
    color: var(--grey-color);
    font-size: 13px;
    line-height: 1.7;
    text-align: right;
  }

  & .category-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(12px, 1.6vw, 22px);
  }

  & .category-card {
    position: relative;
    display: block;
    aspect-ratio: 3 / 4;
    padding: 0;
    border: none;
    overflow: hidden;
    background-color: var(--paper-deep);
    cursor: pointer;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  & .category-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      0deg,
      rgba(18, 16, 12, 0.62) 0%,
      rgba(18, 16, 12, 0.06) 55%
    );
  }

  & .category-label {
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    color: var(--paper);
    text-align: left;
  }

  & .category-index {
    font-size: 10px;
    letter-spacing: 0.2em;
    opacity: 0.6;
  }

  & .category-title {
    font-family: var(--font-display);
    font-size: clamp(18px, 1.8vw, 24px);
    line-height: 1.2;
  }

  & .category-arrow {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 18px;
    transition: transform 0.25s ease;
  }

  & .category-card:hover .category-arrow {
    transform: translateX(4px);
  }

  & .collection {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    min-height: 460px;
    background-color: var(--paper-deep);
  }

  & .collection-media {
    overflow: hidden;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & .collection-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 18px;
    padding: clamp(32px, 5vw, 72px);

    & h2 {
      margin: 0;
      font-size: clamp(30px, 3.6vw, 52px);
      line-height: 1.08;
    }

    & p:not(.eyebrow) {
      margin: 0;
      max-width: 420px;
      font-size: 14px;
      line-height: 1.75;
      color: var(--ink-soft);
    }

    & button {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-top: 14px;
      padding: 0 0 5px;
      border: none;
      border-bottom: 1px solid var(--ink);
      background: none;
      color: var(--ink);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      cursor: pointer;
      transition: gap 0.2s ease;

      &:hover {
        gap: 16px;
      }
    }
  }

  @media (max-width: 992px) {
    & .category-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    & .collection {
      grid-template-columns: 1fr;
    }

    & .collection-media {
      min-height: 340px;
    }
  }

  @media (max-width: 768px) {
    & .benefits {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    & .benefit {
      padding: 0 0 20px;
      border-right: none;
      border-bottom: 1px solid var(--line);

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
    }

    & .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    & .section-note {
      text-align: left;
    }
  }

  @media (max-width: 576px) {
    & .category-grid {
      grid-template-columns: 1fr;
    }

    & .collection-copy {
      padding: 32px 20px 36px;
    }
  }
`;
