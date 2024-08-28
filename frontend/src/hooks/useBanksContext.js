import { BanksContext } from '../context/BankContext'
import { useContext } from 'react'

export const useBanksContext = () => {
    const context = useContext(BanksContext)

    if (!context) {
        throw Error('useBanksContext must be used inside an BanksContextProvider')
    }

    return context
}