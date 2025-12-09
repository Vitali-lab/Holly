import { correctDate } from '../../../shared/utils/correctDate';
import { ORDER_STATUS } from '../../../shared/config/appInfo';
import { OrderProduct } from './OrderProduct';
import styled from 'styled-components';

const UnprocessedUserOrdersContainer = ({ className, userOrders }) => {
  const unprocessedUserOrders = () => {
    return userOrders.filter(
      (order) =>
        order.status === 'created' || order.status === 'confirmed' || order.status === 'delivery'
    );
  };

  const getStatusColor = (status) => {
    if (status === 'created') {
      return '#f59e0b';
    } else if (status === 'confirmed') {
      return '#3b82f6';
    } else if (status === 'delivery') {
      return '#10b981';
    }
  };

  return (
    <div className={className}>
      <div className="section-header">
        <h2>Заказы в работе</h2>
        <div className="order-count">
          <span className="count">{unprocessedUserOrders().length}</span>
        </div>
      </div>

      {unprocessedUserOrders().length > 0 ? (
        <div className="orders">
          {unprocessedUserOrders().map((item) => {
            return (
              <div key={item.orderNum} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Заказ #{item.orderNum}</h3>
                    <p className="order-date">{correctDate(item.createdAt)}</p>
                  </div>
                  <div
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(item.status) }}
                  >
                    {ORDER_STATUS[item.status]}
                  </div>
                </div>

                <div className="order-details">
                  <div className="detail-item">
                    <span className="detail-label">Доставка:</span>
                    <span className="detail-value">{item.deliveryMethod}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Адрес:</span>
                    <span className="detail-value">{item.deliveryAddress}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Сумма:</span>
                    <span className="detail-value price">{Math.floor(item.sum)} ₽</span>
                  </div>
                </div>

                <div className="order-products">
                  <h4>Товары в заказе:</h4>
                  <div className="products-list">
                    {item.products.map((product) => (
                      <OrderProduct key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-section">
          <div className="empty-icon">📦</div>
          <p>У вас нет активных заказов</p>
        </div>
      )}
    </div>
  );
};

export const UnprocessedUserOrders = styled(UnprocessedUserOrdersContainer)`
  width: 100%;

  & .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e5e7eb;

    & h2 {
      font-size: 25px;
      font-weight: 700;
      color: var(--black-color);
      margin: 0;
    }

    & .order-count {
      background: var(--main-color);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;

      & .count {
        font-size: 15px;
      }
    }
  }

  & .orders {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  & .order-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #f3f4f6;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }
  }

  & .order-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;

    & .order-info {
      & h3 {
        font-size: 20px;
        font-weight: 700;
        color: var(--black-color);
        margin-top: 4px;
      }

      & .order-date {
        color: var(--grey-color);
        font-size: 15px;
        margin: 0;
      }
    }

    & .status-badge {
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  & .order-details {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 12px;
  }

  & .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .detail-label {
      font-weight: 600;
      color: var(--black-color);
      font-size: 15px;
    }

    & .detail-value {
      color: var(--grey-color);
      font-size: 15px;

      &.price {
        color: var(--main-color);
        font-weight: 700;
        font-size: 15px;
      }
    }
  }

  & .order-products {
    & h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--black-color);
      margin-bottom: 15px;
    }

    & .products-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }

  & .empty-section {
    text-align: center;
    padding: 40px 20px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

    & .empty-icon {
      font-size: 30px;
      margin-bottom: 15px;
    }

    & p {
      color: var(--grey-color);
      font-size: 15px;
      margin: 0;
    }
  }

  @media (max-width: 1200px) {
    & .orders {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }

  @media (max-width: 768px) {
    & .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;

      & h2 {
        font-size: 20px;
      }
    }

    & .orders {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    & .order-card {
      padding: 20px;
    }

    & .order-header {
      flex-direction: column;
      gap: 10px;

      & .status-badge {
        align-self: flex-start;
      }
    }
  }

  @media (max-width: 480px) {
    & .section-header {
      & h2 {
        font-size: 18px;
      }

      & .order-count {
        padding: 6px 12px;

        & .count {
          font-size: 15px;
        }
      }
    }

    & .order-card {
      padding: 16px;
    }

    & .order-header .order-info h3 {
      font-size: 17px;
    }

    & .order-details {
      padding: 12px;
      gap: 8px;
    }

    & .order-products h4 {
      font-size: 15px;
    }

    & .empty-section {
      padding: 30px 15px;

      & .empty-icon {
        font-size: 24px;
      }
    }
  }

  @media (max-width: 320px) {
    & .order-card {
      padding: 12px;
    }

    & .order-details {
      padding: 10px;
    }
  }
`;
