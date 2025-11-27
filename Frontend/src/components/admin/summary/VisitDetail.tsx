// components/MedicalRecord/VisitDetailTabs.tsx
import React from 'react';
import { Tabs, Typography } from 'antd';
import { IBloodTest } from '@/types/backend';
import { LabResultsTable } from './LabResultTable';

const { Title, Text } = Typography;

interface VisitDetailTabsProps {
    // Cập nhật: Nhận vào object IBloodTest thay vì mảng
    labData?: IBloodTest;
}

export const VisitDetailTabs: React.FC<VisitDetailTabsProps> = ({ labData }) => {
    const items = [
        {
            label: 'Lịch sử khám',
            key: '1',
            children: <div style={{ padding: 16 }}>Nội dung lịch sử khám...</div>
        },
        {
            label: 'Lâm sàng tổng quát',
            key: '2',
            children: <div style={{ padding: 16 }}>Nội dung lâm sàng...</div>
        },
        {
            label: 'Kết quả cận lâm sàng',
            key: '3',
            children: (
                <div style={{ paddingTop: 16 }}>
                    <div style={{ marginBottom: 16 }}>
                        <Title level={5}>Bảng kết quả xét nghiệm máu</Title>
                        <Text type="secondary" italic>
                            {/* Hiển thị ngày nếu có id hoặc dữ liệu */}
                            {labData ? `Mã phiếu: ${labData.id || '---'}` : 'Chưa có dữ liệu'}
                        </Text>
                    </div>

                    {/* Truyền toàn bộ object IBloodTest xuống Table */}
                    <LabResultsTable data={labData} />
                </div>
            )
        },
        {
            label: 'Chẩn đoán',
            key: '4',
            children: <div style={{ padding: 16 }}>Nội dung chẩn đoán...</div>
        },
    ];

    return (
        <Tabs
            defaultActiveKey="3"
            type="card"
            items={items}
            style={{ marginBottom: 0 }}
        />
    );
};