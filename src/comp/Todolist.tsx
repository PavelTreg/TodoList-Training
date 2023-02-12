import React, {ChangeEvent} from 'react';
import {FilterType} from "../App";
import {AddItemInput} from "./AddItemInput";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    name: string
    tasks: Array<TaskType>
    filterFunction: (filterValue: FilterType, todolistId: string) => void
    removeTask: (_id: string, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    changeStatus: (checked: boolean, _id: string, todolistId: string) => void
    filter: string
    todolistId: string
    removeTodoList: (todolistId: string) => void
    changeNameTask: (valueSpanInput: string, id: string, todolistId:string) => void
    changeNameTodolist: (valueSpanInput: string, todolistId:string) => void
}


export type TaskType = {
    id: string,
    name: string,
    isDone: boolean
}
export const Todolist = (props: PropsType) => {



    const onClickAll = () => {
        props.filterFunction('All', props.todolistId)
    }
    const onClickActive = () => {
        props.filterFunction('Active', props.todolistId)
    }
    const onClickCompleted = () => {
        props.filterFunction('Completed', props.todolistId)
    }

    const onClickRemoveTodo = () => props.removeTodoList(props.todolistId)

    const addTask = (value: string) => { props.addTask(value,props.todolistId)}
    return (
        <div>
            <div>
                <h3>
                <EditableSpan title={props.name} onchange={(valueSpanInput) => {props.changeNameTodolist(valueSpanInput,props.todolistId)}}/>
                <button onClick={onClickRemoveTodo}> X </button>
                </h3>

<AddItemInput addItem={addTask}/>
                <ul>
                    {props.tasks.map(t => {
                        const onClickRemoveTask = () => {
                            props.removeTask(t.id, props.todolistId)
                        }
                        const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(e.currentTarget.checked, t.id, props.todolistId)
                        }
const changeNameTask  = (valueSpanInput: string) => {props.changeNameTask(valueSpanInput, t.id, props.todolistId)}
                        return (<li className={t.isDone ? 'isDone' : ''}>
                                <input type='checkbox'
                                       checked={t.isDone}
                                       onChange={onChangeChecked}
                                />

                           < EditableSpan title = {t.name} onchange = {changeNameTask}/>

                                <button onClick={onClickRemoveTask}> x</button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={onClickAll} className={props.filter === 'All' ? 'activeFilter' : ''}>All</button>
                    <button onClick={onClickActive} className={props.filter === 'Active' ? 'activeFilter' : ''}>Active
                    </button>
                    <button onClick={onClickCompleted}
                            className={props.filter === 'Completed' ? 'activeFilter' : ''}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

