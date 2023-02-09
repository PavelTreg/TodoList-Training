import React, {ChangeEvent} from 'react';
import {FilterType} from "../App";
import {AddItem} from "./AppItem";

type PropsType = {
    name: string
    tasks: Array<TaskType>
    filterFunction: (filterValue: FilterType, todolistId: string) => void
    removeTask: (_id: string, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    changeStatus: (checked: boolean, _id: string, todolistId: string) => void
    filter: string
    todolistId: string
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


const addTask = (value: string) => {props.addTask(value, props.todolistId) }


    return (
        <div>
            <div>
                <h3>{props.name}</h3>
              <AddItem addTask={addTask}/>
                <ul>
                    {props.tasks.map(t => {
                        const onClickRemoveTask = () => {
                            props.removeTask(t.id, props.todolistId)
                        }
                        const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(e.currentTarget.checked, t.id, props.todolistId)
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

