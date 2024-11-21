import React from 'react';
import { render, screen } from '@testing-library/react';
import Chart from '../components/Chart';

test('renders chart with correct data', () => {
    const mockWorkData = [
        { date: 'Mon', hours: 5 },
        { date: 'Tue', hours: 3.5 },
        { date: 'Wed', hours: 8 },
    ];

    render(<Chart workData={mockWorkData} />);
    
    // Verifing labels
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    
    // Verifing chart is rendered
    expect(screen.getByText('Work Time (hours)')).toBeInTheDocument();
});
