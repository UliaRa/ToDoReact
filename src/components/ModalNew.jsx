import React, {useContext, useEffect, useState} from "react";
import '../styles/modal.scss';
import { TasksContext } from "../context";
import '../styles/App.scss';

//компонент - окно для добавления нового элемента
function ModalNew({isVisible, setVisibility}) {

    //состояние списка задач, данные из контекста
    const {tasks, setTasks} = useContext(TasksContext);

    //состояние для названия и срока выполнения добавляемой задачи (для управляемых полей ввода)
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');

    //если окно видимо, то добавляется класс, отвечающий за видимость
    const modalClasses = ['modal'];
    if (isVisible) {
        modalClasses.push('modal--active')
    }

    //очищение полей при размонтировании компонента
    useEffect(() => {
        return () => {
            setTitle('');
            setDeadline('');
        }
    }, []);

    //создание новой задачи по полученным из полей данным
    const addNewTask = () => {
        const newTask = {
            id: tasks.length,
            title,
            deadline,
            status: 'notStarted'
        }
        //новая задача записывается в массив, обновление прописано в App.js
        setTasks([...tasks, newTask]);
        //отключение видимости окна
        setVisibility(false);
    }

    return(
        <div className={modalClasses.join(' ')} onClick={() => setVisibility(false)}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal__title">Введите название и срок выполнения задачи</h3>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="modal__input app__search" placeholder="Название"/>
                <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="modal__input app__search" placeholder="Дедлайн" />
                <div className="modal__controls">
                    <button className="modal__button" onClick={addNewTask}>Добавить</button>
                    <button className="modal__button" onClick={() => setVisibility(false)}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default ModalNew;