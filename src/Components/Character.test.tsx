import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Character from './Character';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('Character Component', () => {
  it('renders character details correctly', () => {
    render(<Character character={mockCharacter} />);

    // Use the screen object to query for elements
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human - Male')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
  });

  it('renders correct status badge based on character status', () => {
    render(<Character character={mockCharacter} />);
    const badge = screen.getByText('Alive');
    expect(badge).toHaveClass('bg-success');
  });
});
