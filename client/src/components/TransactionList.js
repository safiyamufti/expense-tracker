import React, {useContext, useEffect} from 'react';
import { GlobalContext }  from '../context/GlobalState';
import { Transaction } from './Transaction';


// we can pull anything from our GlobalContext using the useContext hook

export const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);

    useEffect( () => {
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);
    // transactions is an array, so we have to loop/map through
    // to access each element 
    // we pass our current transaction from GlobalContext in as a prop
    // we map through, and so for each one we're going to render a transaction
    // component and pass in a prop
    // since this is a list, it needs to have a unique key
    return (
        <>
        <h3> History </h3>
        <ul className="list"> 
        {transactions.map(transaction => (
        < Transaction key={transaction.id} transaction={transaction} />
        ))}

        </ul>
            
        </>
    )
}
