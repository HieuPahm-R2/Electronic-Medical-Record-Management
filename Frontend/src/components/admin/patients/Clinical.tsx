import { IPatient } from '@/types/backend';
import { Form, Input, Select } from 'antd';
import React from 'react'

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IPatient | null;
    reloadTable: () => void;
}
const Clinical = (props: IProps) => {
    return (
        <Form layout="vertical">
            <Form.Item label="Chỉ định dịch vụ cận lâm sàng" name="service">
                <Select placeholder="Chọn dịch vụ"></Select>
            </Form.Item>
            <Form.Item label="Chẩn đoán hệ tuần hoàn" name="system_circulatory">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </Form.Item>
            <Form.Item label="Chẩn đoán hệ hô hấp" name="system_respiratory">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </Form.Item>
            <Form.Item label="Chẩn đoán hệ tiêu hóa" name="system_digestive">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </Form.Item>
            <Form.Item label="Chẩn đoán hệ tiết niệu sinh dục" name="system_urinary">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </Form.Item>
            <Form.Item label="Chẩn đoán hệ thần kinh" name="system_nervous">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </Form.Item>
            <Form.Item label="Chẩn đoán hệ cơ xương khớp" name="system_musculoskeletal">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </Form.Item>
            <Form.Item label="Chẩn đoán tai mũi họng" name="system_ent">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </Form.Item>
            <Form.Item label="Chẩn đoán răng hàm mặt" name="system_dental">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </Form.Item>
            <Form.Item label="Chẩn đoán mắt" name="system_eye">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </Form.Item>
            <Form.Item label="Chẩn đoán khác" name="system_other">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </Form.Item>
        </Form>
    )
}

export default Clinical