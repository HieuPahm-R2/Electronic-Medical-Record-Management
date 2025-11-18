import React from 'react'
import { Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

const FAQS = [
    {
        title: "1. Bệnh viện cung cấp những dịch vụ khám chữa bệnh nào?",
        desc: "Bệnh viện thường cung cấp các dịch vụ như: khám tổng quát, khám chuyên khoa (tim mạch, tiêu hoá, hô hấp, sản – nhi…), cấp cứu 24/7, xét nghiệm – chẩn đoán hình ảnh, phẫu thuật, điều trị nội trú và ngoại trú.",
    },
    {
        title: "2. Quy trình đăng ký khám bệnh như thế nào?",
        desc: "Người bệnh có thể đăng ký trực tiếp tại quầy tiếp nhận, đặt lịch qua hotline, qua website hoặc ứng dụng của bệnh viện. Sau khi đăng ký, bệnh nhân chờ đến lượt khám và thực hiện theo hướng dẫn của nhân viên y tế.",
    },
    {
        title: "3. Chi phí khám và điều trị có được công khai không?",
        desc: "Hầu hết bệnh viện đều công khai bảng giá dịch vụ. Chi phí cụ thể phụ thuộc vào loại hình khám, xét nghiệm, điều trị và việc có sử dụng bảo hiểm y tế hay không.",
    },
    {
        title: "4. Bệnh viện có chấp nhận bảo hiểm y tế và bảo hiểm tư nhân không?",
        desc: "Đa số bệnh viện chấp nhận bảo hiểm y tế (BHYT) và một số bảo hiểm sức khỏe tư nhân. Tỷ lệ thanh toán tùy vào quy định của từng loại bảo hiểm và phạm vi quyền lợi của bệnh nhân.",
    },
    {
        title: "5. Cơ sở vật chất và đội ngũ bác sĩ có đảm bảo chất lượng không?",
        desc: "Bệnh viện thường có đội ngũ bác sĩ chuyên môn được đào tạo bài bản, máy móc chẩn đoán hiện đại (siêu âm, CT, MRI…), phòng bệnh sạch sẽ và tiêu chuẩn vệ sinh đảm bảo an toàn cho người bệnh.",
    },
];

const Faqs = () => {
    const [open, setOpen] = React.useState(0);
    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
    return (
        <section className="py-8 px-8 lg:py-20">
            <div className="container mx-auto">
                <div className="text-center">
                    <Typography variant="h1" color="blue-gray" className="mb-4">
                        Frequently asked questions
                    </Typography>
                    <Typography

                        variant="lead"
                        className="mx-auto mb-24 lg:w-3/5 !text-gray-500"
                    >
                        Chúng tôi ở đây để giải đáp những thắc mắc thường gặp nhất của bạn và cung cấp cho bạn thông tin cần thiết để tận dụng tối đa trải nghiệm hội nghị của mình.
                    </Typography>
                </div>

                <div className="mx-auto lg:max-w-screen-lg lg:px-20">
                    {FAQS.map(({ title, desc }, key) => (
                        <Accordion
                            key={key}
                            open={open === key + 1}
                            onClick={() => handleOpen(key + 1)}
                        >
                            <AccordionHeader className="text-left text-gray-900">
                                {title}
                            </AccordionHeader>
                            <AccordionBody>
                                <Typography

                                    color="blue-gray"
                                    className="font-normal text-gray-500"
                                >
                                    {desc}
                                </Typography>
                            </AccordionBody>
                        </Accordion>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Faqs