import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import "../../../../public/search.scss"
import { sfLike } from 'spring-filter-query-builder';
import { callFetchPatient } from '@/config/api';
import { IPatient } from '@/types/backend';
import { Modal, Tag } from 'antd';

interface IProps {
    openModalSearch: boolean;
    setOpenModalSearch: (v: boolean) => void;
    onSelectPatient?: (p: IPatient) => void;
}

const SearchPatient = (props: IProps) => {
    const { openModalSearch, setOpenModalSearch, onSelectPatient } = props;
    const [search, setSearch] = useState<any>("")
    const [searchTerm, setSearchTerm] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataTransfer, setDataTransfer] = useState<IPatient>();
    useEffect(() => {
        const fetchFilms = async () => {
            setIsLoading(true);
            let queryString = `page=0&size=5&`;
            if (search) {
                queryString += `filter=${sfLike('patientCode', search)}`
                const res = await callFetchPatient(queryString);
                if (res && res.data) {
                    setSearchTerm(res.data.result);
                }
            }
            setIsLoading(false);
        }
        fetchFilms();
    }, [search]);
    const handleOnClose = () => {
        setSearch('')
        setSearchTerm([])
    }
    const handleChangeVal = (e: { target: { value: string; } }) => {
        setSearch(e.target.value)
        if (e.target.value === '') {
            setSearch('')
            setSearchTerm([])
        }
    }
    const onClose = () => {
        setOpenModalSearch(false)
        setSearch('')
        setSearchTerm([])
    }
    const moveOnData = (data: IPatient) => {
        setDataTransfer(data)
        // Emit selected patient to parent (if provided)
        if (typeof onSelectPatient === 'function') onSelectPatient(data);
        setOpenModalSearch(false)
        setSearch('')
        setSearchTerm([])
    }
    const urlAvatarTemp = `${import.meta.env.VITE_BACKEND_URL}/storage/temp/user33.svg`;

    return (
        <Modal
            title="Tra cứu bệnh nhân"
            open={openModalSearch}
            onCancel={onClose}
            okButtonProps={{ disabled: true }}
            cancelButtonProps={{ disabled: true }}
        >
            <div className='search_section'>
                <div className='search_input_div'>
                    <span className='search_icon'>
                        {search === "" ? <SearchOutlined /> : <CloseOutlined onClick={() => handleOnClose()} />}
                    </span>
                    <input
                        style={{ outline: 'none', border: 'none' }}
                        className="search_input" type='text'
                        autoComplete='off'
                        placeholder="Nhập mã bệnh nhân..."
                        onChange={handleChangeVal}
                        value={search}
                    />
                </div>

                <div className='search_result'>
                    {searchTerm.length > 0 && (
                        <>
                            {searchTerm.map((data: IPatient, index: any) => (
                                <div key={index} className='search_suggestion_line_custom' onClick={() => moveOnData(data)}>
                                    <img className='search_thumb_custom' src={urlAvatarTemp} alt='' />
                                    <div className='search_info_custom'>
                                        <div className='search_title_custom'>{data.fullName}</div>
                                        <Tag style={{ width: "100%" }} color="cyan"> Mã BN: {data.patientCode || '??'}</Tag>
                                    </div>
                                </div>
                            ))}
                            <div className='search_enter_custom'>Enter để tìm kiếm</div>
                        </>
                    )}
                </div>
            </div>
        </Modal>

    )
}

export default SearchPatient