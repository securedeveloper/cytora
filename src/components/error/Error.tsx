import { Alert, Container } from "@mui/material";
import { Button } from "../button/Button";

export function ErrorMessage({ error }: { error: Error }) {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Alert severity="error">
          {error?.message || 'An error occurred. Please try again later.'}
        </Alert>
        <br />
        <Button size="small" to="/">Home</Button>
    </Container>
  )
}