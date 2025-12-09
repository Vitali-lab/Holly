import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, deleteWidget, updateWidget } from '../../features/widgets/widgets';
import { MainWidget } from '../../pages/main/components/MainWidget';
import { Button, Icon, Textarea } from '../../shared/ui';
import { notifyError, notifySuccess } from '../../shared/lib/notification';
import styled from 'styled-components';

const WidgetsContainer = ({ className }) => {
  const dispatch = useDispatch();
  const [mainText, setMainText] = useState('');
  const [subText, setSubText] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null);
  const [editMainText, setEditMainText] = useState('');
  const [editSubText, setEditSubText] = useState('');
  const [editImage, setEditImage] = useState('');
  const widgets = useSelector((state) => state.widgets.widgets);

  const addMainWidget = () => {
    const widget = { mainText, subText, image };
    if (!mainText || !subText || !image) {
      notifyError('Заполните все поля');
      return;
    }
    notifySuccess('Виджет добавлен');
    dispatch(addWidget(widget));
  };

  const deleteMainWidget = (id) => {
    if (!id) {
      notifyError('Виджет не найден ');
      return;
    }
    notifySuccess('Виджет удален');
    dispatch(deleteWidget(id));
  };

  const editMainWidget = (id) => {
    const widget = {
      mainText: editMainText,
      subText: editSubText,
      image: editImage,
    };

    if (!editMainText || !editSubText || !editImage) {
      notifyError('Заполните все поля');
      return;
    }

    setEditMainText('');
    setEditSubText('');
    setEditImage('');
    dispatch(updateWidget({ id, widget }));
    setEditId(null);
    notifySuccess('Виджет обновлен');
  };

  return (
    <div className={className}>
      <h1>Виджеты</h1>
      <form action="" className="add-widget">
        <h1>Добавление виджетов</h1>
        <Textarea
          type="text"
          placeholder="Главный текст"
          onChange={(e) => {
            setMainText(e.target.value);
          }}
        >
          Главный текст
        </Textarea>
        <Textarea
          type="text"
          placeholder="Подглавный текст"
          onChange={(e) => {
            setSubText(e.target.value);
          }}
        >
          Подглавный текст
        </Textarea>
        <Textarea
          type="text"
          placeholder="Ссылка на картинку"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        >
          Ссылка на картинку
        </Textarea>
        <Button type="button" onClick={addMainWidget}>
          Добавить
        </Button>
      </form>

      <div className="widgets">
        <h1>Виджеты на главной</h1>
        {widgets.map(({ id, mainText, subText, image }) => {
          return (
            <div key={id} className="widget">
              <div className="widget-icons">
                <Icon id="trash" onClick={() => deleteMainWidget(id)} />
                <Icon id="edit" onClick={() => setEditId((prev) => (prev === id ? null : id))} />
              </div>
              <MainWidget bigText={mainText} smallText={subText} link={image} width={'1000px'} />
              {editId === id && (
                <div className="edit-widget">
                  <Textarea onChange={(e) => setEditMainText(e.target.value)}>
                    Главный текст
                  </Textarea>
                  <Textarea onChange={(e) => setEditSubText(e.target.value)}>
                    Подглавный текст
                  </Textarea>
                  <Textarea onChange={(e) => setEditImage(e.target.value)}>
                    Ссылка на картинку
                  </Textarea>
                  <Button onClick={() => editMainWidget(editId)}>Сохранить</Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Widgets = styled(WidgetsContainer)`
  width: 100%;
  & .add-widget {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    box-shadow: var(--box-shadow);
    border-radius: 10px;
    padding: 20px;
    margin-top: 30px;
    & input {
      padding: 10px;
      border-radius: 10px;
      border: none;
    }
    & button {
      cursor: pointer;
      padding: 10px;
      border-radius: 10px;
      border: none;
      background-color: var(--main-color);
      color: var(--white-color);
    }
  }

  & .widgets {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 100px;
    box-shadow: var(--box-shadow);
    border-radius: 10px;
    padding: 20px;
  }
  & .widget-icons {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: end;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;

    z-index: 100;
    & i {
      background-color: var(--white-color);
      padding: 10px;
      border-radius: 10px;
    }
  }

  & .edit-widget {
    margin-top: 20px;
  }
  & .widget {
    position: relative;
  }
`;
