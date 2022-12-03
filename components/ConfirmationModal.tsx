import React from 'react';
import Button from './Button/Button';

interface Props {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal = ({ title, message, onConfirm, onCancel }: Props) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
            <div className="relative w-11/12 max-w-md p-6 bg-white rounded-md shadow-2xl">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-4">{message}</p>
                <div className="flex justify-end mt-4 space-x-2">
                    <Button className="bg-slate-400" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button className="bg-danger" onClick={onConfirm}>
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
