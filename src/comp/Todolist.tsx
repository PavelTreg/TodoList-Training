import React, {ChangeEvent} from 'react';
import {FilterType} from "../App";
import AddItemForm from "./AddItemForm";

type PropsType = {
    name: string
    tasks: Array<TaskType>
    filterFunction: (filterValue: FilterType, todoListId: string) => void
    removeTask: (_id: string, todoListId: string) => void
    addTask: (value: string, todoListId: string) => void
    changeStatus: (checked: boolean, _id: string, todoListId: string) => void
    filter: string
    todoListId: string
    removeTodoList: (todoListId: string) => void
}

type TaskType = {
    id: string,
    name: string,
    isDone: boolean
}
export const Todolist = (props: PropsType) => {




    const onClickAll = () => {
        props.filterFunction('All', props.todoListId)
    }
    const onClickActive = () => {
        props.filterFunction('Active', props.todoListId)
    }
    const onClickCompleted = () => {
        props.filterFunction('Completed', props.todoListId)
    }


    const onClickRemoveTodolist = () => {
        props.removeTodoList(props.todoListId)
    }

    return (
        <div>
            <div>
                <h3>{props.name}
                    <button onClick={onClickRemoveTodolist}>X</button>
                </h3>

               <AddItemForm addTask={props.addTask} todoListId={props.todoListId}/>
                <ul>
                    {props.tasks.map(t => {
                        const onClickRemoveTask = () => {
                            props.removeTask(t.id, props.todoListId)
                        }
                        const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(e.currentTarget.checked, t.id, props.todoListId)
                        }

                        return (<li className={t.isDone ? 'isDone' : ''}>
                                <input type='checkbox'
                                       checked={t.isDone}
                                       onChange={onChangeChecked}
                                />
                                <span>{t.name}</span>
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

