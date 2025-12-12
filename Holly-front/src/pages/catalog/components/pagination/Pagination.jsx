import { Button, Icon } from '../../../../shared/ui';
import styled from 'styled-components';

const PaginationContainer = ({ className, currentPage, lastPage, changePage }) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < lastPage;

  return (
    <div className={className}>
      <Icon
        id="angle-left"
        className={!canGoPrev ? 'disabled' : ''}
        onClick={() => canGoPrev && changePage(currentPage - 1)}
      />
      {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          width="30px"
          height="30px"
          disabled={currentPage === page}
          onClick={() => changePage(page)}
        >
          {page}
        </Button>
      ))}
      <Icon
        id="angle-right"
        className={!canGoNext ? 'disabled' : ''}
        onClick={() => canGoNext && changePage(currentPage + 1)}
      />
    </div>
  );
};

export const Pagination = styled(PaginationContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 120px;
  & i {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: min(500px, 100%);
  }
`;
