import React, {useState, useEffect} from 'react';
import TasksBlock from './components/TasksBlock';
import DescriptionBlock from './components/DescriptionBlock';
import './styles/App.scss';
import { TasksContext } from './context';
import EditTask from './components/EditTask';

function App() {

  //получение списка задач из хранилища
  function getAllTasks() {
    const tasks = localStorage.getItem('tasks')
    return tasks ? JSON.parse(tasks) : []
  }

  //состояния для списка задач и открытой для редактирования задачи
  const [tasks, setTasks] = useState(getAllTasks);
  const [openedTask, setOpenedTask] = useState();
  
  //при изменении массива со списком задач данные записываются в хранилище
  useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks))
   }, [tasks])

  return (
    //контекст для доступа к данным (список задач, его изменение, выбранная задача, ее изменение)
    <TasksContext.Provider value={{
      tasks,
      setTasks,
      openedTask,
      setOpenedTask
    }}>
      <div className="app">
        <TasksBlock/>
        {
          //если ни одна задача не выбрана для редактирования, то открывается компонент для добавления новой
          //если выбрана - открывается компонент с ее редактированием
          openedTask == undefined ? <DescriptionBlock/> : <EditTask task={openedTask}/>
        }
      </div>
    </TasksContext.Provider>
  );
}

export default App;
