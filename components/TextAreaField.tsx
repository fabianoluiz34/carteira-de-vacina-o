
import React from 'react';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, name, ...props }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                {...props}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
};
