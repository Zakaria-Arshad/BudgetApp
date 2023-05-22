import Container from 'react-bootstrap/Container'
import { Button, Stack } from "react-bootstrap"
import BudgetCard from "./components/BudgetCard"

function App() {
  // container is used to create a fixed-width container for the website.
  return <Container className="my-4">
    <Stack direction="horizontal" gap="2" className="mb-4">
      {/* Add budget and add expensesButtons */}
      <h1 className="me-auto">Budgets</h1>
      <Button variant="primary">Add Budget</Button>
      <Button variant="outline-primary">Add Expense</Button>
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
      <BudgetCard name="Entertainment" amount={200} max={1000}></BudgetCard>
      </div>
  </Container>
}

export default App;
