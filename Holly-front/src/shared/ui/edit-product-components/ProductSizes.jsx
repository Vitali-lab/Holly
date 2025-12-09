import { useState } from 'react';
import { Button, Textarea, Icon } from '../../ui';
import { notifyError, notifySuccess } from '../../../shared/lib/notification';
import styled from 'styled-components';

const ProductSizesContainer = ({ className, setSizes, sizes }) => {
  const [size, setSize] = useState('');
  const [count, setCount] = useState('');

  const addSize = () => {
    if (!size || !count) {
      notifyError('Заполните все поля');
      return;
    }
    setSizes({ ...sizes, [size]: count });
    setSize('');
    setCount('');
    notifySuccess('Размер добавлен');
  };
  const removeSizes = (key) => {
    const newSizes = { ...sizes };
    delete newSizes[key];
    setSizes(newSizes);
    setSize('');
    setCount('');
    notifySuccess('Размер удален');
  };

  return (
    <div className={className}>
      <div className="container-sizes">
        <h3>Укажите размеры</h3>
        <div className="sizes">
          <Textarea value={size} onChange={(e) => setSize(e.target.value)}>
            Размер
          </Textarea>
          <Textarea value={count} onChange={(e) => setCount(e.target.value)}>
            Количество
          </Textarea>
        </div>
        <Button onClick={addSize}>Добавить</Button>

        {Object.entries(sizes).map(([key, value]) => (
          <div className="sizes-info" key={key}>
            <p>Размер: {key}</p>
            <p>Количество: {value}</p>
            <Icon id="trash" onClick={() => removeSizes(key)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProductSizes = styled(ProductSizesContainer)`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 30px;
  margin-bottom: 30px;
  width: 100%;

  & .sizes {
    display: flex;
    width: 400px;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 10px;
  }
  & .sizes-info {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    gap: 30px;
    border-bottom: 1px solid #ccccccff;

    & p {
      margin: 0;
      width: 155px;
    }
  }
  .container-sizes {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: start;
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
`;
