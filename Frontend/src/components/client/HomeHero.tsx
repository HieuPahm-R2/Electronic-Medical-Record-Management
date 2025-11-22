import React, { useState } from 'react'
import { IconButton, Button, Typography } from "@material-tailwind/react";
import { PlayIcon } from "@heroicons/react/24/solid";

const HomeHero = () => {

    return (
        <div className="relative min-h-screen w-full bg-[url('src/assets/images/vinmec-bg.jpg')] bg-cover bg-no-repeat bg-center">
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
                        <Button variant="gradient" color="white">
                            Đặt Lịch Ngay
                        </Button>
                        <IconButton className="rounded-full bg-white p-6">
                            <PlayIcon className="h-4 w-4 text-gray-900" />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHero