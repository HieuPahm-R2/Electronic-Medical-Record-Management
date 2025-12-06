import ReactApexChart from 'react-apexcharts';
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";

const LineChart = () => {
  const { Title, Paragraph } = Typography
  const series = [
    {
      name: 'Mobile apps',
      data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
      offsetY: 0,
    },
    {
      name: 'Websites',
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
      offsetY: 0,
    },
  ];

  const options = {
    chart: {
      width: '100%',
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: ['#8c8c8c'],
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: [
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
          ],
        },
      },
      categories: [
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
      ],
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  return (
    <div id="chart">
      <div className="linechart">
        <div>
          <Title level={5}>Tần suất người dùng truy cập</Title>
          <Paragraph className="lastweek">
            nhiều hơn tuần trước <span className="bnb2">+30%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Lượng truy cập</li>
            <li>{<MinusOutlined />} Đăng ký hẹn khám</li>
          </ul>
        </div>
      </div>
      <ReactApexChart
        className="full-width"
        options={options}
        series={series} type="area"
        height={350} width={450} />
    </div>
  );
};

export default LineChart;
