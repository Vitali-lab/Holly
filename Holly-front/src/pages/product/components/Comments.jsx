import { useEffect, useState } from "react";
import styled from "styled-components";
import { getUsers } from "../../../bff/api/back-end/get-users";
import Loader from "../../../components/loader/Loader";
import { RatingStars } from "../../../components/raring-stars/RatingStars";
import { correctDate } from "../../../utils/correctDate";

const CommentsContainer = ({ className, product }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const getUserName = (id) =>
    users.find((user) => user.id === id)?.name || "Аноним";

  const comments = product?.rating?.users || [];

  return (
    <div className={className}>
      <p className="eyebrow">Отзывы</p>
      <h2>
        Что говорят
        <span> ({comments.length})</span>
      </h2>

      {comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((user) => (
            <article className="comment" key={user.userId + user.date}>
              <div className="icon-and-name">
                <span className="avatar">{getUserName(user.userId).slice(0, 1)}</span>
                <div>
                  <p className="name">{getUserName(user.userId)}</p>
                  <p className="date">{correctDate(user.date)}</p>
                </div>
              </div>
              <div className="comment-and-stars">
                <div className="stars">
                  <RatingStars userRating={user.userRating} />
                </div>
                <p className="text">{user.userComment}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="nothing">
          Пока нет отзывов. Будьте первым, кто оценит эту вещь.
        </div>
      )}
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  display: flex;
  flex-direction: column;
  gap: 14px;

  & .eyebrow {
    margin: 0;
  }

  & h2 {
    margin: 0 0 8px;
    font-size: clamp(24px, 2.4vw, 32px);

    & span {
      color: var(--grey-color);
      font-family: var(--font-body);
      font-size: 14px;
    }
  }

  & .comments-list {
    display: flex;
    flex-direction: column;
  }

  & .comment {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 22px 0;
    border-top: 1px solid var(--line);
  }

  & .icon-and-name {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  & .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--ink);
    border-radius: 50%;
    font-family: var(--font-display);
    font-size: 16px;
  }

  & .name {
    margin: 0;
    color: var(--ink);
    font-size: 13px;
    font-weight: 600;
  }

  & .date {
    margin: 2px 0 0;
    color: var(--grey-color);
    font-size: 11px;
  }

  & .comment-and-stars {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 50px;

    & .text {
      margin: 0;
      color: var(--ink-soft);
      font-size: 14px;
      line-height: 1.7;
    }
  }

  & .nothing {
    padding: 24px 0;
    border-top: 1px solid var(--line);
    color: var(--grey-color);
    font-size: 13px;
  }

  @media (max-width: 576px) {
    & .comment-and-stars {
      padding-left: 0;
    }
  }
`;
