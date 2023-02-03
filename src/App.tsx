import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./comp/Todolist";
import {v1} from "uuid";

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {
    const todoListsId1 = v1()
    const todoListsId2 = v1()

    const [tasksObj, setTasksObj] = useState({
        [todoListsId1]: [
            {id: v1(), name: 'HTML', isDone: true},
            {id: v1(), name: 'JS', isDone: false},
            {id: v1(), name: 'React', isDone: true}
        ],
        [todoListsId2]: [
            {id: v1(), name: 'HTML', isDone: true},
            {id: v1(), name: 'JS', isDone: false},
            {id: v1(), name: 'React', isDone: true}
        ]
    })

    const [todoLists, setTodoLists] = useState([
        {id: todoListsId1, title: 'What to learn', filter: 'Active'},
        {id: todoListsId2, title: 'What to buy', filter: 'Completed'},
    ])

    const filterFunction = (filterValue: FilterType, todoListId: string) => {
        const filteredTodoList = todoLists.find(t => t.id === todoListId)
        if (filteredTodoList) {
            filteredTodoList.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    const removeTask = (_id: string, todoListId: string ) => {
        let needTask = tasksObj[todoListId]
        tasksObj[todoListId]= needTask.filter(t => t.id !== _id)

        setTasksObj({...tasksObj})
    }

    const addTask = (value: string, todoListId: string) => {
        const newTask = {id: v1(), name: value, isDone: true}
        let needTask = tasksObj[todoListId]
        tasksObj[todoListId] = [newTask ,...needTask]
        setTasksObj({...tasksObj})
    }

    const changeStatus = (checked: boolean, _id: string, todoListId: string) => {
        let needTask = tasksObj[todoListId]
        let newStatus = needTask.find(t => t.id === _id)
        if (newStatus)
            newStatus.isDone = checked
        setTasksObj({...tasksObj})
    }

    const removeTodoList = (todoListId: string) => {
        const oneTodoList = todoLists.filter( t => t.id !== todoListId)
        setTodoLists(oneTodoList)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }
    return (
        <div className="App">
            {todoLists.map(tl => {

                let filteredTask = tasksObj[tl.id]
                if (tl.filter === 'Active') {
                    filteredTask = filteredTask.filter(t => !t.isDone)
                }
                if (tl.filter === 'Completed') {
                    filteredTask = filteredTask.filter(t => t.isDone)
                }
                return (
                    < Todolist
                        key={tl.id}
                        name={tl.title}
                        tasks={filteredTask}
                        filterFunction={filterFunction}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        todoListId={tl.id}
                        removeTodoList = {removeTodoList}
                    />)
            })}

        </div>
    );
}

export default App;
