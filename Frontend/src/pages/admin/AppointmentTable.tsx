import React, { useEffect, useState } from 'react';
import { Table, Tabs, Button, Card, Tag, message, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IAppointment } from '@/types/backend';
import { callUpdateAppointment, getAllAppointments } from '@/config/api';


const AppointmentTable: React.FC = () => {
    const [data, setData] = useState<IAppointment[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        refetchData()
    }, [current, pageSize])
    const refetchData = async () => {
        setIsLoading(true);
        let queryString = `current=${current}&pageSize=${pageSize}`;
        const res = await getAllAppointments(queryString);
        if (res && res.data) {
            setData(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    }
    const onChange = (pagination: any, filters: any, sorter: any) => {
        if (pagination.current !== current && pagination) {
            setCurrent(pagination.current);
        }
        if (pagination.pageSize !== pageSize && pagination) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }

    }
    // Hàm xử lý khi bấm xác nhận
    const handleConfirm = async (recordId: string | undefined) => {
        const newData = data?.map((item) => {
            if (item.id === recordId) {
                return { ...item, status: 'SCHEDULED' as const };
            }
            return item;
        });

        if (newData) {
            const updatedRecord = newData.find((item) => item.id === recordId);
            if (updatedRecord) {
                await callUpdateAppointment(updatedRecord);
            }
        }
        refetchData()
        message.success(`Đã xác nhận cuộc hẹn ID ${recordId} thành công!`);
    };

    // Cấu hình cột cho bảng
    const getColumns = (currentTab: 'pending' | 'confirmed'): ColumnsType<IAppointment> => [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
        { title: 'Tên', dataIndex: 'fullName', key: 'name' },
        { title: 'Địa chỉ email', dataIndex: 'contact', key: 'email' },
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
    const pendingList = data?.filter((item) => item.status === 'PENDING');
    const confirmedList = data?.filter((item) => item.status === 'SCHEDULED');

    // Cấu hình các Tab
    const items = [
        {
            key: '1',
            label: `Chưa xác nhận (${pendingList?.length})`,
            children: (
                <Table
                    columns={getColumns('pending')}
                    dataSource={pendingList}
                    onChange={onChange}
                    pagination={{
                        current: current,
                        pageSize: pageSize,
                        total: total,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        showSizeChanger: true
                    }}
                    rowKey="id"
                />
            ),
        },
        {
            key: '2',
            label: `Đã xác nhận (${confirmedList?.length})`,
            children: (
                <Table
                    columns={getColumns('confirmed')}
                    dataSource={confirmedList}
                    pagination={{
                        current: current,
                        pageSize: pageSize,
                        total: total,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        showSizeChanger: true
                    }}
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