import { IMedicalExam, IPatient } from "@/types/backend";
import {
    ProForm,
    ProFormDateTimePicker,
    ProFormText,
    ProFormTextArea,
    ProFormCheckbox,
    ProCard,
} from '@ant-design/pro-components';
import { Row, Col, Typography, Space, Button, Form, message, notification, Select } from 'antd';
import { useEffect, useState } from "react";
import { callCreateMedicalExam, callFetchMexById, callUpdateMedicamExam, getAllDepartments } from "@/config/api";
import { ISelect } from "../user/UserModal";
import Access from "@/components/share/Access";
import { ALL_PERMISSIONS } from "@/constant/permission";
interface IProps {
    setDataInit: (v: any) => void;
    reloadTable: () => void;
    dataLab?: IMedicalExam | null
}
const { Text } = Typography;
const relatedDiseasesLeft = [
    { id: '01', label: 'Dị ứng', name: 'hasAllergy', date: 'allergyMonths' },
    { id: '02', label: 'Ma túy', name: 'usesDrugs', date: 'drugsMonths' },
    { id: '03', label: 'Rượu bia', name: 'usesAlcohol', date: 'alcoholMonths' },
];

const relatedDiseasesRight = [
    { id: '04', label: 'Thuốc lá, thuốc lào', name: 'usesTobacco', date: 'tobaccoMonths' },
    { id: '05', label: 'Khác', name: 'hasOther', date: 'otherMonths' },
];

