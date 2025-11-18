import React from 'react'

import { Typography } from "@material-tailwind/react";
import { Image } from 'antd';

const SPONSORS = [
    "coinbase",
    "spotify",
    "pinterest",
    "google",
    "amazon",
    "netflix",
    "hust"
];
const HomeSponsered = () => {
    return (
        <section className="py-8 px-8 lg:py-20">
            <div className="container mx-auto text-center">
                <Typography variant="h4" color="blue-gray" className="mb-8">
                    Đối tác của chúng tôi
                </Typography>
                <div className="flex flex-wrap items-center justify-center gap-6">
                    {SPONSORS.map((logo, key) => (
                        <Image
                            width={180}
                            height={250}
                            key={key}
                            src={`/src/assets/logos/logo-${logo}.svg`}
                            fallback={`/src/assets/logos/logo-${logo}.png`}
                            alt={logo}
                            className="w-30"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomeSponsered