import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../shared/ui';
import { ProductList } from '../product-list/ProductList';
import { selectCategories, allProductsSelector } from '../../entities/selectors';
import { Modal } from '../product-list/Modal';
import { useGetCreatedOrdersCount } from '../../shared/hooks/use-get-createt-orders-count';
import styled from 'styled-components';

const AdminPanelContainer = ({ className }) => {
  const navigate = useNavigate();
  const { allProducts: products } = useSelector(allProductsSelector);
  const { categories } = useSelector(selectCategories);
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const { createdOrdersCount } = useGetCreatedOrdersCount();

  const filteredProducts = useMemo(() => {
    if (!searchItem) return products;
    return products?.filter((product) =>
      product.name.toLowerCase().includes(searchItem.toLowerCase())
    );
  }, [products, searchItem]);

  const currentCategory = (product) => {
    const currentCategory = categories.find((category) => category.id === product.categoryId);
    return currentCategory ? currentCategory.name : '';
  };

  return (
    <div className={className}>
      <>
        {openModal && (
          <Modal productId={productId} setOpenModal={setOpenModal}>
            {`Вы действительно хотите удалить товар ${products.find((product) => product.id === productId).name}?`}
          </Modal>
        )}
        <header className="admin-header">
          <div>
            <p>Holly Admin Panel</p>
            <h1>Панель администратора</h1>
          </div>
        </header>
        <div className="toolbar">
          <div className="search-header">
            <Input
              type="text"
              placeholder="Искать по названию..."
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
          <div className="buttons-add">
            <Button onClick={() => navigate('/admin-panel/add-product')}>Добавить товар</Button>
            <Button onClick={() => navigate('/admin-panel/edit-params')}>Добавить параметры</Button>
            <Button onClick={() => navigate('/admin-panel/users-orders')}>
              Заказы пользователей{' '}
              {createdOrdersCount() > 0 && (
                <p className="new-orders-count">{createdOrdersCount()}</p>
              )}
            </Button>

            <Button onClick={() => navigate('/admin-panel/edit-widgets')}>
              Изменить виджеты на главной
            </Button>
          </div>
        </div>
        <div className="products">
          <div className="header-section">
            <h2>
              Список товаров{' '}
              <span>
                ({filteredProducts.length}/{products.length})
              </span>
            </h2>
          </div>
          <ProductList
            products={filteredProducts}
            currentCategory={currentCategory}
            setOpenModal={setOpenModal}
            setProductId={setProductId}
          />
        </div>
        <div></div>
      </>
    </div>
  );
};

export const AdminPanel = styled(AdminPanelContainer)`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .admin-header {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 16px;

    h1 {
      margin: 4px 0 0;
    }

    p {
      margin: 0;
      color: #9ca3af;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 12px;
    }

    

      div {
        background: #fff;
        border-radius: 12px;
        padding: 12px 16px;
        min-width: 140px;
        

        span {
          font-size: 12px;
          color: #6b7280;
        }

        strong {
          display: block;
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }

  
  .buttons-add {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 12px;


    button {
      min-width: 180px;
    }
  }

  & .search-header{
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;

  }

  & .new-orders-count{
    position: absolute;
    top: -21px;
    right: -9px;
    background-color: red;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 11px;
    font-weight: bold;
  }

  .products {
    width: 100%;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    box-shadow: var(--box-shadow);
  }

  & .header-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(15, 23, 42, 0.08);
    cursor: pointer;

    h2 {
      margin: 0;
      font-size: 20px;

      span {
        font-size: 16px;
        color: #9ca3af;
      }
    }
  }

  @media (max-width: 768px) {
    .admin-header {
      flex-direction: column;
    }


    .products {
      padding: 16px;
    }
  }
`;
