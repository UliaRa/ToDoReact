import React, { useState, useContext, useEffect } from "react";
import '../styles/edit.scss';
import {TasksContext} from "../context";

//компонент для редактирования задачи
function EditTask(props) {

    //состояния для названия, срока выполнения, списка возможных статусов и выбранного статуса
    const [title, setTitle] = useState(props.task.title);
    const [deadline, setDeadline] = useState(props.task.deadline);
    const [statuses, setStatuses] = useState(['не начата', 'в процессе', 'выполнена']);
    const [pickedStatus, setPickedStatus] = useState();

    //получение текущей задачи для редактирования и списка всех задач из контекста
    const {tasks, setTasks} = useContext(TasksContext);
    const {openedTask, setOpenedTask} = useContext(TasksContext);

    //при монтировании компонента поля заполняются данными выбранной задачи
    //меняется при изменении выбранной задачи
    useEffect(() => {
            if (props.task.status == 'notStarted') {
                setPickedStatus('не начата');
            } else if (props.task.status == 'Completed') {
                setPickedStatus('выполнена');
            } else {
                setPickedStatus('в процессе');
            }
            setTitle(props.task.title);
            setDeadline(props.task.deadline)
    }, [openedTask]);

    //новая (измененная) задача
    const editTask = () => {
        const changedTask = {
            id: props.task.id,
            title: title,
            deadline: deadline,
            status: pickedStatus == 'не начата' ? 'notStarted' : pickedStatus == 'выполнена' ? 'Completed' : 'inProgress'
        }
        //получение индекса элемента массива, по которому записана редактируемая задача
        let changedTaskIndex = tasks.indexOf(props.task);
        let newTasks = [...tasks];
        //перезапись элемента
        newTasks[changedTaskIndex] = changedTask;
        //перезапись массива и закрытия окна с редактированием (отсутствие выбранной задачи)
        setTasks(newTasks);
        setOpenedTask(undefined);
    }

    return(
        <div className="edit app__edit">
            <h2 className="edit__header">Редактирование задачи</h2>
            <input type='text' onChange={e => setTitle(e.target.value)} className="edit__input app__search" value={title}/>
            <input type='date' onChange={e => setDeadline(e.target.value)} className="edit__input app__search" value={deadline}/>
            <div className="edit__status">
                <span>Статус:</span>
                <select className="edit__select" onChange={e => setPickedStatus(e.target.value)}>
                    {statuses.map(s => <option value={s} key={s} selected={s == pickedStatus} >{s}</option>)}
                </select>
            </div>
            <div className="edit__controls">
                <button className="edit__button" onClick={editTask}>Сохранить</button>
                <button className="edit__button" onClick={() => setOpenedTask(undefined)}>Закрыть</button>
            </div>
        </div>
    );
};

export default EditTask;