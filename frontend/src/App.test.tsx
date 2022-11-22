import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

test('look for chRat', () => {
    render(<App/>);
    const linkElement = screen.getByText(/chRat/i);
    expect(linkElement).toBeInTheDocument();
});
