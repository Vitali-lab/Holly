import { useEffect } from 'react';
import { scrollTop } from '../../shared/utils/scrollTop';
import { SocialNetworks, Icon } from '../../shared/ui';
import {
  ABOUT_US_MAIN_TEXT,
  ABOUT_US_VALUES,
  ABOUT_US_MISSION,
  ABOUT_US_STATS,
} from '../../shared/config/appInfo';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import styled from 'styled-components';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const AboutUsContainer = ({ className }) => {
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className={className}>
      <motion.section className="main-section" initial="hidden" animate="visible">
        <motion.div className="hero-content" variants={scaleIn}>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="main-title"
          >
            О нас
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="main-subtitle"
          >
            {ABOUT_US_MAIN_TEXT}
          </motion.p>
        </motion.div>
      </motion.section>

      <motion.section className="about-us-values-section" initial="hidden" animate="visible">
        <motion.h2 custom={0} variants={fadeUp} className="section-title">
          Наши ценности
        </motion.h2>
        <div className="about-us-values">
          {ABOUT_US_VALUES.map((value, i) => (
            <motion.div
              key={i}
              className="value-card"
              custom={i + 1}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="icon-wrapper">
                <Icon id={value.icon} />
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="stats-section" initial="hidden" animate="visible">
        <div className="stats-grid">
          {ABOUT_US_STATS.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-card"
              custom={i}
              variants={fadeUp}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mission-section" initial="hidden" animate="visible">
        <motion.div className="mission-content" custom={0} variants={fadeUp}>
          <h2>Наша миссия</h2>
          <p className="mission-text">
            <strong>{ABOUT_US_MISSION.title}</strong>
          </p>
          <p>
            <strong>{ABOUT_US_MISSION.text}</strong>
          </p>
        </motion.div>
      </motion.section>

      <motion.section className="social-section" initial="hidden" animate="visible">
        <motion.div className="social-content" custom={0} variants={fadeUp}>
          <h2>Присоединяйтесь к нам</h2>
          <p>Следите за новинками, акциями и вдохновляющими образами в наших социальных сетях</p>
          <SocialNetworks />
        </motion.div>
      </motion.section>
    </div>
  );
};

export const AboutUs = styled(AboutUsContainer)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin-top: 20px;
  overflow: hidden;

  .main-section {
    position: relative;
    width: 100%;
    min-height: 400px;

    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 60px;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.3;
    }

    .main-content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 60px 40px;
      max-width: 800px;
    }

    .main-title {
      text-align: center;
      font-size: 4rem;
      font-weight: 700;
      color: rgba(52, 52, 52, 0.95);
      margin-bottom: 24px;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .main-subtitle {
      font-size: 20px;
      color: rgba(52, 52, 52, 0.95);
      text-align: center;
      line-height: 1.8;
      font-weight: 300;
      width: 70%;
      margin: 0 auto;
    }
  }

  .about-us-values-section {
    padding: 60px 40px;

    margin-bottom: 60px;

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      text-align: center;
      margin-bottom: 50px;
    }

    .about-us-values {
      display: flex;
      justify-content: center;
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .value-card {
      background: white;

      border-radius: 16px;
      padding: 40px 32px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 1px solid #e5e7eb;

      .icon-wrapper {
        width: 80px;
        height: 80px;
        margin: 0 auto 24px;
        background: #595858ff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 36px;
          color: white;
        }
      }

      h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 16px;
      }

      p {
        font-size: 1rem;
        line-height: 1.7;
        color: #6b7280;
      }
    }
  }

  .stats-section {
    padding: 80px 40px;

    margin-bottom: 60px;
    border-radius: 20px;

    .stats-grid {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .stat-card {
      text-align: center;
      color: black;

      .stat-number {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 12px;
        text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        color: var(--main-color);
      }

      .stat-label {
        font-size: 1.1rem;
        opacity: 0.9;

        font-weight: 500;
      }
    }
  }

  .mission-section {
    padding: 80px 40px;

    border-radius: 20px;
    margin-bottom: 60px;
    text-align: center;

    .mission-content {
      max-width: 800px;
      margin: 0 auto;

      h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #121212ff;
        margin-bottom: 32px;
      }

      .mission-text {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f1f1fff;
        margin-bottom: 24px;
        line-height: 1.6;

        strong {
          font-size: 1.8rem;
        }
      }

      p {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #292929ff;
      }
    }
  }

  .social-section {
    padding: 60px 40px;
    text-align: center;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    .hero-section {
      min-height: 300px;
      margin-bottom: 40px;

      .hero-content {
        padding: 40px 20px;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }
    }

    .story-section,
    .ABOUT_US_VALUES-section,
    .team-section,
    .mission-section,
    .social-section {
      padding: 40px 20px;
    }

    .story-section h2,
    .ABOUT_US_VALUES-section .section-title,
    .team-section .section-title,
    .mission-section h2,
    .social-section h2 {
      font-size: 2rem;
    }

    .ABOUT_US_VALUES-grid,
    .team-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .stats-section {
      padding: 60px 20px;
    }

    .stat-card .stat-number {
      font-size: 2.5rem;
    }

    .social-icons {
      gap: 20px;
    }

    .social-link {
      width: 60px;
      height: 60px;

      i {
        font-size: 28px;
      }
    }
  }

  @media (max-width: 480px) {
    width: min(390px, 100%);
    margin: 100px auto;
    & .main-title {
      width: min(390px, 100%);
    }
    & .about-us-values {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .stats-grid {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
