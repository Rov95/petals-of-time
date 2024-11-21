/// <reference types="node" />

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chart from '../components/Chart';
import { createCanvas } from 'canvas';

declare global {
    interface HTMLCanvasElement {
        getContext(
            contextId: "2d",
            options?: CanvasRenderingContext2DSettings
        ): CanvasRenderingContext2D | null;
        getContext(contextId: string, options?: any): any;
    }
}

Object.defineProperty(global, 'HTMLCanvasElement', {
    value: createCanvas,
});

beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn((contextId: string) => {
        if (contextId === "2d") {
            return {
                fillRect: jest.fn(),
                clearRect: jest.fn(),
                getImageData: jest.fn(),
                putImageData: jest.fn(),
                createImageData: jest.fn(),
                setTransform: jest.fn(),
                drawImage: jest.fn(),
                save: jest.fn(),
                fillText: jest.fn(),
                restore: jest.fn(),
                beginPath: jest.fn(),
                moveTo: jest.fn(),
                lineTo: jest.fn(),
                closePath: jest.fn(),
                stroke: jest.fn(),
                translate: jest.fn(),
                scale: jest.fn(),
                rotate: jest.fn(),
                arc: jest.fn(),
                fill: jest.fn(),
                strokeText: jest.fn(),
                measureText: jest.fn(() => ({ width: 100 })),
                transform: jest.fn(),
                rect: jest.fn(),
                clip: jest.fn(),
            } as unknown as CanvasRenderingContext2D;
        }
        // Return null for other contexts
        return null;
    });
});

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
    // expect(screen.getByText('Work Time (hours)')).toBeInTheDocument();
});
