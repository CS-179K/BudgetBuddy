import { useAuthContext } from './useAuthContext'
import { useInvestmentsContext } from './useInvestmentsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: investmentsDispatch } = useInvestmentsContext()

    const logout = () => {
        // Remove user from storage
        localStorage.removeItem('user')

        // Dispatch Logout Action
        dispatch({type: 'LOGOUT'})
        investmentsDispatch({type: 'SET_INVESTMENTS', payload: null})
    }

    return {logout}
}