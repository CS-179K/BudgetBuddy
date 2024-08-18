import { createContext, useReducer } from 'react'

export const BudgetsContext = createContext()

export const budgetsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BUDGETS':
            return {
                budgets: action.payload
            }
        case 'CREATE_BUDGET':
            return {
                budgets: [action.payload, ...state.budgets]
            }
        case 'DELETE_BUDGET':
            return {
                budgets: state.budgets.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const BudgetsContextProvider = ({ children }) => {
    const [state, budgetDispatch] = useReducer(budgetsReducer, {
        budgets: null
    })

    return (
        <BudgetsContext.Provider value = {{...state, budgetDispatch}}>
            { children }
        </BudgetsContext.Provider>
    )
}