// Типизация
type CounterReducerActionsType =
    IncrementCounterAT |
    SetCounterAT |
    ResetCounterAT |
    ChangeMaxCountAT |
    ChangeMinCountAT |
    SetInputFocusTrueAT |
    SetInputFocusFalseAT |
    ValueErrorChangeAT

type IncrementCounterAT = ReturnType<typeof incrementCounterAC>
type SetCounterAT = ReturnType<typeof setCounterAC>
type ResetCounterAT = ReturnType<typeof resetCounterAC>
type ChangeMaxCountAT = ReturnType<typeof changeMaxCountAC>
type ChangeMinCountAT = ReturnType<typeof changeMinCountAC>
type SetInputFocusTrueAT = ReturnType<typeof setInputFocusTrueAC>
type SetInputFocusFalseAT = ReturnType<typeof setInputFocusFalseAC>
type ValueErrorChangeAT = ReturnType<typeof valueErrorChangeAC>


export type CounterReducerStateType = {
    maxCount: number,
    minCount: number,
    counterStep: number,
    counter: number,
    onInputFocus: boolean,
    error: ErrorType
}

export type ErrorType = {
    maxValueError: boolean
    minValueError: boolean
}

// *********** Первоначальный стэйт для counterReducer ****************
const initialState: CounterReducerStateType = {
    maxCount: 5,
    minCount: 0,
    counterStep: 1,
    counter: 0,
    onInputFocus: false,
    error: {
        maxValueError: false,
        minValueError: false
    }
}

// *********** Reducer - редьюсер, чистая функция для изменения стэйта после получения экшена от диспача ****************
export const counterReducer = (state: CounterReducerStateType = initialState, action: CounterReducerActionsType): CounterReducerStateType => {
    switch (action.type) {
        case 'INCREMENT-COUNTER': {
            return {
                ...state,
                counter: state.counter + state.counterStep
            }
        }

        case 'SET-COUNTER': {
            return {
                ...state,
                counter: action.payload.value
            }
        }

        case 'RESET-COUNTER': {
            return {
                ...state,
                counter: state.minCount
            }
        }

        case 'CHANGE-MAX-COUNT': {
            return {
                ...state,
                maxCount: action.payload.value
            }
        }

        case 'CHANGE-MIN-COUNT': {
            return {
                ...state,
                minCount: action.payload.value
            }
        }

        case 'SET-INPUT-FOCUS-TRUE': {
            return {
                ...state,
                onInputFocus: true
            }
        }

        case 'SET-INPUT-FOCUS-FALSE': {
            return {
                ...state,
                onInputFocus: false
            }
        }

        case 'VALUE-ERROR-CHANGE': {
            return {
                ...state,
                error: {
                    ...state.error,
                    maxValueError: state.maxCount < 0 || state.maxCount - state.minCount <= 0,
                    minValueError: state.minCount < 0 || state.maxCount - state.minCount <= 0 || state.minCount < 0
                }
            }
        }

        default:
            return state
    }
}


// ****** Action creators - экшн криэйторы создают объект action ***********
export const incrementCounterAC = () => {
    return {
        type: 'INCREMENT-COUNTER'
    } as const
}
export const setCounterAC = (value: number) => {
    return {
        type: 'SET-COUNTER',
        payload: {
            value
        }
    } as const
}
export const resetCounterAC = () => {
    return {
        type: 'RESET-COUNTER'
    } as const
}
export const changeMaxCountAC = (value: number) => {
    return {
        type: 'CHANGE-MAX-COUNT',
        payload: {
            value
        }
    } as const
}
export const changeMinCountAC = (value: number) => {
    return {
        type: 'CHANGE-MIN-COUNT',
        payload: {
            value
        }
    } as const
}
export const setInputFocusTrueAC = () => {
    return {
        type: 'SET-INPUT-FOCUS-TRUE'
    } as const
}
export const setInputFocusFalseAC = () => {
    return {
        type: 'SET-INPUT-FOCUS-FALSE'
    } as const
}
export const valueErrorChangeAC = () => {
    return {
        type: 'VALUE-ERROR-CHANGE'
    } as const
}


// *********** Thunk - санки необходимые для общения с localStorage ****************

// функция для сохранения объектов в память браузера

export function setToLocalStorage<T>(key: string, state: T) {
    const stateAsString = JSON.stringify(state)
    localStorage.setItem(key, stateAsString)
}

// и вот вам функция для получения сохранённого объекта в памяти браузера:
export function getFromLocalStorage<T>(key: string, defaultState: T) {
    let state = defaultState
    const stateAsString = localStorage.getItem(key)
    if (stateAsString !== null) state = JSON.parse(stateAsString) as T
    return state
}

