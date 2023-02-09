import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AppItemType = {
    addTask: (value: string) => void
}

export function AddItem(props: AppItemType) {

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setInputValue(event.currentTarget.value)
    }
    const onKeyUpInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickInput()
        }
    }
    const onClickInput = () => {
        if (inputValue.trim() !== '')
            props.addTask(inputValue)
        else {
            setError('Ошибка')
        }
        setInputValue('')
    }
    return (
        <div>
            <input value={inputValue}
                   onChange={onChangeInput}
                   onKeyUp={onKeyUpInput}
                   className={error ? 'error' : ''}
            />
            <button onClick={onClickInput}>+</button>
            {error && <div className={'error-massage'}>{error}</div>}
        </div>
    )
}