import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/button/Button";
import { postProduct } from "../../../../bff/api/post-product";
import { useState } from "react";
import { notifyError } from "../../../../func/notification";
import { ProductForm } from "../../../../components/product-form/ProductForm";
import styled from "styled-components";

const AddProductContainer = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sizes, setSizes] = useState({});
  const [category, setCategory] = useState("");
  const [season, setSeason] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);

  const onSubmit = () => {
    if (
      !`${category}` ||
      !season ||
      !`${name}` ||
      !`${description}` ||
      !`${price}` ||
      !`${image}`
    ) {
      notifyError("Заполните все поля");
      return;
    }

    dispatch(
      postProduct(name, description, price, image, category, season, sizes),
    );
    navigate("/admin-panel");
  };

  return (
    <div className={className}>
      <ProductForm
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        price={price}
        setPrice={setPrice}
        image={image}
        setImage={setImage}
        sizes={sizes}
        setSizes={setSizes}
        category={category}
        setCategory={setCategory}
        season={season}
        setSeason={setSeason}
      >
        Добавление товара
      </ProductForm>
      <div>
        <Button width={"300px"} onClick={onSubmit}>
          Добавить товар
        </Button>
      </div>
    </div>
  );
};

export const AddProduct = styled(AddProductContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 20px;
  width: 100%;
  margin: 50px 0 0 0;
`;
