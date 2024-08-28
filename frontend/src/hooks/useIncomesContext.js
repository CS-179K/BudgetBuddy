import { IncomesContext } from '../context/IncomeContext'
import { useContext } from 'react'

export const useIncomesContext = () => {
    const context = useContext(IncomesContext)

    if (!context) {
        throw Error('useIncomesContext must be used inside an IncomesContextProvider')
    }

    return context
}