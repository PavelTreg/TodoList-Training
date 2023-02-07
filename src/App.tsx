import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./comp/Todolist";
import {v1} from "uuid";
import AddItemForm from "./comp/AddItemForm";


export type FilterType = 'All' | 'Active' | 'Completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
type TaskStateType = {
    [todoListId: string] : Array<TaskType>
}
function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId1]:
            [
                {id: v1(), name: 'HTML', isDone: true},
                {id: v1(), name: 'JS', isDone: false},
                {id: v1(), name: 'React', isDone: true}
            ],
        [todoListId2]:
            [
                {id: v1(), name: 'Milk', isDone: true},
                {id: v1(), name: 'Coffee', isDone: false},
            ]
    })

    const removeTodolist = (todoListId: string) => {
        let oneTodoList = todoLists.filter( t=> t.id !== todoListId)
        setTodoLists(oneTodoList)
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    const filterFunction = (filterValue: FilterType, todolistId: string ) => {
        let todoListsFilter = todoLists.find( t => t.id === todolistId)
        if(todoListsFilter)
            todoListsFilter.filter = filterValue
               setTodoLists([...todoLists])
    }

    const removeTask = (_id: string, todolistId: string) => {
        let withoutTask = tasks[todolistId]
            tasks[todolistId] = withoutTask.filter(t => t.id !== _id)
        setTasks({...tasks})
    }

    const addTask = (value: string, todolistId: string) => {
        const newTask = {id: v1(), name: value, isDone: true}
        let newTasks = tasks[todolistId]
              tasks[todolistId] = [newTask,...newTasks]
        setTasks({...tasks})
    }

    const changeStatus = (checked: boolean, _id: string, todolistId: string) => {
        let newStatusTasks = tasks[todolistId]
        let newStatus = newStatusTasks.find(t => t.id === _id)
        if (newStatus)
            newStatus.isDone = checked
        setTasks({...tasks})

    }

    const addTodoList = (value:string) => {
        let newTodolist: TodoListType =
            {id: v1(), title: value, filter: 'All'}

        setTodoLists([newTodolist, ...todoLists])
        setTasks({[newTodolist.id] : [] , ...tasks})
    }
    return (
        <div className="App">



            <AddItemForm addItem= {addTodoList} />
            {todoLists.map(tl => {
                let filteredTask = tasks[tl.id]
                if (tl.filter === 'Active') {
                    filteredTask = filteredTask.filter(t => !t.isDone)
                }
                if (tl.filter === 'Completed') {
                    filteredTask = filteredTask.filter(t => t.isDone)
                }

                return (

                        < Todolist
                            todolistId = {tl.id}
                            name={tl.title}
                                   tasks={filteredTask}
                                   filterFunction={filterFunction}
                                   removeTask={removeTask}
                                   addTask={addTask}
                                   changeStatus={changeStatus}
                                   filter={tl.filter}
                            removeTodolist = {removeTodolist}
                        />)})}

        </div>
    );
}

export default App;
