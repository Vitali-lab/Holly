import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, ProductForm } from '../../shared/ui';
import { notifyError, notifySuccess } from '../../shared/lib/notification';
import { postProduct } from '../../features/products/products';
import styled from 'styled-components';

const AddProductContainer = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sizes, setSizes] = useState({});
  const [category, setCategory] = useState('');
  const [season, setSeason] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState([]);
  const [sale, setSale] = useState(null);

  const newProduct = {
    category_id: category,
    images: image,
    name,
    description,
    price,
    sizes,
    rating: { overallRating: 0, users: [] },
    season_id: season,
    sale: sale,
  };

  const onSubmit = () => {
    if (
      !`${category}` ||
      !season ||
      !`${name}` ||
      !`${description}` ||
      !`${price}` ||
      !`${image}`
    ) {
      notifyError('Заполните все поля');
      return;
    }

    dispatch(postProduct(newProduct));
    notifySuccess('Товар добавлен');
    navigate('/admin-panel');
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
        setSale={setSale}
      >
        Добавление товара
      </ProductForm>
      <div>
        <Button width={'300px'} onClick={onSubmit}>
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
`;
