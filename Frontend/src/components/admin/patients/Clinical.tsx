import { callCreateClinicalInfo, callFetchClinicalInfoByMex, callUpdateClinicalInfo, fetchAllClinicalSerives } from '@/config/api';
import { IClinicalInfo, IMedicalExam, IPatient } from '@/types/backend';
import { Button, Form, Input, message, notification, Select } from 'antd';
import { useEffect, useState } from 'react';
import { ISelect } from './BloodTest';
import { ProForm } from '@ant-design/pro-components';

interface IProps {
    setDataInit: (v: any) => void;
    reloadTable: () => void;
    dataLab?: IMedicalExam | null
}
const Clinical = (props: IProps) => {
    const { reloadTable, setDataInit, dataLab } = props;
    const [dataUpdateBl, setDataUpdateBl] = useState<IClinicalInfo>();
    const [clinicalServices, setClinicalServices] = useState<ISelect[]>([]);
    const [initalVal, setInitalVal] = useState<any>();

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchBls = async () => {
            const res = await callFetchClinicalInfoByMex(dataLab?.id as string);
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
            const nameCate = dataUpdateBl?.clinical_services?.map((item) => ({
                label: item.serviceName,
                value: item.id
            })) ?? []
            const initialValue = {
                id: dataUpdateBl?.id,
                circulatory: dataUpdateBl.circulatory_diagnosis,
                respiratory: dataUpdateBl.circulatory_diagnosis,
                urinary: dataUpdateBl.genitourinary_diagnosis,
                musculoskeletal: dataUpdateBl.bone_diagnosis,
                digestive: dataUpdateBl.digestive_diagnosis,
                nervous: dataUpdateBl.nervous_diagnosis,
                ent: dataUpdateBl.ent_diagnosis,
                other: dataUpdateBl.other_diagnoses,
                syndrome: dataUpdateBl.syndrome,
                serviceName: nameCate,
            }
            console.log(initialValue)
            setInitalVal(initialValue)
            form.setFieldsValue(initialValue)
        }
        return () => { form.resetFields() };
    }, [dataUpdateBl, dataLab?.id]);
    const handleReset = async () => {
        form.resetFields();
        setClinicalServices([])
        setDataInit(null)
    }
    const submitUser = async (valuesForm: any) => {
        const { serviceName, circulatory, respiratory, digestive, urinary, nervous, musculoskeletal, ent, syndrome, other } = valuesForm;

        if (dataUpdateBl?.id) {
            //update
            const bl = {
                id: dataUpdateBl.id,
                circulatory_diagnosis: circulatory,
                respiratory_diagnosis: respiratory,
                genitourinary_diagnosis: urinary,
                bone_diagnosis: musculoskeletal,
                digestive_diagnosis: digestive,
                nervous_diagnosis: nervous,
                ent_diagnosis: ent,
                other_diagnoses: other,
                syndrome: syndrome,
                clinical_services: serviceName,
                medical_exam_id: dataUpdateBl.medical_exam_id
            }
            console.log(bl)
            const res = await callUpdateClinicalInfo(bl);
            if (res.data) {
                message.success("Cập nhật thành công");
                handleReset();
                // reload page after a short delay so user sees the success message
                setTimeout(() => {
                    if (typeof window !== 'undefined') {
                        reloadTable?.();
                        window.location.reload();
                    }
                }, 700);
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
            const res = await callCreateClinicalInfo(user);
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
                    mode="multiple"
                    defaultValue={null}
                    showSearch
                    allowClear
                    options={clinicalServices}
                />
            </ProForm.Item>
            <ProForm.Item label="Chẩn đoán hệ tuần hoàn" name="circulatory">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </ProForm.Item>
            <ProForm.Item label="Chẩn đoán hệ hô hấp" name="respiratory">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </ProForm.Item>
            <ProForm.Item label="Chẩn đoán hệ tiêu hóa" name="digestive">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </ProForm.Item>
            <ProForm.Item label="Chẩn đoán hệ tiết niệu sinh dục" name="urinary">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </ProForm.Item>
            <ProForm.Item label="Chẩn đoán hệ thần kinh" name="nervous">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </ProForm.Item>
            <ProForm.Item label="Chẩn đoán hệ cơ xương khớp" name="musculoskeletal">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </ProForm.Item>
            <ProForm.Item label="Chẩn đoán tai mũi họng" name="ent">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </ProForm.Item>
            <ProForm.Item label="Hội chứng" name="syndrome">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </ProForm.Item>
            <ProForm.Item label="Chẩn đoán khác" name="other">
                <Input.TextArea rows={3} placeholder="Nội dung" />
            </ProForm.Item>
        </ProForm>
    )
}

export default Clinical