import { Icon } from "../../components/icon/Icon";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";
import styled from "styled-components";
import { ProductList } from "./components/product-list/ProductList";
import { categorySelector, productsSelector } from "../../selectors";

const AdminPanelContainer = ({ className }) => {
  const [productsOpen, setProductsOpen] = useState(true);
  const navigate = useNavigate();

  const products = useSelector(productsSelector);
  const categories = useSelector(categorySelector);
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const currentCategory = (product) => {
    const currentCategory = categories.find(
      (category) => category.id === product.categoryId,
    );
    return currentCategory ? currentCategory.name : "";
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  const stats = [
    { label: "Товаров", value: products.length },
    { label: "Категорий", value: categories.length },
    {
      label: "Отфильтровано",
      value: filteredProducts.length,
    },
  ];

  return (
    <div className={className}>
      <>
        {openModal && (
          <Modal productId={productId} setOpenModal={setOpenModal}>
            Вы действительно хотите удалить товар ?
          </Modal>
        )}
        <header className="admin-header">
          <div>
            <p>Holly Admin Panel</p>
            <h1>Панель администратора</h1>
          </div>
          <div className="stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </header>
        <div className="toolbar">
          <div className="search">
            <input
              type="text"
              placeholder="Искать по названию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icon id="search" />
          </div>
          <div className="buttons-add">
            <Button onClick={() => navigate("/admin-panel/add-product")}>
              Добавить товар
            </Button>
            <Button onClick={() => navigate("/admin-panel/edit-params")}>
              Добавить параметры
            </Button>
            <Button onClick={() => navigate("/admin-panel/users-orders")}>
              Заказы пользователей
            </Button>
          </div>
        </div>
        <div className="products">
          <div
            className="header-section"
            onClick={() => setProductsOpen(!productsOpen)}
          >
            <h2>
              Список товаров{" "}
              <span>
                ({filteredProducts.length}/{products.length})
              </span>
            </h2>
            <Icon id={productsOpen ? "angle-up" : "angle-down"} />
          </div>
          {productsOpen && (
            <ProductList
              productsOpen={productsOpen}
              products={filteredProducts}
              currentCategory={currentCategory}
              setOpenModal={setOpenModal}
              setProductId={setProductId}
            />
          )}
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

    .stats {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;

      div {
        background: #fff;
        border-radius: 12px;
        padding: 12px 16px;
        min-width: 140px;
        box-shadow: var(--box-shadow);
        border: 1px solid rgba(15, 23, 42, 0.05);

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

  .toolbar {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
  }

  .search {
    flex: 1 1 280px;
    position: relative;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.6);
      padding: 12px 48px 12px 20px;
      font-size: 15px;
      outline: none;

      &:focus {
        border-color: var(--purple-color);
        box-shadow: 0 0 0 3px rgba(126, 94, 240, 0.1);
      }
    }

    i {
      position: absolute;
      right: 18px;
      color: #94a3b8;
    }
  }

  .buttons-add {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    button {
      min-width: 180px;
    }
  }

  .products {
    width: 100%;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 25px 45px rgba(15, 23, 42, 0.08);
    border: 1px solid rgba(15, 23, 42, 0.05);
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

    .toolbar {
      flex-direction: column;
      align-items: stretch;
    }

    .products {
      padding: 16px;
    }
  }
`;
