// App Reducer will help specify app state changes in response to our (global) context
//  it takes in state and an action
//  we have 3 action types: default/add/delete transaction

// DELETE_TRANSACTION case- reducer is a way to change the state and send it down to the app
//  in this case, we have to create a new state (that excludes the deleted transaction)
//  and pass it down. we create a new one bc we cant really change the existing state

export default(state, action) => {
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: action.payload // transactions was initially an empty array, no we fill it up with our payload
            }
        case 'TRANSACTIONS_ERROR':
            return {
                ...state,
                error: action.payload

            }
        case 'DELETE_TRANSACTION':
            console.log(action.payload);
             return {
                 ...state,
                 transactions: 
                 state.transactions.filter(transaction =>
                     transaction._id !== action.payload)
             }
        case 'ADD_TRANSACTION':
                return {
                  ...state,
                  // we add our new transaction to our existing ones
                  transactions: [...state.transactions, action.payload]
                }
        default:
            return state; 
    }
}