import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext"


// component receives two props, show and handleClose, controlling visibility and its close
// third prop defaultBudgetId allows us to have a default uncategorized value
export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    // uses custom hook useBudgets to add a new budget to list of budgets
    const { addExpense, budgets } = useBudgets()
    // handleSubmit is triggered when a form is submitted. it prevents default form submission
    // calls addBudget function with the name and max spending values, then closes the modal
    function handleSubmit(e){
        e.preventDefault()
        addExpense(
        {
            descriptionRef: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value
        }
        )
        handleClose()
    }

  return (
    // renders a modal dialog that shows when the shoe prop is true
    // also calls the handleClose function when the modal is closed
    <Modal show={show} onHide={handleClose}>
        {/* Renders a form component that triggers the handleSubmit function when submitted */}
        <Form onSubmit={handleSubmit}>
            {/* Renders the header of the modal with a close button */}
            <Modal.Header closeButton>
                {/* Displays "New Budget" in the modal header */}
                <Modal.Title>New Expense</Modal.Title>
            </Modal.Header>
            {/* Represents the body section of the modal */}
            <Modal.Body>
                {/* Groups related form elements together */}
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionRef} type="text" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control ref={amountRef} type="number" required min={0} step={0.01}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="budgetId">
                    {/* Renders an input field that takes decimal values, with a min value of 0 and step of .01*/}
                    <Form.Label>Budget</Form.Label>
                    <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                        <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                        {budgets.map(budget => (
                            <option key={budget.id} value={budget.id}>{budget.name}  </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {/* flex display, aligns content to end of container */}
                <div className="d-flex justify-content-end">
                    {/* submit button */}
                    <Button variant="primary" type="submit">Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}
