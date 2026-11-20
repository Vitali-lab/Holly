import { Select } from "../select/Select";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../../bff/api/back-end/get-categories";
import { getSeasons } from "../../bff/api/back-end/get-seasons";
import styled from "styled-components";


const ProductLablesContainer = ({className, categories, category, setCategory, seasons, season, setSeason }) => {


    const dispatch = useDispatch();

     useEffect(() => {
        dispatch(getCategories());
        dispatch(getSeasons());
    }, [dispatch]);
    
    return (
        <div className={className}>
            <div className="lables">
            <Select selectItems={categories} selectValue={category} selectFunc={setCategory}>Категория</Select>
            <Select selectItems={seasons} selectValue={season} selectFunc={setSeason}>Сезон</Select>
            </div>
        </div>
    )
}

export const ProductLables = styled(ProductLablesContainer)`
display: flex;
flex-direction: row;
justify-content: start;
align-items: start;
gap:30px;  
margin-bottom: 30px;
& .lables {
display: flex;
flex-direction: row;
justify-content: center;
align-items: start;
border: 1px solid #ccccccff;
gap: 10px;
padding: 30px;
border-radius: 10px;
font-size: 20px;
color: #868585ff;
font-weight: 700;
 & select {
    width: 190px;
    height: 35px;
    border-radius: 10px;
    border: 1px solid #ccccccff;
    padding: 0px 10px;
    font-size: 15px;
}
}
`