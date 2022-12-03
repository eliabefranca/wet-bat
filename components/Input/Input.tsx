import React, { ChangeEventHandler } from 'react';

interface InputProps {
    id?: string;
    value: string;
    name?: string;
    className?: string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
    placeholder?: string;
    label?: string;
    type?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    children?: React.ReactNode;
    max?: number;
}

const Input: React.FC<InputProps> = (props) => {
    return (
        <div className={`flex flex-col ${props.className ?? ''}`}>
            <label htmlFor={props.id} className="mb-3 text-gray-700">
                {props.label}
            </label>
            {props.type !== 'select' && (
                <input
                    id={props.id}
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    className="border rounded py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                    placeholder={props.placeholder}
                    max={props.max}
                />
            )}

            {props.type === 'select' && (
                <select
                    id={props.id}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    className="border rounded py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                    placeholder={props.placeholder}
                >
                    {props.children}
                </select>
            )}
        </div>
    );
};

export default Input;
