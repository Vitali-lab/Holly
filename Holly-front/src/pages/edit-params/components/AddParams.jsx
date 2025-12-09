import { useDispatch } from 'react-redux';
import { Button, Input } from '../../../shared/ui';
import { notifyError } from '../../../shared/lib/notification';
import styled from 'styled-components';

const AddParamsContainer = ({ className, inputValue, setInputValue, postFunc, text }) => {
  const dispatch = useDispatch();

  return (
    <div className={className}>
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder={`Название ${text}`}
      />
      <Button
        onClick={() => {
          if (!inputValue) {
            notifyError('Введите название категории');
            return;
          } else {
            setInputValue('');
            dispatch(postFunc(inputValue));
          }
        }}
        width="200px"
      >
        Добавить категорию
      </Button>
    </div>
  );
};

export const AddParams = styled(AddParamsContainer)`
  display: flex;
  width: 400px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  padding: 10px;
`;
