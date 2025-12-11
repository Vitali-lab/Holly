import { useState } from 'react';
import { Button, Input, Icon, Textarea } from '../../ui';
import { notifyError, notifySuccess } from '../../lib/notification';
import { API_URL } from '../../config/api';
import Loader from '../loader/Loader';
import styled from 'styled-components';

const ProductInfoContainer = ({
  className,
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  image,
  setImage,
  sale,
  setSale,
}) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      notifyError('Выберите изображение');
      return;
    }

    const formData = new FormData();
    formData.append('title', name || '');
    formData.append('content', description || '');
    formData.append('price', price || '');
    formData.append('sale', sale || '');
    formData.append('imageFile', file);

    try {
      setIsUploading(true);
      const res = await fetch(`${API_URL}/uploads/create`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      const uploadedPath = data?.data?.imagePath
        ? `http://90.156.211.91${data.data.imagePath}`
        : null;

      notifySuccess('Файл успешно загружен');
      setFile(null);
      if (uploadedPath) {
        setImage((prev) => [...prev, uploadedPath]);
      }
    } catch (err) {
      console.error(err);
      notifyError(err.message || 'Ошибка загрузки');
    } finally {
      setIsUploading(false);
    }
  };
  image;

  return (
    <div className={className}>
      {isUploading && <Loader />}
      <div className="product-info">
        <h3>Введите информацию о товаре</h3>
        <Textarea value={name} onChange={(e) => setName(e.target.value)}>
          Название
        </Textarea>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)}>
          {' '}
          Описание
        </Textarea>
        <Textarea value={price} onChange={(e) => setPrice(e.target.value)}>
          {' '}
          Цена
        </Textarea>
        <Textarea value={sale} onChange={(e) => setSale(e.target.value)}>
          {' '}
          Скидка в процентах
        </Textarea>
        <div className="upload-image">
          <p>Добавьте изображение</p>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          <Button width={'300px'} disabled={isUploading} onClick={handleSubmit}>
            {isUploading ? 'Загрузка...' : 'Загрузить изображение'}
          </Button>
        </div>
        <div className="product-images">
          {image &&
            image.map((img) => (
              <div className="image" key={img}>
                <Icon
                  id="trash"
                  color="var(--black-color)"
                  size="25"
                  onClick={() => {
                    setImage(image.filter((item) => item !== img));
                  }}
                />
                <img src={img} alt="" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const ProductInfo = styled(ProductInfoContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  & .product-images {
    display: flex;
    position: relative;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    max-width: 650px;
    gap: 10px;

    & .image {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      & img {
        width: 210px;
        height: 300px;
        border-radius: 10px;
      }
      & i {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
    }
  }

  .product-info {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 40px;
    box-shadow: var(--box-shadow);
    border-radius: 10px;
    padding: 30px;
    width: 100%;

    & h3 {
      margin: 10px;
      color: #868585ff;
      font-size: 20px;
    }
  }
  & .upload-image {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    & input {
      border: none;
    }
  }
`;
