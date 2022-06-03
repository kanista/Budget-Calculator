import React,{useState,useEffect} from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';

const initialExpenses= localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses")) : [];
    
export const App = () => {

  // all expenses, add expenses
  const [expenses,setExpenses]= useState(initialExpenses);
  const [charge,setCharge]=useState("");
  const [amount,setAmount]=useState("");
  const [alert,setAlert]=useState({show:false});
  const [edit,setEdit]=useState(false);
  const [id,setId]=useState(0);

  useEffect(()=>{
    console.log("called");
    localStorage.setItem("expenses",JSON.stringify(expenses));
  },[expenses]);


  // *********functionality*********
  // add charge
  const handleCharge= e=>{
    setCharge(e.target.value);
  };

  // add amount
  const handleAmount= e=>{
    let amount=e.target.value;
    if(amount===""){
      setAmount(amount);
    }else{
      setAmount(parseInt(amount));
    }
  };

  // handle alert
  const handleAlert=({type,text})=>{
    setAlert({show:true,type,text});
    setTimeout(()=>{
      setAlert({show:false});
    },7000);
  };

  // handle submit
  const handleSubmit= e=>{
    e.preventDefault();
    if(charge!=="" && amount>0){
      if(edit){
        let tem=expenses.map(item=>{
          return item.id=== id ? {...item,charge,amount} : item;
        });
        setExpenses(tem);
        setEdit(false);
      }else{
        const singleExpense={id:uuidv4(),charge,amount};
        setExpenses([...expenses,singleExpense]);
        handleAlert({type:"success",text:"item added"});
      }
      // set charge back to empty atring
      setCharge("");
      // set amount back to xero
      setAmount("");
    }else{
      handleAlert({
        type:"danger",
        text:`charge cant be empty value and amount value has to be bigger than zero `
      });
    }
  };

  // handle Delete
  const handleDelete=id=>{
    let tem=expenses.filter(item=>item.id!==id);
    setExpenses(tem);
    handleAlert({type:"danger",text:"item deleted"});
  }

  // clear all items
  const clearItem=()=>{
    setExpenses([]);
  }

  // handle edit
  const handleEdit=id=>{
    let expense=expenses.find(item=>item.id===id);
    let {charge,amount}=expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
    {/* visible state of alert */}
    {alert.show && <Alert type={alert.tytpe} text={alert.text}/> } 
    <h1>Budget Calculator</h1>
    <main className="App">
      <ExpenseForm
              handleSubmit={handleSubmit}
              charge={charge}
              handleCharge={handleCharge}
              amount={amount}
              handleAmount={handleAmount}
              edit={edit}
              />
      <ExpenseList
              expenses={expenses}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              clearItem={clearItem}
              />
    </main>
    <h1>
      Total spending : 
      <span className="total">
        ${expenses.reduce((acc,curr)=>{
          return (acc+=curr.amount);
          // fun on each element of the array coes nt execute empty array
        },0)}
      </span>
    </h1>
    </>
  );
}

export default App;