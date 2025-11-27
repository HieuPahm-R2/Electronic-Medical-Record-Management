// components/MedicalRecord/LabResultsTable.tsx
import React, { useMemo } from 'react';
import { Table } from 'antd';
import { IBloodTest } from '@/types/backend';
import { mapApiToTable } from '@/config/utils';


interface LabResultsTableProps {
    data?: IBloodTest; // Nhận vào cả object IBloodTest
    loading?: boolean;
}

export const LabResultsTable: React.FC<LabResultsTableProps> = ({ data, loading }) => {
    // mapApiToTable giờ xử lý 1 object và trả về mảng
    const dataSource = useMemo(() => mapApiToTable(data), [data]);

    const columns = [
        {
            title: 'Yêu cầu xét nghiệm',
            dataIndex: 'label', // Lúc trước là testName, giờ map là label
            width: '35%',
        },
        {
            title: 'Kết quả xét nghiệm',
            dataIndex: 'result',
            render: (text: string | number) => <b style={{ color: '#1890ff' }}>{text}</b>,
        },
        {
            title: 'Trị số bình thường',
            dataIndex: 'normalRange',
            render: (text: string) => <div style={{ whiteSpace: 'pre-line' }}>{text}</div>,
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
            size="middle"
            loading={loading}
        />
    );
};