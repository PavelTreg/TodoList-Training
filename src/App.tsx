import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./comp/Todolist";
import {v1} from "uuid";
import {AddItemInput} from "./comp/AddItemInput";

export type FilterType = 'All' | 'Active' | 'Completed'

type TasksObjType = {
    [key:string] : Array<TaskType>
}

type TodolistType = {
    id: string
    name: string
    filter: string
}
function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()
    const [tasks, setTasks] = useState <TasksObjType>({
        [todoListId1]: [
            {id: v1(), name: 'HTML', isDone: true},
            {id: v1(), name: 'JS', isDone: false},
            {id: v1(), name: 'React', isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), name: 'HTML', isDone: true},
            {id: v1(), name: 'JS', isDone: false},
            {id: v1(), name: 'React', isDone: true}
        ]
    })

    const [todoLists, setTodoLists] = useState <Array<TodolistType>>([
        {id: todoListId1, name: 'What to learn', filter: 'All'},
        {id: todoListId2, name: 'What to buy', filter: 'All'}

    ])


    const filterFunction = (filterValue: FilterType, todolistId: string) => {
        let newTodo = todoLists.find(t => todolistId === t.id)
        if (newTodo)
            newTodo.filter = filterValue
        setTodoLists([...todoLists])
    }


    const removeTask = (_id: string, todolistId: string) => {

        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== _id)
        setTasks({...tasks})
    }

    const addTask = (value: string, todolistId: string) => {
                const newTask = {id: v1(), name: value, isDone: true}
             tasks[todolistId] = [newTask,...tasks[todolistId]]
             setTasks({...tasks})
    }

    const changeStatus = (checked: boolean, _id: string, todolistId: string) => {
                let newStatus = tasks[todolistId].find(t => t.id === _id)
        if (newStatus)
            newStatus.isDone = checked
        setTasks({...tasks })
    }

    const removeTodoList = ( todoListId: string) => {
        let withoutTodoList = todoLists.filter( t => t.id !== todoListId)
        if (withoutTodoList)
        {
            setTodoLists( withoutTodoList)
            delete tasks[todoListId]
            setTasks({...tasks})
        }
         }
         const addTodoList = (value: string) => {
        let newTodo =  {id: v1(), name: value, filter: 'All'}
             setTodoLists([newTodo, ...todoLists])
             setTasks({...tasks, [newTodo.id] : []})
         }

         const changeNameTask = (valueSpanInput: string, id: string, todolistId:string) => {
        let changeName = tasks[todolistId]
             let changeTask = changeName.find( t => t.id === id)
             if(changeTask){
                 changeTask.name = valueSpanInput
             }
        setTasks({...tasks})
         }
    const changeNameTodolist = (valueSpanInput: string, todolistId:string) => {

        let changeTodolist = todoLists.find( t => t.id === todolistId)
        if(changeTodolist){
            changeTodolist.name = valueSpanInput
        }
       setTodoLists([...todoLists])
    }
    return (
        <div className="App">
            <AddItemInput addItem = {addTodoList}/>

            {todoLists.map(tl => {

                let filteredTask = tasks[tl.id]
                if (tl.filter === 'Active') {
                    filteredTask = filteredTask.filter(t => !t.isDone)
                }
                if (tl.filter === 'Completed') {
                    filteredTask = filteredTask.filter(t => t.isDone)
                }
                return (
                    <Todolist name={tl.name}
                              tasks={filteredTask}
                              filterFunction={filterFunction}
                              removeTask={removeTask}
                              addTask={addTask}
                              changeStatus={changeStatus}
                              filter={tl.filter}
                              todolistId={tl.id}
                              removeTodoList = {removeTodoList}
                              changeNameTask = {changeNameTask}
                              changeNameTodolist = {changeNameTodolist}
                    />)
            })}

        </div>
    );
}

export default App;
