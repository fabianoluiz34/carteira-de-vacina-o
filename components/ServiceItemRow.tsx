
import React from 'react';
import { TrashIcon } from './icons';
import type { ServiceItem } from '../types';

interface ServiceItemRowProps {
    item: ServiceItem;
    onChange: (id: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (id: number) => void;
    index: number;
}

export const ServiceItemRow: React.FC<ServiceItemRowProps> = ({ item, onChange, onRemove }) => {
    return (
        <div className="grid grid-cols-12 gap-2 items-center p-2 bg-gray-50 rounded-md">
            <div className="col-span-12 md:col-span-6">
                <input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={(e) => onChange(item.id, e)}
                    placeholder="Descrição do Serviço"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
            </div>
            <div className="col-span-3 md:col-span-2">
                <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => onChange(item.id, e)}
                    placeholder="Qtd."
                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                    min="0"
                />
            </div>
            <div className="col-span-6 md:col-span-3">
                 <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-500 text-sm">R$</span>
                    <input
                        type="number"
                        name="unitPrice"
                        value={item.unitPrice}
                        onChange={(e) => onChange(item.id, e)}
                        placeholder="Preço Unit."
                        className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded-md text-sm"
                        min="0"
                    />
                </div>
            </div>
            <div className="col-span-3 md:col-span-1 flex justify-end">
                <button type="button" onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
