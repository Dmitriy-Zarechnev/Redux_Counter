import React, {useCallback, useEffect} from 'react'
import S from './App.module.css'
import {Counter} from './components/counter/Counter'
import {SetCounter} from './components/setCounter/SetCounter'
import {useDispatch, useSelector} from 'react-redux'
import {changeMaxCountAC, changeMinCountAC, incrementCounterAC, resetCounterAC, setInputFocusFalseAC, setInputFocusTrueAC, valueErrorChangeAC} from './state/counter-reducer'
import {counterSelector} from './state/counter-selector'


function App() {

    // Связь с Redux
    const count = useSelector(counterSelector)
    const dispatch = useDispatch()


    //  ------  Error's handler ------

    useEffect(() => {
        dispatch(valueErrorChangeAC())
    }, [count.maxCount, count.minCount])


    // ------  Reset and change focus after save ------
    const setValuesIntoLocal = useCallback(() => {
        dispatch(resetCounterAC())
        dispatch(setInputFocusFalseAC())
    }, [])


    //  ------ Change and Set 'counter' value ------
    const changeCounter = useCallback(() => {
        count.counter <= count.maxCount && dispatch(incrementCounterAC())
    }, [count.counter, count.maxCount])

    const resetCounter = useCallback(() => {
        dispatch(resetCounterAC())
    }, [])


    //  ------  Set input 'value' ------
    const onChangeInputMaxCount = useCallback((value: number) => {
        dispatch(changeMaxCountAC(value))
    }, [])

    const onChangeInputMinCount = useCallback((value: number) => {
        dispatch(changeMinCountAC(value))
    }, [])


    //  ------  Set OnInputFocus ------
    const onFocusInputChange = useCallback(() => {
        dispatch(setInputFocusTrueAC())
    }, [])


    return (
        <div className={S.app}>
            <SetCounter
                onInputFocus={count.onInputFocus}
                maxCount={count.maxCount}
                minCount={count.minCount}
                onChangeInputMaxCount={onChangeInputMaxCount}
                onChangeInputMinCount={onChangeInputMinCount}
                onFocusInputChange={onFocusInputChange}
                setValuesIntoLocal={setValuesIntoLocal}
                error={count.error}
            />

            <Counter counter={count.counter}
                     maxCount={count.maxCount}
                     minCount={count.minCount}
                     changeCounter={changeCounter}
                     resetCounter={resetCounter}
                     onInputFocus={count.onInputFocus}
                     error={count.error}
            />
        </div>
    )
}


export default App





