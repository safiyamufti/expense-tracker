import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

// for the form we need component level state, 
// bc we need our inputs to be part of the state, 
// so we introduce a useState hook, called text and setText

export const AddTransaction = () => { 
const [text, setText] = useState('');
const [amount, setAmount] = useState(0);

const { addTransaction } = useContext(GlobalContext);
const onSubmit = e => {
    e.preventDefault();
    const newTransaction = {
        id: Math.floor(Math.random() * 100000000),
        text,
        amount: +amount
    }
    // my later edits
    text === '' || amount === 0 ? setText('') : addTransaction(newTransaction);
    setText('');
    setAmount(0);
}
    return (
        <>
            <h3> Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text"> Description </label>
                <input type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                placeholder= "Enter description..." />
             </div>
             <div className="form-control">
                 <label htmlFor="amount">
                     Amount <br />
                    ( - expense, + income ) </label>

                    <input type="number"
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                     placeholder= "Enter amount..." />
             </div>
        <button className="btn"> Add transaction </button>
        </form>

        </>
    )
}