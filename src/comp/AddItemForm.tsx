import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
type AddItemFormPropsType = {
    addItem: (value: string) => void

}

 const AddItemForm = (props: AddItemFormPropsType) => {

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setInputValue(event.currentTarget.value)
    }
    const onClickInput = () => {
        if (inputValue.trim() !== '')
            props.addItem(inputValue.trim())
        else {
            setError('Ошибка')
        }
        setInputValue('')
    }

    const onKeyUpInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputValue.trim() !== '')
                props.addItem(inputValue.trim())
            else {
                setError('Ошибка')
            }
            setInputValue('')
        }
    }

    return (
        <div>
            <div>
                <input value={inputValue}
                       onChange={onChangeInput}
                       onKeyUp={onKeyUpInput}
                       className={error ? 'error' : ''}
                />
                <button onClick={onClickInput}>+</button>
                {error && <div className={'error-massage'}>{error}</div>}
            </div>

        </div>
    );
};

export default AddItemForm;