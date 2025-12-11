import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductCard } from '../../features/product/components/ProductCard';
import { scrollTop } from '../../shared/utils/scrollTop';
import { productsSelector, userSelector } from '../../entities/selectors';
import { Auth, Registration } from '../../shared/ui';
import styled from 'styled-components';

const FavoritesContainer = ({ className }) => {
  const currentUser = useSelector(userSelector);
  const products = useSelector(productsSelector);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    scrollTop();
  }, []);

  const userFavorites = products.filter((product) => {
    return currentUser?.favorites.find((fav) => fav.id === product.id);
  });

  return (
    <>
      {isAuthOpen && (
        <Auth setIsAuthOpen={setIsAuthOpen} setIsRegistrationOpen={setIsRegistrationOpen} />
      )}
      {isRegistrationOpen && (
        <Registration setIsRegistrationOpen={setIsRegistrationOpen} setIsAuthOpen={setIsAuthOpen} />
      )}

      <div className={className}>
        <h1>Избранное</h1>

        {!currentUser && (
          <div className="no-auth">
            <p>
              <span onClick={() => setIsRegistrationOpen(true)}>Зарегистрируйтесь</span> или{' '}
              <span onClick={() => setIsAuthOpen(true)}>авторизируйтесь</span>, чтобы увидеть свои
              любимые товары
            </p>
          </div>
        )}

        {currentUser && currentUser.favorites.length === 0 && (
          <div className="no-auth">
            <p>Вы еще ничего не добавили в избранное</p>
            <p>Добавьте товары в избранное, чтобы не потерять :)</p>
          </div>
        )}

        {currentUser && currentUser.favorites.length > 0 && (
          <div className="favorites">
            {userFavorites.map((post) => (
              <ProductCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export const Favorites = styled(FavoritesContainer)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-wrap: wrap;
padding: 0px;
gap: 20px;
width: 95%;
background-color: var(--white-color);
margin: 0px auto;
 h1 {
    margin-bottom: 10px;
  }

& .no-auth{
width:100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 20px;
font-weight: bold;
 & p {
  color: var(--grey-color);
  font-size: 16px;
  font-weight: 400;
 }
  & h1{
  margin: 0;
  }
  & span{
    cursor: pointer;
    color: var(--main-color);
    text-decoration: underline;
    font-weight: 600;
  }
}


& .favorites {
display: flex;
width: 100%;
flex-direction: row;
justify-content: start;
align-items: center;
flex-wrap: wrap;
gap:20px;
}

& .alert{
    width: 700px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    font-weight: bold;
}



& .like-products{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    gap: 20px;
    margin: 20px 0 0 0;
    cursor: pointer;
    & img {
        width: 300px;
        height: 450px;}
        }


@ media (max-width: 1500px) {
    width: 100%;
    font-size: 12px;
}
    @media (max-width: 1200px) {
    width: 100%;
    font-size: 12px;
}
    @media (max-width: 992px) {
    width: 100%;
    font-size: 12px;
}
    @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
}
    @media (max-width: 430px) {
    width: min(430px, 100%);
    font-size: 12px;
    margin: 100px 0;
    & .favorites {
        width: min(430px, 100%);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        gap: 10px;
        
    }
    & .no-auth {
    width: max(430px, 100%);
    padding: 0px;
    }   
}
`;
