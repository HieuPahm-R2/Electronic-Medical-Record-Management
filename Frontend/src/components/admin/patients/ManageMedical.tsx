import { Button, Collapse, Form, message, Modal, Tabs } from 'antd'
import MedicalExam from './MedicalExam';
import VitalSign from './VitalSign';
import Clinical from './Clinical';
import BloodTest from './BloodTest';
import Radiology from './Radiology';
import Diagnose from './Diagnose';
import { useEffect, useState } from 'react';
import { IMedicalExam, IPatient, IRadiology, IUser, IVitalSign } from '@/types/backend';
import moment from 'moment';
import { DownloadOutlined } from '@ant-design/icons';
import { callCreateMedicalExam, callFetchMexByPatientId } from '@/config/api';


interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    setOpenModalCreate: (v: boolean) => void;
    dataInit?: IPatient | null;
    setDataInit: (v: any) => void;
    reloadTable: () => void;
}
const { Panel } = Collapse;
const ManageMedical = (props: IProps) => {
    const [form] = Form.useForm();
    const { openModal, setOpenModal, dataInit, reloadTable, setDataInit, setOpenModalCreate } = props
    const [exams, setExams] = useState<IMedicalExam[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataLab, setDataLab] = useState<IMedicalExam | null>();
    const [activeExamKey, setActiveExamKey] = useState<string | number | null>(null);
    const [isReset, setIsReset] = useState<boolean>(false);

    useEffect(() => {
        console.log(dataInit?.id)

        fetchExams(dataInit?.id)
    }, [dataInit?.id])

    const fetchExams = async (patientId?: string | number) => {
        setLoading(true);
        try {
            const apiRaw = await callFetchMexByPatientId(patientId ? String(patientId) : '');
            // Normalize different possible shapes of response to an array of exams
            let mockApiReponse: IMedicalExam[] = [];
            if (Array.isArray(apiRaw)) {
                mockApiReponse = apiRaw;
            } else if (apiRaw && typeof apiRaw === 'object') {
                // Try common shapes: { data: { result: [...] } } or { data: [...] }
                if (Array.isArray((apiRaw as any).data?.result)) {
                    mockApiReponse = (apiRaw as any).data.result;
                } else if (Array.isArray((apiRaw as any).data)) {
                    mockApiReponse = (apiRaw as any).data;
                } else if (Array.isArray((apiRaw as any).result)) {
                    mockApiReponse = (apiRaw as any).result;
                }
            }

            // --- LOGIC SẮP XẾP QUAN TRỌNG ---
            const sortedExams = mockApiReponse.sort((a, b) => {
                // Chuyển string về timestamp để so sánh (bảo vệ trường hợp undefined)
                const timeA = a.arrivalTime ? new Date(a.arrivalTime).getTime() : 0;
                const timeB = b.arrivalTime ? new Date(b.arrivalTime).getTime() : 0;

                // Sắp xếp giảm dần (Mới nhất lên đầu) -> b - a
                return timeB - timeA;
            });
            setExams(sortedExams);
        } catch (error) {
            console.error("Lỗi lấy dữ liệu khám:", error);
        } finally {
            setLoading(false);
        }
    };
    // Cập nhật dataLab khi người dùng chọn một exam
    const handleCollapseChange = (key: string | number | string[] | number[]) => {
        const selectedKey = Array.isArray(key) ? key[0] : key;
        const selectedExam = exams.find(exam => String(exam.id) === selectedKey);
        if (selectedExam) {
            setDataLab(selectedExam);
        }
        setActiveExamKey(selectedKey);
    };
    const renderPanelHeader = (exam: IMedicalExam, index: number) => {
        // Tính số thứ tự lần khám: Tổng số - index hiện tại (vì đang sort giảm dần)
        const visitNumber = exams.length - index;

        // Format ngày tháng: 06/08/2022 16:19:00
        const timeDisplay = moment(exam.arrivalTime).format('DD/MM/YYYY HH:mm:ss');

        return (
            <span style={{ color: '#1890ff', fontWeight: 500 }}>
                Lần khám thứ {visitNumber}, thời gian: {timeDisplay}
            </span>
        );
    };


    const createQuickMex = async () => {
        const res = await callCreateMedicalExam({
            patient: dataInit?.id
        })
        if (res && res.data) {
            setOpenModal(false)
            message.loading("Chờ xử lý!", 3)
            setTimeout(message.success("Tạo thành công"), 3000)
            reloadTable
        }
    }

    return (
        <Modal
            title="Quản lý bệnh án"
            open={openModal}
            footer={null}
            onCancel={() => {
                setIsReset(true)
                setDataLab(null)
                setOpenModal(false)
            }
            }
            maskClosable={false}
            width={"65vw"}
        >
            <Button type="primary" icon={<DownloadOutlined />} size={'large'} style={{ marginBottom: "15px" }} onClick={() => createQuickMex()}>
                Tạo quá trình khám bệnh
            </Button>
            <Collapse
                expandIconPosition="end"
                ghost
                onChange={handleCollapseChange}
            >
                {/* Render danh sách động từ mảng exams đã sort */}
                {exams.map((exam, index) => {
                    console.log(typeof (exam.id))
                    const examId = exam.id as string;
                    return (
                        <Panel
                            header={renderPanelHeader(exam, index)}
                            key={examId}
                            style={{ marginBottom: 16, border: '1px solid #f0f0f0', borderRadius: 8 }}
                        >
                            {/* Truyền dữ liệu xét nghiệm tương ứng với exam này vào */}
                            <Tabs
                                defaultActiveKey="info"
                                items={[
                                    {
                                        key: 'exam',
                                        label: `Quá trình thăm khám`,
                                        children: <MedicalExam setDataInit={setDataInit}
                                            dataLab={dataLab} reloadTable={reloadTable} />
                                    },
                                    {
                                        key: 'vitalsign',
                                        label: `Nhập sinh hiệu`,
                                        children: <VitalSign isReset={isReset} setDataInit={setDataInit} openModal={openModal} setOpenModal={setOpenModal} reloadTable={reloadTable} />,
                                    },
                                    {
                                        key: 'clinical',
                                        label: `Khám lâm sàng tổng quát`,
                                        children: <Clinical dataInit={dataInit} openModal={openModal} setOpenModal={setOpenModal} reloadTable={reloadTable} />,
                                    },
                                    {
                                        key: 'bloodtest',
                                        label: `Nhập xét nghiệm`,
                                        children: <BloodTest dataLab={dataLab} setDataInit={setDataInit}
                                            reloadTable={reloadTable} />,
                                    },
                                    {
                                        key: 'radiology',
                                        label: `Chuẩn đoán hình ảnh`,
                                        children: <Radiology dataInit={dataInit} openModal={openModal} setOpenModal={setOpenModal} reloadTable={reloadTable} />,
                                    },
                                    {
                                        key: 'diagnose',
                                        label: `Chẩn đoán`,
                                        children: <Diagnose dataInit={dataInit} openModal={openModal} setOpenModal={setOpenModal} reloadTable={reloadTable} />,
                                    },

                                ]}
                            />
                        </Panel>
                    );
                })}
            </Collapse>

        </Modal>
    )
}

export default ManageMedical