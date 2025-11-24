import { Modal, Tabs } from 'antd'
import MedicalExam from './MedicalExam';
import VitalSign from './VitalSign';
import Clinical from './Clinical';
import BloodTest from './BloodTest';
import Radiology from './Radiology';
import Diagnose from './Diagnose';
import PatientInfo from './PatientInfo';

const ModalPatient = (props) => {
    const { openModal, setOpenModal, dataInit, setDataInit } = props
    const items = [
        {
            key: 'info',
            label: `Hồ sơ bệnh nhân`,
            children: <PatientInfo dataInit={dataInit} />
        },
        {
            key: 'exam',
            label: `Quá trình thăm khám`,
            children: <MedicalExam />
        },
        {
            key: 'vitalsign',
            label: `Nhập sinh hiệu`,
            children: <VitalSign />,
        },
        {
            key: 'clinical',
            label: `Khám lâm sàng tổng quát`,
            children: <Clinical />,
        },
        {
            key: 'bloodtest',
            label: `Nhập xét nghiệm`,
            children: <BloodTest />,
        },
        {
            key: 'radiology',
            label: `Chuẩn đoán hình ảnh`,
            children: <Radiology />,
        },
        {
            key: 'diagnose',
            label: `Chẩn đoán`,
            children: <Diagnose />,
        },

    ];
    return (
        <Modal
            title="Quản lý bệnh án"
            open={openModal}
            footer={null}
            onCancel={() => setOpenModal(false)}
            maskClosable={false}
            width={"65vw"}
        >
            <Tabs
                defaultActiveKey="info"
                items={items}
            />
        </Modal>
    )
}

export default ModalPatient