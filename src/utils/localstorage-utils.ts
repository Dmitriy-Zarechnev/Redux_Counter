import {AppRootStateType} from '../state/store'

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('app-state')
        if (serializedState) {
            return JSON.parse(serializedState)
        }
    } catch (err) {
        return undefined
    }
}


export const saveState = (state: AppRootStateType) => {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('app-state', serializedState)
}