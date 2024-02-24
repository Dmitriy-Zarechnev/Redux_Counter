import React, {useCallback, useEffect} from 'react'
import S from './App.module.css'
import {Counter} from './components/counter/Counter'
import {SetCounter} from './components/setCounter/SetCounter'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'
import {changeMaxCountAC, changeMinCountAC, CounterReducerStateType, getFromLocalStorage, incrementCounterAC, resetCounterAC, setCounterAC, setInputFocusFalseAC, setInputFocusTrueAC, setToLocalStorage, valueErrorChangeAC} from './state/counter-reducer'


function App() {

    //  ----- Keys for LocalStorage -----------
    const COUNTER_VALUE = 'counterValue'
    const MAX_COUNTER_VALUE = 'maxCounterValue'
    const MIN_COUNTER_VALUE = 'minCounterValue'

    // Связь с Redux
    const count =
        useSelector<AppRootStateType, CounterReducerStateType>
        (state => state.count)

    const dispatch = useDispatch()


    //  ------ Get 'counter values' from localStorage ------
    useEffect(() => {
        dispatch(setCounterAC(getFromLocalStorage<number>(COUNTER_VALUE, count.counter)))
        dispatch(changeMaxCountAC(getFromLocalStorage<number>(MAX_COUNTER_VALUE, count.maxCount)))
        dispatch(changeMinCountAC(getFromLocalStorage<number>(MIN_COUNTER_VALUE, count.minCount)))
    }, [])


    //  ------  Set 'counter values' into localStorage ------
    useEffect(() => {
        setToLocalStorage<number>(COUNTER_VALUE, count.counter)
    }, [count.counter])

    useEffect(() => {
        setToLocalStorage<number>(MAX_COUNTER_VALUE, count.maxCount)
        setToLocalStorage<number>(MIN_COUNTER_VALUE, count.minCount)

        dispatch(valueErrorChangeAC())

    }, [count.maxCount, count.minCount])


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





