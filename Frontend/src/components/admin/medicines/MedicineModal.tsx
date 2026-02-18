import { callCreateMedicine, callUpdateMedicine } from "@/config/api";
import { IMedicine } from "@/types/medicine";
import { Button, DatePicker, Form, Input, InputNumber, message, Modal, Row } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IMedicine | null;
    setDataInit: (v: IMedicine | null) => void;
    reloadTable: () => void;
}

const MedicineModal = (props: IProps) => {
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataInit) {
            form.setFieldsValue({
                ...dataInit,
                expiredAt: dayjs(dataInit.expiredAt),
            });
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
            ...values,
            expiredAt: dayjs(values.expiredAt).toISOString(),
        }

        if (dataInit) {
            //update
            const res = await callUpdateMedicine({ ...payload, id: dataInit.id });
            if (+res.statusCode === 200) {
                message.success("Cập nhật thuốc thành công");
                handleCancel();
                reloadTable();
            } else {
                message.error(res.message);
            }
        } else {
            //create
            const res = await callCreateMedicine(payload);
            if (+res.statusCode === 201) {
                message.success("Thêm mới thuốc thành công");
                handleCancel();
                reloadTable();
            } else {
                message.error(res.message);
            }
        }
    };

    return (
        <Modal
            title={dataInit ? "Cập nhật thuốc" : "Thêm mới thuốc"}
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
                <Row justify="space-between">
                    <Form.Item
                        label="Tên thuốc"
                        name="name"
                        rules={[{ required: true, message: 'Tên thuốc là bắt buộc' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mã thuốc"
                        name="code"
                        rules={[{ required: true, message: 'Mã thuốc là bắt buộc' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: 'Số lượng là bắt buộc' }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item
                        label="Đơn vị"
                        name="unit"
                        rules={[{ required: true, message: 'Đơn vị là bắt buộc' }]}
                    >
                        <Input />
                    </Form.Item>

                </Row>
                <Row justify="space-between">
                    <Form.Item
                        label="Nhà cung cấp"
                        name="supplier"
                        rules={[{ required: true, message: 'Nhà cung cấp là bắt buộc' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giá nhập"
                        name="importPrice"
                        rules={[{ required: true, message: 'Giá nhập là bắt buộc' }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                        label="Giá bán"
                        name="exportPrice"
                        rules={[{ required: true, message: 'Giá bán là bắt buộc' }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                        label="Ngày hết hạn"
                        name="expiredAt"
                        rules={[{ required: true, message: 'Ngày hết hạn là bắt buộc' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                </Row>
            </Form>
        </Modal>
    );
};

export default MedicineModal;
