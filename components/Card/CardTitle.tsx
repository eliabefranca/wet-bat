import React from 'react';

// CardTitle.tsx
interface Props {
    children?: React.ReactNode;
    className?: string;
}

const CardTitle: React.FC<Props> = ({ children, className = '' }) => {
    return (
        <div className={`flex items-center text-xl text-primary ${className}`}>
            {children}
        </div>
    );
};

export default CardTitle;
