import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock implementation for `useFetchCharacters` hook
jest.mock('./Hooks/useFetchCharacters', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    characters: [
      { id: 1, name: 'Rick Sanchez', species: 'Human', gender: 'Male', status: 'Alive', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
    ],
    handleNextPage: jest.fn(),
    handlePrevPage: jest.fn(),
    nextPageUrl: 'https://rickandmortyapi.com/api/character?page=2',
    prevPageUrl: null,
  }),
}));

describe('App Component', () => {
  it('renders the title correctly', () => {
    render(<App />);
    expect(screen.getByText('Rick & Morty Characters')).toBeInTheDocument();
  });

  it('renders characters correctly', () => {
    render(<App />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('disables the Prev Page button when there is no previous page', () => {
    render(<App />);
    const prevButton = screen.getByText('Prev Page');
    expect(prevButton).toBeDisabled();
  });

  it('enables the Next Page button when there is a next page', () => {
    render(<App />);
    const nextButton = screen.getByText('Next Page');
    expect(nextButton).toBeEnabled();
  });
});
