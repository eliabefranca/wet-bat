import React from 'react';

// reusable button component using tailwind css

type Props = {
    children: React.ReactNode;
    className?: string;
    color?: string;
    onClick?: () => void;
};

const Button: React.FC<Props> = ({
    children,
    color = 'primary',
    className,
    onClick,
}) => {
    return (
        <button
            className={`bg-${color} justify-center text-white px-6 py-2 rounded-full w-full flex items-center gap-2 ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
