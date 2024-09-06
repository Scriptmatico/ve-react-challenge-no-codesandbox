import React from "react";
import { Badge, Card } from "react-bootstrap";

interface CharacterProps {
  character: {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
  };
}

const Character: React.FC<CharacterProps> = ({ character }) => {
  const getBadgeVariant = (status: string): string => {
    switch (status) {
      case "Alive":
        return "success";
      case "Dead":
        return "danger";
      default:
        return "dark";
    }
  };

  return (
    <Card style={{ width: "18rem" }} className="mr-2 ml-2 mb-3">
      <Card.Img variant="top" src={character.image} />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Card.Text>
          {character.species} - {character.gender}
        </Card.Text>
        <Badge bg={getBadgeVariant(character.status)} text="light">
          {character.status}
        </Badge>
      </Card.Body>
    </Card>
  );
};

export default Character;
