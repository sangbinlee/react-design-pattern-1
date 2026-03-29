import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { PizzaShopApp } from '../App';
describe('Code Oven Application', () => {
  it('renders application heading', () => {
    render(<PizzaShopApp />);
    const heading = screen.getByText('The Code Oven');
    expect(heading).toBeInTheDocument();
  });
});
