import { ProForm, ProFormSelect, ProFormTextArea } from "@ant-design/pro-components";
import { Button, Row, Col } from "antd";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: import('@/types/backend').IPatient | null;
    reloadTable: () => void;
}

export const Diagnose = (props: IProps) => {
    return (
        <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
            <ProForm
                submitter={{
                    render: () => (
                        <Button type="primary" icon={<span>＋</span>}>
                            Cập nhật
                        </Button>
                    ),
                }}
                onFinish={(values) => console.log(values)}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <ProFormSelect
                            name="mainDisease"
                            label="Bệnh chính"
                            placeholder="Chọn bệnh"
                            rules={[{ required: true }]}
                        />
                    </Col>

                    <Col span={12}>
                        <ProFormSelect
                            name="subDisease"
                            label="Bệnh kèm theo"
                            placeholder="Chọn bệnh"
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

                <Row gutter={24}>
                    <Col span={12}>
                        <ProFormTextArea
                            name="imageResult"
                            label="Kết quả ảnh chụp"
                            placeholder="Nội dung"
                            fieldProps={{ rows: 4 }}
                        />
                    </Col>

                    <Col span={12}>
                        <ProFormTextArea
                            name="testResult"
                            label="Kết quả xét nghiệm"
                            placeholder="Nội dung"
                            fieldProps={{ rows: 4 }}
                        />
                    </Col>
                </Row>
            </ProForm>
        </div>
    );
};


export default Diagnose