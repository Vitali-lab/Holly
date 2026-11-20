import styled from "styled-components";
import { Icon } from "../../components/icon/Icon";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { scrollTop } from "../../utils/scrollTop";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const DeliveryContainer = ({ className }) => {
  useEffect(() => {
    scrollTop();
  }, []);

  const deliveryMethods = [
    {
      title: "Курьерская доставка",
      description: "Доставка курьером по Минску в течение 1-2 рабочих дней",
      price: "Бесплатно при заказе от 200 руб.",
      icon: "truck",
    },
    {
      title: "Европочта",
      description: "Доставка через Европочту в любой регион страны",
      price: "Бесплатно при заказе от 200 руб. (срок доставки 2-5 дней)",
      icon: "envelope",
    },
    {
      title: "Белпочта",
      description: "Доставка через Белпочту по всей Беларуси",
      price: "Бесплатно при заказе от 200 руб. (срок доставки 2-5 дней)",
      icon: "truck",
    },
    {
      title: "Самовывоз",
      description: "Заберите заказ самостоятельно из нашего пункта выдачи",
      price: "Бесплатно",
      icon: "home",
    },
  ];

  const paymentMethods = [
    {
      title: "Онлайн оплата",
      description:
        "Банковской картой Visa, MasterCard, МИР через защищенный платежный шлюз",
      icon: "credit-card",
    },
    {
      title: "Наличными курьеру",
      description:
        "Оплата наличными при получении заказа (только для курьерской доставки)",
      icon: "money",
    },
    {
      title: "При получении",
      description:
        "Оплата наложенным платежом при получении в отделении почты",
      icon: "shopping-bag",
    },
  ];

  const faq = [
    {
      question: "Как отследить заказ?",
      answer:
        "После оформления заказа вы получите номер отслеживания на email. Также вы можете отследить статус заказа в личном кабинете.",
    },
    {
      question: "Можно ли изменить адрес доставки?",
      answer:
        "Да, вы можете изменить адрес доставки до момента отправки заказа. Свяжитесь с нами по телефону или email.",
    },
    {
      question: "Что делать, если товар не подошел?",
      answer:
        "Вы можете вернуть товар в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке и с бирками.",
    },
    {
      question: "Есть ли доставка в другие страны?",
      answer:
        "Сейчас мы доставляем по всей Беларуси. О доставке в другие страны уточняйте у наших менеджеров.",
    },
  ];

  return (
    <div className={className}>
      <header className="delivery-header">
        <p className="eyebrow">Сервис</p>
        <h1>Доставка и оплата</h1>
        <p>
          Отправляем заказы каждый день. По Минску — курьером за 1–2 дня, по
          Беларуси — Европочтой и Белпочтой.
        </p>
      </header>

      <motion.section
        className="delivery-section"
        initial="hidden"
        animate="visible"
      >
        <h2 className="block-title">Способы доставки</h2>
        <div className="methods-grid">
          {deliveryMethods.map((method, i) => (
            <motion.div
              key={method.title}
              className="method-card"
              custom={i}
              variants={fadeUp}
            >
              <span className="method-icon">
                <Icon id={method.icon} size="18" color="var(--ink)" />
              </span>
              <h3>{method.title}</h3>
              <p>{method.description}</p>
              <span className="price">{method.price}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="payment-methods"
        initial="hidden"
        animate="visible"
      >
        <h2 className="block-title">Способы оплаты</h2>
        <div className="methods-grid payment-grid">
          {paymentMethods.map((method, i) => (
            <motion.div
              key={method.title}
              className="method-card"
              custom={i + 4}
              variants={fadeUp}
            >
              <span className="method-icon">
                <Icon id={method.icon} size="18" color="var(--ink)" />
              </span>
              <h3>{method.title}</h3>
              <p>{method.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="faq-section" initial="hidden" animate="visible">
        <h2 className="block-title">Частые вопросы</h2>
        <div className="faq-list">
          {faq.map((item, i) => (
            <motion.div
              key={item.question}
              className="faq-item"
              custom={i + 7}
              variants={fadeUp}
            >
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.div
        className="contact-info"
        initial="hidden"
        animate="visible"
        custom={11}
        variants={fadeUp}
      >
        <div>
          <p className="eyebrow">Поддержка</p>
          <h2>Нужна помощь?</h2>
          <p>Ежедневно с 9:00 до 21:00 — по телефону, почте или в мессенджерах.</p>
        </div>
        <div className="contact-details">
          <a href="tel:+375291234567">+375 29 123-45-67</a>
          <a href="mailto:info@holly.by">info@holly.by</a>
        </div>
      </motion.div>
    </div>
  );
};

export const Delivery = styled(DeliveryContainer)`
  width: var(--page-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(48px, 6vw, 88px);

  & .delivery-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin: 0;
    }

    & h1 {
      margin: 0;
      font-size: clamp(38px, 5vw, 66px);
      line-height: 1;
    }

    & p {
      max-width: 520px;
      margin: 0;
      color: var(--grey-color);
      font-size: 14px;
      line-height: 1.8;
    }
  }

  & .block-title {
    padding-bottom: 20px;
    margin: 0 0 28px;
    border-bottom: 1px solid var(--line);
    font-size: clamp(22px, 2.4vw, 30px);
  }

  & .methods-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 28px);
  }

  & .payment-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  & .method-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 26px 22px;
    border: 1px solid var(--line);
    background-color: transparent;
    transition:
      border-color 0.25s ease,
      background-color 0.25s ease;

    &:hover {
      border-color: var(--line-strong);
      background-color: var(--surface);
    }

    & h3 {
      margin: 6px 0 0;
      font-family: var(--font-body);
      font-size: 15px;
      font-weight: 600;
    }

    & p {
      margin: 0;
      color: var(--grey-color);
      font-size: 12px;
      line-height: 1.7;
    }

    & .price {
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid var(--line);
      width: 100%;
      color: var(--ink);
      font-size: 12px;
      font-weight: 500;
    }
  }

  & .method-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--line-strong);
    border-radius: 50%;
  }

  & .faq-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 clamp(32px, 5vw, 80px);
  }

  & .faq-item {
    padding: 22px 0;
    border-top: 1px solid var(--line);

    & h3 {
      margin: 0 0 8px;
      font-family: var(--font-body);
      font-size: 15px;
      font-weight: 600;
    }

    & p {
      margin: 0;
      color: var(--grey-color);
      font-size: 13px;
      line-height: 1.75;
    }
  }

  & .contact-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 32px;
    padding: clamp(28px, 4vw, 52px);
    background-color: var(--paper-deep);

    & .eyebrow {
      margin-bottom: 12px;
    }

    & h2 {
      margin: 0 0 10px;
      font-size: clamp(26px, 3vw, 40px);
    }

    & p:not(.eyebrow) {
      max-width: 400px;
      margin: 0;
      color: var(--ink-soft);
      font-size: 13px;
      line-height: 1.7;
    }
  }

  & .contact-details {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;

    & a {
      color: var(--ink);
      font-family: var(--font-display);
      font-size: clamp(18px, 2vw, 24px);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 992px) {
    & .methods-grid,
    & .payment-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    & .faq-list {
      grid-template-columns: 1fr;
    }

    & .contact-info {
      flex-direction: column;
      align-items: flex-start;
    }

    & .contact-details {
      align-items: flex-start;
    }
  }

  @media (max-width: 576px) {
    & .methods-grid,
    & .payment-grid {
      grid-template-columns: 1fr;
    }
  }
`;
