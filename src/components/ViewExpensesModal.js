import { Modal, Button, Stack, Form } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense, markExpenseAsPaid } = useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID } :
    budgets.find(b => b.id === budgetId);

  const handleExpensePaidChange = (expenseId, isPaid) => {
    markExpenseAsPaid({ id: expenseId, isPaid });
  };

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button onClick={() => { deleteBudget(budget); handleClose(); }} variant="outline-danger">
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="d-flex align-items-center">
                {currencyFormatter.format(expense.amount)}
                <Form.Check
                  type="checkbox"
                  id={`expense-${expense.id}`}
                  checked={expense.isPaid}
                  onChange={e => handleExpensePaidChange(expense.id, e.target.checked)}
                  className="ms-2"
                  label="Paid"
                />
              </div>
              <Button onClick={() => deleteExpense({ id: expense.id })} size="sm" variant="outline-danger">&times;</Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
