import React from 'react';
// CardHeader.tsx

interface Props {
    children?: React.ReactNode;
    className?: string;
}

const CardHeader: React.FC<Props> = ({ children, className = '' }) => {
    return (
        <div className={`p-4 border-b border-bottom-gray-300 ${className}`}>
            {children}
        </div>
    );
};

export default CardHeader;
