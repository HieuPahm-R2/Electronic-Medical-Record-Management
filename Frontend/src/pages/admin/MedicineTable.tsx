import DataTable from "@/components/admin/DataTable";
import Access from "@/components/share/Access";
import { callDeleteMedicine } from "@/config/api";
import { ALL_PERMISSIONS } from "@/constant/permission";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchMedicine } from "@/redux/slice/medicineSlice";
import { IModelPaginate } from "@/types/backend";
import { IMedicine } from "@/types/medicine";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, message, notification, Popconfirm, Space } from "antd";
import dayjs from "dayjs";
import queryString from "query-string";
import { useRef, useState } from "react";
import { sfLike } from "spring-filter-query-builder";
import MedicineModal from "@/components/admin/medicines/MedicineModal";


const MedicineTable = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<IMedicine | null>(null);

    const tableRef = useRef<ActionType>();

    const isFetching = useAppSelector((state) => state.medicine.isFetching);
    const meta = useAppSelector((state) => state.medicine.meta);
    const medicines = useAppSelector((state) => state.medicine.result);
    const dispatch = useAppDispatch();


    const handleDeleteMedicine = async (id: string | undefined) => {
        if (id) {
            const res = await callDeleteMedicine(id);
            if (+res.statusCode === 200) {
                message.success("Xóa thuốc thành công");
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

    const columns: ProColumns<IMedicine>[] = [
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
            title: "Tên thuốc",
            dataIndex: "name",
            sorter: true,
        },
        {
            title: "Mã thuốc",
            dataIndex: "code",
            sorter: true,
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            sorter: true,
            hideInSearch: true,
        },
        {
            title: "Đơn vị",
            dataIndex: "unit",
            sorter: true,
            hideInSearch: true,
        },
        {
            title: "Nhà cung cấp",
            dataIndex: "supplier",
            sorter: true,
        },
        {
            title: "Giá nhập",
            dataIndex: "importPrice",
            sorter: true,
            hideInSearch: true,
        },
        {
            title: "Giá bán",
            dataIndex: "exportPrice",
            sorter: true,
            hideInSearch: true,
        },
        {
            title: "Ngày hết hạn",
            dataIndex: "expiredAt",
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>
                        {record.expiredAt
                            ? dayjs(record.expiredAt).format("DD-MM-YYYY")
                            : ""}
                    </>
                );
            },
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
            title: "Actions",
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <Access permission={ALL_PERMISSIONS.MEDICINES.UPDATE} hideChildren>
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
                    <Access permission={ALL_PERMISSIONS.MEDICINES.DELETE} hideChildren>
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa thuốc"}
                            description={"Bạn có chắc chắn muốn xóa thuốc này ?"}
                            onConfirm={() => handleDeleteMedicine(entity.id)}
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
        if (clone.name) q.filter = `${sfLike("name", clone.name)}`;
        if (clone.code) {
            q.filter = clone.name
                ? q.filter + " and " + `${sfLike("code", clone.code)}`
                : `${sfLike("code", clone.code)}`;
        }
        if (clone.supplier) {
            q.filter = q.filter
                ? q.filter + " and " + `${sfLike("supplier", clone.supplier)}`
                : `${sfLike("supplier", clone.supplier)}`;
        }


        if (!q.filter) delete q.filter;
        let temp = queryString.stringify(q);

        let sortBy = "";
        if (sort && sort.name) {
            sortBy = sort.name === "ascend" ? "sort=name,asc" : "sort=name,desc";
        }
        if (sort && sort.code) {
            sortBy = sort.code === "ascend" ? "sort=code,asc" : "sort=code,desc";
        }
        if (sort && sort.createdAt) {
            sortBy =
                sort.createdAt === "ascend"
                    ? "sort=createdAt,asc"
                    : "sort=createdAt,desc";
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
            <Access permission={ALL_PERMISSIONS.MEDICINES.GET_PAGINATE}>
                <DataTable<IMedicine>
                    actionRef={tableRef}
                    headerTitle="Danh mục thuốc"
                    rowKey="id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={medicines}
                    request={async (params: any, sort: any, filter: any) => {
                        const query = buildQuery(params, sort, filter);
                        const res = await dispatch(fetchMedicine({ query })).unwrap();
                        const page = res.data as IModelPaginate<IMedicine> | undefined;
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
                            <Access permission={ALL_PERMISSIONS.MEDICINES.CREATE} hideChildren>
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
            </Access>
            <MedicineModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                reloadTable={reloadTable}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </div>
    );
};

export default MedicineTable;
