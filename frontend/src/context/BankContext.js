import { createContext, useReducer } from 'react';

export const BanksContext = createContext();

export const filesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FILES':
            return {
                ...state,
                files: action.payload
            };
        case 'CREATE_FILE':
            return {
                ...state,
                files: [action.payload, ...state.files]
            };
        case 'DELETE_FILE':
            return {
                ...state,
                files: state.files.filter((file) => file._id !== action.payload._id)
            };
        default:
            return state;
    }
};

export const BanksContextProvider = ({ children }) => {
    const [state, fileDispatch] = useReducer(filesReducer, {
        files: []  // Initialize as an empty array
    });

    return (
        <BanksContext.Provider value={{ ...state, fileDispatch }}>
            {children}
        </BanksContext.Provider>
    );
};