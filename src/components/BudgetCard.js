// Importing the `Card` component from the React Bootstrap library
import { Card } from "react-bootstrap";

// Importing the `currencyFormatter` from the '../utils' module
import { currencyFormatter } from '../utils';

// Defining the `BudgetCard` component
export default function BudgetCard( { name, amount, max }) {
  return (
    // Creating a card using the `Card` component from Bootstrap
    <Card>
        <Card.Body>
            <Card.Title>
                {/* Displaying the budget name */}
                <div>{name}</div>
                
                {/* Displaying the formatted amount and max values using `currencyFormatter` */}
                <div>{currencyFormatter.format(amount)} / {currencyFormatter.format(max)} </div>
            </Card.Title>
        </Card.Body>
    </Card>
  )
}

