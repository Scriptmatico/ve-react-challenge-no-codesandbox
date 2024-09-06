import { Button, Col, Container, Row } from "react-bootstrap";
import Character from "./Components/Character";
import { CharacterModel } from "./Models";
import useFetchCharacters from "./Hooks/useFetchCharacters";

export default function App() {
  const {
    loading,
    characters,
    handleNextPage,
    handlePrevPage,
    nextPageUrl,
    prevPageUrl,
  } = useFetchCharacters("https://rickandmortyapi.com/api/character");

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Rick & Morty Characters</h1>
        </Col>
      </Row>
      {loading && <h5>Loading</h5>}
      {!loading && (
        <>
          <Row>
            <Col>
              <Button
                variant="link"
                className="mr-3"
                onClick={handlePrevPage}
                disabled={!prevPageUrl}
              >
                Prev Page
              </Button>
              <Button
                variant="link"
                onClick={handleNextPage}
                disabled={!nextPageUrl}
              >
                Next Page
              </Button>
            </Col>
          </Row>
          <Row>
            {characters.map((character:CharacterModel) => (
              <Character character={character} />
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}
