import React, { CSSProperties, useState } from 'react';
import { IoIosExpand } from 'react-icons/io';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';

interface Props {
    children?: React.ReactNode;
    className?: string;
    fullscreen?: boolean;
}

const Card: React.FC<Props> = ({
    children,
    className = '',
    fullscreen = false,
}) => {
    const [expanded, setExpanded] = useState(false);

    const expandedStyle: CSSProperties = expanded
        ? {
              position: 'fixed',
              zIndex: 9999,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
          }
        : {
              position: 'relative',
          };

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        // tailwind card
        <div
            className={`rounded overflow-hidden bg-white border border-gray-200 ${className}`}
            style={expandedStyle}
        >
            {fullscreen ? (
                <div
                    className={`flex items-center ${
                        expanded && 'min-h-screen'
                    }`}
                >
                    <div className="container m-auto relative">
                        {children}
                        <div
                            className="cursor-pointer text-2xl absolute top-0 right-0 p-4"
                            style={{ zIndex: 999 }}
                            onClick={toggleExpanded}
                        >
                            {expanded ? (
                                <BsArrowsAngleContract />
                            ) : (
                                <BsArrowsAngleExpand />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                children
            )}
        </div>
    );
};

export default Card;
