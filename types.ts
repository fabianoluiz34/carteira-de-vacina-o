
export interface ContactInfo {
    name: string;
    companyName: string;
    address: string;
    email: string;
}

export interface ServiceItem {
    id: number;
    description: string;
    quantity: number;
    unitPrice: number;
}

export interface Proposal {
    proposalNumber: string;
    issueDate: string;
    validUntil: string;
    projectTitle: string;
    client: ContactInfo;
    provider: ContactInfo;
    introduction: string;
    services: ServiceItem[];
    termsAndConditions: string;
}
