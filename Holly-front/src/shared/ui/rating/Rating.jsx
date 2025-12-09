import { Icon } from '../../ui';
import styled from 'styled-components';

const RatingContainer = ({ className, post }) => {
  return (
    <div className={className}>
      <h4>{post.rating.overallRating.toFixed(1)}</h4>
      <Icon id="star" color="var(--main-color)" size="14" />
      <p>{post.rating.users.length === 0 ? '' : `(${post.rating.users.length})`}</p>
    </div>
  );
};

export const Rating = styled(RatingContainer)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 5px 0px 0px 5px;
  gap: 0px;
  & h4 {
    margin: 0;
    font-weight: 500;
  }
  & p {
    margin: 0;
    padding: 0;
    color: var(--grey-color);
  }
`;
