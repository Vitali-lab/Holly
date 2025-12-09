import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, RatingStars } from '../../../shared/ui';
import { correctDate } from '../../../shared/utils/correctDate';
import { fetchUsers } from '../../../features/user/user';
import { usersSelector } from '../../../entities/selectors';
import Loader from '../../../shared/ui/loader/Loader';
import styled from 'styled-components';

const CommentsContainer = ({ className, product }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [showAllComments, setShowAllComments] = useState(false);
  const { users, isLoading } = useSelector(usersSelector);

  if (isLoading) return <Loader />;

  const getUserName = (id) => users.find((user) => user.id === id)?.name || 'Аноним';
  const comments = product?.rating?.users || [];

  const commentPagination = () => {
    if (comments.length > 3 && !showAllComments) {
      return comments.slice(0, 3);
    } else if (comments.length > 3 && showAllComments) {
      return comments;
    }
    return comments;
  };

  return (
    <div className={className}>
      <h2>Отзывы</h2>
      {comments.length > 0 ? (
        commentPagination().map((user) => (
          <div className="comment" key={user.userId + user.date}>
            <div className="icon-and-name">
              <Icon id="user" />
              <p>{getUserName(user.userId)}</p>
            </div>
            <div className="comment-and-stars">
              <div className="stars">
                <RatingStars userRating={user.userRating} />
              </div>
              <p className="text">{user.userComment}</p>
            </div>
            <div className="date">
              <p>{correctDate(user.date)}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="nothing">Пока нет отзывов :(</div>
      )}
      {comments.length > 3 && (
        <Button onClick={() => setShowAllComments(!showAllComments)}>
          {showAllComments ? 'Скрыть' : 'Показать все'}
        </Button>
      )}
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  margin: 40px 0;
  padding: 20px;
  box-shadow: var(--box-shadow);
  border-radius: 12px;
  gap: 20px;
  background: var(--white-color);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-10px);
  }

  h2 {
    font-size: 30px;
    font-weight: 600;
    margin: 0;
    align-self: flex-start;
  }

  .comment {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 95%;
    border: 1px solid #abababff;
    padding: 0 15px;
    border-radius: 8px;
    gap: 20px;
    transition: background 0.3s ease;

    &:hover {
      background: #fafafa;
    }
  }

  .icon-and-name {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    font-weight: 500;
  }

  .comment-and-stars {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .stars {
      display: flex;
      gap: 6px;
    }

    .text {
      font-size: 14px;
      color: #333;
      line-height: 1.4;
    }
  }

  .date {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    color: #999;
  }

  .nothing {
    font-size: 20px;
    color: var(--grey-color);
    text-align: center;
    padding: 25px;
  }

  @media (max-width: 768px) {
    .comment {
      flex-direction: column;
      align-items: flex-start;
    }

    .date {
      justify-content: flex-start;
    }
  }

  @media (max-width: 480px) {
    width: min(350px, 100%);
    .comment-and-stars {
      .text {
        font-size: 12px;
      }
    }
  }
`;
