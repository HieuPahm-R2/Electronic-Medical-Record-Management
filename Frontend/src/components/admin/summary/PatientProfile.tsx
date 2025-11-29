import React from 'react';
import { Card, Avatar, Typography, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IPatient } from '@/types/backend';


const { Title, Text } = Typography;

interface PatientProfileProps {
    patient: IPatient | null;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card bordered={false} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <Avatar
                        size={100}
                        src={patient?.avatar}
                        icon={<UserOutlined />}
                        style={{ border: '4px solid #e6f7ff', marginBottom: 10 }}
                    />
                    <Title level={4} style={{ margin: 0, color: '#333' }}>{patient?.fullName}</Title>
                    <Text type="secondary">{patient?.patientCode}</Text>
                </div>

                <InfoRow label="Ngày sinh" value={patient?.dateOfBirth as string} />
                <Divider style={{ margin: '12px 0' }} />
                <InfoRow label="Giới tính" value={patient?.gender as string} />
                <Divider style={{ margin: '12px 0' }} />
                <InfoRow label="Nghề nghiệp" value={patient?.career as string} />
            </Card>

            <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', background: '#fff' }}>
                <div style={{ background: '#597ef7', padding: '10px 16px', color: '#fff', fontWeight: 600 }}>
                    Chi tiết
                </div>
                <div style={{ padding: 16 }}>
                    <DetailItem label="🏁 Quốc tịch" value={patient?.nationality as string} />
                    <DetailItem label="❤️ Dân tộc" value={patient?.ethnicity as string} />
                </div>
            </div>
        </div>
    );
};

// Sub-components nhỏ để code gọn hơn
const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text strong>{label}</Text>
        <Text type="secondary" style={{ color: '#1890ff' }}>{value}</Text>
    </div>
);

const DetailItem = ({ label, value }: { label: string, value: string }) => (
    <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 'bold' }}>{label}</div>
        <div style={{ color: '#666' }}>{value}</div>
    </div>
);