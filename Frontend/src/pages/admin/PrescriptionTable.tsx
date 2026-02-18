import DataTable from "@/components/admin/DataTable";
import Access from "@/components/share/Access";
import { callDeletePrescription } from "@/config/api";
import { ALL_PERMISSIONS } from "@/constant/permission";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchPrescription } from "@/redux/slice/prescriptionSlice";
import { IModelPaginate } from "@/types/backend";
import { IPrescription } from "@/types/medical";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, message, notification, Popconfirm, Space } from "antd";
import dayjs from "dayjs";
import queryString from "query-string";
import { useRef, useState } from "react";
import { sfLike } from "spring-filter-query-builder";
import PrescriptionModal from "@/components/admin/prescriptions/PrescriptionModal";


const PrescriptionTable = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<IPrescription | null>(null);

    const tableRef = useRef<ActionType>();

    const isFetching = useAppSelector((state) => state.prescription.isFetching);
    const meta = useAppSelector((state) => state.prescription.meta);
    const prescriptions = useAppSelector((state) => state.prescription.result);
    const dispatch = useAppDispatch();


    const handleDeletePrescription = async (id: string | undefined) => {
        if (id) {
            const res = await callDeletePrescription(id);
            if (+res.statusCode === 200) {
                message.success("Xóa đơn thuốc thành công");
                reloadTable();
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.message,
                });
            }
        }
    };


    const reloadTable = () => {
        tableRef?.current?.reload();
    };

    const columns: ProColumns<IPrescription>[] = [
        {
            title: "STT",
            key: "index",
            width: 50,
            align: "center",
            render: (text, record, index) => {
                return <>{index + 1 + (meta.page - 1) * meta.pageSize}</>;
            },
            hideInSearch: true,
        },
        {
            title: "Chẩn đoán",
            dataIndex: "diagnose",
            sorter: true,
        },
        {
            title: "Bác sĩ",
            dataIndex: "doctor",
            sorter: true,
        },
        {
            title: "Bệnh nhân",
            dataIndex: "patient",
            sorter: true,
        },
        {
            title: "Tái khám sau (ngày)",
            dataIndex: "reExamination",
            sorter: true,
            hideInSearch: true,
        },
        {
            title: "Thời gian tạo",
            dataIndex: "createdAt",
            width: 200,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>
                        {record.createdAt
                            ? dayjs(record.createdAt).format("DD-MM-YYYY HH:mm:ss")
                            : ""}
                    </>
                );
            },
            hideInSearch: true,
        },
        {
            title: "Thời gian cập nhật",
            dataIndex: "updatedAt",
            width: 200,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>
                        {record.updatedAt
                            ? dayjs(record.updatedAt).format("DD-MM-YYYY HH:mm:ss")
                            : ""}
                    </>
                );
            },
            hideInSearch: true,
        },
        {
            title: "Actions",
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <Access permission={ALL_PERMISSIONS.PRESCRIPTIONS.UPDATE} hideChildren>
                        <EditOutlined
                            style={{
                                fontSize: 20,
                                color: "#ffa500",
                            }}
                            type=""
                            onClick={() => {
                                setOpenModal(true);
                                setDataInit(entity);
                            }}
                        />
                    </Access>
                    <Access permission={ALL_PERMISSIONS.PRESCRIPTIONS.DELETE} hideChildren>
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa đơn thuốc"}
                            description={"Bạn có chắc chắn muốn xóa đơn thuốc này ?"}
                            onConfirm={() => handleDeletePrescription(entity.id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 10px" }}>
                                <DeleteOutlined
                                    style={{
                                        fontSize: 20,
                                        color: "#ff4d4f",
                                    }}
                                />
                            </span>
                        </Popconfirm>
                    </Access>
                </Space>
            ),
        },
    ];

    const buildQuery = (params: any, sort: any, filter: any) => {
        const q: any = {
            page: (params.current || 1) - 1,
            size: params.pageSize,
            filter: "",
        };

        const clone = { ...params };
        if (clone.diagnose) q.filter = `${sfLike("diagnose", clone.diagnose)}`;
        if (clone.doctor) {
            q.filter = clone.diagnose
                ? q.filter + " and " + `${sfLike("doctor", clone.doctor)}`
                : `${sfLike("doctor", clone.doctor)}`;
        }
        if (clone.patient) {
            q.filter = q.filter
                ? q.filter + " and " + `${sfLike("patient", clone.patient)}`
                : `${sfLike("patient", clone.patient)}`;
        }


        if (!q.filter) delete q.filter;
        let temp = queryString.stringify(q);

        let sortBy = "";
        if (sort && sort.diagnose) {
            sortBy = sort.diagnose === "ascend" ? "sort=diagnose,asc" : "sort=diagnose,desc";
        }
        if (sort && sort.doctor) {
            sortBy = sort.doctor === "ascend" ? "sort=doctor,asc" : "sort=doctor,desc";
        }
        if (sort && sort.patient) {
            sortBy = sort.patient === "ascend" ? "sort=patient,asc" : "sort=patient,desc";
        }
        if (sort && sort.createdAt) {
            sortBy =
                sort.createdAt === "ascend"
                    ? "sort=createdAt,asc"
                    : "sort=createdAt,desc";
        }
        if (sort && sort.updatedAt) {
            sortBy =
                sort.updatedAt === "ascend"
                    ? "sort=updatedAt,asc"
                    : "sort=updatedAt,desc";
        }

        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sort=updatedAt,desc`;
        } else {
            temp = `${temp}&${sortBy}`;
        }

        return temp;
    };

    return (
        <div>
            {/* <Access permission={ALL_PERMISSIONS.PRESCRIPTIONS.GET_PAGINATE}>
               
            </Access> */}
            <DataTable<IPrescription>
                actionRef={tableRef}
                headerTitle="Danh sách đơn thuốc"
                rowKey="id"
                loading={isFetching}
                columns={columns}
                dataSource={prescriptions}
                request={async (params: any, sort: any, filter: any) => {
                    const query = buildQuery(params, sort, filter);
                    const res = await dispatch(fetchPrescription({ query })).unwrap();
                    const page = res.data as IModelPaginate<IPrescription> | undefined;
                    return {
                        data: page?.result ?? [],
                        total: page?.meta?.total ?? 0,
                        success: true,
                    };
                }}
                scroll={{ x: true }}
                pagination={{
                    showSizeChanger: true,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {" "}
                                {range[0]}-{range[1]} trên {total} rows
                            </div>
                        );
                    },
                }}
                rowSelection={false}
                toolBarRender={(_action, _rows): any => {
                    return (
                        <Access permission={ALL_PERMISSIONS.PRESCRIPTIONS.CREATE} hideChildren>
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => setOpenModal(true)}
                            >
                                Thêm mới
                            </Button>
                        </Access>
                    );
                }}
            />
            <PrescriptionModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                reloadTable={reloadTable}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </div>
    );
};

export default PrescriptionTable;
