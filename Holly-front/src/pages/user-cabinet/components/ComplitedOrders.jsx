import { correctDate } from '../../../shared/utils/correctDate';
import { ORDER_STATUS } from '../../../shared/config/appInfo';
import { OrderProduct } from './OrderProduct';
import styled from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Rating } from '../../product/components';

const ComplitedUserOrdersContainer = ({ className, userOrders }) => {
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.products.allProducts);

  const currentProduct = (id) => {
    return products.find((product) => product.id === id);
  };
  const complitedUserOrders = () => {
    return userOrders.filter((order) => order.status === 'completed');
  };

  return (
    <div className={className}>
      <div className="section-header">
        <h2>Выполненные заказы</h2>
        <div className="order-count completed">
          <span className="count">{complitedUserOrders().length}</span>
        </div>
      </div>

      {complitedUserOrders().length > 0 ? (
        <div className="orders">
          {complitedUserOrders().map((item) => (
            <div key={item.orderNum} className="order-card completed">
              <div className="order-header">
                <div className="order-info">
                  <h3>Заказ #{item.orderNum}</h3>
                  <p className="order-date">{correctDate(item.createdAt)}</p>
                </div>
                <div className="status-badge completed"> ✅ {ORDER_STATUS[item.status]}</div>
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

              <div className="completed-products-section">
                <h4>Товары и отзывы:</h4>
                <div className="completed-products-list">
                  {item.products.map((product) => (
                    <div key={product.id} className="product-review-item">
                      <OrderProduct product={product} />
                      <div className="rating-section">
                        <h5>Ваша оценка:</h5>
                        <Rating
                          userRating={userRating}
                          setUserRating={setUserRating}
                          hover={hover}
                          product={currentProduct(product.id)}
                          setHover={setHover}
                          currentUser={currentUser}
                          comment={comment}
                          setComment={setComment}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-section">
          <div className="empty-icon">✅</div>
          <p>У вас пока нет завершенных заказов</p>
        </div>
      )}
    </div>
  );
};

export const ComplitedUserOrders = styled(ComplitedUserOrdersContainer)`
  width: 100%;

  & .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
    padding-bottom: 15px;

    & h2 {
      font-size: 25px;
      font-weight: 700;
      color: var(--black-color);
      margin: 0;
    }

    & .order-count.completed {
      background: var(--green-color);
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

  & .order-card.completed {
    box-shadow: var(--box-shadow);
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 12px;
    position: relative;
  }

  & .order-header .status-badge.completed {
    background-color: var(--green-color);
    color: white;
    padding: 6px 12px;
    width: fit-content;
    border-radius: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
  }

  & .completed-products-section {
    & h4 {
      font-size: 20px;
      font-weight: 600;
      color: var(--black-color);
      margin-top: 19px;
    }

    & .completed-products-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    & .product-review-item {
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 20px;
      background: white;
      border-radius: 12px;
      border: 1px solid #f3f4f6;
    }

    & .rating-section {
      border-top: 1px solid #e5e7eb;
      padding-top: 15px;

      & h5 {
        font-size: 16px;
        font-weight: 600;
        color: var(--black-color);
        margin-top: 10px;
      }
    }
  }

  & .empty-section {
    text-align: center;
    padding: 40px 20px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

    & .empty-icon {
      font-size: 40px;
      margin-bottom: 15px;
    }

    & p {
      color: var(--grey-color);
      font-size: 16px;
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

    & .order-card.completed {
      padding: 20px;
    }

    & .order-header {
      flex-direction: column;
      gap: 10px;
    }

    & .completed-products-section .product-review-item {
      padding: 15px;
      gap: 12px;
    }
  }

  @media (max-width: 480px) {
    & .section-header {
      & h2 {
        font-size: 22px;
      }

      & .order-count.completed {
        padding: 6px 12px;

        & .count {
          font-size: 15px;
        }
      }
    }

    & .order-card.completed {
      padding: 16px;
    }

    & .order-header .order-info h3 {
      font-size: 20px;
    }

    & .order-details {
      padding: 12px;
      gap: 8px;
    }

    & .completed-products-section h4 {
      font-size: 15px;
    }

    & .completed-products-section .product-review-item {
      padding: 12px;
    }

    & .empty-section {
      padding: 30px 15px;

      & .empty-icon {
        font-size: 25px;
      }
    }
  }

  @media (max-width: 320px) {
    & .order-card.completed {
      padding: 12px;
    }

    & .order-details {
      padding: 10px;
    }

    & .completed-products-section .product-review-item {
      padding: 10px;
    }
  }
`;
