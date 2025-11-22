import { Navbar as MTNavbar, Collapse, Button, IconButton, Typography } from "@material-tailwind/react";
import { RectangleStackIcon, UserCircleIcon, CommandLineIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAPI } from '@/config/api.fast';
import { runLogoutAction } from '@/redux/slice/accountSlice';
import { Avatar, Dropdown, message, Space } from 'antd';
import { DownOutlined } from "@ant-design/icons";

const NAV_MENU = [
    {
        name: "Trang chủ",
        icon: RectangleStackIcon,
    },
    {
        name: "Hướng dẫn khách hàng",
        icon: UserCircleIcon,
    },
    {
        name: "Về chúng tôi",
        icon: CommandLineIcon,
        href: "https://www.material-tailwind.com/docs/react/installation",
    },
];

const NavItem = ({ children, href }) => {

    return (
        <li>
            <Typography
                as="a"
                href={href || "#"}
                target={href ? "_blank" : "_self"}
                variant="paragraph"
                className="flex items-center gap-2 font-medium"
                onResize={undefined} onResizeCapture={undefined}            >
                {children}
            </Typography>
        </li>
    );
}

const HomeHeader = () => {
    const [open, setOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isAuthenticatedb = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const handleMenuClick = ({ key }) => {
        if (key === 'account') setIsModalOpen(true);
        if (key === 'admin') navigate('/admin');
        if (key === 'logout') handleLogout();
    }
    const handleLogout = async () => {
        await LogoutAPI();
        dispatch(runLogoutAction(null));
        message.success("Logout successfully");
        navigate("/")

    }
    // link to access avatar
    // const urlAvatarTemp = `${import.meta.env.VITE_BACKEND_URL}/storage/temp/user33.svg`;
    // const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/storage/avatar/${user?.avatar}`;
    let items = [
        {
            label: <label>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label>Đăng xuất</label>,
            key: 'logout',
        },
    ];
    if (user?.role?.name === "ADMIN") {
        items.unshift({
            label: <label>Administrator Dashboard</label>,
            key: 'admin',
        })
    }

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpen(false)
        );
    }, []);


    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 0) {
                setIsScrolling(true);
            } else {
                setIsScrolling(false);
            }
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleOpen = () => setOpen((cur) => !cur);
    return (
        <MTNavbar
            shadow={false}
            fullWidth
            blurred={false}
            color={isScrolling ? "white" : "transparent"}
            className="fixed top-0 z-50 border-0"
            onResize={undefined} onResizeCapture={undefined}>
            <div className="container mx-auto flex items-center justify-between">
                <Typography
                    color={isScrolling ? "blue-gray" : "white"}
                    className="text-lg font-bold"
                    onResize={undefined} onResizeCapture={undefined}                >
                    GROUP 29 Production
                </Typography>
                <ul
                    className={`ml-10 hidden items-center gap-6 lg:flex ${isScrolling ? "text-gray-900" : "text-white"
                        }`}
                >
                    {NAV_MENU.map(({ name, icon: Icon, href }) => (
                        <NavItem key={name} href={href}>
                            <Icon className="h-5 w-5" />
                            <span>{name}</span>
                        </NavItem>
                    ))}
                </ul>
                <div className="hidden items-center gap-4 lg:flex">
                    {!isAuthenticatedb ?
                        <Link to={"/login"} className="header__user">
                            <Button color={isScrolling ? "gray" : "white"} variant="text" onResize={undefined} onResizeCapture={undefined}>
                                Đăng nhập
                            </Button>
                        </Link>
                        :
                        <div >
                            <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']} >
                                <a style={{ color: "white", cursor: "pointer" }} onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <Avatar src={user?.avatar ? urlAvatar : urlAvatarTemp} />
                                        Welcome_{user?.name}
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                            <NotificationBell userId={user?.id} />
                        </div>
                    }

                    <a href="https://www.material-tailwind.com/blocks" target="_blank">
                        <Button color={isScrolling ? "gray" : "white"} onResize={undefined} onResizeCapture={undefined}>Đặt Lịch Hẹn</Button>
                    </a>
                </div>
                <IconButton
                    variant="text"
                    color={isScrolling ? "gray" : "white"}
                    onClick={handleOpen}
                    className="ml-auto inline-block lg:hidden"
                    onResize={undefined} onResizeCapture={undefined}
                >
                    {open ? (
                        <XMarkIcon strokeWidth={2} className="h-6 w-6" />
                    ) : (
                        <Bars3Icon strokeWidth={2} className="h-6 w-6" />
                    )}
                </IconButton>
            </div>
            <Collapse open={open}>
                <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
                    <ul className="flex flex-col gap-4 text-gray-900">
                        {NAV_MENU.map(({ name, icon: Icon, href }) => (
                            <NavItem key={name} href={href}>
                                <Icon className="h-5 w-5" />
                                {name}
                            </NavItem>
                        ))}
                    </ul>
                    <div className="mt-6 flex items-center gap-4">
                        <Button onResize={undefined} onResizeCapture={undefined} variant="text">Log in</Button>
                        <a href="https://www.materila-tailwind.com/blocks" target="_blank">
                            <Button onResize={undefined} onResizeCapture={undefined} color="gray">blocks</Button>
                        </a>
                    </div>
                </div>
            </Collapse>
        </MTNavbar>
    );
}

export default HomeHeader