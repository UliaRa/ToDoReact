import React, { useMemo, useState, useContext } from "react";
import TasksList from "./TasksList";
import { TasksContext } from "../context";
import '../styles/App.scss';

//компонент со списком задач и поиском по ним
function TasksBlock() {
    //получение списка задач из контекста
    const {tasks, setTasks} = useContext(TasksContext);
    //состояние для текста в строке поиска для управляемого поля ввода
    const [search, setSearch] = useState('');

    //массив фильтруется (выполняется поиск)
    //данные кэшируются, перезаписываются только при изменении массива задач или строки поиска
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => task.title.includes(search))
    }, [search, tasks])

    return(
        <div className="app__list">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Название" className="app__search" />
            <TasksList tasks={filteredTasks} />
        </div>
    );
};

export default TasksBlock;