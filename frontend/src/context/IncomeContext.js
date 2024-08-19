import { createContext, useReducer } from 'react'

export const IncomesContext = createContext()

export const incomesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_INCOMES':
            return {
                incomes: action.payload
            }
        case 'CREATE_INCOME':
            return {
                incomes: [action.payload, ...state.incomes]
            }
        case 'DELETE_INCOME':
            return {
                incomes: state.incomes.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const IncomesContextProvider = ({ children }) => {
    const [state, incomeDispatch] = useReducer(incomesReducer, {
        incomes: null
    })

    return (
        <IncomesContext.Provider value = {{...state, incomeDispatch}}>
            {children}
        </IncomesContext.Provider>
    )
}