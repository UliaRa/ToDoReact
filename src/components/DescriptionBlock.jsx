import React, {useState} from "react";
import addIcon from '../img/add-icon.png';
import '../styles/description.scss';
import ModalNew from "./ModalNew";

//компонент отображается, когда не выбрана задача для редактирования, переход к добавлению новой задачи
function DescriptionBlock() {
    //состояние для открытия/закрытия окна с добавлением новой задачи
    const [modalNew, setModalNew] = useState(false);

    return(
        //при нажатии на кнопку открывается окно (изменяется состояние видимости)
        <div className="description app__edit">
            <ModalNew isVisible={modalNew} setVisibility={setModalNew}/>
            <button className="description__new" onClick={() => setModalNew(true)}>
                <img src={addIcon} alt="Добавить" />
            </button>
            <p className="description__text">
                Нажмите, чтобы добавить новую задачу или выберите ее из списка слева для редактирования
            </p>
        </div>
    );
};

export default DescriptionBlock;