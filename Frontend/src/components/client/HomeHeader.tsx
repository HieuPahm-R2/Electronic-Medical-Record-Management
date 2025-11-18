import {
    Navbar as MTNavbar, Collapse, Button, IconButton, Typography
} from "@material-tailwind/react";
import {
    RectangleStackIcon,
    UserCircleIcon,
    CommandLineIcon,
    XMarkIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

interface NavItemProps {
    children: React.ReactNode;
    href?: string;
}
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

const NavItem = ({ children, href }: NavItemProps) => {
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
                    <Button color={isScrolling ? "gray" : "white"} variant="text" onResize={undefined} onResizeCapture={undefined}>
                        Đăng nhập
                    </Button>
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