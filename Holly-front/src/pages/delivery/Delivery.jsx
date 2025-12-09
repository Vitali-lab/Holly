import { useEffect } from 'react';
import { Icon } from '../../shared/ui';
import { motion } from 'framer-motion';
import { scrollTop } from '../../shared/utils/scrollTop';
import {
  DELIVERY_METHODS,
  PAYMENTS_METHODS,
  FAQ,
  PHONE_NUMBER,
  EMAIL,
} from '../../shared/config/appInfo';
import styled from 'styled-components';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const DeliveryContainer = ({ className }) => {
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className={className}>
      <motion.section className="delivery-section" initial="hidden" animate="visible">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Доставка и оплата 📦
        </motion.h2>

        <motion.div className="delivery-methods" initial="hidden" animate="visible">
          <h3>Способы доставки</h3>
          <div className="methods">
            {DELIVERY_METHODS.map((method, i) => (
              <motion.div key={i} className="method-card" custom={i} variants={fadeUp}>
                <Icon id={method.icon} />
                <h4>{method.title}</h4>
                <p>{method.description}</p>
                <span className="price">{method.price}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="payment-methods" initial="hidden" animate="visible">
          <h3>Способы оплаты</h3>
          <div className="methods">
            {PAYMENTS_METHODS.map((method, i) => (
              <motion.div key={i} className="method-card" custom={i + 4} variants={fadeUp}>
                <Icon id={method.icon} />
                <h4>{method.title}</h4>
                <p>{method.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="faq-section" initial="hidden" animate="visible">
          <h3>Часто задаваемые вопросы</h3>
          <div className="faq-list">
            {FAQ.map((item, i) => (
              <motion.div key={i} className="faq-item" custom={i + 7} variants={fadeUp}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="contact-info"
          initial="hidden"
          animate="visible"
          custom={11}
          variants={fadeUp}
        >
          <h3>Нужна помощь?</h3>
          <p>Наша служба поддержки работает ежедневно с 9:00 до 21:00</p>
          <div className="contact-details">
            <p>
              <strong>Телефон:</strong> {PHONE_NUMBER}
            </p>
            <p>
              <strong>Email:</strong> {EMAIL}
            </p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export const Delivery = styled(DeliveryContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0;
  background: transparent;
  border-radius: 20px;
  margin-top: 20px;
  min-height: 600px;

  .delivery-section {
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  h2 {
    font-size: 30px;
    font-weight: 700;
    color: #1f2937;
    text-align: center;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 24px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 24px;
    text-align: center;
  }

  h4 {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 12px;
  }

  .methods {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    gap: 24px;
    margin-bottom: 20px;
  }

  .method-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 34px;
    text-align: center;
    transition: all 0.3s ease;

    & i {
      font-size: 48px;
      color: #545454ff;
      margin-bottom: 16px;
      display: block;
    }

    h4 {
      font-size: 18px;
      margin-bottom: 12px;
    }

    p {
      font-size: 15px;
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .price {
      font-size: 1rem;
      font-weight: 600;
      color: #000000ff;
      display: block;
      margin-top: 8px;
    }
  }

  .faq-section {
    margin-top: 20px;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .faq-item {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s ease;

    h4 {
      font-size: 17px;
      margin-bottom: 8px;
      color: var(--black-color);
    }

    p {
      font-size: 15px;
      color: var(--gray-color);
      line-height: 1.6;
      margin: 0;
    }
  }

  .contact-info {
    border-radius: 16px;
    padding: 32px;
    text-align: center;
    color: black;
    margin-top: 20px;

    h3 {
      color: black;
      margin-bottom: 16px;
    }

    p {
      font-size: 1rem;
      line-height: 1.8;
      margin-bottom: 12px;
      color: var(--black-color);
    }

    .contact-details {
      margin-top: 20px;

      p {
        font-size: 17px;
        margin-bottom: 8px;

        strong {
          font-weight: 600;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 40px 20px;

    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.5rem;
    }

    .methods {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    .method-card {
      padding: 20px;
    }

    .contact-info {
      padding: 24px;
    }
  }
  @media (max-width: 450px) {
    width: min(390px, 100%);
    margin: 100px auto;
    padding: 0px;
    & .methods {
      width: min(390px, 100%);
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    h2 {
      font-size: 35px;
    }
    h3 {
      font-size: 26px;
    }
  }
`;
