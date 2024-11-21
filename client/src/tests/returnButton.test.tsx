import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReturnButton from '../components/ReturnButton';

test('calls backToHome on click', () => {
    const mockBack = jest.fn();
    render(<ReturnButton backToHome={mockBack} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockBack).toHaveBeenCalled();
});
