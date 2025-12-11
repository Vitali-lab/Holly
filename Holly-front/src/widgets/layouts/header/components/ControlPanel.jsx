import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon, Logo, Search, NotificationBadge } from '../../../../shared/ui';
import { notifySuccess } from '../../../../shared/lib/notification';
import { USER_ROLES } from '../../../../shared/config/user-roles';
import { useGetCreatedOrdersCount } from '../../../../shared/hooks/use-get-createt-orders-count';
import { logout } from '../../../../features/user/user';
import { userSelector } from '../../../../entities/selectors';
import styled from 'styled-components';

const ControlPanelContainer = ({ className, setIsAuthOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector(userSelector);
  const { createdOrdersCount, createdUserOrdersCount } = useGetCreatedOrdersCount();

  const openFavorites = location.pathname === '/favorites';
  const openCart = location.pathname === '/cart';
  const openUserCabinet = location.pathname === `/user-cabinet/${currentUser?.id}`;

  const userLogout = () => {
    dispatch(logout());
    navigate('/');
    notifySuccess('Вы успешно вышли из аккаунта');
  };

  const iconColor = (isOpen) => {
    if (isOpen) {
      return 'var(--main-color)';
    }
    return 'var(--black-color)';
  };

  return (
    <div className={className}>
      <div className="search-header">
        <Search />
      </div>
      <div className="logo-header">
        <Logo width="250px" height="110px" />
      </div>
      <div className="icons-header">
        <div className="favorites">
          <Icon
            id={openFavorites ? 'heart' : 'heart-o'}
            color={iconColor(openFavorites)}
            size="25"
            onClick={() => {
              navigate('/favorites');
            }}
          />
          <p>Избранное</p>
        </div>
        <div className="shopping-bag">
          <Icon
            id="shopping-bag"
            size="25"
            color={iconColor(openCart)}
            onClick={() => {
              navigate('/cart');
            }}
          />
          <p>Корзина</p>
          {(currentUser?.cart || []).length > 0 && (
            <NotificationBadge num={(currentUser?.cart || []).length} />
          )}
        </div>
        <div className="catr">
          {!currentUser ? (
            <>
              <Icon
                id="user-o"
                color={iconColor(openUserCabinet)}
                size="25"
                onClick={() => {
                  setIsAuthOpen(true);
                }}
              />
              <p>Войти</p>
            </>
          ) : (
            <>
              <Icon
                id="user-circle-o"
                color={iconColor(openUserCabinet)}
                onClick={() => navigate(`user-cabinet/${currentUser.id}`)}
              />
              {createdUserOrdersCount() > 0 && (
                <NotificationBadge num={createdUserOrdersCount()} top="-8px" right="-19px" />
              )}
              <p>Профиль</p>
            </>
          )}
        </div>
        <div className="sign-out">
          {currentUser && (
            <>
              <Icon id="sign-out" color="var(--black-color)" size="25" onClick={userLogout} />
              <p>Выход</p>
            </>
          )}
        </div>
      </div>
      {currentUser?.role === USER_ROLES.ADMIN && (
        <div className="admin-panel">
          {currentUser.role === USER_ROLES.ADMIN && (
            <Link to="/admin-panel">
              <div className="admin-menu">
                <p>Админ панель</p>
                <div className="admin-panel-count">
                  {(currentUser?.role === USER_ROLES.ADMIN && createdOrdersCount()) > 0 && (
                    <NotificationBadge num={createdOrdersCount()} top="3px" right="100px" />
                  )}
                </div>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  height: 80px;
  margin: 0 auto;

  & .user-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #f5f5f5be;
    color: var(--gray-color);
    display: flex;
    cursor: pointer;
    border: 3px solid #494949ff;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }
  & i {
    cursor: pointer;
  }

  & .search-header {
    width: 32%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    align-items: center;

    & p {
      font-size: 15px;
      color: var(--black-color);
      margin: 0px;
    }
    &:hover {
      cursor: pointer;
    }
  }
  & .icons-header {
    width: 32%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 65px;
  }

  & .logo-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10px;
  }
  & .favorites,
  .shopping-bag,
  .catr,
  .sign-out,
  .user-icon {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    & p {
      position: absolute;
      margin: 0px;
      top: 35px;
      color: var(--black-color);
    }
  }

  & .shopping-bag {
    cursor: pointer;
    position: relative;
  }
  & .admin-panel {
    position: fixed;
    cursor: pointer;
    top: 10px;
    right: 0px;
    & a {
      margin: 0px;
      text-decoration: none;
    }
  }

  & .admin-menu {
    position: relative;
    width: 130px;
    height: 20px;
    padding: 5px;
    border-radius: 10px 0 0 10px;
    background-color: var(--black-color);
    color: var(--white-color);
    display: flex;
    justify-content: end;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    left: 0px;
    top: -30px;

    & .search-header {
      display: none;
    }
    & .icons-header {
      position: fixed;
      bottom: 0px;
      height: 70px;
      background-color: var(--white-color);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding-bottom: 15px;
      gap: 190px;
      width: 100%;
      & p {
        font-size: 15px;
        color: var(--black-color);
        margin: 0px;
      }
      & i {
        font-size: 25px;
        color: var(--black-color);
      }
    }
    & .logo-header {
      background-color: var(--white-color);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      top: 35px;
    }
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 430px) {
    width: min(430px, 100%);
    right: 0px;
    & .icons-header {
      position: fixed;
      right: 0px;
      bottom: 0px;
      gap: 80px;
    }
    & .admin-menu {
      width: min(100px, 100%);
      font-size: 10px;
      right: 10px;
      top: 0px;
    }
  }
`;
