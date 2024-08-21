import { createContext, useReducer } from 'react'

export const BanksContext = createContext()

export const filesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FILES':
            return {
                files: action.payload
            }
        case 'CREATE_FILE':
            return {
                files: [action.payload, ...state.files]
            }
        case 'DELETE_FILE':
            return {
                files: state.files.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const BanksContextProvider = ({ children }) => {
    const [state, fileDispatch] = useReducer(filesReducer, {
        files: null
    })

    return (
        <BanksContext.Provider value = {{...state, fileDispatch}}>
            { children }
        </BanksContext.Provider>
    )
}