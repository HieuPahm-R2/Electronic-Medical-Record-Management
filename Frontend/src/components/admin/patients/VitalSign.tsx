import { callCreateVitalSign, callFetchVitalByPatientId, callUpdateVitalSign } from '@/config/api';
import { IPatient, IVitalSign } from '@/types/backend';
import { Form, Input, Select, Button, message, notification } from 'antd';
import { useEffect, useState } from 'react';

interface IProps {
    openModal: boolean;
    setDataInit: (v: any) => void;
    setOpenModal: (v: boolean) => void;
    dataInit?: IPatient | null;
    reloadTable: () => void;
    isReset: boolean;
}
const VitalSign = (props: IProps) => {
    const { openModal, setOpenModal, reloadTable, dataInit, isReset, setDataInit } = props;
    const [dataUpdateMex, setDataUpdateMex] = useState<IVitalSign>();
    const [initalVal, setInitalVal] = useState<any>();
    const [form] = Form.useForm();

    useEffect(() => {
        if (isReset) {
            handleReset()
        }
    }, [isReset]);

    useEffect(() => {
        const fetchMexs = async () => {
            const res = await callFetchVitalByPatientId(dataInit?.id as string);
            if (res && res.data) {
                setDataUpdateMex(res.data)
            }
        }
        console.log(dataInit)
        if (dataInit?.id) {
            fetchMexs()
        }
    }, [dataInit?.id])

    useEffect(() => {
        if (dataUpdateMex?.id) {
            const initialValue = {
                id: dataUpdateMex?.id,
                patient_id: dataInit?.id,
                temperature: dataUpdateMex.temperature,
                height: dataUpdateMex.height,
                weight: dataUpdateMex.weight,
                heart_rate: dataUpdateMex.heart_rate,
                blood_group: dataUpdateMex.blood_group,
                blood_type: dataUpdateMex.blood_type,
                sbp: dataUpdateMex.systolic_bp,
                dbp: dataUpdateMex.diastolic_bp,
                pulse: dataUpdateMex.pulse_rate,
                note: dataUpdateMex.notes,
            }
            setInitalVal(initialValue)
            form.setFieldsValue(initialValue)
        }
    }, [dataUpdateMex, dataInit?.id]);

    const submitUser = async (valuesForm: any) => {
        if (dataUpdateMex?.id) {
            //update
            const bl = {
                id: dataUpdateMex.id,
                temperature: dataUpdateMex.temperature,
                height: dataUpdateMex.height,
                weight: dataUpdateMex.weight,
                heart_rate: dataUpdateMex.heart_rate,
                blood_group: dataUpdateMex.blood_group,
                blood_type: dataUpdateMex.blood_type,
                systolic_bp: dataUpdateMex.systolic_bp,
                diastolic_bp: dataUpdateMex.diastolic_bp,
                pulse_rate: dataUpdateMex.pulse_rate,
                respiratory_rate: dataUpdateMex.respiratory_rate,
                notes: dataUpdateMex.notes,
                patient_id: dataInit?.id,
                medical_exam_id: {
                    id: dataUpdateMex.medical_exam_id?.id
                }
            }
            const res = await callUpdateVitalSign(bl);
            if (res.data) {
                message.success("Cập nhật thành công");
                handleReset();
                reloadTable();
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
                reloadTable();
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
        reloadTable()
        setOpenModal(false);
    }
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