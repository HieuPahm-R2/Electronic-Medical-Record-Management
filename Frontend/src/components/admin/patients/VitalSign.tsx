import { callCreateVitalSign, callFetchVitalByMex, callFetchVitalByPatientId, callUpdateVitalSign } from '@/config/api';
import { IMedicalExam, IPatient, IVitalSign } from '@/types/backend';
import { ProForm } from '@ant-design/pro-components';
import { Form, Input, Select, Button, message, notification } from 'antd';
import { useEffect, useState } from 'react';

interface IProps {
    setDataInit: (v: any) => void;
    reloadTable: () => void;
    dataLab?: IMedicalExam | null
}
const VitalSign = (props: IProps) => {
    const { reloadTable, setDataInit, dataLab } = props;
    const [dataUpdateMex, setDataUpdateMex] = useState<IVitalSign>();
    const [initalVal, setInitalVal] = useState<any>();
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchMexs = async () => {
            const res = await callFetchVitalByMex(dataLab?.id as string);
            if (res && res.data) {
                setDataUpdateMex(res.data)
            }
        }
        if (dataLab?.id) {
            fetchMexs()
        }
    }, [dataLab?.id])

    useEffect(() => {
        if (dataUpdateMex?.id) {
            const initialValue = {
                id: dataUpdateMex?.id,
                temperature: dataUpdateMex.temperature,
                height: dataUpdateMex.height,
                weight: dataUpdateMex.weight,
                heart_rate: dataUpdateMex.heart_rate,
                blood_group: dataUpdateMex.blood_group,
                blood_type: dataUpdateMex.blood_type,
                sbp: dataUpdateMex.systolic_bp,
                dbp: dataUpdateMex.diastolic_bp,
                pulse: dataUpdateMex.pulse_rate,
                respiratory_rate: dataUpdateMex.respiratory_rate,
                note: dataUpdateMex.notes,
            }
            setInitalVal(initialValue)
            form.setFieldsValue(initialValue)
        }
    }, [dataUpdateMex, dataLab?.id]);

    const submitUser = async (valuesForm: any) => {
        const { temperature, height, weight, heart_rate, blood_group, blood_type, sbp, dbp, pulse, note, respiratory_rate } = valuesForm
        if (dataUpdateMex?.id) {
            //update
            const bl = {
                id: dataUpdateMex.id,
                temperature: temperature,
                height: height,
                weight: weight,
                heart_rate: heart_rate,
                blood_group: blood_group,
                blood_type: blood_type,
                systolic_bp: sbp,
                diastolic_bp: dbp,
                pulse_rate: pulse,
                respiratory_rate: respiratory_rate,
                notes: note,
                medical_exam_id: {
                    id: dataUpdateMex.medical_exam_id?.id
                }
            }
            const res = await callUpdateVitalSign(bl);
            if (res.data) {
                message.success("Cập nhật thành công");
                handleReset();
                // reload page after a short delay so user sees the success message
                setTimeout(() => {
                    if (typeof window !== 'undefined') {
                        reloadTable?.();
                        window.location.reload();
                    }
                }, 700);
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        } else {
            //create
            const user = { ...valuesForm }
            const res = await callCreateVitalSign(user);
            if (res.data) {
                message.success("Thêm mới thành công");
                handleReset();
                // reload page after a short delay so user sees the success message
                setTimeout(() => {
                    if (typeof window !== 'undefined') {
                        reloadTable?.();
                        window.location.reload();
                    }
                }, 700);
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    const handleReset = async () => {
        form.resetFields();
        setDataInit(null)
    }
    return (
        <ProForm
            form={form}
            initialValues={initalVal}
            layout="vertical"
            submitter={{
                render: (_, dom) => (
                    <Button type="primary" htmlType='submit' icon={<span>＋</span>}>
                        {<>{dataUpdateMex?.id ? "Cập nhật" : "Tạo mới"}</>}
                    </Button>
                ),
            }}
            onFinish={submitUser}
        >
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
                        { value: 'RH', label: 'RH-' },
                        { value: 'RH-', label: 'RH+' },
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
            <Form.Item label="Nhịp thở (lần/phút)" name="respiratory_rate">
                <Input placeholder="triệu chứng" />
            </Form.Item>

            <Form.Item label="Ghi chú" name="note">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </Form.Item>

        </ProForm>
    )
}

export default VitalSign