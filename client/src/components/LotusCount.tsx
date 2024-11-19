import React from 'react';

// Define the props interface
interface LotusCountProps {
  lotusCount: number;
}

const LotusCount: React.FC<LotusCountProps> = ({ lotusCount }) => {
  return (
    <div className="lotus-count">
      <span className="lotus-count">{lotusCount}</span>
    </div>
  );
};

export default LotusCount;
