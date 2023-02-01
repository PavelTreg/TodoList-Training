import React, {useState} from 'react';
import './App.css';
import TodoList from "./component/TodoList";
import {v1} from "uuid";


export type FilterType = 'All' | 'Active' | 'Completed'


type TodolistType = {
    id: string
    title: string
    filter: string
}

function App() {
    const  todoListsId1 = v1()
    const  todoListsId2 = v1()

    let [tasksObj, setTasksObj] = useState({
        [todoListsId1] : [
            {id: v1(), name: 'HTML', isDone: true},
            {id: v1(), name: 'JS', isDone: false},
            {id: v1(), name: 'React', isDone: true}
        ],

            [todoListsId2] : [
        {id: v1(), name: 'HTML', isDone: true},
        {id: v1(), name: 'JS', isDone: false},
        {id: v1(), name: 'React', isDone: true}
    ]})



    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListsId1, title: 'What to learn', filter: 'Active'},
        {id: todoListsId2, title: 'What to buy', filter: 'Completed'}
    ])

    const removeTodoList = (idTodoList: string) => {
              const oneTodoList = todoLists.filter( t => t.id !== idTodoList)
        setTodoLists(oneTodoList)


    }

    const filterFunction = (valueFilter: FilterType, _id:string) => {
    let newTodolist = todoLists.find( t => t.id === _id)
        if(newTodolist) {
            newTodolist.filter = valueFilter
        }
        setTodoLists([...todoLists])
    }

    const removeTask = (_id: string, idTodolist: string) => {
        let tasks = tasksObj[idTodolist]
        tasksObj[idTodolist] = tasks.filter(t => t.id !== _id)
        setTasksObj({...tasksObj})
    }

    const addTask = (inputValue: string, idTodolist: string) => {
        const newTask = {id: v1(), name: inputValue, isDone: false}
        let tasks = tasksObj[idTodolist]
               tasksObj[idTodolist] = [newTask,...tasks]
        setTasksObj({ ...tasksObj})
    }

    const changeTaskStatus = (statusValue: boolean, _id: string, idTodolist: string) => {
        let tasks = tasksObj[idTodolist]
        let newStatus = tasks.find(t => t.id === _id)
        if (newStatus)
            newStatus.isDone = statusValue
        setTasksObj({...tasksObj})
    }

    return (
        <div className="App">
            {todoLists.map((tl) => {
                let filteredTask = tasksObj[tl.id]
                if (tl.filter === 'Active') {
                    filteredTask = filteredTask.filter(t => !t.isDone)
                }
                if (tl.filter === 'Completed') {
                    filteredTask = filteredTask.filter(t => t.isDone)
                }

                return (
                    <TodoList
                        key={tl.id}
                        title={tl.title}
                        tasks={filteredTask}
                        filterFunction={filterFunction}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        todoListsId = { tl.id}
                        removeTodoList = {removeTodoList}
                    />)
            })}
        </div>
    );
}

export default App;
