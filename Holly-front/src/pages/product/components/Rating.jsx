import { useDispatch } from 'react-redux';
import { Button, Input, RatingStars, Icon } from '../../../shared/ui';
import { notifyError, notifySuccess } from '../../../shared/lib/notification';
import { currentUserRating } from '../../../shared/lib/currentUserRating';
import { editProductRating } from '../../../features/products/products';
import styled from 'styled-components';

const RatingContainer = ({
  className,
  setHover,
  userRating,
  setUserRating,
  hover,
  product = [],
  currentUser,
  comment,
  setComment,
}) => {
  const dispatch = useDispatch();

  const isRating = () => {
    if (currentUser && product?.rating?.users.find((user) => user.userId === currentUser.id)) {
      return true;
    }
  };

  const addRating = () => {
    const rating = {
      userId: currentUser.id,
      userRating: userRating,
      postId: product.id,
      userComment: comment,
      date: new Date().toISOString(),
    };

    try {
      const res = dispatch(editProductRating({ data: rating }));

      if (!res) {
        throw new Error(res);
      } else {
        notifySuccess('Cпасибо за оценку');
        setComment('');
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <div className={className}>
      {!isRating() && (
        <>
          <h3>Оцените товар</h3>
          <RatingStars
            setHover={setHover}
            userRating={userRating}
            hover={hover}
            setUserRating={setUserRating}
            isRating={isRating}
          />
        </>
      )}
      {isRating() ? (
        <div>
          <p>Благодарим за оценку!</p>
          <span>
            {`Вы оценили ${product.name} на ${currentUserRating(product, currentUser)} из 5`}
            <Icon id="star" color="var(--main-color)" size="16" />
          </span>
        </div>
      ) : (
        <>
          {userRating > 0 && (
            <div className="comment-rating">
              <Input placeholder={'Оставьте отзыв'} onChange={(e) => setComment(e.target.value)} />
              <Button onClick={addRating}>Отправить</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export const Rating = styled(RatingContainer)`
  margin-top: 30px;

  & .comment-rating {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 30px;
    margin-top: 30px;
    & input {
      margin: 15px 0 0 0;
    }
  }

  & span {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--grey-color);
  }
`;
