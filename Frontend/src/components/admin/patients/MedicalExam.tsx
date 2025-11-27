import { IPatient } from "@/types/backend";
import {
    ProForm,
    ProFormDatePicker,
    ProFormDateTimePicker,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormCheckbox,
    ProCard,
} from '@ant-design/pro-components';
import { Row, Col, Typography, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IPatient | null;
    reloadTable: () => void;
}
const { Text } = Typography;
const relatedDiseasesLeft = [
    { id: '01', label: 'Dị ứng', name: 'di_ung' },
    { id: '02', label: 'Ma túy', name: 'ma_tuy' },
    { id: '03', label: 'Rượu bia', name: 'ruou_bia' },
];

const relatedDiseasesRight = [
    { id: '04', label: 'Thuốc lá, thuốc lào', name: 'thuoc_la' },
    { id: '05', label: 'Khác', name: 'khac' },
];
const MedicalExam = () => {
    return (
        <div style={{ padding: 24, background: '#f5f5f5' }}>
            <ProForm
                layout="vertical"
                grid={true} // Bật chế độ Grid
                submitter={{
                    // Tùy chỉnh nút submit
                    render: (props, dom) => {
                        return (
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<PlusOutlined />}
                                style={{
                                    backgroundColor: '#6b5ce7', // Màu tím giống ảnh
                                    borderColor: '#6b5ce7',
                                    marginTop: 16,
                                }}
                            >
                                Cập nhật
                            </Button>
                        );
                    },
                }}
                onFinish={async (values) => {
                    console.log('Form Values:', values);
                }}
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
                <ProFormSelect
                    name="department"
                    label={<span>Khoa tiếp nhận <span style={{ color: 'red' }}>*</span></span>}
                    placeholder="-- Khoa tiếp nhận --"
                    colProps={{ md: 6, xs: 12 }}
                    rules={[{ required: true, message: 'Vui lòng chọn khoa' }]}
                    options={[
                        { label: 'Khoa Cấp Cứu', value: 'cap_cuu' },
                        { label: 'Khoa Nội', value: 'noi' },
                    ]}
                />
                <ProFormSelect
                    name="referralPlace"
                    label="Nơi giới thiệu"
                    placeholder="-- Nơi giới thiệu --"
                    colProps={{ md: 6, xs: 12 }}
                    options={[
                        { label: 'Bệnh viện tuyến dưới', value: 'bv_tuyen_duoi' },
                        { label: 'Tự đến', value: 'tu_den' },
                    ]}
                />

                {/* --- Triệu chứng và Lý do --- */}
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
                    name="daysManifested"
                    label="Số ngày biểu hiện"
                    colProps={{ md: 4, xs: 12 }}
                />
                <Col span={20} />

                {/* --- Hàng 4--- */}
                <ProFormTextArea
                    name="personalHistory"
                    label="Tiền sử bệnh của bản thân"
                    placeholder="Nội dung"
                    colProps={{ md: 12, xs: 24 }}
                    fieldProps={{ rows: 4 }}
                />
                <ProFormTextArea
                    name="familyHistory"
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
                                                <ProFormCheckbox name={`${item.name}_check`} noStyle>
                                                    {item.label}
                                                </ProFormCheckbox>
                                            </Col>
                                            <Col span={12}>
                                                <ProFormText name={`${item.name}_duration`} noStyle />
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
                                                <ProFormCheckbox name={`${item.name}_check`} noStyle>
                                                    {item.label}
                                                </ProFormCheckbox>
                                            </Col>
                                            <Col span={12}>
                                                <ProFormText name={`${item.name}_duration`} noStyle />
                                            </Col>
                                        </Row>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </ProCard>
                </Col>

            </ProForm>
        </div>
    )
}

export default MedicalExam