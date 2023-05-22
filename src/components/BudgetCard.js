// Importing the `Card` component from the React Bootstrap library
import { Button, Card, ProgressBar, Stack} from "react-bootstrap";

// Importing the `currencyFormatter` from the '../utils' module
import { currencyFormatter } from '../utils';
import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";

// Defining the `BudgetCard` component
export default function BudgetCard( { name, amount, max, gray }) {
  const classNames = []
  {/* pushes the danger color into array if amount for our BudgetCard is too high*/}
  {/* whatever is in the array will be used for the Card component className, which will change the color of the entire card*/}
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }

  return (
    // Creating a card using the `Card` component from Bootstrap
    <Card className={classNames.join(" ")}>
        <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                {/* Displaying the budget name */}
                <div className="me-2">{name}</div>
                {/* Displaying the formatted amount and max values using `currencyFormatter` */}
                <div className="d-flex align-items-baseline">
                    {currencyFormatter.format(amount)} 
                    <span className="text-muted fs-6 ms-1">
                        / {currencyFormatter.format(max)} 
                    </span>
                </div>
            </Card.Title>
            <ProgressBar 
                className="rounded-pill" 
                variant={getProgressBarVariant(amount, max)}
                min={0}
                max={max}
                now={amount} 
            />
            {/* ms-auto pushes buttons to the right side of the stack */}
            <Stack direction="horizontal" gap="2" className="mt-4">
                <Button variant="outline-primary" className="ms-auto">Add Expense</Button>
                <Button variant="outline-secondary">View Expenses</Button>
            </Stack> 
        </Card.Body>
    </Card>
  )
}

{/* primary, warning, and danger are built in variants for the ProgressBar component */}
function getProgressBarVariant(amount, max) {
    const ratio = amount / max;
    if (ratio < .5) return "primary"
    if (ratio <.75) return "warning"
    return "danger"
}

