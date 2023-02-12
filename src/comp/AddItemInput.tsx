import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemInput = {
    addItem: (value: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export function AddItemInput (props: AddItemInput) {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setInputValue(event.currentTarget.value)
    }

    const onClickInput = () => {
        if (inputValue.trim() !== '')
            props.addItem(inputValue)
        else {
            setError('Ошибка')
        }
        setInputValue('')
    }
    const onKeyUpInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickInput()
        }
    }

    return <div>
        <input value={inputValue}
               onChange={onChangeInput}
               onKeyUp={onKeyUpInput}
               className={error ? 'error' : ''}
        />
        <button onClick={onClickInput}>+</button>
        {error && <div className={'error-massage'}>{error}</div>}
    </div>

}