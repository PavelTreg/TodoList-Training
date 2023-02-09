import React, {useState} from 'react';
import './App.css';
import { Todolist} from "./comp/Todolist";
import {v1} from "uuid";
import {AddItem} from "./comp/AppItem";

export type FilterType = 'All' | 'Active' | 'Completed'


function App() {
    const todoListsId1 = v1()
    const todoListsId2 = v1()

    const [tasks, setTasks ]= useState({
        [todoListsId1] :
            [
                { id: v1(), name: 'HTML', isDone: true },
                { id: v1(), name: 'JS', isDone: false },
                { id: v1(), name: 'React', isDone: true }
            ],
        [todoListsId2] :
            [
                { id: v1(), name: 'HTML', isDone: true },
                { id: v1(), name: 'JS', isDone: false },
                { id: v1(), name: 'React', isDone: true }
            ]
    })

    const [todoLists, setTodoLists ]= useState([
        { id: todoListsId1, title: 'What to learn', filter: 'All' },
        { id: todoListsId2, title: 'What to buy', filter: 'All' },
    ])


    const filterFunction = (filterValue: FilterType, todolistId: string)=> {
       let filterTodoList = todoLists.find( t => t.id === todolistId)
        if(filterTodoList)
            filterTodoList.filter  = filterValue
        setTodoLists([...todoLists])
    }


    const removeTask = (_id: string, todolistId: string) => {
          tasks[todolistId] = tasks[todolistId].filter( t => t.id !==_id )
        setTasks({...tasks})
    }

    const addTask = (value: string, todolistId: string) => {
        const newTask = {id: v1(), name: value, isDone: true}
             tasks[todolistId] = [newTask,...tasks[todolistId]]
              setTasks({...tasks})
    }

    const changeStatus = (checked: boolean, _id:string, todolistId: string) => {
        let needTasks = tasks[todolistId]
        let newStatus = needTasks.find( t => t.id === _id)
        if(newStatus)
            newStatus.isDone = checked
            setTasks({...tasks})
    }

    const addTodolist = (value: string) => {
        let newTodo = { id: v1(), title: value, filter: 'All' }
        setTodoLists([newTodo, ...todoLists])
        setTasks({...tasks, [newTodo.id] : []})

    }

    return (
        <div className="App">
            <AddItem addTask={addTodolist}/>
            {todoLists.map( tl => {
                let filteredTask = tasks[tl.id]
                if(tl.filter === 'Active') {
                    filteredTask = filteredTask.filter(t => !t.isDone)
                }
                if(tl.filter === 'Completed') {
                    filteredTask = filteredTask.filter(t => t.isDone)
                }

                    return < Todolist name={tl.title}
                                      tasks={filteredTask}
                                      filterFunction={filterFunction}
                                      removeTask={removeTask}
                                      addTask={addTask}
                                      changeStatus={changeStatus}
                                      filter={tl.filter}
                                      todolistId={tl.id}
                    />})}
        </div>
    );
}

export default App;
