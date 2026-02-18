import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, message, notification, DatePicker, Row, Col, Button, Space } from "antd";
import { callCreatePayment, callUpdatePayment, callFetchPatient } from "@/config/api";
import { IPayment, IPatient, IModelPaginate } from "@/types/backend";
import dayjs from "dayjs";
import queryString from "query-string";

interface PaymentModalProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    reloadTable: () => void;
    dataInit: IPayment | null;
    setDataInit: (value: IPayment | null) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    openModal,
    setOpenModal,
    reloadTable,
    dataInit,
    setDataInit,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);
    const [patients, setPatients] = React.useState<IPatient[]>([]);
    const [fetchingPatients, setFetchingPatients] = React.useState(false);

    // Tính tổng tiền
    const handleCalculateTotal = () => {
        const examinationFee = form.getFieldValue("examinationFee") || 0;
        const treatmentFee = form.getFieldValue("treatmentFee") || 0;
        const laboratoryFee = form.getFieldValue("laboratoryFee") || 0;
        const radiologyFee = form.getFieldValue("radiologyFee") || 0;
        const medicineCharge = form.getFieldValue("medicineCharge") || 0;
        const serviceCharge = form.getFieldValue("serviceCharge") || 0;
        const otherCharge = form.getFieldValue("otherCharge") || 0;
        const discount = form.getFieldValue("discount") || 0;

        const total =
            examinationFee +
            treatmentFee +
            laboratoryFee +
            radiologyFee +
            medicineCharge +
            serviceCharge +
            otherCharge -
            discount;

        form.setFieldValue("totalAmount", Math.max(0, total));

        // Cập nhật số tiền còn lại
        const amountPaid = form.getFieldValue("amountPaid") || 0;
        const remaining = Math.max(0, total - amountPaid);
        form.setFieldValue("remainingAmount", remaining);

        // Cập nhật trạng thái thanh toán
        if (remaining === 0) {
            form.setFieldValue("paymentStatus", "PAID");
        } else if (amountPaid > 0) {
            form.setFieldValue("paymentStatus", "PARTIAL");
        } else {
            form.setFieldValue("paymentStatus", "UNPAID");
        }
    };

    const onFinish = async (values: any) => {
        try {
            setLoading(true);

            // Tính toán lại để chắc chắn các giá trị đúng
            const totalAmount = values.totalAmount || 0;
            const amountPaid = values.amountPaid || 0;
            const remainingAmount = Math.max(0, totalAmount - amountPaid);

            const paymentData: IPayment = {
                ...values,
                totalAmount,
                amountPaid,
                remainingAmount,
                invoiceDate: values.invoiceDate ? values.invoiceDate.format("YYYY-MM-DD") : undefined,
                paymentDate: values.paymentDate ? values.paymentDate.format("YYYY-MM-DD") : undefined,
            };

            if (dataInit?.id) {
                const res = await callUpdatePayment({ ...paymentData, id: dataInit.id });
                if (+res.statusCode === 200) {
                    message.success("Cập nhật hóa đơn thành công");
                    form.resetFields();
                    setDataInit(null);
                    setOpenModal(false);
                    reloadTable();
                } else {
                    notification.error({
                        message: "Có lỗi xảy ra",
                        description: res.message,
                    });
                }
            } else {
                const res = await callCreatePayment(paymentData);
                if (+res.statusCode === 201 || +res.statusCode === 200) {
                    message.success("Tạo hóa đơn thành công");
                    form.resetFields();
                    setDataInit(null);
                    setOpenModal(false);
                    reloadTable();
                } else {
                    notification.error({
                        message: "Có lỗi xảy ra",
                        description: res.message,
                    });
                }
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadPatients = async (search: string = "") => {
        try {
            setFetchingPatients(true);
            const query = queryString.stringify({
                page: 0,
                size: 100,
                filter: search ? `fullName like '%${search}%' or patientCode like '%${search}%'` : "",
            });
            const res = await callFetchPatient(query);
            if (res.data) {
                const data = res.data as unknown as IModelPaginate<IPatient>;
                setPatients(data.result);
            }
        } catch (error) {
            console.error("Error loading patients:", error);
        } finally {
            setFetchingPatients(false);
        }
    };

    useEffect(() => {
        loadPatients();
    }, []);

    useEffect(() => {
        if (dataInit) {
            form.setFieldsValue({
                invoiceNumber: dataInit.invoiceNumber,
                patientCode: dataInit.patientCode || dataInit.patientId,
                patientName: dataInit.patientName,
                invoiceDate: dataInit.invoiceDate ? dayjs(dataInit.invoiceDate) : undefined,
                examinationFee: dataInit.examinationFee || 0,
                treatmentFee: dataInit.treatmentFee || 0,
                laboratoryFee: dataInit.laboratoryFee || 0,
                radiologyFee: dataInit.radiologyFee || 0,
                medicineCharge: dataInit.medicineCharge || 0,
                serviceCharge: dataInit.serviceCharge || 0,
                otherCharge: dataInit.otherCharge || 0,
                discount: dataInit.discount || 0,
                discountReason: dataInit.discountReason,
                totalAmount: dataInit.totalAmount || 0,
                amountPaid: dataInit.amountPaid || 0,
                remainingAmount: dataInit.remainingAmount || 0,
                paymentStatus: dataInit.paymentStatus || "UNPAID",
                paymentMethod: dataInit.paymentMethod,
                paymentDate: dataInit.paymentDate ? dayjs(dataInit.paymentDate) : undefined,
                notes: dataInit.notes,
            });
        } else {
            form.resetFields();
        }
    }, [dataInit, openModal, form]);

    return (
        <Modal
            title={dataInit ? "Cập nhật hóa đơn" : "Tạo hóa đơn mới"}
            open={openModal}
            onOk={() => form.submit()}
            onCancel={() => {
                setOpenModal(false);
                setDataInit(null);
                form.resetFields();
            }}
            width={1000}
            loading={loading}
            okText={dataInit ? "Cập nhật" : "Tạo mới"}
            cancelText="Hủy"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onValuesChange={() => {
                    setTimeout(() => handleCalculateTotal(), 0);
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Mã hóa đơn"
                            name="invoiceNumber"
                            rules={[{ required: true, message: "Vui lòng nhập mã hóa đơn" }]}
                        >
                            <Input placeholder="VD: INV-001" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Chọn bệnh nhân"
                            name="patientCode"
                            rules={[{ required: true, message: "Vui lòng chọn bệnh nhân" }]}
                        >
                            <Select
                                placeholder="Tìm kiếm theo mã hoặc tên bệnh nhân"
                                loading={fetchingPatients}
                                onSearch={loadPatients}
                                filterOption={false}
                                options={patients.map((patient) => ({
                                    value: patient.patientCode,
                                    label: `${patient.patientCode} - ${patient.fullName}`,
                                }))}
                                onChange={(value) => {
                                    const selectedPatient = patients.find((p) => p.patientCode === value);
                                    if (selectedPatient) {
                                        form.setFieldValue("patientName", selectedPatient.fullName);
                                    }
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Tên bệnh nhân" name="patientName">
                            <Input placeholder="Tên bệnh nhân" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Ngày hóa đơn" name="invoiceDate">
                            <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày" />
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ borderTop: "1px solid #f0f0f0", marginTop: 20, paddingTop: 20 }}>
                    <h4 style={{ marginBottom: 16, fontWeight: "bold" }}>Chi tiết chi phí</h4>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Phí khám" name="examinationFee" initialValue={0}>
                                <InputNumber
                                    min={0}
                                    placeholder="0"
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Phí điều trị" name="treatmentFee" initialValue={0}>
                                <InputNumber min={0} placeholder="0" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Phí xét nghiệm" name="laboratoryFee" initialValue={0}>
                                <InputNumber min={0} placeholder="0" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Phí chẩn đoán hình ảnh" name="radiologyFee" initialValue={0}>
                                <InputNumber min={0} placeholder="0" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Phí dược" name="medicineCharge" initialValue={0}>
                                <InputNumber min={0} placeholder="0" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Phí dịch vụ" name="serviceCharge" initialValue={0}>
                                <InputNumber min={0} placeholder="0" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Phí khác" name="otherCharge" initialValue={0}>
                                <InputNumber min={0} placeholder="0" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Chiết khấu" name="discount" initialValue={0}>
                                <InputNumber min={0} placeholder="0" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Lý do chiết khấu" name="discountReason">
                                <Input placeholder="Lý do (nếu có)" />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>

                <div style={{ borderTop: "1px solid #f0f0f0", marginTop: 20, paddingTop: 20 }}>
                    <h4 style={{ marginBottom: 16, fontWeight: "bold" }}>Thông tin thanh toán</h4>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Tổng tiền" name="totalAmount" initialValue={0}>
                                <InputNumber disabled min={0} placeholder="0" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Đã thanh toán" name="amountPaid" initialValue={0}>
                                <InputNumber min={0} placeholder="0" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Còn lại" name="remainingAmount" initialValue={0}>
                                <InputNumber disabled min={0} placeholder="0" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                                label="Trạng thái thanh toán"
                                name="paymentStatus"
                                initialValue="UNPAID"
                            >
                                <Select
                                    options={[
                                        { value: "UNPAID", label: "Chưa thanh toán" },
                                        { value: "PARTIAL", label: "Thanh toán một phần" },
                                        { value: "PAID", label: "Đã thanh toán" },
                                        { value: "CANCELLED", label: "Đã hủy" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Phương thức thanh toán" name="paymentMethod">
                                <Select
                                    placeholder="Chọn phương thức"
                                    options={[
                                        { value: "CASH", label: "Tiền mặt" },
                                        { value: "BANK", label: "Chuyển khoản" },
                                        { value: "INSURANCE", label: "Bảo hiểm" },
                                        { value: "OTHER", label: "Khác" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item label="Ngày thanh toán" name="paymentDate">
                                <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày" />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>

                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <Form.Item label="Ghi chú" name="notes">
                            <Input.TextArea rows={3} placeholder="Ghi chú thêm (nếu có)" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default PaymentModal;
