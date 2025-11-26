import { IBloodTest, IClinicalService, IPatient } from '@/types/backend';
import { ModalForm, ProForm } from '@ant-design/pro-components';
import { Button, Col, Form, Input, message, notification, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { ISelect } from '../user/UserModal';
import { callCreateBloodTest, callFetchBloodTestByPatientId, callUpdateBloodTest, fetchAllClinicalSerives } from '@/config/api';
import { DebounceSelect } from '../user/debounce.select';
import TextArea from 'antd/es/input/TextArea';

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IPatient | null;
    reloadTable: () => void;
}
const fieldsetStyle = {
    border: '1px solid #722ed1', // Màu tím giống hình
    borderRadius: '8px',
    padding: '20px',
    margin: 0,
};

const legendStyle = {
    width: 'auto',
    padding: '0 10px',
    fontSize: '16px',
    color: '#262626', // Màu chữ đậm
    marginBottom: '0',
    borderBottom: 'none' // Override bootstrap nếu có
};
const BloodTest = (props: IProps) => {
    const { openModal, setOpenModal, reloadTable, dataInit } = props;
    const [clinicalServices, setClinicalServices] = useState<ISelect[]>([]);
    const [dataUpdateBl, setDataUpdateBl] = useState<IBloodTest>();

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchBls = async () => {
            const res = await callFetchBloodTestByPatientId(dataInit?.id as string);
            if (res && res.data) {
                setDataUpdateBl(res.data)
            }
        }
        fetchBls();
    }, [])

    useEffect(() => {
        console.log(dataUpdateBl)
        if (dataUpdateBl?.id) {
            const nameCate = Array.isArray(dataUpdateBl?.clinical_services) ? dataUpdateBl.clinical_services.map((item: IClinicalService) => ({
                label: item.serviceName,
                value: item.id
            })) : []
            const initialVal = {
                id: dataUpdateBl?.id,
                comment: dataUpdateBl?.conclusion,
                glu: dataUpdateBl.glucose,
                ure: dataUpdateBl.urea,
                rbc: dataUpdateBl.rbc,
                hb: dataUpdateBl.hb,
                hct: dataUpdateBl.hct,
                mcv: dataUpdateBl.mcv,
                mch: dataUpdateBl.mch,
                wbc: dataUpdateBl.wbc,
                neut: dataUpdateBl.neut,
                bloodGroup: dataUpdateBl.blood_group,
                bloodType: dataUpdateBl.blood_type,
                imagePath: dataUpdateBl.image_url,
                patient_id: dataInit?.id,
                serviceName: nameCate,
                medicalExam: dataUpdateBl.clinical_services,
            }
            form.setFieldsValue(initialVal);
        }
        return () => { form.resetFields() };

    }, [dataUpdateBl]);

    async function fetchList(name: string): Promise<ISelect[]> {
        const res = await fetchAllClinicalSerives(`page=0&size=100&serviceName=/${name}/i`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map(item => {
                return {
                    label: item.serviceName as string,
                    value: item.id as string
                }
            })
            return temp;
        } else return [];
    }

    const submitUser = async (valuesForm: any) => {
        const { serviceName, imagePath, comment, glu, ure, rbc, hb, hct, mcv, mch, wbc, neut, bloodGroup, bloodType } = valuesForm;
        if (dataUpdateBl?.id) {
            //update
            const bl = {
                id: dataUpdateBl.id,
                patient_id: dataInit?.id,
                conclusion: comment,
                glucose: glu,
                urea: ure,
                rbc: rbc,
                hb: hb,
                hct: hct,
                mcv: mcv,
                mch: mch,
                wbc: wbc,
                neut: neut,
                blood_group: bloodGroup,
                blood_type: bloodType,
                image_path: imagePath,
                serviceName: serviceName,
                medicalExam: dataUpdateBl.clinical_services,
            }

            const res = await callUpdateBloodTest(bl);
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
            const user = {
                serviceName, imagePath, comment, glu, ure, rbc, hb, hct, mcv, mch, wbc
            }
            const res = await callCreateBloodTest(user);
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
        setOpenModal(false);
    }
    return (
        <>
            <ModalForm
                title={<>{dataUpdateBl?.id ? "Cập nhật" : "Tạo mới"}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: 900,
                    keyboard: false,
                    maskClosable: false,
                    okText: <>{dataUpdateBl?.id ? "Cập nhật" : "Tạo mới"}</>,
                    cancelText: "Hủy"
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitUser}
                initialValues={dataUpdateBl?.id ? dataUpdateBl : {}}
            >
                <Row gutter={48}>
                    <Col xs={24} lg={12}>
                        <ProForm.Item
                            name="serviceName"
                            label="Dịch vụ cận lâm sàng"
                            rules={[{ required: true, message: 'Vui lòng chọn service!' }]}

                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={clinicalServices}
                                value={clinicalServices}
                                placeholder="Chọn dịch vụ khám"
                                fetchOptions={fetchList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setClinicalServices(newValue as ISelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>


                        <Form.Item
                            label="Đường dẫn kết quả ảnh"
                            name="imagePath"
                            rules={[{ required: true, message: 'Vui lòng nhập đường dẫn ảnh!' }]}
                        >
                            <Input placeholder="Nhập đường dẫn ảnh" />
                        </Form.Item>

                        <Form.Item
                            label="Nhận xét"
                            name="comment"
                            rules={[{ required: true, message: 'Vui lòng nhập nhận xét!' }]}
                        >
                            <TextArea
                                rows={6}
                                placeholder="Nội dung"
                                style={{ resize: 'none' }}
                            />
                        </Form.Item>
                    </Col>

                    {/* === CỘT Kết quả xét nghiệm máu === */}
                    <Col xs={24} lg={12}>
                        <fieldset style={fieldsetStyle}>
                            <legend style={legendStyle}>Nhập kết quả xét nghiệm máu:</legend>

                            <Form.Item label="Đường trong máu (Glu):" name="glu">
                                <Input addonAfter="mmol/l" />
                            </Form.Item>

                            <Form.Item label="Ure máu (Ure):" name="ure">
                                <Input addonAfter="mmol/l" />
                            </Form.Item>

                            <Form.Item label="Số lượng hồng cầu (RBC):" name="rbc">
                                <Input addonAfter="Tera/L" />
                            </Form.Item>

                            <Form.Item label="Lượng huyết sắc tố (Hb):" name="hb">
                                <Input addonAfter="g/L" />
                            </Form.Item>

                            <Form.Item label="Khối hồng cầu (HCT):" name="hct">
                                <Input addonAfter="%" />
                            </Form.Item>

                            <Form.Item label="Thể tích trung bình của hồng cầu (MCV):" name="mcv">
                                <Input addonAfter="fL" />
                            </Form.Item>

                            <Form.Item label="Lượng Hb trung bình hồng cầu (MCH):" name="mch">
                                <Input addonAfter="pg" />
                            </Form.Item>

                            <Form.Item label="Số lượng bạch cầu trong một thể tích máu (WBC):" name="wbc">
                                <Input addonAfter="g/L" />
                            </Form.Item>
                            <Form.Item label="Bạch cầu trung tính (NEUT):" name="neut">
                                <Input addonAfter="g/L" />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Nhóm máu"
                                name="bloodGroup"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Select
                                    // onChange={onChange}
                                    options={[
                                        { value: 'O', label: <span>O</span> },
                                        { value: 'A', label: <span>A</span> },
                                        { value: 'B', label: <span>B</span> },
                                        { value: 'AB', label: <span>AB</span> },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Loại máu"
                                name="bloodType"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Select
                                    // onChange={onChange}
                                    options={[
                                        { value: 'RH-', label: <span>RH-</span> },
                                        { value: 'RH+', label: <span>RH+</span> },
                                    ]}
                                />
                            </Form.Item>
                        </fieldset>
                    </Col>
                </Row>

                <Row justify="end" style={{ marginTop: '20px' }}>
                    <Button type="primary" htmlType="submit" style={{ background: '#722ed1', borderColor: '#722ed1' }}>
                        Lưu kết quả
                    </Button>
                </Row>
            </ModalForm>
        </>
    )
}

export default BloodTest