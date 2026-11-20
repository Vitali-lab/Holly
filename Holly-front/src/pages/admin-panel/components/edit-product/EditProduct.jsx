import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "../../../../components/button/Button";
import { useDispatch } from "react-redux";
import { patchProduct } from "../../../../bff/api/back-end/patch-product";
import { notifyError } from "../../../../func/notification";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "../../../../components/product-form/ProductForm";
import styled from "styled-components";

const EditProductContainer = ({ className }) => {
  const params = useParams();
  const product = useSelector((state) =>
    state.products.products.find((item) => item.id === params.id),
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.categoryId);
  const [season, setSeason] = useState(product.seasonId);
  const [price, setPrice] = useState(product.price);
  const [sizes, setSizes] = useState(product.sizes);
  const [image, setImage] = useState(product.images);
  const [sale, setSale] = useState(product.sale);

  if (!product) {
    return <h1>Товар не найден</h1>;
  }

  const updatedProduct = {
    id: product.id,
    name,
    description,
    price,
    category,
    season,
    sizes,
    image,
    sale,
  };

  const updateProduct = () => {
    try {
      dispatch(patchProduct(product.id, updatedProduct));
    } catch (e) {
      notifyError(e.message);
    }
    navigate("/admin-panel");
  };

  return (
    <div className={className}>
      <ProductForm
        name={name}
        product={product}
        setName={setName}
        description={description}
        setDescription={setDescription}
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
        season={season}
        setSeason={setSeason}
        sizes={sizes}
        setSizes={setSizes}
        image={image}
        setImage={setImage}
        sale={sale}
        setSale={setSale}
      >{`Изменения товара ${product.name}`}</ProductForm>
      <div className="button-save">
        <Button width={"300px"} onClick={updateProduct}>
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
};

export const EditProduct = styled(EditProductContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  gap: 20px;
  margin: 50px 0 0 0;

  & .button-save {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: end;
    width: 100%;
    padding: 10px;
    margin: 0 0 50px 0;
  }
`;