const MedicalExam = (props: IProps) => {
    const { reloadTable, setDataInit, dataLab } = props;
    const [dataUpdateMex, setDataUpdateMex] = useState<IMedicalExam>();
    const [departments, setDepartments] = useState<ISelect[]>([]);
    const [initalVal, setInitalVal] = useState<any>();
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchMexs = async () => {
            console.log(dataLab)
            const res = await callFetchMexById(dataLab?.id as string);
            console.log(res)
            if (res && res.data) {
                setDataUpdateMex(res.data)
            }
        }
        const fetchAllDepart = async () => {
            const res = await getAllDepartments(`page=0&size=20`);
            console.log(res)
            if (res && res.data) {
                const list = res.data.result;
                const temp = list.map(item => {
                    return {
                        label: item.name as string,
                        value: item.id as string
                    }
                })
                setDepartments(temp)
            }
        }
        fetchAllDepart()
        if (dataLab?.id) {
            fetchMexs()
        }
    }, [dataLab?.id])

    useEffect(() => {
        if (dataUpdateMex?.id) {
            console.log(departments)
            const initialValue = {
                id: dataUpdateMex?.id,
                patient_id: dataLab?.patient,
                arrivalTime: dataUpdateMex.arrivalTime,
                receptionTime: dataUpdateMex.receptionTime,
                referralSource: dataUpdateMex.referralSource,
                symptoms: dataUpdateMex.symptoms,
                reason: dataUpdateMex.reason,
                daysOfSymptoms: dataUpdateMex.daysOfSymptoms,
                hasAllergys: dataUpdateMex.hasAllergy,
                allergyMonths: dataUpdateMex.allergyMonths,
                usesDrugs: dataUpdateMex.usesDrugs,
                drugsMonths: dataUpdateMex.drugsMonths,
                usesAlcohol: dataUpdateMex.usesAlcohol,
                alcoholMonths: dataUpdateMex.alcoholMonths,
                usesTobacco: dataUpdateMex.usesTobacco,
                tobaccoMonths: dataUpdateMex.tobaccoMonths,
                hasOther: dataUpdateMex.hasOther,
                otherMonths: dataUpdateMex.otherMonths,
                otherDescription: dataUpdateMex.otherDescription,
                personalMedicalHistory: dataUpdateMex.personalMedicalHistory,
                familyMedicalHistory: dataUpdateMex.familyMedicalHistory,
                department: departments[0]

            }
            setInitalVal(initialValue)
            form.setFieldsValue(initialValue)

        }
    }, [dataUpdateMex, dataLab?.id]);

    const submitUser = async (valuesForm: any) => {
        if (dataUpdateMex?.id) {
            //update
            const bl = {
                id: dataUpdateMex.id,
                patient: dataUpdateMex?.patient,
                arrivalTime: valuesForm.arrivalTime,
                receptionTime: valuesForm.receptionTime,
                referralSource: valuesForm.referralSource,
                symptoms: valuesForm.symptoms,
                reason: valuesForm.reason,
                daysOfSymptoms: valuesForm.daysOfSymptoms,
                hasAllergys: valuesForm.hasAllergy,
                allergyMonths: valuesForm.allergyMonths,
                usesDrugs: valuesForm.usesDrugs,
                drugsMonths: valuesForm.drugsMonths,
                usesAlcohol: valuesForm.usesAlcohol,
                alcoholMonths: valuesForm.alcoholMonths,
                usesTobacco: valuesForm.usesTobacco,
                tobaccoMonths: valuesForm.tobaccoMonths,
                hasOther: valuesForm.hasOther,
                otherMonths: valuesForm.otherMonths,
                otherDescription: valuesForm.otherDescription,
                personalMedicalHistory: valuesForm.personalMedicalHistory,
                familyMedicalHistory: valuesForm.familyMedicalHistory,
                department: {
                    id: departments[0].value
                }

            }
            const res = await callUpdateMedicamExam(bl);
            if (res.data) {
                message.success("Cập nhật thành công");
                handleReset();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        } else {
            //create
            const user = { ...valuesForm }
            const res = await callCreateMedicalExam(user);
            if (res.data) {
                message.success("Thêm mới thành công");
                handleReset();
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
        setDepartments([])
        window.location.reload();
        reloadTable()
    }
    return (
        <div style={{ padding: 24, background: '#f5f5f5' }}>
            <Access permission={ALL_PERMISSIONS.MEDICAL_EXAMS.UPDATE}>
                <ProForm
                    layout="vertical"
                    grid={true}
                    form={form}
                    initialValues={initalVal}
                    submitter={{
                        render: (_, dom) => (
                            <Button type="primary" htmlType='submit' icon={<span>＋</span>}>
                                {<>{dataUpdateMex?.id ? "Cập nhật" : "Tạo mới"}</>}
                            </Button>
                        ),
                    }}
                    onFinish={submitUser}

                >
                    <ProFormDateTimePicker
                        placeholder="-- thời gian đến --"
                        name="arrivalTime"
                        label={<span>Thời gian đến <span style={{ color: 'red' }}>*</span></span>}
                        colProps={{ md: 6, xs: 12 }}
                        rules={[{ required: true, message: 'Vui lòng chọn thời gian đến' }]}
                    />
                    <ProFormDateTimePicker
                        name="receptionTime"
                        label={<span>Thời gian tiếp nhận <span style={{ color: 'red' }}>*</span></span>}
                        colProps={{ md: 6, xs: 12 }}
                        rules={[{ required: true, message: 'Vui lòng chọn thời gian tiếp nhận' }]}
                    />
                    <ProForm.Item
                        name="department"
                        colProps={{ md: 6, xs: 12 }}
                        label={<span>Khoa tiếp nhận <span style={{ color: 'red' }}>*</span></span>}
                        rules={[{ required: true, message: 'Vui lòng chọn khoa' }]}
                    >
                        <Select
                            defaultValue={null}
                            showSearch
                            allowClear
                            placeholder="-- Khoa tiếp nhận --"
                            options={departments}
                        />
                    </ProForm.Item>

                    <ProFormText
                        name="referralSource"
                        label="Nơi giới thiệu"
                        placeholder="-- Nơi giới thiệu --"
                        colProps={{ md: 6, xs: 12 }}
                    />

                    <ProFormText
                        name="symptoms"
                        label="Triệu chứng"
                        placeholder="triệu chứng"
                        colProps={{ md: 12, xs: 24 }}
                    />
                    <ProFormText
                        name="reason"
                        label={<span>Lý do <span style={{ color: 'red' }}>*</span></span>}
                        placeholder="Lý do"
                        colProps={{ md: 12, xs: 24 }}
                        rules={[{ required: true, message: 'Vui lòng nhập lý do' }]}
                    />

                    {/* --- Hàng 3 --- */}
                    <ProFormText
                        name="daysOfSymptoms"
                        label="Số ngày biểu hiện"
                        placeholder="12 ngày..."
                        colProps={{ md: 4, xs: 12 }}
                    />
                    <Col span={20} />

                    {/* --- Hàng 4--- */}
                    <ProFormTextArea
                        name="personalMedicalHistory"
                        label="Tiền sử bệnh của bản thân"
                        placeholder="Nội dung"
                        colProps={{ md: 12, xs: 24 }}
                        fieldProps={{ rows: 4 }}
                    />
                    <ProFormTextArea
                        name="familyMedicalHistory"
                        label="Tiền sử bệnh của gia đình"
                        placeholder="Nội dung"
                        colProps={{ md: 12, xs: 24 }}
                        fieldProps={{ rows: 4 }}
                    />

                    {/* --- Phần bảng đặc điểm liên quan bệnh (Custom UI) --- */}
                    <Col span={24}>
                        <ProCard
                            title="Đặc điểm liên quan bệnh"
                            headerBordered
                            bordered
                            style={{ marginTop: 16 }}
                            bodyStyle={{ padding: 0 }}
                        >
                            <Row>
                                {/* Cột Trái */}
                                <Col span={12} style={{ borderRight: '1px solid #f0f0f0' }}>
                                    <Row style={{ background: '#fafafa', padding: '8px 16px', borderBottom: '1px solid #f0f0f0' }}>
                                        <Col span={2}><Text strong>TT</Text></Col>
                                        <Col span={10}><Text strong>Ký hiệu</Text></Col>
                                        <Col span={12}><Text strong>Thời gian tính theo tháng</Text></Col>
                                    </Row>
                                    <div style={{ padding: '8px 16px' }}>
                                        {relatedDiseasesLeft.map((item) => (
                                            <Row key={item.id} gutter={16} style={{ marginBottom: 12, alignItems: 'center' }}>
                                                <Col span={2}>{item.id}</Col>
                                                <Col span={10}>
                                                    <ProFormCheckbox name={`${item.name}`} noStyle>
                                                        {item.label}
                                                    </ProFormCheckbox>
                                                </Col>
                                                <Col span={12}>
                                                    <ProFormText name={`${item.date}`} noStyle />
                                                </Col>
                                            </Row>
                                        ))}
                                    </div>
                                </Col>

                                {/* Cột Phải */}
                                <Col span={12}>
                                    <Row style={{ background: '#fafafa', padding: '8px 16px', borderBottom: '1px solid #f0f0f0' }}>
                                        <Col span={2}><Text strong>TT</Text></Col>
                                        <Col span={10}><Text strong>Ký hiệu</Text></Col>
                                        <Col span={12}><Text strong>Thời gian tính theo tháng</Text></Col>
                                    </Row>
                                    <div style={{ padding: '8px 16px' }}>
                                        {relatedDiseasesRight.map((item) => (
                                            <Row key={item.id} gutter={16} style={{ marginBottom: 12, alignItems: 'center' }}>
                                                <Col span={2}>{item.id}</Col>
                                                <Col span={10}>
                                                    <ProFormCheckbox name={`${item.name}`} noStyle>
                                                        {item.label}
                                                    </ProFormCheckbox>
                                                </Col>

                                                <Col span={12}>
                                                    <ProFormText name={`${item.date}`} noStyle />
                                                </Col>
                                            </Row>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </ProCard>
                    </Col>

                </ProForm>
            </Access>

        </div>
    )
}

export default MedicalExam