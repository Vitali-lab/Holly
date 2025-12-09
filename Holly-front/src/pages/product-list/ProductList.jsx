import { useNavigate } from 'react-router-dom';
import { Price, Icon } from '../../shared/ui';
import styled from 'styled-components';

const ProductListContainer = ({
  className,
  products,
  currentCategory,
  setOpenModal,
  setProductId,
}) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Фото</th>
              <th>Название</th>
              <th>Цена</th>
              <th>Скидка</th>
              <th>Категория</th>
              <th>Размеры</th>
              <th>Рейтинг</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="empty">
                  Товары не найдены
                </td>
              </tr>
            )}
            {products?.map((product) => (
              <tr key={product.id}>
                <td data-label="Фото">
                  <img src={product.images[0]} alt={product.name} loading="lazy" />
                </td>
                <td data-label="Название">
                  <div className="name">
                    <span>{product.name}</span>
                    <small>ID: {product.id}</small>
                  </div>
                </td>
                <td data-label="Цена">
                  <Price post={product} />
                </td>
                <td data-label="Скидка">
                  <span>{product.sale === null ? '0%' : `${product.sale}%`}</span>
                </td>
                <td data-label="Категория">{currentCategory(product)}</td>
                <td data-label="Размеры">
                  <div className="sizes">
                    {Object.entries(product.sizes).map(([size, count]) => (
                      <span key={`${product.id}-${size}`}>
                        {size}: {count}
                      </span>
                    ))}
                  </div>
                </td>
                <td data-label="Рейтинг">
                  {Math.floor(product.rating?.overallRating) || 'Нет рейтинга'}
                </td>
                <td data-label="Действия">
                  <div className="actions">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin-panel/edit-product/${product.id}`)}
                    >
                      <Icon id="edit" />
                      Редактировать
                    </button>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => {
                        setProductId(product.id);
                        setOpenModal(true);
                      }}
                    >
                      <Icon id="trash" />
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ProductList = styled(ProductListContainer)`
  width: 100%;
  min-width: 1200px;

  .table-wrapper {
    width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
    min-width: 900px;
  }

  thead {
    background: #f3f4f6;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.05em;
    color: #6b7280;
  }

  th,
  td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  }

  tbody tr:hover {
    background: rgba(126, 94, 240, 0.04);
  }

  img {
    width: 72px;
    height: 96px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(15, 23, 42, 0.2);
  }

  .name span {
    display: block;
    font-weight: 600;
  }

  .name small {
    color: #94a3b8;
  }

  .sizes {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 6px;
  }

  .sizes span {
    background: #eef2ff;
    color: #4338ca;
    border-radius: 10px;
    padding: 5px;
    font-size: 13px;
    width: fit-content;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .actions button {
    display: inline-flex;
    align-items: center;

    gap: 8px;
    border-radius: 20px;
    border: 1px solid rgba(15, 23, 42, 0.15);
    padding: 8px 18px;
    color: #0f172a;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 600;
  }

  .actions button:hover {
    border-color: var(--main-color);
    color: var(--main-color);
  }

  .actions .danger {
    border-color: rgba(248, 113, 113, 0.6);
    color: #b91c1c;
  }

  .empty {
    text-align: center;
    padding: 40px;
    color: #9ca3af;
  }

  @media (max-width: 768px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead {
      display: none;
    }

    tbody tr {
      margin-bottom: 16px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      padding: 12px;
    }

    td {
      padding: 8px 0;
      border: none;
    }

    td::before {
      content: attr(data-label);
      display: block;
      font-size: 12px;
      color: #9ca3af;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .actions {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
`;
