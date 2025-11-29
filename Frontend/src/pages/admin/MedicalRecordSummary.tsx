import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Collapse, Spin, Tag, Result } from 'antd';
import { FilePdfOutlined, ClockCircleOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment'; // Cần cài: npm install moment

import { PatientProfile } from '../../components/admin/summary/PatientProfile';
import { IBloodTest, IMedicalExam, IPatient } from '@/types/backend';
import { VisitDetailTabs } from '../../components/admin/summary/VisitDetail';
import SearchPatient from '@/components/admin/summary/SearchPatient';
import { callFetchBloodTestByMex, callFetchMexByPatientId } from '@/config/api';


const { Title, Text } = Typography;
const { Panel } = Collapse;


const MedicalRecordSummary: React.FC = () => {
    // State lưu danh sách các lần khám
    const [exams, setExams] = useState<IMedicalExam[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [openModalSearch, setOpenModalSearch] = useState<boolean>(false);
    const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
    // State lưu kết quả xét nghiệm (Map theo examId để cache dữ liệu)
    // Key là medicalExamId, Value là IBloodTest
    const [bloodTestResults, setBloodTestResults] = useState<Record<string, IBloodTest>>({});

    useEffect(() => {
        fetchExams();
    }, []);

    // 1. Logic Gọi API và Sắp xếp
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

            // Mở rộng: Tự động fetch chi tiết cho lần khám mới nhất (Optional)
            if (sortedExams.length > 0 && typeof sortedExams[0].id === 'number') {
                fetchBloodTestForExam(sortedExams[0].id);
            }

        } catch (error) {
            console.error("Lỗi lấy dữ liệu khám:", error);
        } finally {
            setLoading(false);
        }
    };

    // Hàm giả lập lấy chi tiết xét nghiệm theo ID lần khám
    const fetchBloodTestForExam = async (examId: string | number) => {
        const key = String(examId);
        // Nếu đã có dữ liệu rồi thì không gọi lại
        if (bloodTestResults[key]) return;

        // Gọi API lấy xét nghiệm theo medical_exam_id
        try {
            const res = await callFetchBloodTestByMex(key);
            // Normalize possible API wrapper (e.g., { data: ..., result: ... })
            const testData = res && (res as any).data ? (res as any).data : res;
            setBloodTestResults(prev => ({ ...prev, [key]: testData as IBloodTest }));
        } catch (err) {
            console.error('Lỗi lấy kết quả xét nghiệm:', err);
        }
    };

    // Hàm render Header cho Panel để giống thiết kế
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
    const handleOpenModal = () => {
        setOpenModalSearch(true)
    }

    const handleSelectPatient = (patient: IPatient) => {
        setSelectedPatient(patient);
        // Try to fetch exams for the selected patient. Use id if present, otherwise patientCode.
        const idToUse = (patient as any).id ?? patient.patientCode;
        fetchExams(idToUse as string | number);
    }

    return (
        <div style={{ background: '#f0f2f5', padding: 24, minHeight: '100vh' }}>
            <Button type="primary" icon={<SearchOutlined />}
                onClick={() => handleOpenModal()}
                style={{ marginBottom: '15px', fontSize: "15px" }}>
                Chọn bệnh nhân thăm khám
            </Button>

            <div style={{ background: '#fff', padding: 24, borderRadius: '0 0 8px 8px' }}>
                {selectedPatient === null ?
                    <Result
                        title="Nhấn nút chọn bệnh nhân để hiện thị kết quả tương ứng"
                        extra={
                            <Button type="primary" key="console">
                                Go Console
                            </Button>
                        }
                    /> :
                    <Row gutter={24}>
                        <Col xs={24} md={6}>
                            <PatientProfile patient={selectedPatient} />
                        </Col>
                        <Col xs={24} md={18}>
                            {loading ? <Spin style={{ display: 'block', margin: '20px auto' }} /> : (
                                <Collapse
                                    expandIconPosition="end"
                                    ghost
                                    onChange={(keys) => {
                                        // Logic Lazy load: Khi user mở tab nào thì mới gọi API lấy máu của tab đó
                                        const key = Array.isArray(keys) ? keys[keys.length - 1] : keys;
                                        if (key) fetchBloodTestForExam(key as string | number);
                                    }}
                                >
                                    {/* Render danh sách động từ mảng exams đã sort */}
                                    {exams.map((exam, index) => {
                                        const examId = typeof exam.id === 'number' ? exam.id : index;
                                        return (
                                            <Panel
                                                header={renderPanelHeader(exam, index)}
                                                key={examId}
                                                style={{ marginBottom: 16, border: '1px solid #f0f0f0', borderRadius: 8 }}
                                            >
                                                {/* Truyền dữ liệu xét nghiệm tương ứng với exam này vào */}
                                                <VisitDetailTabs labData={bloodTestResults[examId]} />
                                            </Panel>
                                        );
                                    })}
                                </Collapse>

                            )}
                        </Col>
                    </Row>

                }

            </div>
            <SearchPatient openModalSearch={openModalSearch} setOpenModalSearch={setOpenModalSearch} onSelectPatient={handleSelectPatient} />
        </div>
    );
};

export default MedicalRecordSummary;