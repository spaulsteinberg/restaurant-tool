import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import NavigationBarLinks from '../NavigationBarLinks';
import {cleanup, render} from '@testing-library/react';

describe('Navigation', () => {
  afterAll(cleanup)

  it('should render without crashing', () => {
    const tree = render(
      <Router>
        <NavigationBarLinks />
      </Router>
    );
    expect(tree.getByText("Inventory")).toBeInTheDocument();
  });
});