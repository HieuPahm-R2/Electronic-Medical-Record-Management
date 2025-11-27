// Cấu hình tĩnh của một chỉ số xét nghiệm
export interface LabTestConfig {
    label: string;
    normalRange: string;
    unit: string;
}


//được merge để hiển thị lên Table Antd
export interface LabTableData extends LabTestConfig {
    key: string;
    result: number | string;
}