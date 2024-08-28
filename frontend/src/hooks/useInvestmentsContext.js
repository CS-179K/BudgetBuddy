import { InvestmentsContext } from '../context/InvestmentContext'
import { useContext } from 'react'

export const useInvestmentsContext = () => {
    const context = useContext(InvestmentsContext)

    if (!context) {
        throw Error('useInvestmentsContext must be used inside an InvestmentsContextProvider')
    }

    return context
}