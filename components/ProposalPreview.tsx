
import React from 'react';
import type { Proposal } from '../types';

interface ProposalPreviewProps {
    proposal: Proposal;
}

export const ProposalPreview: React.FC<ProposalPreviewProps> = ({ proposal }) => {
    const subtotal = proposal.services.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    // Example tax rate of 5%
    // const tax = subtotal * 0.05;
    const total = subtotal; // + tax;

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg print:shadow-none print:rounded-none">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">PROPOSTA COMERCIAL</h1>
                    <p className="text-gray-600 mt-1">Projeto: {proposal.projectTitle}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-semibold text-gray-700">{proposal.provider.companyName}</h2>
                    <p className="text-sm text-gray-500">{proposal.provider.address}</p>
                    <p className="text-sm text-gray-500">{proposal.provider.email}</p>
                </div>
            </div>

            {/* Proposal Info */}
            <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
                <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-semibold text-gray-500">Nº da Proposta</p>
                    <p className="text-gray-800">{proposal.proposalNumber}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-semibold text-gray-500">Data de Emissão</p>
                    <p className="text-gray-800">{formatDate(proposal.issueDate)}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-semibold text-gray-500">Válida Até</p>
                    <p className="text-gray-800">{formatDate(proposal.validUntil)}</p>
                </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Para</h3>
                    <p className="text-lg font-bold text-gray-800">{proposal.client.companyName}</p>
                    <p className="text-gray-600">A/C: {proposal.client.name}</p>
                    <p className="text-gray-600">{proposal.client.address}</p>
                    <p className="text-gray-600">{proposal.client.email}</p>
                </div>
            </div>

            {/* Introduction */}
            <div className="mb-10">
                <p className="text-gray-700 whitespace-pre-wrap">{proposal.introduction}</p>
            </div>

            {/* Services Table */}
            <table className="w-full mb-10">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left font-semibold p-3">Descrição do Serviço</th>
                        <th className="text-center font-semibold p-3">Qtd.</th>
                        <th className="text-right font-semibold p-3">Preço Unit.</th>
                        <th className="text-right font-semibold p-3">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {proposal.services.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                            <td className="p-3">{item.description}</td>
                            <td className="text-center p-3">{item.quantity}</td>
                            <td className="text-right p-3">{formatCurrency(item.unitPrice)}</td>
                            <td className="text-right p-3">{formatCurrency(item.quantity * item.unitPrice)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-10">
                <div className="w-full max-w-xs text-right">
                    <div className="flex justify-between py-2 border-b">
                        <span className="font-semibold text-gray-600">Subtotal:</span>
                        <span className="text-gray-800">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between py-2 mt-2 bg-gray-100 px-4 rounded-md">
                        <span className="text-xl font-bold text-gray-800">Total:</span>
                        <span className="text-xl font-bold text-gray-800">{formatCurrency(total)}</span>
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Termos e Condições</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{proposal.termsAndConditions}</p>
            </div>

            {/* Signature */}
            <div className="pt-16 text-center">
                <div className="inline-block">
                    <div className="border-t-2 border-gray-400 w-64 pt-2">
                        <p className="font-semibold">{proposal.provider.name}</p>
                        <p className="text-sm text-gray-500">{proposal.provider.companyName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
