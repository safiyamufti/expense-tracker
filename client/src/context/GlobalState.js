
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';


// initial state

const initialState = {
    transactions: [],
    error: null,  // bc of our async await calls
    loading: true // for spinner
}
 // { id: 1, text: 'Flowers', amount: -20 },
 // { id: 2, text: 'Depop', amount: +25 },
 // { id: 4, text: 'Uber', amount: -11 },
 // { id: 5, text: 'Salary', amount: +2000}

// global state
// create context

export const GlobalContext = createContext(initialState);

// in order for other components to have access to our globalState, we need to have a provider
// we need to wrap all our components in a provider component
// we need to export this to make it available to our App file

// Provider component 
// all our components that we are wrapping are the children
// whenever we want to call a reducer action, we call dispatch

export const GlobalProvider=  ( {children} ) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    // this function below is to integrate our api
    // axios returns a PROMISE, so our get action will have to be asynchronous
    async function getTransactions() {
        try{
            // we make a requests and store it in this resposne variable
            const res = await axios.get('/api/v1/transactions');

            // res.data contains success, count, data. we only want data on the frontend
            // we need to dispatch to our reducer
            dispatch ({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });
        }

        catch(err) {
            dispatch ({
            type: 'TRANSACTIONS_ERROR',
            payload: err.response.data.error
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });

        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.reponse.data.error
            });
        
        }
    }


    async function addTransaction(transaction) {
        // since we are sending data, we need a content type
        // so we create a config obj
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/v1/transactions', transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
              });
            
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.reponse.data.error
            });
        }
      }

// to use an action, we need to make sure we pass it down in the provider
// so we can access on of these in components

    return( <GlobalContext.Provider value= {{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}

    </GlobalContext.Provider>);
}
