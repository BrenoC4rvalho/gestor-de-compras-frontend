export interface Request {
    id: number;
    title: string;
    description: string;
    price: number;
    requesterName: string;
    approverName?: string;
    signature?: string;
    signatureDate?: Date;
    createAt: Date;
    maxSignatureDate: Date;
}