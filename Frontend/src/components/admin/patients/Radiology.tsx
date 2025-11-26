import { IPatient } from '@/types/backend';
import { ProForm, ProFormSelect, ProFormTextArea } from "@ant-design/pro-components";
import { Button, Row, Col } from "antd";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IPatient | null;
    reloadTable: () => void;
}
const Radiology = () => {
    return (
        <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
            <ProForm
                submitter={{
                    render: () => (
                        <Button type="primary" icon={<span>＋</span>}>
                            Thêm Mới
                        </Button>
                    ),
                }}
                onFinish={(values) => console.log(values)}
            >
                <ProFormSelect
                    name="service"
                    label="Dịch vụ cận lâm sàng"
                    placeholder="Chọn dịch vụ"
                    request={async () => [
                        { label: "Xét nghiệm máu", value: "blood" },
                        { label: "Chụp X-quang", value: "xray" },
                    ]}
                />


                <ProFormTextArea
                    name="imageUrl"
                    label="Đường dẫn kết quả ảnh"
                    placeholder="Nhập đường dẫn ảnh"
                    rules={[{ required: true, message: "Vui lòng nhập đường dẫn" }]}
                />


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