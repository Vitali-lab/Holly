import { useSelector, useDispatch } from "react-redux";
import { postCategory } from "../../../../bff/api/back-end/post-category";
import { useState } from "react";
import { deleteCategory } from "../../../../bff/api/delete-category";
import { deleteSeason } from "../../../../bff/api/back-end/delete-season";
import { postSeason } from "../../../../bff/api/back-end/post-season";
import { Params } from "./components/Params";
import { AddParams } from "./components/AddParams";
import styled from "styled-components";
import { categorySelector, seasonSelector } from "../../../../selectors";

const EditParamsContainer = ({ className }) => {
  const seasons = useSelector(seasonSelector);
  const categories = useSelector(categorySelector);
  const [newCategory, setNewCategory] = useState("");
  const [newSeason, setNewSeason] = useState("");

  return (
    <div className={className}>
      <h1>Редактирование параметров</h1>
      <div className="container">
        <Params
          params={categories}
          type="category"
          deleteFunc={deleteCategory}
        />
        <Params params={seasons} type="season" deleteFunc={deleteSeason} />
        <div className="add-params-block">
          <AddParams
            postFunc={postCategory}
            inputValue={newCategory}
            setInputValue={setNewCategory}
            text="новой категории"
          />
          <AddParams
            postFunc={postSeason}
            inputValue={newSeason}
            setInputValue={setNewSeason}
            text="нового сезона"
          />
        </div>
      </div>
    </div>
  );
};

export const EditParams = styled(EditParamsContainer)`
  width: 1600px;
  padding: 40px;

  & .add-params-block {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  & .container {
    margin-top: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: start;
    gap: 20px;
  }
`;
