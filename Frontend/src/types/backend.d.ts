export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IModelPaginate<T> {
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    };
    result: T[];
}
export interface IUser {
    id?: string;
    fullName: string;
    email: string;
    password?: string;
    role?: {
        id: string;
        name: string;
    };
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface IPatient {
    id?: string;
    fullName?: string;
    avatar?: string;
    patientCode?: string;
    dateOfBirth?: string;
    email?: string;
    phone?: number;
    nationality?: string;
    address?: string;
    identityCard?: string;
    insuranceNumber?: string;
    insuranceExpired?: string;
    gender?: string;
    career?: string;
    relativeName?: string;
    relativePhone?: string;
    ethnicity?: string;
    religion?: string;

    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;

}

export interface IMedicalExam {
    id?: number;
    arrivalTime?: string; // LocalDate -> string
    receptionTime?: string;
    referralSource?: string;
    symptoms?: string;
    reason?: string;
    daysOfSymptoms?: number;

    hasAllergy?: boolean;
    allergyMonths?: number;

    usesDrugs?: boolean;
    drugsMonths?: number;

    usesAlcohol?: boolean;
    alcoholMonths?: number;

    usesTobacco?: boolean;
    tobaccoMonths?: number;

    hasOther?: boolean;
    otherMonths?: number;
    otherDescription?: string;

    personalMedicalHistory?: string;
    familyMedicalHistory?: string;

    patient?: string;
    department?: IDepartment;
}

export interface IVitalSign {
    id: number;
    temperature: number;
    height: number;
    weight: number;
    heart_rate: number;
    blood_group: string;
    blood_type: string;
    systolic_bp: number;
    diastolic_bp: number;
    pulse_rate: number;
    respiratory_rate?: number;
    notes?: string;
    patient_id?: string;
    medical_exam_id?: IMedicalExamRes;
}

export interface IBloodTest {
    id?: string;
    conclusion?: string;
    glucose?: number;
    urea?: number;
    rbc?: number;
    hb?: number;
    hct?: number;
    mcv?: number;
    mch?: number;
    wbc?: number;
    neut?: number;
    blood_group?: string;
    blood_type?: string;
    image_url?: string;
    patient_id?: string;
    clinical_services?: IClinicalService;
    medical_exam_id?: IMedicalExam;
}

export interface IRadiology {
    id?: number;
    image_path?: string;
    conclusion?: string;
    patient_id?: number;
    clinical_service_id?: IClinicalService; // 
    medical_exam_id?: IMedicalExamRes;
}

export interface IDiagnose {
    id?: number;
    main_disease?: string;
    comorbidity?: string;
    conclusion?: string;
    prognosis?: string;
    treatment_plan?: string;
    patient_id?: number;
    medical_exam_id?: MedicalExamRes;
}

export interface IClinicalInfo {
    id?: number;
    patient_id?: IPatient; // Lưu ý: Java đặt tên biến là 'patient' nhưng JsonProperty là 'patient_id'
    medical_exam_id?: IMedicalExam; // Java: medicalExam -> Json: medical_exam_id
    clinical_services?: IClinicalService[]; // Set -> Array

    circulatory_diagnosis?: string;
    respiratory_diagnosis?: string;
    genitourinary_diagnosis?: string;
    bone_diagnosis?: string;
    rhm_diagnosis?: string;
    digestive_diagnosis?: string;
    nervous_diagnosis?: string;
    ent_diagnosis?: string;
    other_diagnoses?: string;
    syndrome?: string;
}

export interface IDepartment {
    id?: string;
    name?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IClinicalService {
    id?: string;
    serviceName?: string;
}

export interface IMedicalExamRes {
    id?: number;
    patientId?: number;
    department?: string;
}
export interface IAppointment {
    key: number;
    id: number;
    name: string;
    email: string;
    phone: string;
    createdAt?: string;
    updatedAt?: string;
    status?: 'PENDING' | 'SCHEDULED' | 'CANCELED';
}
export interface IPermission {
    id?: string;
    name?: string;
    apiPath?: string;
    method?: string;
    module?: string;

    createdBy?: string;

    createdTime?: string;
    updatedTime?: string;
}

export interface IRole {
    id?: string;
    name: string;
    description: string;
    active: boolean;
    permissions: IPermission[] | string[];

    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}