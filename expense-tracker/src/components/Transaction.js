import React , { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import ManageTransaction from './ManageTransaction';


export const Transaction = () => {
  const { transcations } = useContext(GlobalContext);
  return (
    <div>
    <h3>History</h3>
      <ul  className="list">
        {transcations.map(transaction => <ManageTransaction transaction={transaction}/>)}
       </ul>
      </div>
  )
}
