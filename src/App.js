import Container from 'react-bootstrap/Container'
import { Button, Stack } from "react-bootstrap"
import BudgetCard from "./components/BudgetCard"
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import ViewExpensesModal from './components/ViewExpensesModal';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import TotalBudgetCard from './components/TotalBudgetCard';

// main component
function App() {
  // defines state variable showAddBudgetModal and corresponding setter function setShowAddBudgetModal using useState hook
  // initial value of showAddBudgetModal is false, indicating "Add Budget" modal is initially hidden
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()

  // destructures values budgets and getBudgetExpenses from the result of useBudgets hook
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  // container is used to create a fixed-width container for the website.
    return ( 
    <>
    {/* fragment (<>) allows multiple elements to be returned without adding extra nodes to DOM */}
    <Container className="my-4"> 
        <Stack direction="horizontal" gap="2" className="mb-4">
          {/* Add budget and add expensesButtons */}
          <h2 className="me-auto">Controlling My NYC Spending: A Budget App by Zakaria Arshad</h2>
          {/* Renders "Add Budget" button. When clicked, it invokes setShowAddBudgetModal to set it to true */}
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>

        {/* Sets the style for our panels. Grid system part of CSS */}
        {/* gridTemplate Columns: Repeat for reptition of columns, auto-fill so they automatically adjust, minmax is min/max width */}
        <div 
          style= {{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
            gap: "1rem", 
            alignItems: "flex-start"
          }}
        >
          {/* Iterates over budgets array using map function. For each budget in array, creates a BudgetCard component with corresponding data*/}
          {/* The map function calculates the amount by reducing the expenses associated with the budget using getBudgetExpenses(budget.id) */}
          {/* The key prop ensures unique identification for each budget card*/}
          {budgets.map(budget => {
            // get all expenses, add them together, then add them to my expense amount
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return (
            <BudgetCard 
              key={budget.id}
              name= {budget.name}
              amount={amount} 
              max={budget.max} 
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}
             /> 
            )
          })}
          <UncategorizedBudgetCard 
          onAddExpenseClick={openAddExpenseModal} 
          onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
          </div>
      </Container>
      {/* Renders the AddBudgetModal component with the show prop set to the value of the showAddBudgetModal state variable */}
      {/* Also provides a handleClose prop, which sets showAddBudgetModal to false when invoked, closing the modal */}
      <AddBudgetModal 
        show={showAddBudgetModal} 
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal 
        show={showAddExpenseModal} 
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
      </>
    )
}
export default App;
