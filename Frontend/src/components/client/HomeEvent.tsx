import { Typography } from 'antd';
import AboutCard from "./AboutCard";


const EVENT_INFO = [
    {
        title: "Chuyên gia hàng đầu!",
        description:
            "quy tụ đội ngũ chuyên gia, bác sĩ, dược sĩ và điều dưỡng có trình độ chuyên môn cao, tay nghề giỏi, tận tâm và chuyên nghiệp. Luôn đặt người bệnh làm trung tâm, cam kết đem đến dịch vụ chăm sóc sức khỏe tốt cho khách hàng. ",
        subTitle: "#1",
    },
    {
        title: "Chất lượng quốc tế!",
        description:
            "Hệ thống Y tế được quản lý và vận hành dưới sự giám sát của những nhà quản lý y tế giàu kinh nghiệm, cùng với sự hỗ trợ của phương tiện kỹ thuật hiện đại, nhằm đảm bảo cung cấp dịch vụ chăm sóc sức khỏe toàn diện và hiệu quả.",
        subTitle: "#2",
    },
];
const HomeEvent = () => {
    return (
        <section className="container mx-auto flex flex-col items-center px-4 py-10">
            <Typography.Title level={5} className="text-center mb-2" style={{ color: 'orange' }}>
                Về Chúng Tôi
            </Typography.Title>
            <Typography.Title level={2} className="text-center" style={{ color: '#374151' }}>
                Tại sao bạn nên chọn chúng tôi?
            </Typography.Title>
            <Typography.Paragraph
                className="mt-2 lg:max-w-4xl mb-8 w-full text-center font-normal !text-gray-500"
            >
                GR29 là Hệ thống Y tế tư nhân duy nhất tại Việt Nam hoạt động không vì mục tiêu lợi nhuận,
                có 2 bệnh viện đạt chứng chỉ tiêu chuẩn JCI – Tiêu chuẩn về an toàn người bệnh và chất lượng bệnh viện khắt khe nhất thế giới,
                cùng các chứng chỉ quốc tế trong từng lĩnh vực chuyên môn uy tín.

            </Typography.Paragraph>
            <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {EVENT_INFO.map((props, idx) => (
                    <AboutCard key={idx} {...props} />
                ))}
                <div className="md:col-span-2">
                    <AboutCard
                        title="Công nghệ tiên tiến!"
                        subTitle="#3"
                        description="Cung cấp cơ sở vật chất hạng nhất và dịch vụ 5 sao bằng cách sử dụng các công nghệ tiên tiến được quản lý bởi các bác sĩ lâm sàng lành nghề để đảm bảo dịch vụ chăm sóc sức khỏe toàn diện và hiệu quả cao."
                    />
                </div>
            </div>
        </section>
    )
}

export default HomeEvent