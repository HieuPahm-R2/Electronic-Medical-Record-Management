import Faqs from '@/components/client/Faqs'
import HomeEvent from '@/components/client/HomeEvent'
import HomeHero from '@/components/client/HomeHero'
import HomeSponsered from '@/components/client/HomeSponsered'
import React from 'react'

const HomePageClient = () => {
    return (
        <>
            <HomeHero />
            <HomeSponsered />
            <HomeEvent />
            <Faqs />
        </>
    )
}

export default HomePageClient