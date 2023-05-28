import React, { useContext, useEffect } from 'react'
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

{/* allows easier passing of information */}
const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
    return useContext(BudgetsContext)
}

// define a provider component called BudgetsProvider that accepts a "children" prop
export const BudgetsProvider = ({ children }) => {
    // declare state variables for budgets and expenses using the useLocalStorage custom hook
    // initialize budgets with an empty array and expenses with an empty array
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    // function that takes a parameter called budgetId
    function getBudgetExpenses(budgetId) {
        //return an array of expenses filtered based on the condition where the expense's budgetId matches the provided budgetId.
        return expenses.filter(expense => expense.budgetId === budgetId);
    }
    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
          const newExpense = { id: uuidV4(), description, amount, budgetId };
          return [...prevExpenses, newExpense];
        });
      }

    function addBudget( {name, max }){
        // takes our current budgets (our previous)
        setBudgets(prevBudgets => {
            // checks if our budget name already exists
            if (prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            // keeping all previous budgets, then add a new budget with a new id, name, and max passed in
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }
    // takes an object parameter with an "id" property
    function deleteBudget({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
            })
        })
        // update the budgets state using the setBudgets function and the previous budgets (prevBudgets)
        // filter out the budget objects from prevBudgets that have an id different from the provided id
        // return the filtered array of budgets
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
          return prevExpenses.filter(expense => expense.id !== id);
        });
      }


    return (
    <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
        {children}
    </BudgetsContext.Provider>
    )
}   