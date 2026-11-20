import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/icon/Icon";
import { Button } from "../../components/button/Button";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { scrollTop } from "../../utils/scrollTop";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const AboutUsContainer = ({ className }) => {
  const navigate = useNavigate();

  const values = [
    {
      icon: "heart",
      title: "Качество",
      description:
        "Тщательный отбор каждой модели. Мы работаем только с проверенными производителями и материалами премиум-класса.",
    },
    {
      icon: "star",
      title: "Стиль",
      description:
        "Актуальные тренды и вневременная классика. Коллекции, которые подчёркивают вашу индивидуальность.",
    },
    {
      icon: "users",
      title: "Забота",
      description:
        "Мы ценим каждого клиента. Персональный подход, быстрая доставка и внимательная служба поддержки.",
    },
    {
      icon: "diamond",
      title: "Доступность",
      description:
        "Качественная мода по честным ценам. Прямые поставки от производителей без наценок посредников.",
    },
  ];

  const stats = [
    { number: "1K+", label: "Довольных клиентов" },
    { number: "500+", label: "Моделей одежды" },
    { number: "50+", label: "Городов доставки" },
    { number: "24/7", label: "Поддержка клиентов" },
  ];

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className={className}>
      <section className="main-section">
        <motion.div className="hero-content" initial="hidden" animate="visible">
          <motion.p
            className="eyebrow"
            custom={0}
            variants={fadeUp}
          >
            О бренде · Holly Garment
          </motion.p>
          <motion.h1 custom={1} variants={fadeUp}>
            Одежда, которая
            <br />
            не спорит с вами
          </motion.h1>
          <motion.p className="main-subtitle" custom={2} variants={fadeUp}>
            Добро пожаловать в Holly — онлайн-пространство, где женская мода
            встречается с комфортом, вниманием к деталям и любовью к стилю. Мы
            создаём одежду, которая подчёркивает индивидуальность, вдохновляет
            на перемены и помогает чувствовать себя уверенно каждый день.
          </motion.p>
          <motion.div custom={3} variants={fadeUp}>
            <Button width="240px" onClick={() => navigate("/catalog")}>
              Смотреть каталог
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="about-image"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85"
            alt="Holly Garment"
          />
          <span>Минск · с 2019 года</span>
        </motion.div>
      </section>

      <section className="values-section">
        <motion.div
          className="section-head"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="eyebrow">Принципы</p>
          <h2>Наши ценности</h2>
        </motion.div>

        <div className="values-grid">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              className="value-card"
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="value-top">
                <span className="value-index">0{i + 1}</span>
                <span className="value-icon">
                  <Icon id={value.icon} size="18" color="currentColor" />
                </span>
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mission-section">
        <motion.div
          className="mission-content"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="eyebrow">Миссия</p>
          <h2>
            Holly — это не просто одежда.
            <br />
            Это настроение. Это ты.
          </h2>
          <p>
            Мы верим, что каждая женщина заслуживает чувствовать себя красивой,
            уверенной и стильной. Наша цель — сделать качественную моду
            доступной для всех, сохраняя высокие стандарты качества и внимания к
            деталям. Мы работаем напрямую с производителями и вручную отбираем
            каждую модель, чтобы вещь приносила радость — не только в день
            покупки.
          </p>
        </motion.div>
      </section>

      <section className="social-section">
        <div className="social-content">
          <h2>Присоединяйтесь</h2>
          <p>
            Новинки, образы и закрытые распродажи — в наших социальных сетях.
          </p>
          <div className="social-icons">
            <a href="#" className="social-link" aria-label="Instagram">
              <Icon id="instagram" size="16" color="var(--ink)" />
            </a>
            <a href="#" className="social-link" aria-label="VK">
              <Icon id="vk" size="16" color="var(--ink)" />
            </a>
            <a href="#" className="social-link" aria-label="Telegram">
              <Icon id="telegram" size="16" color="var(--ink)" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export const AboutUs = styled(AboutUsContainer)`
  width: var(--page-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(56px, 8vw, 110px);

  & .main-section {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(32px, 5vw, 80px);
    align-items: center;
  }

  & .hero-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

    & .eyebrow {
      margin: 0;
    }

    & h1 {
      margin: 0;
      font-size: clamp(38px, 5vw, 72px);
      line-height: 1.02;
    }
  }

  & .main-subtitle {
    max-width: 560px;
    margin: 0;
    color: var(--ink-soft);
    font-size: clamp(14px, 1.2vw, 16px);
    line-height: 1.8;
  }

  & .about-image {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background-color: var(--paper-deep);

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & span {
      position: absolute;
      left: 18px;
      bottom: 18px;
      padding: 6px 12px;
      background-color: var(--paper);
      color: var(--ink);
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }
  }

  & .section-head {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 24px;
    margin-bottom: 32px;
    border-bottom: 1px solid var(--line-strong);

    & h2 {
      margin: 0;
      font-size: clamp(28px, 3.4vw, 46px);
    }
  }

  & .values-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(14px, 1.6vw, 20px);
  }

  & .value-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    min-height: clamp(220px, 22vw, 280px);
    padding: clamp(24px, 3vw, 40px);
    border: 1px solid var(--line);
    color: var(--ink);
    background-color: transparent;
    transition:
      background-color 0.35s ease,
      border-color 0.35s ease,
      color 0.35s ease;

    &:hover {
      border-color: var(--ink);
      background-color: var(--ink);
      color: var(--paper);

      & p {
        color: rgba(246, 243, 236, 0.62);
      }

      & .value-icon {
        border-color: rgba(246, 243, 236, 0.4);
      }
    }

    & .value-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }

    & .value-index {
      font-family: var(--font-display);
      font-size: clamp(34px, 4vw, 52px);
      line-height: 0.9;
      opacity: 0.4;
    }

    & .value-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border: 1px solid var(--line-strong);
      border-radius: 50%;
      transition: border-color 0.35s ease;
    }

    & h3 {
      margin: auto 0 0;
      padding-top: 24px;
      font-size: clamp(22px, 2.4vw, 30px);
    }

    & p {
      margin: 0;
      max-width: 420px;
      color: var(--grey-color);
      font-size: 13px;
      line-height: 1.75;
      transition: color 0.35s ease;
    }
  }

  & .stats-section {
    padding: clamp(24px, 3vw, 40px) 0;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  & .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }

  & .stat-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  & .stat-number {
    font-family: var(--font-display);
    font-size: clamp(34px, 4vw, 54px);
    line-height: 1;
  }

  & .stat-label {
    color: var(--grey-color);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  & .mission-section {
    padding: clamp(36px, 5vw, 72px);
    background-color: var(--ink);
    color: var(--paper);
  }

  & .mission-content {
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-width: 860px;

    & .eyebrow {
      color: rgba(246, 243, 236, 0.5);
    }

    & h2 {
      margin: 0;
      color: var(--paper);
      font-size: clamp(28px, 3.6vw, 52px);
      line-height: 1.15;
    }

    & p:not(.eyebrow) {
      max-width: 620px;
      margin: 0;
      color: rgba(246, 243, 236, 0.68);
      font-size: 14px;
      line-height: 1.8;
    }
  }

  & .social-section {
    display: flex;
    justify-content: center;
    padding-bottom: clamp(16px, 3vw, 32px);
  }

  & .social-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;

    & h2 {
      margin: 0;
      font-size: clamp(28px, 3vw, 40px);
    }

    & p {
      margin: 0 0 10px;
      color: var(--grey-color);
      font-size: 13px;
    }
  }

  & .social-icons {
    display: flex;
    gap: 12px;
  }

  & .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--line-strong);
    border-radius: 50%;
    text-decoration: none;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;

    &:hover {
      border-color: var(--ink);
      background-color: var(--paper-deep);
    }
  }

  @media (max-width: 992px) {
    & .main-section {
      grid-template-columns: 1fr;
    }

    & .about-image {
      aspect-ratio: 16 / 10;
    }

    & .values-grid,
    & .stats-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 576px) {
    & .values-grid,
    & .stats-grid {
      grid-template-columns: 1fr;
    }
  }
`;
