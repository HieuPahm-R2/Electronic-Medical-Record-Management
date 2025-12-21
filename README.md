
# Hệ thống Quản Lý Bệnh Án Điện Tử (EMR)

Một nền tảng quản lý bệnh án hiện đại được xây dựng với công nghệ web tiên tiến. Dự án được thực hiện cho học phần ET3260 - Kỹ thuật phần mềm ứng dụng.
## 👥 Đóng Góp

Các contributors của dự án:
- [@HieuPahmr2](https://github.com/HieuPahm-R2)
## 📋 Mục Đích

Hệ thống EMR (Electronic Medical Records) cung cấp giải pháp toàn diện để:
- Quản lý thông tin bệnh nhân
- Lưu trữ và truy cập hồ sơ y tế điện tử
- Quản lý các cuộc hẹn khám bệnh
- Quản lý người dùng và quyền truy cập
- Hỗ trợ các chức năng quản lý bệnh viện

## 🚀 Tính Năng Chính

### Dành cho Bệnh Nhân
- Đăng ký và đăng nhập tài khoản
- Xem thông tin bệnh sử cá nhân
- Đặt lịch khám bệnh
- Tìm kiếm thông tin y tế

### Dành cho Nhân Viên Quản Trị / Doctor / Nurse
- Quản lý danh sách bệnh nhân
- Quản lý bệnh án và kết quả xét nghiệm
- Quản lý lịch hẹn
- Quản lý người dùng hệ thống
- Quản lý quyền hạn và vai trò
- Xem thống kê và biểu đồ

## 💻 Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Ngôn ngữ lập trình
- **Redux** - State management
- **TailwindCSS** - Styling framework
- **Ant Design Pro Components** - Component library
- **Vite** - Build tool
- **NGINX** - Web server (production)

### Backend
- **Java** - Ngôn ngữ lập trình
- **Spring Boot** - Framework chính
- **Spring Security** - Xác thực và phân quyền
- **Spring Data JPA** - ORM
- **MySQL** - Database
- **Redis** - Caching

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📋 Yêu Cầu Hệ Thống

### Backend
- Java 11 trở lên
- Maven 3.6+
- MySQL 5.7+ hoặc MariaDB
- Redis 6.0+

### Frontend
- Node.js 16+
- npm 7+ hoặc yarn

### Docker (tùy chọn)
- Docker 20.10+
- Docker Compose 1.29+

## 📦 Cài Đặt và Chạy

### 1. Clone Repository

```bash
git clone <repository-url>
cd EMR-restful-project
```

### 2. Cài Đặt Backend

```bash
cd Backend

# Cấu hình database trong application.yaml
# src/main/resources/application.yaml

# Build project
mvn clean install

# Chạy application
mvn spring-boot:run
```

### 3. Cài Đặt Frontend

```bash
cd Frontend

# Cài đặt dependencies
npm install

# Cấu hình API endpoint trong file config
# src/config/api.ts

# Chạy development server
npm run dev

# Build production
npm run build
```

### 4. Chạy với Docker (Tùy chọn)

```bash
cd docker-deploy

# Khởi động các service
docker-compose up -d

chmod +x real-ssl.sh
./real-ssl.sh

# Hoặc sử dụng fake SSL cho development
chmod +x fake-ssl.sh
./fake-ssl.sh
```
### 5. Triển khai dự án lên môi trường thực tế - production (VPS)

```bash
# di chuyển đến thư mục docker-deploy trong server HDH
cd docker-deploy
# Cài đặt dos2unix để convert 2 file .sh sao cho môi trường Linux hiểu được
dos2unix fake-ssl.sh
dos2unix real-ssl.sh
# tạo fake cert ssl trước
bash fake-ssl.sh
# tạo cert thật
bash real-ssl.sh
```

## 📁 Cấu Trúc Project

```
EMR-restful-project/
├── Backend/                    # Spring Boot application
│   ├── src/
│   │   ├── main/java/         # Source code
│   │   ├── resources/         # Configuration files
│   │   └── test/              # Unit tests
│   └── pom.xml               # Maven configuration
├── Frontend/                   # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── redux/             # Redux store & slices
│   │   ├── config/            # API configuration
│   │   └── types/             # TypeScript definitions
│   └── package.json           # NPM dependencies
├── docker-deploy/             # Docker configuration
│   ├── docker-compose.yml
│   ├── nginx/                 # NGINX configuration
│   └── scripts/               # Deployment scripts
└── storage/                   # File storage directories
```

## 🔐 Biến Môi Trường

### Backend (application.yaml)
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:**your-port**/emr_db
    username: root
    password: your_password
  jpa:
    hibernate:
      ddl-auto: update
  redis:
    host: localhost
    port: 6379
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8085/api
```


## 📝 Hướng Dẫn Phát Triển

### Quy tắc Code
- Tuân theo chuẩn Java Conventions và TypeScript Best Practices
- Sử dụng meaningful names cho variables, functions, classes
- Viết unit tests cho các hàm logic phức tạp
- Commit messages phải rõ ràng và mô tả rõ thay đổi

### Branching Strategy
- `main` - Production release
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

## 🐛 Báo Cáo Lỗi

Nếu bạn phát hiện lỗi, vui lòng tạo issue mới với:
- Mô tả chi tiết về lỗi
- Bước tái tạo (steps to reproduce)
- Expected behavior vs actual behavior
- Screenshots (nếu có liên quan)

## 📄 Giấy Phép

Dự án được cấp phép dưới [MIT License](https://choosealicense.com/licenses/mit/)

## 📞 Liên Hệ

Để có thêm thông tin hoặc hỗ trợ, vui lòng tạo issue trên GitHub repository này.

