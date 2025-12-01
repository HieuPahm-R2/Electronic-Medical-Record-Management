import { callCreateDiagnose, callFetchDiagnoseByMex, callUpdateDiagnose } from "@/config/api";
import { IDiagnose, IMedicalExam } from "@/types/backend";
import { ProForm, ProFormSelect, ProFormTextArea } from "@ant-design/pro-components";
import { Button, Row, Col, Form, message, notification } from "antd";
import { useEffect, useState } from "react";

interface IProps {
    setDataInit: (v: any) => void;
    reloadTable: () => void;
    dataLab?: IMedicalExam | null
}

export const Diagnose = (props: IProps) => {
    const { reloadTable, setDataInit, dataLab } = props;
    const [dataUpdateBl, setDataUpdateBl] = useState<IDiagnose>();
    const [initalVal, setInitalVal] = useState<any>();

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchBls = async () => {
            const res = await callFetchDiagnoseByMex(dataLab?.id as string);
            if (res && res.data) {
                setDataUpdateBl(res.data)
            }
        }
        if (dataLab?.id) {
            fetchBls();
        }
    }, [dataLab?.id])

    useEffect(() => {
        if (dataUpdateBl?.id) {
            const initialValue = {
                id: dataUpdateBl?.id,
                mainDease: dataUpdateBl.main_disease,
                subDisease: dataUpdateBl.comorbidity,
                diagnosis: dataUpdateBl.conclusion,
                prognosis: dataUpdateBl.prognosis,
                treatmentPlan: dataUpdateBl.treatment_plan,
            }

            console.log(initialValue)
            setInitalVal(initialValue)
            form.setFieldsValue(initialValue)
        }
        return () => { form.resetFields() };
    }, [dataUpdateBl, dataLab?.id]);
    const handleReset = async () => {
        form.resetFields();
        setDataInit(null)
    }
    const submitUser = async (valuesForm: any) => {
        const { mainDisease, subDisease, diagnosis, prognosis, treatmentPlan } = valuesForm;

        if (dataUpdateBl?.id) {
            //update
            const bl = {
                id: dataUpdateBl.id,
                main_disease: mainDisease,
                comorbidity: subDisease,
                conclusion: diagnosis,
                prognosis: prognosis,
                treatment_plan: treatmentPlan,
                medical_exam_id: {
                    id: dataUpdateBl.medical_exam_id?.id
                },
            }
            console.log(bl)
            const res = await callUpdateDiagnose(bl);
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
                ...valuesForm,
                medical_exam_id: {
                    id: dataUpdateBl?.medical_exam_id?.id
                },
            }
            const res = await callCreateDiagnose(user);
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
                submitter={{
                    render: (_, dom) => (
                        <Button type="primary" htmlType='submit' icon={<span>＋</span>}>
                            {<>{dataUpdateBl?.id ? "Cập nhật" : "Tạo mới"}</>}
                        </Button>
                    ),
                }}
                onFinish={submitUser}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <ProFormTextArea
                            name="mainDisease"
                            label="Bệnh chính"
                            placeholder="Nội dung..."
                            rules={[{ required: true }]}
                            fieldProps={{ rows: 4 }}
                        />
                    </Col>

                    <Col span={12}>
                        <ProFormTextArea
                            name="subDisease"
                            label="Bệnh kèm theo"
                            placeholder="Nội dung..."
                            rules={[{ required: true }]}
                            fieldProps={{ rows: 4 }}
                        />
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <ProFormTextArea
                            name="diagnosis"
                            label="Chẩn đoán"
                            placeholder="Nội dung"
                            rules={[{ required: true }]}
                            fieldProps={{ rows: 4 }}
                        />
                    </Col>

                    <Col span={12}>
                        <ProFormTextArea
                            name="prognosis"
                            label="Tiên lượng"
                            placeholder="Nội dung"
                            fieldProps={{ rows: 4 }}
                        />
                    </Col>
                </Row>

                <ProFormTextArea
                    name="treatmentPlan"
                    label="Kế hoạch điều trị"
                    placeholder="Nội dung"
                    rules={[{ required: true }]}
                    fieldProps={{ rows: 5 }}
                />
            </ProForm>
        </div>
    );
};


export default Diagnose