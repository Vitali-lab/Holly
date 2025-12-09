import { useNavigate } from 'react-router-dom';
import { useProductLabels, useToggleFavorites } from '../../../shared/hooks';
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Loader from '../../../shared/ui/loader/Loader';
import { Icon, Sizes, Price, Rating } from '../../../shared/ui';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const ProductName = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin: 3px 0 0 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ProductIcons = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 5px;
  margin: 0px 0 0 0;
  & .bag i {
    cursor: pointer;
    transition: all ease 0.5s;
  }
`;
const fadeIn = keyframes`
  from {
  transform: translateY(-30px);
    opacity: 0;
  }
  to {
  transform: translateY(0px);
    opacity: 1;
  }
`;
const SizesDiv = styled.div`
  background-color: #ffffff;
  padding: 10px 20px;
  position: absolute;
  box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24);
  border-radius: 10px;
  width: 300px;
  top: 40px;
  left: calc(50% - 170px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const ProductCardContainer = ({
  className,
  post,
  openSizesId,
  setOpenSizesId,
  currentSize,
  setcurrentSize,
}) => {
  const navigate = useNavigate();
  const { getCategoryName } = useProductLabels();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { toggleFavorites, isUserLike } = useToggleFavorites();
  const location = useLocation();

  const onProductClick = (id) => {
    const storage = JSON.parse(sessionStorage.getItem('products')) || [];

    if (post && !storage.find((item) => item.id === id)) {
      storage.push(post);
    }

    sessionStorage.setItem('products', JSON.stringify(storage));
    navigate(`/catalog/${id}`);
  };

  if (!post) {
    return <Loader />;
  }

  return (
    <div className={className} key={post.id}>
      <motion.div
        key={post.id}
        className="post"
        initial={{ opacity: 0, y: 0, scale: 1 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div>
          <div className="image-container">
            <img src={post.images[0]} alt={post.name} onClick={() => onProductClick(post.id)} />
            {post.sale !== null ? (
              <div className="sale-container">
                <span className="sale">Скидка {post.sale}%</span>
              </div>
            ) : (
              ''
            )}
          </div>

          <ProductName>
            <h2>{post.name}</h2>
          </ProductName>

          <p className="category">{getCategoryName(post.categoryId)}</p>
          <div className="price-and-rating">
            <Price post={post} />
            <Rating post={post} />
          </div>
        </div>
        <ProductIcons>
          <Icon
            className="heart"
            id={isUserLike(post) ? 'heart' : 'heart-o'}
            color={isUserLike(post) ? 'var(--main-color)' : '#0a0a0aff'}
            size="18"
            onClick={() => toggleFavorites(post)}
          />
          {currentUser && location.pathname === '/catalog' ? (
            <Icon
              className="bag"
              id="shopping-bag"
              color="#0c0c0cff"
              size="18"
              onClick={() => {
                setOpenSizesId(openSizesId === post.id ? null : post.id);
              }}
            />
          ) : (
            ''
          )}
        </ProductIcons>
        {openSizesId === post.id ? (
          <SizesDiv id="sizes-div">
            <Sizes
              currentSize={currentSize}
              setcurrentSize={setcurrentSize}
              product={post}
              sizesKeys={Object.keys(post.sizes)}
              setOpenSizesId={setOpenSizesId}
            />
          </SizesDiv>
        ) : (
          ''
        )}
      </motion.div>
    </div>
  );
};

export const ProductCard = styled(ProductCardContainer)`

& .price-and-rating{
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
width: 100%;
}




& .image-container{
position: relative;
}

& .post{
    position:relative;
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 240px;
    height: 450px;
    border: 1px solid #cccccc2e;
    font-size: 14px;
    border-radius: 10px;
    padding: 0px;
    overflow: hidden;
    
    

       & img{
        width: 100%;
        height: 340px;
        object-fit: cover;
        border-radius:   10px 10px 0px 0px;
        transition: all ease-in 0.5s;
        &:hover{
        transform: scale(1.05);
        transition: all ease 0.5s;
        
    
        }
    }
     & p {
        margin: 0px;
        padding:  0 0 0 5px;
     }
     & h2 {
        margin: 10px 0 0 0px;
        font-weight: 500;
        padding:  0 0 0 5px;
        font-size: 15px;

     }  
     & span {
        margin: 0px;
        padding:  0 0 0 5px;
     }       
}

& .sale-container{
     position: absolute;
     padding:  5px;
     bottom: 5px;
     background-color:var(--main-color);
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    border-radius: 0px 10px 10px 0px;

    & span{
        color: white;
        font-size: 13px;
        font-weight: 600;
    }
  }      

& .category{
    color: #b1b1b1;
    font-size: 13px;
    padding:  0 0 0 5px;
}
 & i{
 cursor: pointer;
 padding:  0 5px;
 transition: all ease 0.2s;
 }
 & i:active{
 transition: all ease 0.2s;
     transform: scale(0.7);
 }

  @media (max-width: 1600px) {

    & .post{
        width: 280px;
        height: 490px;
        & img{
          height: 400px;
        }   
}

 @media (max-width: 1550px) {

    & .post{
        width: 250px;
        height: 550px;
        & img{
          height: 400px;
        }
}
        
}
 @media (max-width: 1385px) {
 gap: 20px;
    & .post{
        width: 250px;
        height: 540px;
        & img{
          height: 400px;
        }
}
}
@media (max-width: 1200px) {

    & .post{
        width: 250px;
        height: 490px;
        & img{
          height: 400px;
        }
}
        
    
}

 @media (max-width: 1000px) {

    & .post{
        width: 250px;
        height: 490px;
        & img{
          height: 400px;
        } 
}
}
    @media (max-width: 500px) {
    flex-direction: row;
    display: flex;
    & .post{
    width: 175px;
    height: 380px;
    & img{
      height: 240px;
    }
    }
    
    }
`;
