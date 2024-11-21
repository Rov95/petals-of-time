import React from 'react';
import { render, screen } from '@testing-library/react';
import LotusCount from './../components/LotusCount';

test('displays the correct lotus count', () => {
    render(<LotusCount lotusCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
});
