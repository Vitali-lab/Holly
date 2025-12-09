import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ProductForm } from '../../shared/ui';
import { updateProduct } from '../../features/products/products';
import { notifyError } from '../../shared/lib/notification';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const EditProductContainer = ({ className }) => {
  const params = useParams();

  const product = useSelector((state) =>
    state.products.allProducts.find((item) => item.id === params.id)
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

  const update = () => {
    try {
      const updatedProduct = {
        ...product,
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        images: image || product.images,
        sizes: sizes || product.sizes,
        category_id: category || product.category_id,
        season_id: season || product.season_id,
        sale: sale === '' ? null : sale || product.sale,
      };
      dispatch(updateProduct({ productId: product.id, updatedProduct }));
    } catch (e) {
      notifyError(e.message);
    }
    navigate('/admin-panel');
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
        <Button width={'300px'} onClick={update}>
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
