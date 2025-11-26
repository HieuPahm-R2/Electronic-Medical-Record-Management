import { IPatient } from '@/types/backend';
import { Form, Input, Select, Button } from 'antd';

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IPatient | null;
    reloadTable: () => void;
}
const VitalSign = (props: IProps) => {
    return (
        <Form layout="vertical">
            <Form.Item label="Nhiệt độ °C" name="temperature" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Chiều cao (cm)" name="height">
                <Input />
            </Form.Item>
            <Form.Item label="Cân nặng (kg)" name="weight">
                <Input />
            </Form.Item>
            <Form.Item label="Nhịp tim (lần/phút)" name="heart_rate">
                <Input />
            </Form.Item>
            <Form.Item label="Nhóm máu" name="blood_group">
                <Select placeholder="-- chọn nhóm máu --"
                    options={[
                        { value: 'A', label: 'A' },
                        { value: 'B', label: 'B' },
                        { value: 'AB', label: 'AB' },
                        { value: 'O', label: 'O' }
                    ]}
                />


            </Form.Item>
            <Form.Item label="Loại máu" name="blood_type">
                <Select
                    options={[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled', disabled: true }
                    ]}
                />


            </Form.Item>
            <Form.Item label="HA tâm thu (mmHg)" name="sbp" rules={[{ required: true }]}>
                <Input placeholder="triệu chứng" />
            </Form.Item>
            <Form.Item label="HA tâm trương (mmHg)" name="dbp" rules={[{ required: true }]}>
                <Input placeholder="triệu chứng" />
            </Form.Item>
            <Form.Item label="Mạch đập (lần/phút)" name="pulse">
                <Input placeholder="triệu chứng" />
            </Form.Item>
            <Form.Item label="Nhịp thở (lần/phút)" name="breath_rate">
                <Input placeholder="triệu chứng" />
            </Form.Item>
            <Form.Item label="Ghi chú" name="note">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </Form.Item>
            <Form.Item>
                <Button type="primary">Cập nhật</Button>
            </Form.Item>
        </Form>
    )
}

export default VitalSign