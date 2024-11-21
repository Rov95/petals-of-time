import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusIndicator from '../components/StatusIndicator';

test('renders correct status for work session', () => {
    render(<StatusIndicator isWorkSession={true} pauseTran={() => {}} tranTime={10} tranIsPaused={false} />);
    expect(screen.getByText('🎉 Great Work!')).toBeInTheDocument();
    });

    test('renders correct status for break', () => {
    render(<StatusIndicator isWorkSession={false} pauseTran={() => {}} tranTime={10} tranIsPaused={false} />);
    expect(screen.getByText('Break is Over!')).toBeInTheDocument();
});
