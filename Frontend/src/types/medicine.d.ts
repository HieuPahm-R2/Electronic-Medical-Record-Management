export interface IMedicine {
    id?: string;
    name: string;
    code: string;
    quantity: number;
    unit: string;
    supplier: string;
    importPrice: number;
    exportPrice: number;
    expiredAt: string; // date-time
    createdAt?: string;
    updatedAt?: string;
}
