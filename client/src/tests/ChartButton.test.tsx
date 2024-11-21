import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChartButton from '../components/ChartButton';

test('calls toggleChart on click', () => {
    const mockToggle = jest.fn();
    render(<ChartButton toggleChart={mockToggle} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockToggle).toHaveBeenCalled();
});
