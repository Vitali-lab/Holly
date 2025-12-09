import styled from 'styled-components';

const SelectContainer = ({ className, children, selectItems, selectValue, selectFunc }) => {
  return (
    <div className={className}>
      {`${children} :`}
      <select name="" id="" value={selectValue} onChange={(e) => selectFunc(e.target.value)}>
        <option value="">
          {children === 'Категория' ? 'Выберите категорию' : 'Выберите сезон'}
        </option>
        {selectItems.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Select = styled(SelectContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
  width: 100%;
  margin: 0 auto;

  & select {
    width: 100%;
    max-width: 300px;
    height: 35px;
    border-radius: 10px;
    border: 1px solid #ccccccff;
    padding: 0px 10px;
    font-size: 15px;
  }
`;
