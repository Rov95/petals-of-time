import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Settings from '../components/Settings';

test('updates settings and calls onSettingsChange', () => {
    const mockOnChange = jest.fn();
    const mockClose = jest.fn();
    render(<Settings onSettingsChange={mockOnChange} closeSettings={mockClose} />);
    
    const input = screen.getByLabelText(/Focus Period/i);
    fireEvent.change(input, { target: { value: '45' } });
    
    fireEvent.click(screen.getByText('Save'));
    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ workPeriod: 45 }));
    expect(mockClose).toHaveBeenCalled();
});
