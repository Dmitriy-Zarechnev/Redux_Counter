import {AppRootStateType} from '../state/store'

// Функция для выгрузки данных из localStorage
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('count')
        if (serializedState) {
            return JSON.parse(serializedState)
        }
    } catch (err) {
        return undefined
    }
}

// Функция для загрузки данных в localStorage
export const saveState = (state: AppRootStateType) => {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('count', serializedState)
}