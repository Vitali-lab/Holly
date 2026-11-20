
import styled from "styled-components";
import { Button } from "../../../components/button/Button";
import { Input } from "../../../components/input/Input";
import { RatingStars } from "../../../components/raring-stars/RatingStars";
import { editRating } from "../../../bff/api/back-end/edit-rating";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccess } from "../../../func/notification";


const RatingContainer = ({className , setHover, userRating, setUserRating, hover, product, currentUser ,comment, setComment}) => {

    const dispatch = useDispatch();

    
     const isRating = ( ) => {
        if(currentUser && product?.rating?.users.find(user => user.userId === currentUser.id)){
            return true
        }
    }

    const handleRating = () => ({
            userId:currentUser.id,
            userRating:userRating,
            postId:product.id,
            userComment:comment,
            date:new Date().toISOString()
        })
    
        const addRating =  () => {
            try {
              const res =  dispatch(editRating(handleRating()))
              console.log(res,'res');
              
              if(!res){
                  throw new Error(res)  
              }
              else {
                  notifySuccess('Cпасибо за оценку')
                  setComment('')
              }
            } catch (error) {
                notifyError(error.message)  
            }
        }

    return(
        <div className={className}>
            <p className="rating-title">
              {isRating() ? "Ваша оценка" : "Оцените вещь"}
            </p>
            {!isRating() && 
            <RatingStars 
            setHover={setHover} 
            userRating={userRating} 
            hover={hover} 
            setUserRating={setUserRating}
            isRating={isRating} />}
            {isRating() ? (
                <div>
                    <p>Благодарим за оценку!</p>
                    <p>{`Вы оценили ${product.name} на ${product.rating.overallRating}`}</p> 
                </div>
            )
            :(
            <>
            {userRating > 0 &&  
            <div className="ratingAndComment">
                <Input text={'Оставьте отзыв'} onChange = {(e) => setComment(e.target.value)}/>
                <Button onClick={addRating}>Отправить</Button>
            </div>}
            </>
             
            )}
            
        </div>
    )
}
export const Rating = styled(RatingContainer)`
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--line);

  & .rating-title {
    margin: 0 0 10px;
    color: var(--grey-color);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  & .ratingAndComment {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    margin-top: 12px;
  }
`