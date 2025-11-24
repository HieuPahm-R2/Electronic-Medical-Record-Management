import { Col, DatePicker, Form, Input, Row, Select } from 'antd'
import { useEffect } from 'react'

const PatientInfo = (props) => {
    const [form] = Form.useForm()
    const { dataInit } = props

    // useEffect(() => {
    //     form.setFieldsValue(dataInit)
    // }, [dataInit])
    return (
        <>
            <Col sm={24} md={24}>
                <Form
                    form={form}
                    name="basic"
                    // onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={12}>
                        <Col span={8}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Họ tên đầy đủ"
                                name="fullName"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                style={{ borderRadius: "5px" }}
                                label="Ngày sinh"
                                name="dateOfBirth"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <DatePicker
                                // onChange={onChangeDate} needConfirm 
                                />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Email liên hệ"
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Quốc tịch"
                                name="nationality"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Địa chỉ thường trú"
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Số CCCD"
                                name="identityCard"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Số thẻ BHYT"
                                name="insuranceNumber"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="BHYT có giá trị đến ngày"
                                name="insuranceExpired"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <DatePicker
                                //  onChange={onChangeDate} 
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Giới tính"
                                name="gender"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Select
                                    // onChange={onChange}
                                    options={[
                                        { value: 'MALE', label: <span>Nam</span> },
                                        { value: 'FEMALE', label: <span>Nữ</span> },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Nghề nghiệp"
                                name="career"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tên người thân"
                                name="relativeName"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Số điện thoại người thân"
                                name="relativePhone"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Dân tộc"
                                name="ethnicity"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tôn giáo"
                                name="religion"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Col>

        </>
    )
}

export default PatientInfo