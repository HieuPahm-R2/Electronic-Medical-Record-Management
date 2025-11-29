import { Form, Modal, Tabs } from 'antd'
import MedicalExam from './MedicalExam';
import VitalSign from './VitalSign';
import Clinical from './Clinical';
import BloodTest from './BloodTest';
import Radiology from './Radiology';
import Diagnose from './Diagnose';
import { useEffect, useState } from 'react';
import { IBloodTest, IClinicalInfo, IDiagnose, IMedicalExam, IPatient, IRadiology, IUser, IVitalSign } from '@/types/backend';
import { callFetchDiagnoseByPatientId, callFetchVitalByPatientId } from '@/config/api';

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    setOpenModalCreate: (v: boolean) => void;
    dataInit?: IPatient | null;
    setDataInit: (v: any) => void;
    reloadTable: () => void;
}

const ManageMedical = (props: IProps) => {
    const [form] = Form.useForm();
    const { openModal, setOpenModal, dataInit, reloadTable, setDataInit, setOpenModalCreate } = props


    const [dataUpdateVital, setDataUpdateVital] = useState<IVitalSign>();
    const [isReset, setIsReset] = useState<boolean>(false);
    const [dataUpdateRadio, setDataUpdateRadio] = useState<IRadiology>();
    const [dataUpdateClinical, setDataUpdateClinical] = useState<IClinicalInfo>();
    const [dataUpdateDig, setDataUpdateDig] = useState<IDiagnose>();

    useEffect(() => {

        const fetchVital = async () => {
            const res = await callFetchVitalByPatientId(dataInit?.id as string);
            if (res && res.data) {
                setDataUpdateVital(res.data)
            }
        }
        const fetchDig = async () => {
            const res = await callFetchDiagnoseByPatientId(dataInit?.id as string);
            if (res && res.data) {
                setDataUpdateDig(res.data)
            }
        }

    }, [])

    const items = [
        {
            key: 'exam',
            label: `Quá trình thăm khám`,
            children: <MedicalExam setDataInit={setDataInit} isReset={isReset} dataInit={dataInit} openModal={openModal} setOpenModal={setOpenModal} reloadTable={reloadTable} />
        },
        {
            key: 'vitalsign',
            label: `Nhập sinh hiệu`,
            children: <VitalSign dataInit={dataInit} openModal={openModal} setOpenModal={setOpenModal} reloadTable={reloadTable} />,
        },
        {
            key: 'clinical',
            label: `Khám lâm sàng tổng quát`,
            children: <Clinical dataInit={dataInit} openModal={openModal} setOpenModal={setOpenModal} reloadTable={reloadTable} />,
        },
        {
            key: 'bloodtest',
            label: `Nhập xét nghiệm`,
            children: <BloodTest setDataInit={setDataInit} isReset={isReset} setIsReset={setIsReset} dataInit={dataInit} openModal={openModal} setOpenModal={setOpenModal} reloadTable={reloadTable} />,
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

    ];
    return (
        <Modal
            title="Quản lý bệnh án"
            open={openModal}
            footer={null}
            onCancel={() => {
                setIsReset(true)
                setOpenModal(false)
                setDataInit(null)
            }
            }
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

export default ManageMedical