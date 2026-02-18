import React, { useRef, useState } from "react";
import DataTable from "@/components/admin/DataTable";
import PaymentModal from "@/components/admin/payments/PaymentModal";
import Access from "@/components/share/Access";
import { callDeletePayment } from "@/config/api";
import { ALL_PERMISSIONS } from "@/constant/permission";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchPayment } from "@/redux/slice/paymentSlice";
import { IModelPaginate, IPayment } from "@/types/backend";
import { DeleteOutlined, EditOutlined, FileTextOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, message, notification, Popconfirm, Space, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import queryString from "query-string";
import { sfLike } from "spring-filter-query-builder";

const PaymentTable = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<IPayment | null>(null);

    const tableRef = useRef<ActionType>();

    const isFetching = useAppSelector((state) => state.payment.isFetching);
    const meta = useAppSelector((state) => state.payment.meta);
    const payments = useAppSelector((state) => state.payment.result);
    const dispatch = useAppDispatch();

    const handleDeletePayment = async (id: string | undefined) => {
        if (id) {
            const res = await callDeletePayment(id);
            if (+res.statusCode === 200) {
                message.success("Xóa hóa đơn thành công");
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

    const getStatusTag = (status?: string) => {
        const statusConfig: any = {
            PAID: { color: "green", text: "Đã thanh toán" },
            PARTIAL: { color: "orange", text: "Thanh toán một phần" },
            UNPAID: { color: "red", text: "Chưa thanh toán" },
            CANCELLED: { color: "default", text: "Đã hủy" },
        };
        const config = statusConfig[status!] || { color: "default", text: status || "N/A" };
        return <Tag color={config.color}>{config.text}</Tag>;
    };

    const getPaymentMethodLabel = (method?: string) => {
        const methodConfig: any = {
            CASH: "Tiền mặt",
            BANK: "Chuyển khoản",
            INSURANCE: "Bảo hiểm",
            OTHER: "Khác",
        };
        return methodConfig[method!] || method || "N/A";
    };

    const columns: ProColumns<IPayment>[] = [
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
            title: "Mã hóa đơn",
            dataIndex: "invoiceNumber",
            sorter: true,
            width: 130,
        },
        {
            title: "Mã bệnh nhân",
            dataIndex: "patientCode",
            sorter: true,
            width: 120,
        },
        {
            title: "Tên bệnh nhân",
            dataIndex: "patientName",
            sorter: true,
            width: 150,
        },
        {
            title: "Ngày hóa đơn",
            dataIndex: "invoiceDate",
            sorter: true,
            width: 120,
            render: (text, record) => {
                return record.invoiceDate ? dayjs(record.invoiceDate).format("DD/MM/YYYY") : "";
            },
            hideInSearch: true,
        },
        {
            title: "Phí khám",
            dataIndex: "examinationFee",
            sorter: true,
            width: 100,
            align: "right",
            render: (text) => {
                return text ? `${text.toLocaleString("vi-VN")}₫` : "0₫";
            },
            hideInSearch: true,
        },
        {
            title: "Phí điều trị",
            dataIndex: "treatmentFee",
            sorter: true,
            width: 100,
            align: "right",
            render: (text) => {
                return text ? `${text.toLocaleString("vi-VN")}₫` : "0₫";
            },
            hideInSearch: true,
        },
        {
            title: "Phí xét nghiệm",
            dataIndex: "laboratoryFee",
            sorter: true,
            width: 100,
            align: "right",
            render: (text) => {
                return text ? `${text.toLocaleString("vi-VN")}₫` : "0₫";
            },
            hideInSearch: true,
        },
        {
            title: "Phí chẩn đoán hình ảnh",
            dataIndex: "radiologyFee",
            sorter: true,
            width: 100,
            align: "right",
            render: (text) => {
                return text ? `${text.toLocaleString("vi-VN")}₫` : "0₫";
            },
            hideInSearch: true,
        },
        {
            title: "Phí dược",
            dataIndex: "medicineCharge",
            sorter: true,
            width: 100,
            align: "right",
            render: (text) => {
                return text ? `${text.toLocaleString("vi-VN")}₫` : "0₫";
            },
            hideInSearch: true,
        },
        {
            title: "Phí dịch vụ",
            dataIndex: "serviceCharge",
            sorter: true,
            width: 100,
            align: "right",
            render: (text) => {
                return text ? `${text.toLocaleString("vi-VN")}₫` : "0₫";
            },
            hideInSearch: true,
        },
        {
            title: "Phí khác",
            dataIndex: "otherCharge",
            sorter: true,
            width: 100,
            align: "right",
            render: (text) => {
                return text ? `${text.toLocaleString("vi-VN")}₫` : "0₫";
            },
            hideInSearch: true,
        },
        {
            title: "Chiết khấu",
            dataIndex: "discount",
            sorter: true,
            width: 100,
            align: "right",
            render: (text) => {
                return text ? `${text.toLocaleString("vi-VN")}₫` : "0₫";
            },
            hideInSearch: true,
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalAmount",
            sorter: true,
            width: 120,
            align: "right",
            render: (text) => {
                return text ? (
                    <span style={{ fontWeight: "bold", color: "#1890ff" }}>
                        {text.toLocaleString("vi-VN")}₫
                    </span>
                ) : (
                    "0₫"
                );
            },
            hideInSearch: true,
        },
        {
            title: "Đã thanh toán",
            dataIndex: "amountPaid",
            sorter: true,
            width: 120,
            align: "right",
            render: (text) => {
                return text ? (
                    <span style={{ fontWeight: "bold", color: "#52c41a" }}>
                        {text.toLocaleString("vi-VN")}₫
                    </span>
                ) : (
                    "0₫"
                );
            },
            hideInSearch: true,
        },
        {
            title: "Còn lại",
            dataIndex: "remainingAmount",
            sorter: true,
            width: 120,
            align: "right",
            render: (text: any) => {
                const val = Number(text);
                return text ? (
                    <span style={{ fontWeight: "bold", color: val > 0 ? "#ff4d4f" : "#52c41a" }}>
                        {val.toLocaleString("vi-VN")}₫
                    </span>
                ) : (
                    "0₫"
                );
            },
            hideInSearch: true,
        },
        {
            title: "Trạng thái thanh toán",
            dataIndex: "paymentStatus",
            sorter: true,
            width: 140,
            render: (text: any) => getStatusTag(text),
            hideInSearch: true,
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentMethod",
            sorter: true,
            width: 130,
            render: (text: any) => getPaymentMethodLabel(text),
            hideInSearch: true,
        },
        {
            title: "Ngày thanh toán",
            dataIndex: "paymentDate",
            sorter: true,
            width: 120,
            render: (text: any) => {
                return text ? dayjs(text).format("DD/MM/YYYY") : "Chưa thanh toán";
            },
            hideInSearch: true,
        },
        {
            title: "Ghi chú",
            dataIndex: "notes",
            sorter: true,
            width: 150,
            hideInSearch: true,
            render: (text: any) => {
                return text ? (
                    <Tooltip title={text}>
                        <span>{text.length > 20 ? text.substring(0, 20) + "..." : text}</span>
                    </Tooltip>
                ) : (
                    "-"
                );
            },
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            width: 150,
            sorter: true,
            render: (text: any) => {
                return text ? dayjs(text).format("DD/MM/YYYY HH:mm:ss") : "";
            },
            hideInSearch: true,
        },
        {
            title: "Thao tác",
            hideInSearch: true,
            width: 100,
            align: "center",
            render: (_value, entity, _index, _action) => (
                <Space>
                    <Access permission={ALL_PERMISSIONS.PAYMENTS.UPDATE} hideChildren>
                        <Tooltip title="Chỉnh sửa">
                            <EditOutlined
                                style={{
                                    fontSize: 18,
                                    color: "#ffa500",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setOpenModal(true);
                                    setDataInit(entity);
                                }}
                            />
                        </Tooltip>
                    </Access>

                    <Access permission={ALL_PERMISSIONS.PAYMENTS.DELETE} hideChildren>
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa hóa đơn"}
                            description={"Bạn có chắc chắn muốn xóa hóa đơn này?"}
                            onConfirm={() => handleDeletePayment(entity.id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <Tooltip title="Xóa">
                                <DeleteOutlined
                                    style={{
                                        fontSize: 18,
                                        color: "#ff4d4f",
                                        cursor: "pointer",
                                    }}
                                />
                            </Tooltip>
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
        if (clone.patientCode) q.filter = `${sfLike("patientCode", clone.patientCode)}`;
        if (clone.patientName) {
            q.filter = clone.patientCode
                ? q.filter + " and " + `${sfLike("patientName", clone.patientName)}`
                : `${sfLike("patientName", clone.patientName)}`;
        }
        if (clone.invoiceNumber) {
            q.filter = q.filter
                ? q.filter + " and " + `${sfLike("invoiceNumber", clone.invoiceNumber)}`
                : `${sfLike("invoiceNumber", clone.invoiceNumber)}`;
        }

        if (!q.filter) delete q.filter;
        let temp = queryString.stringify(q);

        let sortBy = "";
        if (sort && sort.invoiceDate) {
            sortBy = sort.invoiceDate === "ascend" ? "sort=invoiceDate,asc" : "sort=invoiceDate,desc";
        }
        if (sort && sort.totalAmount) {
            sortBy = sort.totalAmount === "ascend" ? "sort=totalAmount,asc" : "sort=totalAmount,desc";
        }
        if (sort && sort.createdAt) {
            sortBy = sort.createdAt === "ascend" ? "sort=createdAt,asc" : "sort=createdAt,desc";
        }

        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sort=createdAt,desc`;
        } else {
            temp = `${temp}&${sortBy}`;
        }

        return temp;
    };

    return (
        <div>
            {/* <Access permission={ALL_PERMISSIONS.PAYMENTS.GET_PAGINATE}>

            </Access> */}
            <DataTable<IPayment>
                actionRef={tableRef}
                headerTitle="Quản lý doanh thu, viện phí bệnh nhân"
                rowKey="id"
                loading={isFetching}
                columns={columns}
                dataSource={payments}
                request={async (params: any, sort: any, filter: any) => {
                    const query = buildQuery(params, sort, filter);
                    const res = await dispatch(fetchPayment({ query })).unwrap();
                    const page = res.data as IModelPaginate<IPayment> | undefined;
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
                                {range[0]}-{range[1]} trên {total} bản ghi
                            </div>
                        );
                    },
                }}
                rowSelection={false}
                toolBarRender={(_action, _rows): any => {
                    return (
                        <Access permission={ALL_PERMISSIONS.PAYMENTS.CREATE} hideChildren>
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => {
                                    setDataInit(null);
                                    setOpenModal(true);
                                }}
                            >
                                Thêm mới
                            </Button>
                        </Access>
                    );
                }}
            />
            <PaymentModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                reloadTable={reloadTable}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </div>
    );
};

export default PaymentTable;