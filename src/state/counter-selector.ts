import {AppRootStateType} from './store'
import {CounterReducerStateType} from './counter-reducer'

export const counterSelector = (state: AppRootStateType): CounterReducerStateType => {
    return state.count
}