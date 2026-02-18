import { callCreatePrescription, callUpdatePrescription } from "@/config/api";
import { IPrescription, IMedicine } from "@/types/medical";
import { Button, Form, Input, InputNumber, message, Modal, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IPrescription | null;
    setDataInit: (v: IPrescription | null) => void;
    reloadTable: () => void;
}

const PrescriptionModal = (props: IProps) => {
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataInit) {
            form.setFieldsValue(dataInit);
        } else {
            form.resetFields();
        }
    }, [dataInit]);

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setOpenModal(false);
        setDataInit(null);
        form.resetFields();
    };

    const onFinish = async (values: any) => {
        const payload = {
            diagnose: values.diagnose,
            doctor: values.doctor,
            patient: values.patient,
            reExamination: values.reExamination,
            medicines: values.medicines,
        }

        if (dataInit) {
            //update
            const res = await callUpdatePrescription({ ...payload, id: dataInit.id });
            if (+res.statusCode === 200) {
                message.success("Cập nhật đơn thuốc thành công");
                handleCancel();
                reloadTable();
            } else {
                message.error(res.message);
            }
        } else {
            //create
            const res = await callCreatePrescription(payload);
            if (+res.statusCode === 201) {
                message.success("Thêm mới đơn thuốc thành công");
                handleCancel();
                reloadTable();
            } else {
                message.error(res.message);
            }
        }
    };

    return (
        <Modal
            title={dataInit ? "Cập nhật đơn thuốc" : "Thêm mới đơn thuốc"}
            open={openModal}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Row>
                    <Form.Item
                        label="Chẩn đoán"
                        name="diagnose"
                        rules={[{ required: true, message: 'Chẩn đoán là bắt buộc' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Bác sĩ"
                        name="doctor"
                        rules={[{ required: true, message: 'Bác sĩ là bắt buộc' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Bệnh nhân"
                        name="patient"
                        rules={[{ required: true, message: 'Bệnh nhân là bắt buộc' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tái khám sau (ngày)"
                        name="reExamination"
                        rules={[{ required: true, message: 'Ngày tái khám là bắt buộc' }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>
                </Row>
                <Form.List name="medicines">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        rules={[{ required: true, message: 'Tên thuốc là bắt buộc' }]}
                                    >
                                        <Input placeholder="Tên thuốc" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'unit']}
                                        rules={[{ required: true, message: 'Đơn vị là bắt buộc' }]}
                                    >
                                        <Input placeholder="Đơn vị" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'quantity']}
                                        rules={[{ required: true, message: 'Số lượng là bắt buộc' }]}
                                    >
                                        <InputNumber min={1} placeholder="Số lượng" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'usage']}
                                        rules={[{ required: true, message: 'Cách dùng là bắt buộc' }]}
                                    >
                                        <Input placeholder="Cách dùng" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Thêm thuốc
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default PrescriptionModal;
