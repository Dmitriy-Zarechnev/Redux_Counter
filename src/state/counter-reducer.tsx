// Типизация
type CounterReducerActionsType =
    IncrementCounterAT |
    ResetCounterAT |
    ChangeMaxCountAT |
    ChangeMinCountAT |
    InputFocusChangeAT

type IncrementCounterAT = ReturnType<typeof incrementCounterAC>
type ResetCounterAT = ReturnType<typeof resetCounterAC>
type ChangeMaxCountAT = ReturnType<typeof changeMaxCountAC>
type ChangeMinCountAT = ReturnType<typeof changeMinCountAC>
type InputFocusChangeAT = ReturnType<typeof inputFocusChangeAC>

export type CounterReducerStateType = {
    maxCount: number,
    minCount: number,
    counterStep: number,
    counter: number,
    onInputFocus: boolean,
    error: {
        maxValueError: boolean,
        minValueError: boolean
    }
}

// *********** Первоначальный стэйт для usersReducer ****************
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

        case 'INPUT-FOCUS-CHANGE': {
            return {
                ...state,
                onInputFocus: true
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

export const inputFocusChangeAC = () => {
    return {
        type: 'INPUT-FOCUS-CHANGE'
    } as const
}

// *********** Thunk - санки необходимые для общения с DAL ****************