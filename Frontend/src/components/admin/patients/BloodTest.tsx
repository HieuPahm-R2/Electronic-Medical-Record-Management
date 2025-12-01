import { IBloodTest, IClinicalService, IMedicalExam, IPatient } from '@/types/backend';
import { ProForm } from '@ant-design/pro-components';
import { Upload, ConfigProvider, Modal } from 'antd';
import { Button, Col, Form, Input, message, notification, Row, Select } from 'antd';
import { useEffect, useState } from 'react'

export interface ISelect {
    label: string;
    value: string;
    key?: string;
}
import { callCreateBloodTest, callFetchBloodTestByMex, callFetchBloodTestByPatientId, callUpdateBloodTest, fetchAllClinicalSerives } from '@/config/api';
import TextArea from 'antd/es/input/TextArea';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { callUploadImage } from '@/config/api.fast';
import { v4 as uuidv4 } from 'uuid';
import enUS from 'antd/lib/locale/en_US';

interface IProps {
    setDataInit: (v: any) => void;
    reloadTable: () => void;
    dataLab?: IMedicalExam | null
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
    const [dataLogo, setDataLogo] = useState<any>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
    const { reloadTable, setDataInit, dataLab } = props;
    const [clinicalServices, setClinicalServices] = useState<ISelect[]>([]);
    const [dataUpdateBl, setDataUpdateBl] = useState<IBloodTest>();
    const [initalVal, setInitalVal] = useState<any>();

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchBls = async () => {
            const res = await callFetchBloodTestByMex(dataLab?.id as string);
            if (res && res.data) {
                setDataUpdateBl(res.data)
            }
        }
        async function fetchList(name?: string) {
            const res = await fetchAllClinicalSerives(`page=0&size=100&serviceName=/${name}/i`);
            if (res && res.data) {
                const list = res.data.result;
                const temp = list.map(item => {
                    return {
                        label: item.serviceName as string,
                        value: item.id as string
                    }
                })
                setClinicalServices(temp)
            } else setClinicalServices([])
        }
        fetchList()
        if (dataLab?.id) {
            fetchBls();
        }

    }, [dataLab?.id])

    useEffect(() => {
        if (dataUpdateBl?.id) {
            const arrThumbnail = [{
                uid: uuidv4(),
                name: dataUpdateBl.image_url,
                status: 'done',
                url: `${import.meta.env.VITE_BACKEND_URL}/storage/blood-test/${dataUpdateBl.image_url}`,
            }]

            const initialValue = {
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
                imagePath: {
                    fileList: arrThumbnail
                },
                serviceName: clinicalServices[0],
                medicalExam: dataUpdateBl?.medical_exam_id?.id,
            }
            // Cập nhật State cho DebounceSelect để đồng bộ
            setDataLogo(arrThumbnail);
            console.log(initialValue)
            setInitalVal(initialValue)
            form.setFieldsValue(initialValue)
        }
        return () => { form.resetFields() };
    }, [dataUpdateBl, dataLab?.id]);

    const handleRemoveFile = () => {
        setDataLogo([]);
        form.setFieldsValue({ imagePath: undefined });
        return true;
    }

    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const handlePreview = async (file: any) => {
        if (!file.originFileObj) {
            setPreviewImage(file.url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
            return;
        }
        getBase64(file.originFileObj, (url: string) => {
            setPreviewImage(url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        });
    };
    const getBase64 = (img: any, callback: any) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoadingUpload(true);
        }
        if (info.file.status === 'done' || info.file.status === 'removed') {
            setLoadingUpload(false);
        }
        if (info.file.status === 'error') {
            setLoadingUpload(false);
            message.error(info?.file?.error?.event?.message ?? "Đã có lỗi xảy ra khi upload file.")
        }
        if (info.file.status === 'removed') {
            setDataLogo([]);
        }
    };

    const handleUploadFileLogo = async ({ file, onSuccess, onError }: any) => {
        try {
            setLoadingUpload(true);
            const res = await callUploadImage(file, "blood-test");
            if (res && res.data) {
                const uploadedFile = {
                    uid: file.uid ?? uuidv4(),
                    name: res.data.fileName,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/storage/blood-test/${res.data.fileName}`,
                };
                setDataLogo([uploadedFile]);
                onSuccess?.(res.data);
                message.success("Tải ảnh thành công");
            } else {
                throw new Error(res?.message || "Lỗi tải ảnh!");
            }
        } catch (error) {
            onError?.(error);
            message.error("Đã có lỗi xảy ra khi upload file.");
        } finally {
            setLoadingUpload(false);
        }
    };
    const handleReset = async () => {
        form.resetFields();
        setClinicalServices([])
        setDataInit(null)
        window.location.reload();
    }
    const submitUser = async (valuesForm: any) => {
        const { serviceName, imagePath, comment, glu, ure, rbc, hb, hct, mcv, mch, wbc, neut, bloodGroup, bloodType } = valuesForm;
        if (dataLogo.length === 0) {
            message.error('Vui lòng upload ảnh Logo')
            return;
        }
        if (dataUpdateBl?.id) {
            //update
            const bl = {
                id: dataUpdateBl.id,
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
                image_url: dataLogo[0].name,
                clinical_services: {
                    id: serviceName.value,
                    serviceName: ""
                },
                medical_exam_id: {
                    id: dataUpdateBl.medical_exam_id?.id
                },
            }
            console.log(bl)
            const res = await callUpdateBloodTest(bl);
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


    return (
        <>
            <ProForm
                form={form}
                initialValues={initalVal}
                layout="vertical"
                submitter={{
                    render: (_, dom) => (
                        <Button type="primary" htmlType='submit' icon={<span>＋</span>}>
                            {<>{dataUpdateBl?.id ? "Cập nhật" : "Tạo mới"}</>}
                        </Button>
                    ),
                }}
                onFinish={submitUser}
            >
                <Row gutter={48}>
                    <Col xs={24} lg={12}>
                        <ProForm.Item
                            name="serviceName"
                            label="Dịch vụ cận lâm sàng"
                            rules={[{ required: true, message: 'Vui lòng chọn service!' }]}
                        >
                            <Select
                                defaultValue={null}
                                showSearch
                                allowClear
                                options={clinicalServices}
                            />
                        </ProForm.Item>


                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Ảnh kết quả xét nghiệm"
                            name="imagePath"
                        >
                            <ConfigProvider locale={enUS}>
                                <Upload
                                    name="imagePath"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                    customRequest={handleUploadFileLogo}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    onRemove={handleRemoveFile}
                                    onPreview={handlePreview}
                                    fileList={dataLogo}
                                >
                                    <div>
                                        {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </ConfigProvider>
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
                                    defaultValue={null}
                                    showSearch
                                    allowClear
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
                                    defaultValue={null}
                                    showSearch
                                    allowClear
                                    options={[
                                        { value: 'RH-', label: <span>RH-</span> },
                                        { value: 'RH+', label: <span>RH+</span> },
                                    ]}
                                />
                            </Form.Item>
                        </fieldset>
                    </Col>
                </Row>
                <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={() => setPreviewOpen(false)}
                    style={{ zIndex: 1500 }}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </ProForm>
        </>
    )
}

export default BloodTest