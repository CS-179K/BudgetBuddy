import { createContext, useReducer } from 'react'

export const InvestmentsContext = createContext()

export const investmentsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_INVESTMENTS':
            return {
                investments: action.payload
            }
        case 'CREATE_INVESTMENT':
            return {
                investments: [action.payload, ...state.investments]
            }
        case 'DELETE_INVESTMENT':
            return {
                investments: state.investments.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const InvestmentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(investmentsReducer, {
        investments: null
    })

    return (
        <InvestmentsContext.Provider value = {{...state, dispatch}}>
            { children }
        </InvestmentsContext.Provider>
    )
}