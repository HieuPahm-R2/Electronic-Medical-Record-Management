import React, { useState } from 'react'
import { IconButton, Button, Typography } from "@material-tailwind/react";
import { PlayIcon } from "@heroicons/react/24/solid";
import HomeSubscribe from './HomeSubscribe';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo1 from "../../../public/vinmec-bg.jpg";

const HomeHero = () => {
    const [openForm, setOpenForm] = useState<boolean>(false);
    const isAuthenticatedb = useSelector((state: any) => state.account.isAuthenticated);
    const navigate = useNavigate()
    const handleOnFormModal = () => {
        if (!isAuthenticatedb) {
            navigate("/login")
        }
        setOpenForm(true)
    }
    return (
        <div className="relative min-h-screen w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${logo1})` }}>
            <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
            <div className="grid min-h-screen px-8">
                <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
                    <Typography variant="h3" color="white" className="mb-2">
                        Tư vấn và giải đáp các vấn đề của bạn
                    </Typography>
                    <Typography variant="h1" color="white" className="lg:max-w-3xl">
                        Chăm sóc bằng tài năng,y đức và sự thấu cảm
                    </Typography>
                    <Typography
                        variant="lead"
                        color="white"
                        className="mt-1 mb-12 w-full md:max-w-full lg:max-w-2xl"
                    >
                        Đặt lịch hẹn nhanh chóng, tiện lợi
                    </Typography>
                    <div className="flex items-center gap-4">
                        <Button variant="gradient" color="white" onClick={handleOnFormModal}>
                            Đặt Lịch Ngay
                        </Button>
                        <IconButton className="rounded-full bg-white p-6">
                            <PlayIcon className="h-4 w-4 text-gray-900" />
                        </IconButton>
                    </div>
                </div>
            </div>
            <HomeSubscribe openForm={openForm} setOpenForm={setOpenForm} />
        </div>
    )
}

export default HomeHero