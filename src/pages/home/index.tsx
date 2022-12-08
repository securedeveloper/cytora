import { Container, Grid } from "@mui/material";
import { useSWAPI } from "../../hooks/useSWAPI";
import { Person } from "../../types";
import { useEffect, useState } from "react";
import { PersonCard } from "../../components/person/PersonCard";
import { Page } from "../../components/page/Page";


export const Home = () => {
  const { getSWPeople } = useSWAPI();
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setLoading(true);
    getSWPeople().then((data) => {
      setPeople(data.results);
      setLoading(false);
    }).finally(() => {
      setLoading(false);
    })
  }, [getSWPeople]);

  return (
    <Page loading={loading}>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {(people || []).map((person: Person) => <PersonCard key={person.url} person={person} />)}
        </Grid>
      </Container>
    </Page>
  );
}
