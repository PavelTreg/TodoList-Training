import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "../App";

type  PropsType = {
    title: string
    tasks: Array<TaskType>
    filterFunction: (valueFilter: FilterType, _id: string) => void
    removeTask: (_id: string, idTodolist: string) => void
    addTask: (inputValue: string, idTodolist: string) => void
    changeTaskStatus: (statusValue: boolean, _id: string, idTodolist: string) => void
    filter: string
    todoListsId: string
    removeTodoList: (idTodoList: string) => void
}
type TaskType = {
    id: string
    name: string
    isDone: boolean
}


const TodoList = (props: PropsType) => {
    let [error, setError] = useState<null | string>(null)

    let [inputValue, setInputValue] = useState('')
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setInputValue(e.currentTarget.value)
    }
    const onClickInput = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue, props.todoListsId)
            setInputValue('')
        }
        else {
            setError('Ошибка')
        }
    }
    const onKeyUpInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputValue.trim() !== '') {
                props.addTask(inputValue, props.todoListsId)
                setInputValue('')
            }
            else {
                setError('Ошибка')
            }
        }
    }


    const onClickAll = () => {
        props.filterFunction('All', props.todoListsId)
    }
    const onClickActive = () => {
        props.filterFunction('Active', props.todoListsId)
    }
    const onClickCompleted = () => {
        props.filterFunction('Completed', props.todoListsId)
    }

    const onClickRemoveTodoList = () => {props.removeTodoList(props.todoListsId)}

    return (
        <div>
            <div>
                <h3>{props.title}
                <button onClick={onClickRemoveTodoList}>X</button>
                </h3>
                <div>
                    <input value={inputValue}
                           onChange={onChangeInput}
                           onKeyUp={onKeyUpInput}
                           className={error ? 'error' : ''}
                    />
                    <button onClick={onClickInput}>+</button>
                    {error && <div className={'error-message'}>{error} </div>}
                </div>


                <ul>
                    {props.tasks.map(t => {
                        const onClickRemoveTask = () => {
                            props.removeTask(t.id,props.todoListsId)
                        }
                        const onChangeStatus = (e:ChangeEvent<HTMLInputElement>) =>
                        {props.changeTaskStatus(e.currentTarget.checked, t.id, props.todoListsId)}

                        return (
                            <li className={t.isDone ? 'isDoneStatus' : ''}>
                                <input  type={"checkbox"} checked={t.isDone} onChange={onChangeStatus}/>
                                <span> {t.name} </span>
                                <button onClick={onClickRemoveTask}> X</button>
                            </li>
                        )
                    })}
                </ul>


                <div>
                    <button onClick={onClickAll} className={ props.filter === 'All' ? 'activeFilter' : ''}>All</button>
                    <button onClick={onClickActive} className={ props.filter === 'Active' ? 'activeFilter' : ''}> Active</button>
                    <button onClick={onClickCompleted} className={ props.filter === 'Completed' ? 'activeFilter' : ''}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;