
import React from 'react';
import type { Proposal, ServiceItem } from '../types';
import { InputField } from './InputField';
import { TextAreaField } from './TextAreaField';
import { ServiceItemRow } from './ServiceItemRow';
import { PlusIcon, SparkleIcon } from './icons';

interface ProposalFormProps {
    proposal: Proposal;
    setProposal: React.Dispatch<React.SetStateAction<Proposal>>;
    onGenerateText: (section: 'introduction' | 'termsAndConditions') => void;
    isGenerating: string | null;
}

export const ProposalForm: React.FC<ProposalFormProps> = ({ proposal, setProposal, onGenerateText, isGenerating }) => {
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProposal(prev => ({ ...prev, [name]: value }));
    };
    
    const handleContactChange = (party: 'client' | 'provider', e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProposal(prev => ({
            ...prev,
            [party]: { ...prev[party], [name]: value }
        }));
    };

    const handleServiceChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newServices = proposal.services.map(item =>
            item.id === id ? { ...item, [name]: name === 'description' ? value : parseFloat(value) || 0 } : item
        );
        setProposal(prev => ({ ...prev, services: newServices }));
    };

    const addService = () => {
        const newService: ServiceItem = {
            id: Date.now(),
            description: '',
            quantity: 1,
            unitPrice: 0,
        };
        setProposal(prev => ({ ...prev, services: [...prev.services, newService] }));
    };

    const removeService = (id: number) => {
        setProposal(prev => ({ ...prev, services: prev.services.filter(item => item.id !== id) }));
    };

    const AIGenerateButton = ({ section }: { section: 'introduction' | 'termsAndConditions' }) => (
        <button
            type="button"
            onClick={() => onGenerateText(section)}
            disabled={isGenerating === section}
            className="flex items-center gap-2 mt-2 bg-purple-100 text-purple-700 font-semibold py-1 px-3 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
            <SparkleIcon className="w-4 h-4" />
            {isGenerating === section ? 'Gerando...' : 'Gerar com IA'}
        </button>
    );

    return (
        <form className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-700 border-b pb-2">Informações da Proposta</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField label="Nº da Proposta" name="proposalNumber" value={proposal.proposalNumber} onChange={handleInputChange} />
                <InputField label="Data de Emissão" name="issueDate" type="date" value={proposal.issueDate} onChange={handleInputChange} />
                <InputField label="Válida Até" name="validUntil" type="date" value={proposal.validUntil} onChange={handleInputChange} />
            </div>
             <InputField label="Título do Projeto" name="projectTitle" value={proposal.projectTitle} onChange={handleInputChange} placeholder="Ex: Redesign do E-commerce" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">De (Sua Empresa)</h3>
                    <InputField label="Nome da Empresa" name="companyName" value={proposal.provider.companyName} onChange={(e) => handleContactChange('provider', e)} />
                    <InputField label="Nome do Contato" name="name" value={proposal.provider.name} onChange={(e) => handleContactChange('provider', e)} />
                    <InputField label="Endereço" name="address" value={proposal.provider.address} onChange={(e) => handleContactChange('provider', e)} />
                    <InputField label="Email" name="email" type="email" value={proposal.provider.email} onChange={(e) => handleContactChange('provider', e)} />
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Para (Cliente)</h3>
                    <InputField label="Nome da Empresa" name="companyName" value={proposal.client.companyName} onChange={(e) => handleContactChange('client', e)} />
                    <InputField label="Nome do Contato" name="name" value={proposal.client.name} onChange={(e) => handleContactChange('client', e)} />
                    <InputField label="Endereço" name="address" value={proposal.client.address} onChange={(e) => handleContactChange('client', e)} />
                    <InputField label="Email" name="email" type="email" value={proposal.client.email} onChange={(e) => handleContactChange('client', e)} />
                </div>
            </div>

            <div className="pt-4">
                <TextAreaField label="Introdução" name="introduction" value={proposal.introduction} onChange={handleInputChange} rows={5} />
                <AIGenerateButton section="introduction" />
            </div>

            <div className="pt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Serviços / Itens</h3>
                <div className="space-y-3">
                    {proposal.services.map((item, index) => (
                        <ServiceItemRow
                            key={item.id}
                            item={item}
                            onChange={handleServiceChange}
                            onRemove={removeService}
                            index={index}
                        />
                    ))}
                </div>
                <button type="button" onClick={addService} className="mt-4 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800">
                    <PlusIcon className="w-5 h-5" />
                    Adicionar Item
                </button>
            </div>
            
            <div className="pt-4">
                <TextAreaField label="Termos e Condições" name="termsAndConditions" value={proposal.termsAndConditions} onChange={handleInputChange} rows={6} />
                <AIGenerateButton section="termsAndConditions" />
            </div>
        </form>
    );
};
