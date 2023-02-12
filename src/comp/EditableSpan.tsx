import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    onchange: (valueSpanInput: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    let [editMode, setEditMode] = useState(false)
    let [valueSpanInput, setValueSpanInput] = useState('')


    const active = () => {
        setEditMode(true)
        setValueSpanInput(props.title)
    }
    const noActive = () => {
        setEditMode(false)
        props.onchange(valueSpanInput)
    }

    const onChangeEditSpan = (event: ChangeEvent<HTMLInputElement>) => {
        setValueSpanInput(event.currentTarget.value)
    }

    return editMode
        ? <input value={valueSpanInput} onBlur={noActive} autoFocus onChange={onChangeEditSpan}/>
        : <span onDoubleClick={active}>{props.title}</span>

}