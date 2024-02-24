import React, {ChangeEvent, useCallback} from 'react'
import S from './Input.module.css'


type InputPropsType = {
    title: string
    value: number
    onChange: (value: number) => void
    error: boolean
    onFocusInputChange: () => void
    setValuesIntoLocal: () => void
}

export const Input = React.memo( (props: InputPropsType) => {

    const onChangeInputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.currentTarget.value

        // Deleted '0' at the beginning of input value
        props.onChange(parseInt(newValue, 10))
    }, [props.onChange])

    return (
        <div className={S.input_box}>
            <span className={S.title}>{props.title}:</span>
            <input
                onChange={onChangeInputHandler}
                value={props.value}
                type={'number'}
                className={`${S.input} ${props.error && S.error}`}
                onFocus={props.onFocusInputChange}
                onBlur={props.setValuesIntoLocal}
            />
        </div>
    )
})

