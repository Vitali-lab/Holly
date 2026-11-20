import { Icon } from "../icon/Icon"
import styled from "styled-components"
const RatingStarsContainer = ({className, setHover, userRating, setUserRating, hover ,isRating}) => {




    return (
       <div className={className}>
        {Array(5).fill(0).map((item, index) => {
            return (
            <Icon id={"star"} key={index}
            size = {'18'}
            color={index + 1 <= (hover || userRating) ? '#b48a4a' : '#d8d2c6'}
            onMouseEnter={() => isRating()? setHover(null) : setHover(index + 1)}
            onMouseLeave={() => isRating()? setHover(null) : setHover(null)}
            onClick={() => isRating() ? "" : setUserRating(index + 1)}/>
        )   
    })}
</div>
    )
}

export const RatingStars = styled(RatingStarsContainer)`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 5px;
    margin: 0 0 0 0;
    transition: all ease 0.5s;

    & svg {
        cursor: pointer;
        transition: all ease 0.5s;
        &:hover{
            transition: all ease 0.5s;
            color: #b48a4a;
        }
    }
`