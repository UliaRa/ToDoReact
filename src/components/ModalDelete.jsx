import React, {useContext} from "react";
import '../styles/modal.scss';
import { TasksContext } from "../context";

//компонент - окно подтверждения удаления задачи
function ModalDelete({isVisible, setVisibility, taskId}) {

    //получение списка задач из контекста
    const {tasks, setTasks} = useContext(TasksContext);

    //подключение класса, отвечающего за видимость окна
    const modalClasses = ['modal'];
    if (isVisible) {
        modalClasses.push('modal--active')
    }

    //удаление задачи, массив фильтруется, убирается ненужный элемент
    //окно закрывается
    const deleteTask = (e) => {
        setTasks(tasks.filter(task => task.id != taskId));
        setVisibility(false);
    }

    return(
        <div className={modalClasses.join(' ')} onClick={() => setVisibility(false)}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal__title">Вы уверены, что вы хотите удалить эту задачу?</h3>
                <div className="modal__controls">
                    <button className="modal__button" onClick={deleteTask}>Да</button>
                    <button className="modal__button" onClick={() => setVisibility(false)}>Нет</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;