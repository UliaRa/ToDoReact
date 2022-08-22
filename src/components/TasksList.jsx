import React from "react";
import TaskItem from "./TaskItem";

//компонент со списком задач
function TasksList(props) {
    //список передается от родительского компонента TaskBlock (либо список всех задач, либо отфильтрованный по поиску)
    //для каждого элемента массива задач создается компонент, отвечающий за отображение одной задачи (TaskItem)
    //если список пуст - выводится сообщение "Ничего не найдено"
    return(
        <div className="list">
            {props.tasks.length !== 0
                ? props.tasks.map(task => <TaskItem task={task} key={task.id}/>)
                : <span>Ничего не найдено</span>
            }
        </div>
    );
};

export default TasksList;