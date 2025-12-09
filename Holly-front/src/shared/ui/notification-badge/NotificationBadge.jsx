import styled from 'styled-components';

const NotificationBadgeContainer = ({ className, num }) => {
  return (
    <div className={className}>
      <span>{num}</span>
    </div>
  );
};

export const NotificationBadge = styled(NotificationBadgeContainer)`
  position: absolute;
  top: ${({ top = '-9px' }) => top};
  right: ${({ right = '-16px' }) => right};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: var(--main-color);
  color: #ffffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;
