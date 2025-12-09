import { useDispatch } from 'react-redux';
import { Icon } from '../../../shared/ui';
import styled from 'styled-components';

const ParamsContainer = ({ className, params, deleteFunc, type }) => {
  const dispatch = useDispatch();

  return (
    <div className={className}>
      <h2>{type === 'category' ? 'Категории' : 'Сезоны'}</h2>
      {params.map((param) => {
        return (
          <div className="category" key={param.id}>
            <p>{param.name}</p>
            <Icon id="trash" onClick={() => dispatch(deleteFunc(param.id))} />
          </div>
        );
      })}
    </div>
  );
};

export const Params = styled(ParamsContainer)`
  width: 100%;
  height: auto;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  padding: 20px 10px;
  & i {
    cursor: pointer;
  }
  & .category {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    gap: 20px;
    margin: 10px 0 0 0;
    border-bottom: 1px solid #ccccccff;

    & p {
      width: 200px;
    }
  }
  & .edit-params-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 10px 0 0 0;
  }
`;
