import { callCreateRadioloy, callFetchRadiologyByMex, callUpdateRadiology, fetchAllClinicalSerives } from '@/config/api';
import { IMedicalExam, IRadiology } from '@/types/backend';
import { ProForm, ProFormSelect, ProFormTextArea } from "@ant-design/pro-components";
import { Button, Row, Col, Form, message, notification, Select, ConfigProvider, Upload } from "antd";
import { useEffect, useState } from 'react';
import { ISelect } from '../user/UserModal';
import { v4 as uuidv4 } from 'uuid';
import enUS from 'antd/lib/locale/en_US';
import { callUploadImage } from '@/config/api.fast';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

interface IProps {
    setDataInit: (v: any) => void;
    reloadTable: () => void;
    dataLab?: IMedicalExam | null
}
const Radiology = (props: IProps) => {
    const { reloadTable, setDataInit, dataLab } = props;
    const [dataLogo, setDataLogo] = useState<any>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
    const [initalVal, setInitalVal] = useState<any>();
    const [clinicalServices, setClinicalServices] = useState<ISelect[]>([]);
    const [dataUpdateBl, setDataUpdateBl] = useState<IRadiology>();

    const [form] = Form.useForm();
    useEffect(() => {
        const fetchBls = async () => {
            const res = await callFetchRadiologyByMex(dataLab?.id as string);
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
                name: dataUpdateBl.image_path,
                status: 'done',
                url: `${import.meta.env.VITE_BACKEND_URL}/storage/radiology/${dataUpdateBl.image_path}`,
            }]
            const initialValue = {
                id: dataUpdateBl?.id,

                imagePath: {
                    fileList: arrThumbnail
                },
                note: dataUpdateBl.conclusion,
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
            const res = await callUploadImage(file, "radiology");
            if (res && res.data) {
                const uploadedFile = {
                    uid: file.uid ?? uuidv4(),
                    name: res.data.fileName,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/storage/radiology/${res.data.fileName}`,
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
        const { serviceName, note, imagePath } = valuesForm;
        if (dataLogo.length === 0) {
            message.error('Vui lòng upload ảnh Logo')
            return;
        }
        if (dataUpdateBl?.id) {
            //update
            const bl = {
                id: dataUpdateBl.id,
                image_path: dataLogo[0].name,
                conclusion: note,
                clinical_service_id: {
                    id: serviceName.value,
                    serviceName: ""
                },
                medical_exam_id: {
                    id: dataUpdateBl.medical_exam_id?.id
                },
            }
            console.log(bl)
            const res = await callUpdateRadiology(bl);
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
                ...valuesForm
            }
            const res = await callCreateRadioloy(user);
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
        <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
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


                <ProFormTextArea
                    name="note"
                    label="Nhận xét"
                    placeholder="Nội dung"
                    fieldProps={{ rows: 6 }}
                />
            </ProForm>
        </div>
    )
}

export default Radiology