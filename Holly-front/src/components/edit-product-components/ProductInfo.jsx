import { Button, Input } from "../../components";
import styled from "styled-components";
import { Icon } from "../icon/Icon";
import { Textarea } from "../textarea/Textarea";
import { notifyError, notifySuccess } from "../../func/notification";

const ProductInfoContainer = ( {className , name , setName , description , setDescription , price , setPrice , image , setImage, imageUrl , setImageUtl ,sale, setSale } ) => {


   
   
   
    
    const addImage = () => {
        if(imageUrl){
        setImage([...image, imageUrl])
        setImageUtl('')
        notifySuccess('Изображение добавлено')
        } else {
            notifyError('Введите ссылку на изображение')
        }
    }

    return(
         <div className={className}>
              <div className="info">
              <h3>Введите информацию о товаре</h3>
              <Textarea value={name} onChange={(e) => setName(e.target.value)}>Название</Textarea> 
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)}> Описание</Textarea>
              <Textarea value={price} onChange={(e) => setPrice(e.target.value)}> Цена</Textarea>
              <Textarea value={sale} onChange={(e) => setSale(e.target.value)}> Скидка в процентах</Textarea>
              <Textarea value={imageUrl}  onChange={(e) => setImageUtl(e.target.value)}>Ссылка на изображение</Textarea>
              <Button width={"300px"} onClick={addImage}>Добавить изоображение</Button>
              <div className="images">
              {image && image.map((img) => (
                <div className="image" key={img}>
                <Icon id="trash" color="#0c0c0cff" size="25" onClick={()=>{setImage(image.filter(item => item !== img))}}/>
                <img src={img} alt="" />
                </div>
                  
              ))}
              </div>
              
        </div>
    </div>
    )
}

export const ProductInfo = styled(ProductInfoContainer)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap:30px;   

& .images {
    display: flex;
    position: relative;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    max-width: 650px;
    gap: 10px;
    

    & .image{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        & img{
        width: 210px;
        height: 300px;
        border-radius: 10px;
    }
    & i {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    }
    }
}

.info{
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 40px;
        border: 1px solid #ccccccff;
        border-radius: 10px;
        padding: 30px;
        width: 100%;

        & h3{
            margin: 10px;
            color: #868585ff;
            font-size: 20px;
        }
    }
`