import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const slides = [
  {
    eyebrow: "Новая коллекция · Осень–Зима 2026",
    title: "Тихая роскошь\nкаждого дня",
    text: "Пальто, костюмы и трикотаж из натуральных тканей. Вещи, которые остаются с вами дольше одного сезона.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1900&q=85",
  },
  {
    eyebrow: "Капсула · 12 предметов",
    title: "Соберите\nсвой гардероб",
    text: "Базовые вещи, которые сочетаются между собой без усилий. От образа на работу до вечера в городе.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1900&q=85",
  },
  {
    eyebrow: "Holly Garment · Минск",
    title: "Спокойная\nэлегантность",
    text: "Мы выбираем ткани, крои и оттенки, которые не спорят с вами, а подчёркивают.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1900&q=85",
  },
];

const MainWidgetContainer = ({ className, slide, onNext }) => {
  const navigate = useNavigate();

  return (
    <section className={className}>
      <img src={slide.image} alt="" className="hero-image" />
      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">{slide.eyebrow}</p>
        <h2>
          {slide.title.split("\n").map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </h2>
        <p className="hero-text">{slide.text}</p>
        <div className="hero-actions">
          <button type="button" onClick={() => navigate("/catalog")}>
            Смотреть коллекцию
          </button>
          <button
            type="button"
            className="ghost"
            onClick={() => navigate("/about-us")}
          >
            О бренде
          </button>
        </div>
      </div>

      <div className="hero-controls">
        <button type="button" className="hero-next" onClick={onNext}>
          Следующий образ
          <span aria-hidden="true">→</span>
        </button>
        <span className="hero-scroll">Листайте вниз</span>
      </div>
    </section>
  );
};

export const MainWidget = styled(MainWidgetContainer)`
  position: relative;
  width: 100%;
  min-height: clamp(480px, 72vh, 720px);
  overflow: hidden;
  background-color: var(--ink);

  & .hero-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    animation: heroZoom 12s ease-out both;
  }

  @keyframes heroZoom {
    from {
      transform: scale(1.06);
    }
    to {
      transform: scale(1);
    }
  }

  & .hero-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        90deg,
        rgba(18, 16, 12, 0.72) 0%,
        rgba(18, 16, 12, 0.34) 48%,
        rgba(18, 16, 12, 0.08) 100%
      ),
      linear-gradient(0deg, rgba(18, 16, 12, 0.32), transparent 40%);
  }

  & .hero-content {
    position: relative;
    z-index: 2;
    width: var(--page-width);
    margin: 0 auto;
    min-height: inherit;
    padding: clamp(56px, 8vw, 96px) 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 20px;
  }

  & .hero-eyebrow {
    color: rgba(246, 243, 236, 0.72);
  }

  & h2 {
    margin: 0;
    max-width: 760px;
    color: var(--paper);
    font-size: clamp(42px, 6.4vw, 96px);
    line-height: 1.02;
    letter-spacing: -0.02em;

    & span {
      display: block;
    }
  }

  & .hero-text {
    margin: 0;
    max-width: 460px;
    color: rgba(246, 243, 236, 0.78);
    font-size: clamp(14px, 1.2vw, 16px);
    line-height: 1.7;
  }

  & .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 14px;

    & button {
      min-height: 50px;
      padding: 14px 32px;
      border: 1px solid var(--paper);
      background-color: var(--paper);
      color: var(--ink);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      cursor: pointer;
      transition:
        background-color 0.25s ease,
        color 0.25s ease;

      &:hover {
        background-color: transparent;
        color: var(--paper);
      }

      &.ghost {
        background-color: transparent;
        color: var(--paper);

        &:hover {
          background-color: var(--paper);
          color: var(--ink);
        }
      }
    }
  }

  & .hero-controls {
    position: absolute;
    right: clamp(16px, 4vw, 64px);
    bottom: 36px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }

  & .hero-next {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 0;
    border: none;
    background: none;
    color: var(--paper);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;

    & span {
      transition: transform 0.2s ease;
    }

    &:hover span {
      transform: translateX(4px);
    }
  }

  & .hero-scroll {
    color: rgba(246, 243, 236, 0.5);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  @media (max-width: 992px) {
    min-height: 560px;

    & .hero-controls {
      right: 16px;
      bottom: 20px;
    }

    & .hero-scroll {
      display: none;
    }
  }

  @media (max-width: 576px) {
    min-height: 82vh;

    & .hero-content {
      padding: 48px 0 72px;
    }

    & .hero-actions button {
      flex: 1;
      padding: 14px 18px;
    }

    & .hero-controls {
      left: 0;
      right: 0;
      align-items: center;
    }
  }
`;

const AnimateMainWidgetContainer = ({ className }) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setPage((prev) => (prev + 1) % slides.length);

  return (
    <div className={className}>
      <div className="hero-stage">
        {slides.map((slide, index) => (
          <div
            key={slide.eyebrow}
            className={`hero-slide${index === page ? " active" : ""}`}
            aria-hidden={index !== page}
            inert={index !== page}
          >
            <MainWidget slide={slide} onNext={next} />
          </div>
        ))}
      </div>

      <div className="hero-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.eyebrow}
            type="button"
            className={index === page ? "active" : ""}
            aria-label={`Слайд ${index + 1}`}
            onClick={() => setPage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export const AnimateMainWidget = styled(AnimateMainWidgetContainer)`
  position: relative;
  width: 100%;

  & .hero-stage {
    position: relative;
  }

  & .hero-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.8s ease;
  }

  & .hero-slide.active {
    position: relative;
    opacity: 1;
    pointer-events: auto;
  }

  & .hero-dots {
    position: absolute;
    left: 50%;
    bottom: 22px;
    z-index: 3;
    display: flex;
    gap: 8px;
    transform: translateX(-50%);

    & button {
      width: 32px;
      height: 2px;
      padding: 0;
      border: none;
      background-color: rgba(246, 243, 236, 0.34);
      cursor: pointer;
      transition: background-color 0.25s ease;

      &.active {
        background-color: var(--paper);
      }
    }
  }

  @media (max-width: 576px) {
    & .hero-dots {
      bottom: 16px;
    }
  }
`;
