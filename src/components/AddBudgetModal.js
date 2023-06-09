import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"

// component receives two props, show and handleClose, controlling visibility and its close
export default function AddBudgetModal({ show, handleClose }) {
    // creates a reference with useRef hook to store the value of the name and maximum spending input field
    const nameRef = useRef()
    const maxRef = useRef()
    // uses custom hook useBudgets to add a new budget to list of budgets
    const { addBudget } = useBudgets()
    // handleSubmit is triggered when a form is submitted. it prevents default form submission
    // calls addBudget function with the name and max spending values, then closes the modal
    function handleSubmit(e){
        e.preventDefault()
        addBudget(
        {
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
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
                <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            {/* Represents the body section of the modal */}
            <Modal.Body>
                {/* Groups related form elements together */}
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    {/* Renders an input field to be filled. ref attribute used to associate the input field with nameRef reference */}
                    <Form.Control ref={nameRef} type="text" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="max">
                    {/* Renders an input field that takes decimal values, with a min value of 0 and step of .01*/}
                    <Form.Label>Maximum Spending</Form.Label>
                    <Form.Control ref={maxRef} type="number" required min={0} step={0.01}/>
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
