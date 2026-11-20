
import { Button } from "../../../../../components/button/Button";
import { Input } from "../../../../../components/input/Input";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const AddParamsContainer = ({className, inputValue,setInputValue, postFunc,text}) => {

    const dispatch = useDispatch();

    return (
        <div className={className}>
  <Input value = {inputValue} onChange={(e) => {setInputValue(e.target.value)}} text = {`Название ${text}`}/>
  <Button onClick={() => {
      if(!inputValue){ 
           alert('Введите название ')
           return
      } else {
           setInputValue('');
      dispatch(postFunc(inputValue))}
       }} width = "200px">Добавить категорию</Button>
 </div>

    )
}

export const AddParams = styled(AddParamsContainer)`
display: flex;
    width: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    border: 1px solid #ccccccff;
    border-radius: 10px;
    padding: 10px;      
`