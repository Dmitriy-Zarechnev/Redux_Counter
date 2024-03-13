import {combineReducers, legacy_createStore} from 'redux'
import {counterReducer} from './counter-reducer'
import {loadState, saveState} from '../utils/localstorage-utils'


const rootReducer = combineReducers({
    count: counterReducer
})
export type AppRootStateType = ReturnType<typeof rootReducer>

// loadState - загружает данные из localStorage
// applyMiddleware(thunk) - промежуточный слой для thunk

export const store = legacy_createStore(rootReducer, loadState())

// Подписались на изменение store, и записываем в localStorage значения
store.subscribe(() => {
    saveState({
        count: store.getState().count
    })
})

