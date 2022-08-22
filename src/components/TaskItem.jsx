import React, {useEffect, useState, useContext} from "react";
import '../styles/item.scss';
import ModalDelete from './ModalDelete';
import deleteIcon from '../img/delete-icon.png'; 
import { TasksContext } from "../context";

//компонент для отображения одной задачи
function TaskItem(props) {
    //состояния для цвета надписи статуса, статуса и отображения модального окна для удаления
    const [statusColor, setStatusColor] = useState('#212e53');
    const [statusTitle, setStatusTitle] = useState('не начата');
    const [modalDelete, setModalDelete] = useState(false);

    //состояние для выбранной задачи
    const {openedTask, setOpenedTask} = useContext(TasksContext);

    //при монтировании компонента заполнение статуса (цвет и название)
    //перезапись при изменении статуса задачи
    useEffect(() => {
        if (props.task.status == 'notStarted') {
            setStatusColor('#8f8f8f');
            setStatusTitle('не начата');
        } else if (props.task.status == 'Completed') {
            setStatusColor('#009A1E');
            setStatusTitle('выполнена');
        } else {
            setStatusColor('#212e53');
            setStatusTitle('в процессе');
        }
    }, [props.task.status]);

    //выбор задачи (при клике на компонент передается текущая задача)
    const openTask = () => {
        setOpenedTask(props.task);
    }

    return(
        <div className="item" onClick={openTask}>
            <ModalDelete isVisible={modalDelete} setVisibility={setModalDelete} taskId={props.task.id}/>
            <div className="item__data">
                <span className="item__status" style ={{color: statusColor}}>{statusTitle}</span>
                <span className="item__name">{props.task.title}</span>
                <div className="item__deadline">
                    <span>до </span>
                    <span className="item__date">{props.task.deadline}</span>
                </div>
            </div>
            <button className="item__delete" onClick={() => setModalDelete(true)}>
                <img src={deleteIcon} alt="Удалить" />
            </button>
        </div>
    );
};

export default TaskItem;