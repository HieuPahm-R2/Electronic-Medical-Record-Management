// Frontend/src/types/medical.ts

export interface IMedicine {
    id?: string;
    name: string;
    unit: string;
    quantity: number;
    usage: string;
}

export interface IPrescription {
    id?: string;
    diagnose: string;
    doctor: string;
    patient: string;
    reExamination: number; // in days
    medicines: IMedicine[];
    createdAt?: string;
    updatedAt?: string;
}
