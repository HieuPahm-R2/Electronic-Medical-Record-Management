import React, { useState } from 'react';
import { Table, Tabs, Button, Card, Tag, message, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IAppointment } from '@/types/backend';


// 2. Dữ liệu mẫu (Mock data) giống trong ảnh
const initialData: IAppointment[] = [
    { key: 19, id: 19, name: 'Lavina Hodkiewicz', email: 'ottilie.kohler@example.net', phone: '0962763847', updatedAt: '2024-05-09 05:36:22', status: 'PENDING' },
    { key: 20, id: 20, name: 'Dr. Ashtyn Ziemann Sr.', email: 'metz.arjun@example.org', phone: '0962478078', updatedAt: '2024-05-09 05:36:22', status: 'PENDING' },
    { key: 21, id: 21, name: 'Emmett Waters', email: 'marcelina98@example.net', phone: '0962666894', updatedAt: '2024-05-09 05:36:22', status: 'PENDING' },
    { key: 22, id: 22, name: 'Kristy Cummings', email: 'eva18@example.net', phone: '0962229401', updatedAt: '2024-05-09 05:36:22', status: 'PENDING' },
    { key: 23, id: 23, name: 'Florian Windler', email: 'beulah.abernathy@example.com', phone: '0962378013', updatedAt: '2024-05-09 05:36:22', status: 'SCHEDULED' }, // Ví dụ 1 cái đã xác nhận sẵn
];

const AppointmentTable: React.FC = () => {
    const [data, setData] = useState<IAppointment[]>(initialData);

    // Hàm xử lý khi bấm xác nhận
    const handleConfirm = (recordId: number) => {
        // const newData = data.map((item) => {
        //     if (item.id === recordId) {
        //         return { ...item, status: 'confirmed' as const };
        //     }
        //     return item;
        // });

        // setData(newData);
        message.success(`Đã xác nhận cuộc hẹn ID ${recordId} thành công!`);
    };

    // Cấu hình cột cho bảng
    const getColumns = (currentTab: 'pending' | 'confirmed'): ColumnsType<IAppointment> => [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        { title: 'Địa chỉ email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        {
            title: 'Trạng thái',
            key: 'action',
            render: (_, record) => {
                if (currentTab === 'pending') {
                    return (
                        <Button
                            type="primary"
                            style={{ backgroundColor: '#5bc0de', borderColor: '#46b8da' }}
                            onClick={() => handleConfirm(record.id)}
                        >
                            Chờ xác nhận
                        </Button>
                    );
                } else {
                    return <Tag color="green">Đã xác nhận</Tag>;
                }
            },
        },
        { title: 'Cập nhật', dataIndex: 'updatedAt', key: 'updatedAt' },
    ];

    // Lọc dữ liệu theo trạng thái
    const pendingList = data.filter((item) => item.status === 'PENDING');
    const confirmedList = data.filter((item) => item.status === 'SCHEDULED');

    // Cấu hình các Tab
    const items = [
        {
            key: '1',
            label: `Chưa xác nhận (${pendingList.length})`,
            children: (
                <Table
                    columns={getColumns('pending')}
                    dataSource={pendingList}
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                />
            ),
        },
        {
            key: '2',
            label: `Đã xác nhận (${confirmedList.length})`,
            children: (
                <Table
                    columns={getColumns('confirmed')}
                    dataSource={confirmedList}
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                />
            ),
        },
    ];

    return (
        <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
            <Typography.Title level={3}>Quản lý bệnh nhân đặt lịch</Typography.Title>
            <Card bodyStyle={{ padding: 0 }} bordered={false}>
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    type="card"
                    tabBarStyle={{
                        marginBottom: 0,
                        background: '#fff',
                        borderBottom: '1px solid #f0f0f0'
                    }}

                />
            </Card>
        </div>
    );
};

export default AppointmentTable;