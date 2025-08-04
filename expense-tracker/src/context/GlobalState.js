import React , { createContext, useReducer } from 'react'; 
import AppReducer from './AppReducer';

const initialState = {
    transcations:[]
}

export const GlobalContext  = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state,dispatch] = useReducer(AppReducer,initialState);
    function deleteTransaction(id){
        dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
        });
    }

    function addTransaction(transaction){
        dispatch({
        type: 'ADD TRANSACTION',
        payload: transaction
        });
    }
    return (
        <GlobalContext.Provider value={{
            transcations:state.transcations,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
