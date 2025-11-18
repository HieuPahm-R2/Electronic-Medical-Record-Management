import { Typography, Button, IconButton, Carousel } from "@material-tailwind/react";
const CURRENT_YEAR = new Date().getFullYear();
const LINKS = ["Company", "About Us", "Team", "Products", "Blog"];
const HomeFooter = () => {

    return (
        <footer className="pb-5 p-10 md:pt-10">
            <div className="container flex flex-col mx-auto">
                <div className="!w-full py-5 mb-5 md:mb-10 max-w-5xl mx-auto p-5 ">

                    <Carousel className="rounded-xl h-40 md:h-56 overflow-hidden">
                        <img
                            src="../../../public/vin1.jpg"
                            alt="image 1"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src="../../../public/vin2.png"
                            alt="image 2"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src="../../../public/vin3.jpg"
                            alt="image 3"
                            className="h-full w-full object-cover"
                        />
                    </Carousel>

                </div>
                <div className="flex flex-col md:flex-row items-center !justify-between">
                    <Typography
                        as="a"
                        href="https://www.material-tailwind.com"
                        target="_blank"
                        variant="h6"
                        className="text-gray-900"
                    >
                        Group 29 Production
                    </Typography>
                    <ul className="flex justify-center my-4 md:my-0 w-max mx-auto items-center gap-4">
                        {LINKS.map((link, index) => (
                            <li key={index}>
                                <Typography
                                    as="a"
                                    href="#"
                                    variant="small"
                                    color="white"
                                    className="font-normal !text-gray-700 hover:!text-gray-900 transition-colors"
                                >
                                    {link}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                    <div className="flex w-fit justify-center gap-2">
                        <IconButton size="sm" color="gray" variant="text">
                            <i className="fa-brands fa-twitter text-lg" />
                        </IconButton>
                        <IconButton size="sm" color="gray" variant="text">
                            <i className="fa-brands fa-youtube text-lg" />
                        </IconButton>
                        <IconButton size="sm" color="gray" variant="text">
                            <i className="fa-brands fa-instagram text-lg" />
                        </IconButton>
                        <IconButton size="sm" color="gray" variant="text">
                            <i className="fa-brands fa-github text-lg" />
                        </IconButton>
                    </div>
                </div>
                <Typography
                    color="blue-gray"
                    className="text-center mt-12 font-normal !text-gray-700"
                >
                    &copy; {CURRENT_YEAR} Made with{" "}
                    <a href="https://www.material-tailwind.com" target="_blank">
                        Material Tailwind
                    </a>{" "}
                    by{" "}
                    <a href="https://www.creative-tim.com" target="_blank">
                        HieuPahm-R2
                    </a>
                    .
                </Typography>
            </div>
        </footer>
    );
}

export default HomeFooter