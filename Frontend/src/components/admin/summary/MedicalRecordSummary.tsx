import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Collapse, Spin, Tag } from 'antd';
import { FilePdfOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment'; // Cần cài: npm install moment

import { PatientProfile } from './PatientProfile';
import { IBloodTest, IMedicalExam } from '@/types/backend';
import { VisitDetailTabs } from './VisitDetail';


const { Title, Text } = Typography;
const { Panel } = Collapse;

// Mock Data Bệnh nhân (Giữ nguyên)
const MOCK_PATIENT = {
    name: "Nguyễn Minh Anh",
    id: "BN1655829553",
    dob: "18/06/2000",
    gender: "Nữ",
    job: "Sinh viên/học sinh",
    nationality: "Việt Nam",
    ethnicity: "Kinh",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
};

const MedicalRecordSummary: React.FC = () => {
    // State lưu danh sách các lần khám
    const [exams, setExams] = useState<IMedicalExam[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // State lưu kết quả xét nghiệm (Map theo examId để cache dữ liệu)
    // Key là medicalExamId, Value là IBloodTest
    const [bloodTestResults, setBloodTestResults] = useState<Record<number, IBloodTest>>({});

    useEffect(() => {
        fetchExams();
    }, []);

    // 1. Logic Gọi API và Sắp xếp
    const fetchExams = async () => {
        setLoading(true);
        try {
            // Giả lập API trả về danh sách lộn xộn
            const mockApiReponse: IMedicalExam[] = [
                { id: 101, arrivalTime: '2022-07-09T15:27:00' }, // Lần 1
                { id: 103, arrivalTime: '2022-07-09T17:43:00' }, // Lần 3
                { id: 104, arrivalTime: '2022-08-06T16:19:00' }, // Lần 4 (Mới nhất)
                { id: 102, arrivalTime: '2022-07-09T17:14:00' }, // Lần 2
            ];

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
    const fetchBloodTestForExam = async (examId: number) => {
        // Nếu đã có dữ liệu rồi thì không gọi lại
        if (bloodTestResults[examId]) return;

        // Giả lập API get blood-test by medical_exam_id
        const mockTestResult: IBloodTest = {
            id: `KQ-${examId}`,
            glucose: 5.0 + (examId % 3), // Random số liệu chút
            urea: 5.3,
            // ... mapping data
        };

        setBloodTestResults(prev => ({ ...prev, [examId]: mockTestResult }));
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

    return (
        <div style={{ background: '#f0f2f5', padding: 24, minHeight: '100vh' }}>
            {/* ... Phần Header giữ nguyên ... */}

            <div style={{ background: '#fff', padding: 24, borderRadius: '0 0 8px 8px' }}>
                <Row gutter={24}>
                    <Col xs={24} md={6}>
                        <PatientProfile patient={MOCK_PATIENT} />
                    </Col>

                    <Col xs={24} md={18}>
                        {loading ? <Spin style={{ display: 'block', margin: '20px auto' }} /> : (

                            <Collapse
                                expandIconPosition="end"
                                ghost
                                onChange={(keys) => {
                                    // Logic Lazy load: Khi user mở tab nào thì mới gọi API lấy máu của tab đó
                                    const key = Array.isArray(keys) ? keys[keys.length - 1] : keys;
                                    if (key) fetchBloodTestForExam(Number(key));
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
            </div>
        </div>
    );
};

export default MedicalRecordSummary;