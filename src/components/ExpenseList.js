import React from 'react';
import {MdDelete} from "react-icons/md";
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({
    expenses,
    handleDelete,
    handleEdit,
    clearItems
}) => {
  return (
      <>
      <ul className="list">
          {expenses.map(expense=>{
              return(
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    />
              );
          })}
      </ul>
      {expenses.lenght >0 && (
          <button className="btn" onClick={clearItems}>
              clear expense
              <MdDelete className="btn-icon"/>
          </button>
      )}
      </> 
  );
};

export default ExpenseList;
