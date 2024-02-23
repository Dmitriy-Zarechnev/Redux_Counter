import {changeMaxCountAC, changeMinCountAC, counterReducer, CounterReducerStateType, incrementCounterAC, resetCounterAC, setCounterAC, setInputFocusFalseAC, setInputFocusTrueAC, valueErrorChangeAC} from './counter-reducer'

let startState: CounterReducerStateType

beforeEach(() => {
    startState = {
        maxCount: 5,
        minCount: 1,
        counterStep: 2,
        counter: 0,
        onInputFocus: false,
        error: {
            maxValueError: false,
            minValueError: false
        }
    }
})


test('counter should increase by counterStep', () => {

    const newState = counterReducer(startState, incrementCounterAC())

    expect(newState.counter).toBe(startState.counter + 2)
    expect(newState.counter).not.toBe(startState.counter + 1)
})


test('counter should be changed', () => {

    const newCounter = 10

    const newState = counterReducer(startState, setCounterAC(newCounter))

    expect(newState.counter).toBe(10)
})


test('counter should be reset to minCount', () => {

    const newState = counterReducer(startState, resetCounterAC())

    expect(newState.counter).toBe(newState.minCount)
})


test('maxCount should be changed', () => {

    const newMax = 10

    const newState = counterReducer(startState, changeMaxCountAC(newMax))

    expect(newState.maxCount).toBe(10)
})


test('minCount should be changed', () => {

    const newMin = 3

    const newState = counterReducer(startState, changeMinCountAC(newMin))

    expect(newState.minCount).toBe(3)
})


test('onInputFocus should be true', () => {

    const newState = counterReducer(startState, setInputFocusTrueAC())

    expect(newState.onInputFocus).toBe(true)
})


test('onInputFocus should be false', () => {

    startState = {
        maxCount: 5,
        minCount: 1,
        counterStep: 2,
        counter: 0,
        onInputFocus: true,
        error: {
            maxValueError: false,
            minValueError: false
        }
    }

    const newState = counterReducer(startState, setInputFocusFalseAC())

    expect(newState.onInputFocus).toBe(false)
})


test('maxValueError should be true', () => {

    startState = {
        maxCount: -1,
        minCount: 1,
        counterStep: 2,
        counter: 0,
        onInputFocus: false,
        error: {
            maxValueError: false,
            minValueError: false
        }
    }

    const newState = counterReducer(startState, valueErrorChangeAC())

    expect(newState.error.maxValueError).toBe(true)
})


test('minValueError should be true', () => {

    startState = {
        maxCount: 5,
        minCount: -1,
        counterStep: 2,
        counter: 0,
        onInputFocus: false,
        error: {
            maxValueError: false,
            minValueError: false
        }
    }

    const newState = counterReducer(startState, valueErrorChangeAC())

    expect(newState.error.minValueError).toBe(true)
})