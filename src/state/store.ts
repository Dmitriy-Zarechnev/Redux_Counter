import {applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux'
import {counterReducer} from './counter-reducer'
import {thunk} from 'redux-thunk'
import {loadState} from '../utils/localstorage-utils'


const rootReducer = combineReducers({
    count: counterReducer
})
export type AppRootStateType = ReturnType<typeof rootReducer>



/*
let preloadState
const persistedState = localStorage.getItem('app-state')
if (persistedState) {
    preloadState = JSON.parse(persistedState)
}*/

export const store = legacy_createStore(rootReducer, loadState(), applyMiddleware(thunk))

store.subscribe(() => {
    localStorage.setItem('app-state', JSON.stringify(store.getState()))
})

