import {combineReducers, createStore} from 'redux'
import {counterReducer} from './counter-reducer'


const rootReducer = combineReducers({
    count: counterReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)