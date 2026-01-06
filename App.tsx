
import React, { useState } from 'react';
import { ProposalForm } from './components/ProposalForm';
import { ProposalPreview } from './components/ProposalPreview';
import { PrintIcon } from './components/icons';
import type { Proposal } from './types';
import { generateContent } from './services/geminiService';

const App: React.FC = () => {
    const [proposal, setProposal] = useState<Proposal>({
        proposalNumber: 'PROP-001',
        issueDate: new Date().toISOString().split('T')[0],
        validUntil: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
        projectTitle: 'Desenvolvimento de Novo Website Corporativo',
        client: {
            name: 'João da Silva',
            companyName: 'Empresa Exemplo Ltda.',
            address: 'Rua das Flores, 123, São Paulo, SP',
            email: 'joao.silva@exemplo.com',
        },
        provider: {
            name: 'Ana Pereira',
            companyName: 'Sua Agência Criativa',
            address: 'Avenida Principal, 456, Rio de Janeiro, RJ',
            email: 'ana.pereira@suaagencia.com',
        },
        introduction: 'Prezado(a) João da Silva,\n\nAgradecemos a oportunidade de apresentar esta proposta para o desenvolvimento do novo website corporativo da Empresa Exemplo Ltda. Estamos confiantes de que nossa expertise pode ajudar a alcançar seus objetivos online.',
        services: [
            { id: 1, description: 'Design UI/UX e Prototipagem', quantity: 1, unitPrice: 2500 },
            { id: 2, description: 'Desenvolvimento Frontend (React)', quantity: 1, unitPrice: 4000 },
            { id: 3, description: 'Desenvolvimento Backend (Node.js)', quantity: 1, unitPrice: 4500 },
            { id: 4, description: 'Hospedagem e Manutenção (Anual)', quantity: 1, unitPrice: 1200 },
        ],
        termsAndConditions: '1. Pagamento: 50% adiantado, 50% na entrega.\n2. Prazo de Entrega: 60 dias a partir da data de início.\n3. Alterações: Alterações extras no escopo serão orçadas separadamente.\n4. Confidencialidade: Ambas as partes concordam em manter todas as informações confidenciais.',
    });
    
    const [isGenerating, setIsGenerating] = useState<string | null>(null);

    const handleGenerateText = async (section: 'introduction' | 'termsAndConditions') => {
        setIsGenerating(section);
        try {
            let prompt = '';
            if (section === 'introduction') {
                prompt = `Escreva uma carta de apresentação profissional e amigável para uma proposta comercial endereçada a '${proposal.client.name}' da empresa '${proposal.client.companyName}'. O projeto em questão é sobre '${proposal.projectTitle}'. Comece com "Prezado(a) ${proposal.client.name}," e seja conciso.`;
            } else {
                prompt = `Gere uma seção de 'Termos e Condições' para uma proposta comercial de um projeto de '${proposal.projectTitle}'. Inclua cláusulas sobre forma de pagamento (sugerindo 50% de entrada e 50% na conclusão), prazo de entrega, política de alterações de escopo e confidencialidade. Formate como uma lista numerada.`;
            }
            const text = await generateContent(prompt);
            setProposal(prev => ({ ...prev, [section]: text }));
        } catch (error) {
            console.error(`Error generating ${section}:`, error);
            alert(`Falha ao gerar texto para ${section}. Verifique o console para mais detalhes.`);
        } finally {
            setIsGenerating(null);
        }
    };

    const handlePrint = () => {
        const printContent = document.getElementById('proposal-preview-wrapper');
        if (printContent) {
            const innerHTML = printContent.innerHTML;
            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = '0';
            iframe.setAttribute('title', 'Cópia para Impressão');
            document.body.appendChild(iframe);

            const doc = iframe.contentWindow?.document;
            if (doc) {
                doc.open();
                doc.write(`
                    <html>
                        <head>
                            <title>Proposta Comercial</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                        </head>
                        <body>
                            ${innerHTML}
                        </body>
                    </html>
                `);
                doc.close();
                
                iframe.onload = () => {
                    setTimeout(() => {
                        try {
                            iframe.contentWindow?.focus();
                            iframe.contentWindow?.print();
                        } catch(e) {
                            console.error("A impressão falhou:", e);
                            alert("Não foi possível abrir a janela de impressão. Por favor, desative o bloqueador de pop-ups e tente novamente.");
                        } finally {
                            document.body.removeChild(iframe);
                        }
                    }, 500); // Atraso para garantir que os estilos sejam carregados
                };
            } else {
                 document.body.removeChild(iframe);
            }
        }
    };

    return (
        <div className="min-h-screen">
            <header className="bg-white shadow-md p-4 print:hidden">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Gerador de Propostas</h1>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <PrintIcon className="w-5 h-5" />
                        Imprimir / Salvar PDF
                    </button>
                </div>
            </header>

            <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 print:block print:max-w-none print:p-0">
                <div className="print:hidden">
                    <ProposalForm
                        proposal={proposal}
                        setProposal={setProposal}
                        onGenerateText={handleGenerateText}
                        isGenerating={isGenerating}
                    />
                </div>
                <div id="proposal-preview-wrapper">
                    <ProposalPreview proposal={proposal} />
                </div>
            </main>
        </div>
    );
};

export default App;
