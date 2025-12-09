import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OrderProductContainer = ({ className, product, key }) => {
  const navigate = useNavigate();

  return (
    <div className={className} key={key} onClick={() => navigate(`/catalog/${product.id}`)}>
      <div className="image">
        <img src={product.images[0]} alt={product.name} />
      </div>
      <div className="info">
        <h4 className="name">{product.name}</h4>
        <div className="price">{product.price} ₽</div>
        <div className="details">
          <span className="size">Размер: {product.size}</span>
          <span className="count">{product.count} шт.</span>
        </div>
      </div>
    </div>
  );
};

export const OrderProduct = styled(OrderProductContainer)`
  display: flex;
  cursor: pointer;
  padding: 16px;
  gap: 16px;

  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
    background: white;
  }

  .image {
    flex-shrink: 0;
    img {
      width: 90px;
      height: 120px;
      object-fit: cover;
      border-radius: 8px;
      border: 2px solid #e2e8f0;
      transition: border-color 0.3s ease;
    }

    &:hover img {
      border-color: var(--main-color);
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    flex: 1;
    min-width: 0; /* предотвращает переполнение */

    .name {
      font-size: 16px;
      font-weight: 600;
      color: var(--black-color);
      margin: 0;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .price {
      font-size: 18px;
      font-weight: 700;
      color: var(--main-color);
      margin: 0;
    }

    .details {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;

      .count,
      .size {
        font-size: 13px;
        font-weight: 500;
        color: var(--grey-color);
        background: #f1f5f9;
        padding: 4px 8px;
        border-radius: 6px;
        white-space: nowrap;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 14px;
    gap: 14px;

    .image img {
      width: 70px;
      height: 70px;
    }

    .info {
      gap: 8px;

      .name {
        font-size: 15px;
      }

      .price {
        font-size: 16px;
      }

      .details {
        gap: 10px;

        .count,
        .size {
          font-size: 12px;
          padding: 3px 6px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    padding: 12px;
    gap: 12px;

    .image img {
      width: 65px;
      height: 65px;
    }

    .info {
      gap: 6px;

      .name {
        font-size: 14px;
      }

      .price {
        font-size: 15px;
      }

      .details {
        gap: 8px;

        .count,
        .size {
          font-size: 11px;
          padding: 2px 5px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
    gap: 12px;
    flex-direction: column;
    text-align: center;

    .image {
      align-self: center;
      img {
        width: 100px;
        height: 100px;
      }
    }

    .info {
      gap: 8px;

      .name {
        font-size: 16px;
        white-space: normal;
      }

      .price {
        font-size: 18px;
      }

      .details {
        justify-content: center;
        gap: 12px;

        .count,
        .size {
          font-size: 13px;
          padding: 4px 8px;
        }
      }
    }
  }

  @media (max-width: 320px) {
    padding: 12px 10px;
    gap: 10px;

    .image img {
      width: 80px;
      height: 80px;
    }

    .info {
      gap: 6px;

      .name {
        font-size: 14px;
      }

      .price {
        font-size: 16px;
      }

      .details {
        gap: 10px;

        .count,
        .size {
          font-size: 12px;
          padding: 3px 6px;
        }
      }
    }
  }
`;
