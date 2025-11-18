import { Outlet } from 'react-router-dom'
import HomeHeader from 'components/client/HomeHeader';
import HomeFooter from 'components/client/HomeFooter';
import { ThemeProvider } from '@material-tailwind/react';
const LayoutClient = () => {
    return (
        <>
            <HomeHeader />
            <Outlet />
            <HomeFooter />
        </>
            
            
       
    )
}

export default LayoutClient