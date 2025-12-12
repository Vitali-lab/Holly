import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../features/orders/orders';
import { userOrdersSelector, userSelector } from '../../entities/selectors';
import { ComplitedUserOrders } from './components/ComplitedOrders';
import { UnprocessedUserOrders } from './components/UnprocessedOrders';
import styled from 'styled-components';

const UserCabinetContainer = ({ className }) => {
  const currentUser = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders(currentUser?.id));
  }, [dispatch, currentUser?.id]);

  const orders = useSelector(userOrdersSelector);
  const userOrders = orders.filter((order) => order.userId === currentUser?.id);

  if (!currentUser) {
    return (
      <div className={className}>
        <div className="auth-required">
          <div className="auth-icon">🔐</div>
          <h2>Вход в аккаунт</h2>
          <p>Войдите в систему, чтобы просмотреть свои заказы</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="user-header">
        <div className="welcome-section">
          <div className="user-avatar">
            <span>{currentUser.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="user-info">
            <h1>Добро пожаловать, {currentUser.name}!</h1>
            <p>Здесь вы можете отслеживать свои заказы и историю покупок</p>
          </div>
        </div>
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <span className="stat-number">{userOrders.length}</span>
              <p className="stat-label">Всего заказов</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚚</div>
            <div className="stat-info">
              <span className="stat-number">
                {
                  userOrders.filter(
                    (order) =>
                      order.status === 'created' ||
                      order.status === 'confirmed' ||
                      order.status === 'delivery'
                  ).length
                }
              </span>
              <p className="stat-label">В работе</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-number">
                {userOrders.filter((order) => order.status === 'completed').length}
              </span>
              <p className="stat-label">Завершено</p>
            </div>
          </div>
        </div>
      </div>

      {userOrders.length > 0 ? (
        <div className="orders-section">
          <UnprocessedUserOrders userOrders={userOrders} />
          <ComplitedUserOrders userOrders={userOrders} />
        </div>
      ) : (
        <div className="empty-orders">
          <div className="empty-icon">🛒</div>
          <h2>У вас пока нет заказов</h2>
          <p>Перейдите в каталог и сделайте свой первый заказ!</p>
          <button className="shop-button" onClick={() => (window.location.href = '/catalog')}>
            Перейти в каталог
          </button>
        </div>
      )}
    </div>
  );
};

export const UserCabinet = styled(UserCabinetContainer)`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background: var(--background-color);

  & .auth-required {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

    & .auth-icon {
      font-size: 4rem;
      margin-bottom: 20px;
    }

    & h2 {
      font-size: 2rem;
      color: var(--black-color);
      margin-bottom: 10px;
    }

    & p {
      color: var(--grey-color);
      font-size: 1.1rem;
    }
  }

  & .user-header {
    background: var(--white-color);
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 30px;
  }

  & .welcome-section {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;

    & .user-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: var(--main-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      font-weight: 700;
      box-shadow: var(--box-shadow);
    }

    & .user-info {
      & h1 {
        font-size: 25px;
        color: var(--black-color);
        margin-bottom: 10px;
        font-weight: 700;
      }

      & p {
        color: var(--grey-color);
        font-size: 20px;
        margin: 0;
      }
    }
  }

  & .stats-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  & .stat-card {
    background: var(--white-color);
    border-radius: 15px;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    color: black;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    & .stat-icon {
      font-size: 29px;
      border-right: 1px solid var(--main-color);
      padding-right: 15px;
    }

    & .stat-info {
      display: flex;
      flex-direction: column;

      & .stat-number {
        font-size: 30px;
        font-weight: 700;
        line-height: 1;
        margin-bottom: 2px;
      }

      & .stat-label {
        font-size: 17px;
        margin: 0;
        color: var(--grey-color);
      }
    }
  }

  & .empty-orders {
    background: white;
    border-radius: 20px;
    padding: 60px 40px;
    text-align: center;
    box-shadow: var(--box-shadow);

    & .empty-icon {
      font-size: 30px;
      margin-bottom: 20px;
    }

    & h2 {
      font-size: 25px;
      color: var(--black-color);
      margin-bottom: 10px;
    }

    & p {
      color: var(--grey-color);
      font-size: 25px;
      margin-bottom: 30px;
    }

    & .shop-button {
      background: var(--main-color);
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
      }
    }
  }

  & .orders-section {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  @media (max-width: 1024px) {
    & .user-header {
      padding: 25px;
    }

    & .welcome-section {
      flex-direction: column;
      text-align: center;
      gap: 15px;
    }
  }

  @media (max-width: 768px) {
    padding: 15px;

    & .user-header {
      padding: 20px;
    }

    & .welcome-section {
      & .user-avatar {
        width: 60px;
        height: 60px;
        font-size: 1.5rem;
      }

      & .user-info h1 {
        font-size: 1.8rem;
      }
    }

    & .stats-section {
      gap: 15px;
    }

    & .stat-card {
      padding: 15px;

      & .stat-icon {
        font-size: 1.5rem;
      }

      & .stat-info .stat-number {
        font-size: 1.5rem;
      }
    }

    & .empty-orders {
      padding: 40px 20px;

      & .empty-icon {
        font-size: 3rem;
      }

      & h2 {
        font-size: 1.5rem;
      }
    }
  }

  @media (max-width: 576px) {
    padding: 12px;

    & .user-header {
      padding: 15px;
      margin-bottom: 20px;
    }

    & .welcome-section .user-info h1 {
      font-size: 16px;
    }

    & .stat-card {
      padding: 12px;

      & .stat-info .stat-number {
        font-size: 18px;
      }
    }

    & .empty-orders {
      padding: 30px 15px;

      & h2 {
        font-size: 1.3rem;
      }

      & .shop-button {
        padding: 12px 24px;
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 480px) {
    width: min(400px, 96%);
    padding: 0px;
    margin: 120px auto;
    margin-bottom: 100px;
    & .user-header {
      padding: 12px;
    }

    & .welcome-section {
      & .user-avatar {
        width: 50px;
        height: 50px;
        font-size: 19px;
      }

      & .user-info h1 {
        font-size: 25px;
      }

      & .user-info p {
        font-size: 14px;
      }
    }

    & .stats-section {
      gap: 10px;
    }
    & .stat-label {
      font-size: 10px;
    }
    & .stat-card {
      flex-direction: column;
      text-align: center;
      padding: 10px;

      & .stat-icon {
        margin-bottom: 5px;
      }
    }

    & .auth-required {
      padding: 30px 20px;

      & .auth-icon {
        font-size: 3rem;
      }

      & h2 {
        font-size: 1.5rem;
      }
    }
  }

  @media (max-width: 320px) {
    padding: 8px;

    & .user-header {
      padding: 10px;
      margin-bottom: 15px;
    }

    & .welcome-section {
      & .user-avatar {
        width: 45px;
        height: 45px;
        font-size: 1.1rem;
      }

      & .user-info h1 {
        font-size: 1.2rem;
      }

      & .user-info p {
        font-size: 0.9rem;
      }
    }

    & .stat-card {
      padding: 12px 8px;

      & .stat-info .stat-number {
        font-size: 1.1rem;
      }

      & .stat-info .stat-label {
        font-size: 0.8rem;
      }
    }

    & .empty-orders {
      padding: 25px 10px;

      & .empty-icon {
        font-size: 2.5rem;
      }

      & h2 {
        font-size: 1.2rem;
      }

      & .shop-button {
        padding: 10px 20px;
        font-size: 0.8rem;
      }
    }

    & .auth-required {
      padding: 25px 15px;

      & h2 {
        font-size: 1.3rem;
      }
    }
  }
`;
