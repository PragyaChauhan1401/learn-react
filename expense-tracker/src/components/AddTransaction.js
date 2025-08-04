import React, { useContext } from 'react'
import { useState } from 'react';
import { GlobalContext } from '../context/GlobalState';


export const AddTransaction = () => {
    const [text,setText] = useState('');
    const [amt, setAmt]  = useState(0);
    const { addTransaction } = useContext(GlobalContext);
    const onSubmit = e => {
        e.preventDefault();
        
        const newTransaction = {
            id: Math.floor(Math.random()*1000000),
            text,
            amount: +amt
        }
        addTransaction(newTransaction);
    }
  return (
    <div>
       <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount <br />
            (negative - expense, positive - income)</label>
          <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </div>
  )
};

