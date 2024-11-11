-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th10 10, 2024 lúc 04:13 PM
-- Phiên bản máy phục vụ: 8.0.30
-- Phiên bản PHP: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `datn`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `addresses`
--

CREATE TABLE `addresses` (
  `Address_ID` int NOT NULL,
  `Street` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brands`
--

CREATE TABLE `brands` (
  `Brand_ID` int NOT NULL,
  `Brand_Name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Brand_Image` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `brands`
--

INSERT INTO `brands` (`Brand_ID`, `Brand_Name`, `Brand_Image`) VALUES
(1, 'Sunhouse', ''),
(2, 'Kangaroo', ''),
(3, 'SATO', ''),
(4, 'Philips', ''),
(5, 'Bluestone', ''),
(6, 'Goldsuni', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `Category_ID` int NOT NULL,
  `Category_Name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Category_Image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Show_Hidden` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`Category_ID`, `Category_Name`, `Category_Image`, `Show_Hidden`) VALUES
(1, 'Bếp điện', 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSwYx4UQC79mfs1VKJAfNtx31lxRKuXxoP7biKtnLfgEi3qFvRaKHwcqgprauZdKOrRJhesNaqA64MMPVHRW-PLbS8eoIPluehKD1ovAY3mEC4gffgRQuOc&usqp=CAE', 1),
(2, 'Máy xay sinh tố', 'https://bizweb.dktcdn.net/thumb/small/100/489/006/collections/ble3888dg-01-1-removebg-preview.png?v=1714036125620', 1),
(3, 'Nồi các loại', 'https://bizweb.dktcdn.net/thumb/small/100/489/006/collections/el8267-01-4.jpg?v=1721032201707', 1),
(4, 'Dao', 'https://bizweb.dktcdn.net/thumb/small/100/489/006/collections/el-8404aw-01-removebg-preview.png?v=1714613768520', 1),
(5, 'Lò vi sóng\r\n', 'https://images.samsung.com/is/image/samsung/vn-microwaves-oven-grill-mg23t5018ck-mg23t5018ck-sv-frontblack-224905868?$2052_1641_PNG$', 1),
(6, 'Máy hút bụi', 'https://product.hstatic.net/200000661969/product/may_hut_bui_philips_fc935001_powerpro_compact__11__8bb9f18c44d641c98cf890624ed22038_grande.png', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `Order_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Voucher_ID` int DEFAULT NULL,
  `Status` int NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Phone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `User_Name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_method` enum('COD','Online') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Product_Name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_quantity` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`Order_ID`, `User_ID`, `Voucher_ID`, `Status`, `Email`, `Phone`, `User_Name`, `Address`, `payment_method`, `total_amount`, `created_at`, `Product_Name`, `total_quantity`) VALUES
(1, 2, 1, 3, 'sangnmps34186@fpt.edu.vn', '123', 'MinhSang123', '123-Phần mềm Quang Trung\r\n', NULL, NULL, '2024-11-08 15:36:02', NULL, 0),
(2, 2, 1, 5, NULL, NULL, NULL, NULL, 'COD', 1782852.00, '2024-11-05 11:46:26', NULL, 0),
(3, 2, 1, 5, NULL, NULL, NULL, NULL, 'COD', 12342323.00, '2023-11-08 11:53:13', NULL, 0),
(4, 2, 1, 5, NULL, NULL, NULL, NULL, 'COD', 12342323.00, '2023-08-08 11:53:13', NULL, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `Order_Detail_ID` int NOT NULL,
  `Order_ID` int NOT NULL,
  `Product_ID` int NOT NULL,
  `Product_Name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Quantity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`Order_Detail_ID`, `Order_ID`, `Product_ID`, `Product_Name`, `Price`, `Quantity`) VALUES
(1, 1, 1, 'sang', 9999.00, 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_status`
--

CREATE TABLE `order_status` (
  `Status_ID` int NOT NULL,
  `Status_Name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_status`
--

INSERT INTO `order_status` (`Status_ID`, `Status_Name`) VALUES
(1, 'Chờ xác nhận'),
(2, 'Đã xác nhận'),
(3, 'Đang chuẩn bị hàng'),
(4, 'Đang vận chuyển'),
(5, 'Đã giao hàng'),
(6, 'Đã hủy');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `Payments_ID` int NOT NULL,
  `Order_ID` int NOT NULL,
  `Payments_Method` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Payments_Status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Amount` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `Product_ID` int NOT NULL,
  `Category_ID` int NOT NULL,
  `Brand_ID` int NOT NULL,
  `Product_Name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Promotion` int DEFAULT NULL,
  `Price` int DEFAULT NULL,
  `Image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Views` int DEFAULT NULL,
  `Show_Hidden` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`Product_ID`, `Category_ID`, `Brand_ID`, `Product_Name`, `Description`, `Promotion`, `Price`, `Image`, `Views`, `Show_Hidden`) VALUES
(1, 2, 1, 'Máy làm sữa hạt RANBEM RB-769S đa tính năng update', '– Mã sp: RB-769S 12 tính năng\r\n– Vật liệu Cối: Thủy tinh chịu lực, chịu nhiệt cao\r\n– Dung tích Cối: 1,75 lít\r\n– Tổng công suất: 1500W; công suất nấu 800W; công suất xay 700W\r\n– Điện áp 220V-50Hz\r\n– Tốc độ vòng quay: 48.000 vòng/phút\r\n– Kích thước: 232x200', 0, 1500000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/M%C3%A1y-xay-n%E1%BA%A5u-s%E1%BB%AFa-h%E1%BA%A1t-Ranbem-769S-790x790.jpg', 12, 1),
(3, 2, 1, 'MÁY XAY CÔNG NGHIỆP GERTECH GT-2268', '– Tên sp: Máy Xay Công Nghiệp Gertech\r\n– Mã sp: GT-2268\r\n– Công dụng: Xay hạt khô, cà phê, các loại đậu; xay thịt, cá, xương; xay hoa quả, sinh tố, sữa lắc…\r\n– Vật liệu Cối: Nhựa cứng chịu lực, chịu nhiệt cao\r\n– Dung tích Cối: 2,2 lít\r\n– Bộ dao: 4 lưỡi\r\n–', 0, 3250000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/M%C3%A1y-xay-c%C3%B4ng-nghi%E1%BB%87p-gertech-gt-2268-1.jpg', 56, 1),
(4, 2, 1, 'Máy Xay Nấu Cách Âm Chống Ồn Đa Năng GERTECH GT-686 Chính Hãng', '– Tên SP: Máy Xay Nấu Cách Âm Chống Ồn Đa Năng GERTECH\r\n– Mã SP: GT-686\r\n– Trọng lượng: 3,5 kg\r\n– Thể tích: 1,75 lít\r\n– Công suất: 800W (Xay) – 800W (Làm nóng)\r\n– 09 tốc độ xay; 08 chương trình chế biến thực phẩm; Cùng chức năng tùy chỉnh tốc độ, thời gia', 0, 4950000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2022/07/M%C3%A1y-xay-n%E1%BA%A5u-%C4%91%E1%BB%99-%E1%BB%93n-th%E1%BA%A5p-GT-008.png', 23, 1),
(5, 2, 4, 'Máy xay nấu sữa hạt RANBEM RB-775\r\n', '– Mã sp: RB-775\r\n– Vật liệu Cối: Thủy tinh chịu lực, chịu nhiệt cao\r\n– Dung tích Cối: 1,2 lít\r\n– Tổng công suất: 1600W; công suất nấu 800W; công suất xay 800W\r\n– Điện áp 220V-50Hz\r\n– Tốc độ vòng quay: 58.000 vòng/phút\r\n– Kích thước: 180x180x465mm\r\n– Công ', 0, 1300000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/M%C3%A1y-xay-n%E1%BA%A5u-s%E1%BB%AFa-h%E1%BA%A1t-Ranbem-775-v%C3%A0ng-n%C3%A2u-790x790.jpg', 15, 1),
(6, 2, 1, 'MÁY XAY NẤU THỰC PHẨM HAIPAI HAP-522', '– Mã sp: HAP-522\r\n– Dung tích cối: 1,75 lít\r\n– Công suất nấu 800W; Công suất xay: tối đa 1100W\r\n– Tốc độ: 35.000 vòng/phút\r\n– Bộ dao 3 lớp với 8 lưỡi\r\n– Trọng lượng: 5,5kg\r\n– Công dụng: Xay, nấu thực phẩm đa năng (súp, thịt, xương…); làm sữa hạt; làm sinh', 0, 1600000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/M%C3%A1y-xay-n%E1%BA%A5u-th%E1%BB%B1c-ph%E1%BA%A9m-Haipai-HAP-522-1.jpg', 25, 1),
(7, 2, 1, 'Máy xay sinh tố Sunhouse SHD5112', 'Model:	SHD5112\r\nMàu sắc:	Xanh Lá\r\nNhà sản xuất:	Sunhouse\r\nXuất xứ:	Trung Quốc\r\nNăm ra mắt :	Đang cập nhật\r\nThời gian bảo hành:	12 Tháng\r\nĐịa điểm bảo hành:	Nguyễn Kim\r\nLoại máy xay sinh tố:	Máy xay sinh tố\r\nCông suất :	350W\r\nDung tích cối:	Cối lớn: 1 lít,', 0, 490000, 'https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//Apro/Apro_product_25744/may-xay-sinh-to_main_252_1020.png.webp', 65, 1),
(8, 2, 4, 'Máy xay sinh tố Philips HR2221/00', 'Model:	HR2221/00\r\nMàu sắc:	Trắng Tím\r\nNhà sản xuất:	Philips\r\nXuất xứ:	Trung Quốc\r\nNăm ra mắt :	2020\r\nThời gian bảo hành:	24 Tháng\r\nĐịa điểm bảo hành:	Nguyễn Kim\r\nLoại máy xay sinh tố:	Máy xay sinh tố\r\nCông suất :	700W\r\nDung tích cối:	Cối lớn 1.5 lít - Cố', 0, 1250000, 'https://cdn.nguyenkimmall.com/images/thumbnails/600/336/detailed/666/10046695-may-xay-sinh-to-philips-hr2221-1.jpg', 45, 1),
(9, 2, 1, 'Máy xay sinh tố Happy Cook HCB-150C', 'Model:	HCB-150C\r\nMàu sắc:	Đen\r\nNhà sản xuất:	Happy Cook\r\nXuất xứ:	Indonesia\r\nNăm ra mắt :	2019\r\nThời gian bảo hành:	6 Tháng\r\nĐịa điểm bảo hành:	Nguyễn Kim\r\nLoại máy xay sinh tố:	Máy xay sinh tố\r\nCông suất :	300W\r\nDung tích cối:	1.5 lít', 0, 590000, 'https://cdn.nguyenkimmall.com/images/thumbnails/600/336/detailed/72/10010991-may-xay-sinh-to-happy-cook-hcb-150c-1.jpg', 99, 1),
(10, 2, 4, 'Máy xay sinh tố Panasonic MX-EX1001WRA', 'Model:	MX-EX1001WRA\r\nMàu sắc:	Trắng\r\nNhà sản xuất:	Panasonic\r\nXuất xứ:	Trung Quốc\r\nNăm ra mắt :	2022\r\nThời gian bảo hành:	12 Tháng\r\nĐịa điểm bảo hành:	Nguyễn Kim\r\nLoại máy xay sinh tố:	Máy xay sinh tố\r\nCông suất :	450W\r\nDung tích cối:	1 lít', 0, 690000, 'https://cdn.nguyenkimmall.com/images/thumbnails/696/522/detailed/805/10052379-may-xay-sinh-to-panasonic-mx-ex1001wra-1.jpg', 54, 1),
(11, 1, 5, 'Bếp từ Teka VR TC 95 4L\r\n', 'Mã sản phẩm: VR TC 95\r\nXuất xứ:\r\nThương hiệu: Teka\r\nLoại sản phẩm: Bếp Từ Teka\r\nBảo hành: 36 tháng\r\nTình trạng: còn hàng\r\nSố bếp nấu: 4 Lò\r\nMặt kính: Euro Kara của Pháp\r\nĐiều khiển: Cảm ứng riêng biệt\r\nChức năng: khóa bàn phím và hẹn giờ bật giờ tắt bếp\r\n', 0, 37450000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp01.jpg', 78, 1),
(12, 1, 6, 'Bếp Từ Teka IZ 7210', 'Xuất xứ: Châu Âu\r\nLoại sản phẩm: Bếp từ\r\nHãng sản xuất: Teka\r\nBếp điện từ, lắp âm\r\nĐiều khiển bằng cảm ứng, dạng trượt\r\nMặt bếp bằng kính ceramic, chịu nhiệt\r\nCài đặt chương trình riêng biệt cho từng bếp nấu\r\nChức năng Power\r\nHệ thống nhận diện đáy nồi\r\nC', 0, 13750000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp97-1.jpg', 59, 1),
(13, 1, 5, 'Bếp Từ Teka IRS 641', 'Mã sản phẩm: IRS 641\r\nXuất xứ: Tây Ban Nha\r\nThương hiệu: Teka\r\nLoại sản phẩm: Bếp Từ Teka\r\nBảo hành: 36 tháng\r\nTình trạng: còn hàng\r\nSố bếp nấu: 4 Lò\r\nMặt kính: Ceramic\r\nĐiều khiển: cảm ứng dạng trượt slider\r\nChức năng: khóa bàn phím và hẹn giờ bật giờ tắ', 0, 17240000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/bep-tu-teka-irs-641-p49.png', 58, 1),
(14, 1, 5, 'Bếp Từ Teka IRF 641', 'Mã sản phẩm: IRF 641\r\nXuất xứ: Tây Ban Nha\r\nThương hiệu: Teka\r\nLoại sản phẩm: Bếp Từ Teka\r\nBảo hành: 36 tháng\r\nTình trạng: còn hàng\r\nSố bếp nấu: 4 Lò\r\nMặt kính: Ceramic\r\nĐiều khiển: cảm ứng dạng trượt slider\r\nChức năng: khóa bàn phím và hẹn giờ bật giờ tắ', 0, 18450000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/bep-tu-teka-irf-641-p50.png', 458, 1),
(15, 1, 5, 'Bếp từ Teka IR 90 HS\r\n', 'Mã sản phẩm: IR 90 HS\r\nThương hiệu: Teka\r\nLoại sản phẩm: Bếp Từ Teka\r\nBảo hành: 36 tháng\r\nTình trạng: còn hàng\r\nSố bếp nấu: 3 Lò\r\nMặt kính: Euro Kara của Pháp\r\nĐiều khiển: Cảm ứng riêng biệt\r\nChức năng: khóa bàn phím và hẹn giờ bật giờ tắt bếp\r\nTổng công ', 0, 31639000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp02.jpg', 99, 1),
(16, 1, 6, 'Bếp Từ Teka IR 721', 'Mã sản phẩm: IR 721\r\nXuất xứ: Tây Ban Nha\r\nThương hiệu: Teka\r\nLoại sản phẩm: Bếp Từ Teka\r\nBảo hành: 24 tháng\r\nTình trạng: còn hàng\r\nSố bếp nấu: 2 Lò\r\nMặt kính: Euro Kara của Pháp\r\nĐiều khiển: Cảm ứng riêng biệt\r\nChức năng: khóa bàn phím và hẹn giờ bật giờ', 0, 13600000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/bep-tu-teka-ir-721-p45.jpg', 45, 1),
(17, 1, 6, 'Bếp từ Rommelsbacher CT3410', 'Mã sản phẩm	CT3410\r\nHãng	Rommelsbacher\r\nLoại sản phẩm	Bếp 2 từ\r\nSố bếp nấu	2 bếp\r\nBảng điều khiển	Cảm ứng\r\nChế độ hẹn giờ nấu	Có\r\nKhóa bếp	Có\r\nCông suất tổng	3400W\r\nCông suất nấu	10 mức công suất nấu\r\nTự động tắt bếp khi không có nồi	Có\r\nĐiện áp	220V / 50', 35, 4980000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp99-1.png', 87, 1),
(18, 1, 1, 'Bếp từ Sunhouse SHB9105', 'Mã sản phẩm	Sunhouse SHB9105\r\nHãng	SHB9105\r\nLoại sản phẩm	Bếp từ\r\nSố bếp nấu	2 bếp\r\nMặt kính	Mặt kính chịu nhiệt\r\nBảng điều khiển	Cảm ứng\r\nChế độ hẹn giờ độc lập cho từng bếp, báo động bằng âm thanh	Có\r\nKhóa an toàn trẻ em Child lock	Có\r\nCông suất tổng	43', 0, 6500000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp101.jpgv', 98, 1),
(19, 1, 6, 'Bếp Từ Teka IR 321', 'Mã sản phẩm: IR 321\r\nXuất xứ:\r\nThương hiệu: Teka\r\nLoại sản phẩm: Bếp Từ Teka\r\nBảo hành: 24 tháng\r\nTình trạng: còn hàng\r\nSố bếp nấu: 2 Lò\r\nMặt kính: Ceramic\r\nĐiều khiển: Cảm ứng riêng biệt\r\nChức năng: khóa bàn phím và hẹn giờ bật giờ tắt bếp\r\nTổng công suấ', 15, 11234000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/bep-tu-teka-ir-321-p47.jpg', 56, 1),
(20, 1, 5, 'Bếp từ Faro FR1 Vitro Cearmic 20V', 'Mã sản phẩm	FR1 Vitro Cearmic 20V\r\nHãng	Faro\r\nLoại sản phẩm	Bếp từ\r\nSố bếp nấu	2 bếp\r\nMặt kính	Vitro Ceramic\r\nBảng điều khiển	Cảm ứng\r\nChế độ hẹn giờ độc lập cho từng bếp, báo động bằng âm thanh	Có\r\nKhóa an toàn trẻ em Child lock	Có\r\nCông suất tổng	2400 W', 0, 9200000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp23-1.jpg', 452, 1),
(21, 3, 3, 'Nồi phủ sứ an toàn Elmich Olive EL-5523OV', '-Size:18cm\r\n-Màu sắc: Xanh\r\n-Trọng lượng: 1287g\r\n-Xuất xứ : Việt Nam', 0, 579000, 'https://bizweb.dktcdn.net/thumb/large/100/489/006/products/el-5523ov20-01.jpg?v=1726022053883', 65, 1),
(22, 3, 1, 'Bộ nồi inox nguyên khối Elmich Trimax classic EL-2136OL01', '\r\nSize (cm):Nồi Size 18, 20, 22\r\nChất liệu:Inox 3 lớp\r\nĐộ dày thành (mm): 1.8mm\r\nSize 20:  200 x 105 x 1.8 mm\r\nSize 22: 220 x 120 x 1.8mm\r\nTrọng lượng (sản phẩm rời) (kg)	Cả bộ: 4,296 kg\r\nNơi sản xuất:Elmich\r\nThương hiệu – Quốc gia:Việt nam', 20, 1856000, 'https://bizweb.dktcdn.net/thumb/large/100/489/006/products/2136ol01-scaled.jpg?v=1728621248460', 32, 1),
(23, 3, 4, 'Bộ nồi chảo chống dính Elmich baby EL-1170OL', '– Bộ nồi chảo chống dính Elmich baby EL-1170OL gồm 1 quánh đường kính 16cm và 1 chảo đường kính 16 cm\r\n– Thiết kế hiện đại, màu sắc trẻ trung, thời thượng\r\n– Kích thước nhỏ gọn, thuận tiện khi nấu nướng\r\n– Làm bằng hợp kim nhôm, bên trong phủ chống dính 2', 0, 435000, 'https://bizweb.dktcdn.net/thumb/large/100/489/006/products/1170-baby-hoongfartboard-1.jpg?v=1724135459557', 87, 1),
(24, 3, 4, 'Nồi men sứ Elmich Hera II EL-5203GY ', 'Màu sắc: Xanh\r\nChống dính: Trán sứ\r\nChất liệu:Nhôm\r\nTrọng lượng:1,1Kg\r\nXuất xứ : Việt Nam', 0, 679000, 'https://bizweb.dktcdn.net/thumb/large/100/489/006/products/el-5203gy-03.jpg?v=1702528540897', 32, 1),
(25, 3, 1, 'Bộ nồi Inox liền khối Elmich Hera EL-8197', 'Cate hàng:Nồi, bộ nồi inox\r\nTHƯƠNG HIỆU:ELMICH\r\nXuất xứ:Việt Nam\r\nThời gian bảo hành:24 tháng\r\nChất liệu:Inox\r\nMàu sắc:Màu tím\r\nKiểu dáng, thiết kế:Thẳng thành', 0, 2490000, 'https://bizweb.dktcdn.net/thumb/large/100/489/006/products/el819701-1688110873041.png?v=1688957017450', 88, 1),
(26, 4, 6, 'Dao gọt hoa quả Elmich Diamond EL8405', 'Xuất xứ sản phẩm : Trung Quốc\r\nBảo hành : 12 tháng\r\nSố lượng : 1\r\nKích thước : 20.3×0.25cm\r\nChất liệu : Lưỡi dao 5CR15\r\nCán dao : PP+TPR , Không chứa BPA\r\nCông dụng : Dùng để chế biến các món ăn như: gọt, tỉa rau củ quả', 0, 125000, 'https://bizweb.dktcdn.net/thumb/large/100/489/006/products/vn-11134207-7r98o-loavv1tryltjdc-1700720610916.jpg?v=1718269245953', 44, 1),
(28, 4, 3, 'Dao thái đa năng Elmich Diamond EL8406', 'Xuất xứ sản phẩm : Trung Quốc\r\nBảo hành : 12 tháng\r\nSố lượng : 1\r\nKích thước : 20.3×0.25cm\r\nChất liệu : Lưỡi dao 5CR15\r\nCán dao: PP+TPR, Không chứa BPA\r\nCông dụng: Dùng để chế biến các món ăn như: thái thịt, rau củ, quả', 0, 154000, 'https://bizweb.dktcdn.net/thumb/large/100/489/006/products/vn-11134207-7r98o-loalgzkecxdjc6-1700720592640.jpg?v=1700720596647', 22, 1),
(29, 4, 2, 'Dao thái Elmich Ultra Sharp EL8423', '– Màu sắc:  Đỏ-trắng\r\n– Kích thước sản phẩm:  329x44x20mm\r\n– Khối lượng:  140g\r\n– Công dụng:  Gọt, thái thực phẩm\r\n– Chất liệu:  Lưỡi dao Thép 5Cr15', 50, 215000, 'https://bizweb.dktcdn.net/thumb/large/100/489/006/products/el8422-01-3-66199e79-aca5-4e89-99a5-ee9bbde5251f.jpg?v=1709887560190', 55, 1),
(30, 4, 1, 'Dao đa năng Elmich Ultra Sharp EL8424', '– Màu sắc:  Đỏ-trắng\r\n– Kích thước sản phẩm:  305x85x18mm\r\n– Khối lượng:  310g\r\n– Công dụng:  Gọt, thái thực phẩm\r\n– Chất liệu:  Lưỡi dao Thép 5Cr15', 0, 299000, 'https://bizweb.dktcdn.net/thumb/large/100/489/006/products/8424-01-3.jpg?v=1709887627673', 66, 1),
(31, 5, 1, 'Lò vi sóng Sharp 20 lít R-G222VN', 'Model:	R-G222VN\r\nMàu sắc:	Xám\r\nNhà sản xuất:	Sharp\r\nXuất xứ : Trung Quốc\r\nNăm ra mắt : 2012\r\nThời gian bảo hành : 12 Tháng\r\nĐịa điểm bảo hành : Nguyễn Kim\r\nLoại Lò vi sóng : Có nướng\r\nDung tích : 20 Lít\r\nCông suất vi sóng : 800 W', 0, 1990000, 'https://cdn.nguyenkimmall.com/images/thumbnails/600/336/detailed/625/10008131-lo-vi-song-sharp-20l-r-g222vn-01.jpg', 33, 1),
(32, 5, 5, 'Lò vi sóng Sharp 20 lít R-203VN-M', 'Model:	R-203VN-M\r\nMàu sắc:	Bạc mặt gương\r\nNhà sản xuất:	Sharp\r\nXuất xứ : Trung Quốc\r\nThời gian bảo hành : 12 Tháng\r\nĐịa điểm bảo hành : Nguyễn Kim\r\nLoại Lò vi sóng : Không nướng\r\nDung tích : 20 Lít\r\nCông suất vi sóng : 800 W\r\nChức năng chính : Rã đông, hâ', 0, 1590000, 'https://cdn.nguyenkimmall.com/images/thumbnails/600/336/detailed/642/10039045-lo-vi-song-sharp-20l-r-203vn-m-01.jpg', 65, 1),
(33, 5, 1, 'Lò vi sóng Samsung 23 lít MS23K3513AS', 'Model : MS23K3513AS/SV\r\nMàu sắc : Đen\r\nNhà sản xuất : Samsung\r\nXuất xứ : Malaysia\r\nNăm ra mắt : 2021\r\nThời gian bảo hành : 24 Tháng\r\nĐịa điểm bảo hành : Nguyễn Kim\r\nLoại Lò vi sóng : Không nướng\r\nDung tích : 23 Lít\r\nCông suất vi sóng : 800 W', 0, 2190000, 'https://cdn.nguyenkimmall.com/images/thumbnails/600/336/detailed/614/10042746-lo-vi-song-samsung-ms23k3513as-sv-1.jpg', 55, 1),
(34, 5, 4, 'Lò vi sóng Sharp 23 lít R31A2VN-S', 'Model : R31A2VN-S\r\nMàu sắc : Đen\r\nNhà sản xuất : Sharp\r\nXuất xứ : Trung Quốc\r\nThời gian bảo hành : 12 Tháng\r\nĐịa điểm bảo hành : Nguyễn Kim\r\nLoại Lò vi sóng : Không nướng\r\nDung tích : 23 Lít\r\nCông suất vi sóng : 900 W\r\nCông suất nướng : Không nướng\r\n', 0, 1890000, 'https://cdn.nguyenkimmall.com/images/thumbnails/60…/10042970-lo-vi-song-sharp-23l-r-31a2vn-s-01.webp', 77, 1),
(35, 5, 5, 'Lò vi sóng Sharp 20 lít R-209VN-SK', 'Model:	R-209VN-SK\r\nMàu sắc:	Xám\r\nNhà sản xuất:	Sharp\r\nXuất xứ : Trung Quốc\r\nNăm ra mắt : 2019\r\nThời gian bảo hành : 12 Tháng\r\nĐịa điểm bảo hành : Nguyễn Kim\r\nLoại Lò vi sóng : Không nướng\r\nDung tích : 20 Lít\r\nCông suất vi sóng : 700 W', 37, 1390000, 'https://cdn.nguyenkimmall.com/images/thumbnails/600/336/detailed/620/10044306-lo-vi-song-sharp-20l-r-209vn-sk-01.jpg', 37, 1),
(36, 6, 4, 'Máy hút bụi Philips FC6721', 'Model:	FC6721\r\nMàu sắc:	Đỏ\r\nNhà sản xuất:	Philips\r\nXuất xứ : Trung Quốc\r\nNăm ra mắt : 2019\r\nThời gian bảo hành : 24 Tháng\r\nĐịa điểm bảo hành : Nguyễn Kim\r\nKhối lượng sản phẩm (kg) : 2.4 kg\r\nKích thước sản phẩm : Ngang 263 - Cao 1173 - Sâu 162 mm', 0, 2230000, 'https://cdn.nguyenkimmall.com/images/thumbnails/600/336/detailed/1073/10046693-may-hut-bui-philips-fc6721-1.jpg', 64, 1),
(37, 6, 6, 'Máy hút bụi không dây Dyson SV49 V12 Origin', 'Model:	DY 492619-01\r\nMàu sắc:	Xám/Tím\r\nNhà sản xuất:	Dyson\r\nXuất xứ :  Malaysia\r\nNăm ra mắt : 2024\r\nThời gian bảo hành : 24 Tháng\r\nĐịa điểm bảo hành : Nguyễn Kim\r\nLoại máy : Máy hút bụi không dây\r\nCông suất hoạt động : 500W\r\nCông suất hút : 130 AW', 25, 13990000, 'https://cdn.nguyenkimmall.com/images/detailed/1019/M%C3%A1y_h%C3%BAt_b%E1%BB%A5i_kh%C3%B4ng_d%C3%A2y_Dyson_SV49_V12_Origin_1.jpg', 37, 1),
(38, 6, 3, 'Máy hút bụi khô và ướt Karcher WD 3 S Premium', 'Model : WD3SV\r\nMàu sắc : Vàng Đen\r\nNhà sản xuất : Karcher\r\nThời gian bảo hành : 12 Tháng\r\nĐịa điểm bảo hành : Nguyễn Kim\r\nLoại máy : Khô và ướt\r\nCông suất hoạt động : 1000 W\r\nDung tích chứa bụi : Dung tích thùng chứa: 17 lít\r\nChiều dài dây điện : 4 mét\r\nT', 0, 2990000, 'https://cdn.nguyenkimmall.com/images/thumbnails/600/336/detailed/904/10056863-may-hut-bui-cam-tay-karcher-wd3-ysy-1.jpg', 65, 1),
(39, 6, 2, 'Máy hút bụi LG VC5420GHAQ.AVWPLVN', 'Model:	VC5420GHAQ.AVWPLVN\r\nMàu sắc:	Rượu cổ điển\r\nNhà sản xuất:	LG\r\nXuất xứ:	Việt Nam\r\nThời gian bảo hành : 12 Tháng\r\nĐịa điểm bảo hành : Nguyễn Kim\r\nLoại máy : Máy hút bụi cắm dây\r\nCông suất hoạt động : Công suất tổng 1700W, Công suất 330W\r\nĐộ ồn : 82dB\r', 0, 2490000, 'https://cdn.nguyenkimmall.com/images/thumbnails/600/336/detailed/789/10051308-may-hut-bui-lg-vc5420ghaq-avwplvn-1.jpg', 91, 1),
(40, 6, 2, 'Máy hút bụi Electrolux ZB6214IGM', 'Model:	ZB6214IGM\r\nMàu sắc:	Đen\r\nNhà sản xuất:	Electrolux\r\nXuất xứ : Trung Quốc\r\nThời gian bảo hành : 24 Tháng\r\nĐịa điểm bảo hành : Nguyễn Kim\r\nLoại máy : Cầm tay\r\nCông suất hoạt động : 54 W\r\nDung tích chứa bụi : 0.5 lít\r\nDung lượng pin : 1500 mAh', 10, 1890000, 'https://cdn.nguyenkimmall.com/images/thumbnails/600/336/detailed/782/10050727-may-hut-bui-electrolux-zb6214igm-1.jpg', 91, 1),
(41, 1, 1, 'Bếp gas âm hồng ngoại Fujishi FJ-806 - Đánh lửa Magneto tự động - Bảo hành chính hãng 02 Năm', 'MUA NGAY Bếp gas âm hồng ngoại Fujshi FJ-806, Dòng đánh lửa Magneto tự động không phải thay Pin bất tiện, Đầu đốt Ceramic hồng ngoại tiết kiệm gas thuộc dòng bếp gas Được sản xuất và lắp ráp tại nhà máy Việt Nam,  Bếp gây ấn tượng với người dùng ở bề mặt ', 0, 925000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgm3lwj39eeq1e@resize_w450_nl.jpg', 10, 1),
(42, 1, 1, 'Bếp gas âm Fujishi FJ-805 - Đánh lửa Magneto tự động, Chén đồng lửa xanh tiết kiệm gas - Bảo hành ch', ' MUA NGAY Bếp gas âm Fujshi FJ-805 - Đánh lửa Magneto tự động, Chén đồng lửa xanh tiết kiệm gas - Bảo hành chính hãng 02 Năm ( Bảo hành chính hãng trong 2 năm, Mặt kính cường lực, đánh lửa Magneto tự động kho lo thay pin bất tiện đầu đốt đồng thau nguyên ', 0, 955000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgm2xupufg1f0f@resize_w450_nl.jpg', 10, 1),
(43, 1, 2, 'Bếp gas âm Fujishi FJ-805X - Đánh lửa Magneto tự động, Chén đồng lửa xanh tiết kiệm gas - Bảo hành c', 'MUA NGAY Bếp gas âm Fujshi FJ-805 - Đánh lửa Magneto tự động, Chén đồng lửa xanh tiết kiệm gas - Bảo hành chính hãng 02 Năm ( Bảo hành chính hãng trong 2 năm, Mặt kính cường lực, đánh lửa Magneto tự động kho lo thay pin bất tiện đầu đốt đồng thau nguyên k', 10, 775000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llvq80znwh5rb9.jpg', 11, 1),
(44, 1, 2, 'Bếp gas âm Fujishi FJ-803X - Đánh lửa Magneto tự động, Chén đồng lửa xanh tiết kiệm gas - Bảo hành c', 'MUA NGAY Bếp gas âm Fujshi FJ-803 - Đánh lửa Magneto tự động, Chén đồng lửa xanh tiết kiệm gas - Bảo hành chính hãng 02 Năm ( Bảo hành chính hãng trong 2 năm, Mặt kính cường lực, đánh lửa Magneto tự động kho lo thay pin bất tiện đầu đốt đồng thau nguyên k', 10, 745000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llvpq9z3aq5beb.jpg', 11, 1),
(45, 1, 3, 'Bếp gas âm Fujishi FJ-804 - Đánh lửa Magneto tự động, Chén đồng lửa xanh tiết kiệm gas - Bảo hành ch', 'MUA NGAY Bếp gas âm Fujshi FJ-804 - Đánh lửa Magneto tự động, Chén đồng lửa xanh tiết kiệm gas - Bảo hành chính hãng 02 Năm ( Bảo hành chính hãng trong 2 năm, Mặt kính cường lực, đánh lửa Magneto tự động kho lo thay pin bất tiện đầu đốt đồng thau nguyên k', 20, 915000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgm3lwitb7qr52.jpg', 12, 1),
(46, 1, 3, 'Bếp gas âm FUJISHI FJ-808IC - CHÉN ĐỒNG - Đánh lửa IC cực nhạy - Lửa xanh tiết kiệm gas - Bảo hành c', 'MUA NGAY Bếp gas âm Fujshi FJ-808IC - Đánh lửa IC CỰC NHẠY, Chén đồng lửa xanh tiết kiệm gas - Bảo hành chính hãng 02 Năm ( Bảo hành chính hãng trong 2 năm, Mặt kính cường lực, Đánh lửa IC CỰC NHẠY đầu đốt đồng thau nguyên khối bền bỉ theo thời gian, an t', 20, 875000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lootu9roq1vvbe.jpg', 20, 1),
(47, 1, 4, 'Bếp gas đôi hồng ngoại mặt kính FUJISHI FJ-H15-HN - Tiết kiệm gas - Bảo hành chính hãng 1 năm', 'Bếp gas đôi hồng ngoại mặt kính FUJISHI FJ-H15-HN - Tiết kiệm gas - Bảo hành chính hãng 1 năm\r\nMẫu bếp gas cụm đầu đốt hồng ngoại thế hệ mới - Công nghệ Nhật Bản đang tạo nên cơn sốt tại Việt nam. Thuộc mẫu bếp gas công nghệ mới tiết kiệm gas dòng đầu đốt', 30, 395000, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-vunc2g79ipovb7.jpg', 13, 1),
(48, 1, 4, 'Bếp gas khung inox FUJISHI KI-202T - MÂM CHIA LỬA ĐỒNG NGUYÊN KHỐI LỚN - Tiết kiệm gas - Bảo hành ch', 'Bếp gas khung inox FUJISHI KI-202T - MÂM CHIA LỬA ĐỒNG NGUYÊN KHỐI LỚN - Tiết kiệm gas - Bảo hành chính hãng 1 năm\r\nMẫu bếp gas cụm đầu đốt đồng thau thế hệ mới - Công nghệ Nhật Bản đang tạo nên cơn sốt tại Việt nam. Thuộc mẫu bếp gas công nghệ mới tiết k', 30, 895000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj6ic62agyc2a9.jpg', 30, 1),
(49, 1, 5, 'Bếp gas đôi chén đồng mặt inox FUJISHI FU-210-iN - Tiết kiệm gas - Bảo hành chính hãng 1 năm', 'Bếp gas đôi chén đồng mặt inox FUJISHI FU-210-iN - Tiết kiệm gas - Bảo hành chính hãng 1 năm\r\nMẫu bếp gas cụm đầu đốt đồng thau thế hệ mới - Công nghệ Nhật Bản đang tạo nên cơn sốt tại Việt nam. Thuộc mẫu bếp gas công nghệ mới tiết kiệm gas dòng đầu đốt c', 40, 790000, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-99du6b4p1gova2.jpg', 14, 1),
(50, 1, 5, 'Bếp gas đôi mặt kính FUJISHI FJ-086D (Kính Đỏ) - Khung bếp cao 10 phân - Tiết kiệm gas - Bảo hành ch', 'Bếp gas Fujishi FJ-086 - KHUNG BẾP CAO 10 PHÂN - MÂM CHIA LỬA ĐỒNG NGUYÊN KHỐI LỚN - Tiết kiệm gas - Bảo hành chính hãng 01 Năm\r\n\r\n Mẫu bếp gas cụm đầu đốt đồng thau thế hệ mới - Công nghệ Nhật Bản đang tạo nên cơn sốt tại Việt nam. Thuộc mẫu bếp gas công', 40, 690000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm8nm7sc51b315.jpg', 14, 1),
(51, 2, 1, 'Máy Xay Sinh Tố Sunhouse SHD5112 - Công Suất 350W - Dung Tích 1 Lít - 2 Cối Xay Hoa Quả, Thực Phẩm K', 'Máy xay sinh tố Sunhouse SHD5112\r\nMáy xay sinh tố SUNHOUSE SHD5112 có thiết kế gọn nhẹ, dễ sử dụng. Sản phẩm gồm một cối xay hoa quả, rau củ mềm và một cối xay thực phẩm khô – có thể sử dụng để xay nhiều loại thực phẩm hàng ngày rất tiện lợi, giúp tiết ki', 10, 345000, 'https://down-vn.img.susercontent.com/file/b2425d968c8f0a6a9281ee0f08c951ff@resize_w450_nl.jpg', 10, 1),
(52, 2, 1, 'Máy Xay Sinh Tố Công Nghiệp HAKAIO 4500W Cối Xay 2L Bảo Hành 24 Tháng', 'SHOP cam kết chỉ bán hàng CHÍNH HÃNG và y hình ảnh, nội dung đăng tải.\r\nSHOP cam kết HOÀN TIỀN 100% giá trị các sản phẩm bị gẫy, vỡ hoặc thiếu trong quá trình vận chuyển nên Khách Hàng hoàn toàn yên tâm khi mua hàng.', 10, 1599000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ly22z7rj7tujbd@resize_w450_nl.jpg', 10, 1),
(53, 2, 2, 'Máy xay sinh tố công nghiệp Promix PM-919B - 1500W - Dung tích 2 lít - Dùng cho quán kinh doanh [Pro', 'Máy xay sinh tố Promix PM-919B là dòng máy xay công nghiệp mới Model 2021 từ Pro Mixing với công suất 1500W, dung tích 2 lít, phù hợp sử dụng cho các quán cà phê, kinh doanh với khả năng xay liên tục.', 20, 2943000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvmkrx9wvc41c4@resize_w450_nl.jpg', 20, 1),
(54, 2, 2, 'Máy Xay Sinh Tố Sunhouse 2 Cối SHD-5114 - Công Suất 450W Dung Tích 1.5L Xay Đá, Rau Củ, Đồ Khô. Hàng', 'Máy Xay Sinh Tố Sunhouse SHD-5114 - Công Suất 450W Dung Tích 1.5L Xay Đá, Rau Củ, Đồ Khô. Hàng Chính Hãng Bảo Hành 12 Tháng\r\n\r\n- Máy xay sinh tố Sunhouse SHD-5114 gồm 2 cối xay, 1 cối to dùng xay đá, xay đồ ướt. 1 cối nhỏ dùng xay đồ khô như hạt, gạo,....', 20, 425000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj7yrf5cvp58ba@resize_w450_nl.jpg', 20, 1),
(55, 2, 3, 'Máy xay sinh tố công nghiệp Promix PM-9003 - 1800W - 2 lít - Phù hợp cho quán - bao gồm hộp chống ồn', 'Máy xay sinh tố Promix PM-9003 là dòng công nghiệp mới của Promix với công suất 1800W; động cơ hoạt động 3.5hp dung tích 2 lít dễ dàng xay nhiều ly 1 lúc; phù hợp cho quán pha chế, nhà hàng, khách sạn,…', 30, 4361000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lzhf5a5pcxfx50@resize_w450_nl.jpg', 30, 1),
(56, 2, 3, 'Máy Xay Sinh Tố Philips HR2223 - Hàng Chính Hãng (Bảo Hành 24 Tháng)', 'Máy xay sinh tố PHILIPS HR2223 sở hữu thiết kế tinh tế với màu sắc trang nhã, không chỉ mang đến cho bạn những ly nước trái cây thơm ngon mà còn góp phần tô điểm cho không gian bếp thêm lịch sự, hiện đại. Máy có cối xay lớn với dung tích 1.5L được làm bằn', 40, 11449000, 'https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-ll0jxg323mcdf1@resize_w450_nl.jpg', 40, 1),
(57, 2, 4, '[Có hỏa tốc TPHCM ] Máy xay sinh tố 3 cối 450W COMET - CM9979', '-  Máy xay sinh tố Comet CM9979 có kiểu dáng hiện đại, màu sắc sang trọng trẻ trung, phù hợp với mọi gian bếp. \r\n\r\n-  Hoạt động với công suất 450 W cực mạnh, động cơ máy vận hành êm ái, dễ dàng xay nhuyễn các loại thực phẩm và ngay cả đá một cách nhanh ch', 25, 739000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyn7u3iemg5p1a.jpg', 25, 1),
(58, 2, 4, 'Máy xay sinh tố 3 Cối nhựa KIM CƯƠNG KC-T02', '- Máy xay sinh tố KIM CƯƠNG 3 cối,rất chất lượng và uy tín trên thị trường để phục vụ tốt nhu cầu của người sử dụng. Với thiết kế dung tích 1 lít,chúng ta dễ dàng tạo ra 4 ly sinh tố phục vụ cho nhu cầu giải khát,xay cháo cho em bé,xay thực phẩm khô v.v..', 25, 379000, 'https://down-vn.img.susercontent.com/file/2e1ca01a4006b26b3b237ce3f0fc3399.jpg', 25, 1),
(59, 2, 5, 'Máy Xay Sinh Tố Đa Năng SILVER CREST, Máy Xay Công Nghiệp 2 Cối Xay Công Suất 4500W Xay Rau Củ Thịt ', '- Sản phẩm máy xay sinh tố công suất lớn 4500W chính hãng KAW là một thiết bị mạnh mẽ và hiệu quả để bạn tận hưởng các món sinh tố, nước ép và đồ uống lành mạnh ngay tại nhà.\r\n\r\nVới công suất 4500W, máy xay sinh tố KAW có khả năng xay nhuyễn và nghiền hoà', 40, 450000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lx6d8z1jjzkr02.jpg', 40, 1),
(60, 2, 5, 'Máy Xay Sinh Tố Đa Năng SILVER CREST SC-1589 Máy Xay Công Nghiệp 2 Cối Xay Công Suất 4500W NH 12TH.', '- Sản phẩm máy xay sinh tố công suất lớn 4500W chính hãng KAW là một thiết bị mạnh mẽ và hiệu quả để bạn tận hưởng các món sinh tố, nước ép và đồ uống lành mạnh ngay tại nhà.\r\n\r\nVới công suất 4500W, máy xay sinh tố KAW có khả năng xay nhuyễn và nghiền hoà', 50, 399000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m0u07bln2bv346.jpg', 50, 1),
(61, 3, 1, 'Bộ nồi 4 món Fissler Luno Black', '– Mã sản phẩm: Luno 4\r\n– Hãng: FISSLER\r\n– Chất liệu nồi: Nhôm Đúc Quang Học', NULL, 12500000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp160.png', 9, 1),
(62, 3, 2, 'Bộ nồi Arber 4 chiếc', '– Hãng sản xuất: Arber– Xuất xứ: Đức– Loại sản phẩm: Nồi từ 4 chiếc', NULL, 2500000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp159.jpg', 9, 1),
(63, 3, 3, 'Bộ nồi Arber 5 chiếc', '– Hãng sản xuất: Arber\r\n– Xuất xứ: Đức\r\n– Loại sản phẩm: Nồi từ 5 chiếc', NULL, 3000000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp158.jpg', 9, 1),
(64, 3, 4, 'Bộ nồi Berndes Millesima 7 món', '– Mã sản phẩm: Berlin 4 ( vung inox)\r\n– Hãng: BERNDE S- Germany Küche GmbH\r\n– Chất liệu nồi: Inox cao cấp 18/10', NULL, 5980000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp157.jpg', 9, 1),
(65, 3, 5, 'Bộ nồi chống dính Elmich Royal Classic EL-3700', '– Mã sản phẩm: EL-3700\r\n– Hãng: Elmich, Dòng sản phẩm : Royal Classic\r\n– Chất liệu nồi: inox cao cấp\r\n– Xuất xứ: Nhật khẩu nguyên chiếc từ Châu Âu – CH Séc', NULL, 1835000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp156.png', 9, 1),
(66, 3, 6, 'Bộ nồi chống dính Elmich Royal Premium', '– Hãng sản xuất: Elmich\r\n– Xuất xứ: CH Séc\r\n– Loại sản phẩm: Bộ nồi dùng cho bếp từ', NULL, 2890000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp155.jpg', 9, 1),
(67, 3, 6, 'Bộ nồi từ Fissler 1845 (5 chiếc)', '– Mã sản phẩm: Bộ nồi từ Fissler 1845 (5 chiếc)\r\n– Hãng: FISSLER\r\n– Chất liệu nồi: Inox', NULL, 12000000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp144.jpg', 9, 1),
(68, 3, 5, 'Nồi quánh cán dài chống dính Tefal Expertise có nắp 16 cm', '– Hãng sản xuất: Tefal\r\n– Xuất xứ: Pháp', NULL, 1490000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp134.jpg', 9, 1),
(69, 3, 3, 'NỒI ÁP SUẤT ĐA NĂNG KYUSHU MODEL LJ 336', '– Kích thước (D x R x C): 325 x 325 x 410 mm.\r\n– Khối lượng hàng: 4.6 Kg.\r\n– Dung tích: 6 L.\r\n– Công suất: 1000W.\r\n– Điện áp: 220V – 50Hz.\r\n– Phụ kiện đi kèm: Sách hướng dẫn sử dụng, cốc đong, dây điện, muỗng, thìa, giá hấp đồ.\r\n– Bảo hành 24 tháng, 1 đổi', NULL, 2500000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/11/noi-ap-suat-da-nang-kyushu-anh-2-768x680.jpg', 9, 1),
(70, 3, 1, 'Bộ nồi từ Berndes Roma 059021', '– Hãng sản xuất: Berndes Roma\r\n– Xuất xứ: Trung Quốc\r\n– Loại sản phẩm: Dùng cho bếp gas, bếp điện, bếp từ, bếp hồng ngoại, mặt kính gốm', NULL, 3900000, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp146.jpg', 9, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_images`
--

CREATE TABLE `product_images` (
  `Image_ID` int NOT NULL,
  `Product_ID` int NOT NULL,
  `Image_URL` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_images`
--

INSERT INTO `product_images` (`Image_ID`, `Product_ID`, `Image_URL`) VALUES
(1, 1, 'https://sonhung.vn/media/product/6219_may_lam_sua_hat_da_nang_ranbem_769s_chinh_hang_gia_re_nhat.jpg'),
(2, 1, 'https://sonhung.vn/media/product/6219_may_lam_sua_hat_ranbem__3_.jpg'),
(3, 1, 'https://sonhung.vn/media/product/6219_may_lam_sua_hat_da_nang_ranbem_769s_chinh_hang_gia_tot_nhat.jpg'),
(4, 1, 'https://sonhung.vn/media/product/6219_may_lam_sua_hat_da_nang_ranbem_769s_chinh_hang_gia_tot.jpg'),
(9, 3, 'https://gertech.vn/wp-content/uploads/2018/12/M%C3%A1y-xay-c%C3%B4ng-nghi%E1%BB%87p-gertech-gt-2268-6.jpg'),
(10, 3, 'https://gertech.vn/wp-content/uploads/2018/12/M%C3%A1y-xay-c%C3%B4ng-nghi%E1%BB%87p-gertech-gt-2268-2.jpg'),
(11, 3, 'https://gertech.vn/wp-content/uploads/2018/12/M%C3%A1y-xay-c%C3%B4ng-nghi%E1%BB%87p-gertech-gt-2268-9.jpg'),
(12, 3, 'https://gertech.vn/wp-content/uploads/2018/12/M%C3%A1y-xay-c%C3%B4ng-nghi%E1%BB%87p-gertech-gt-2268-8.jpg'),
(13, 4, 'https://vietthienphu.vn/wp-content/uploads/2023/01/68ae64f198f04c320395c966f5675596.png'),
(14, 4, 'https://vietthienphu.vn/wp-content/uploads/2023/01/49d2ba18d7c52e031af4b67b443599f2.png'),
(15, 4, 'https://vietthienphu.vn/wp-content/uploads/2023/01/2ad5640ebdec72fc79531d1778c6c2dc-768x512.png'),
(16, 4, 'https://vietthienphu.vn/wp-content/uploads/2023/01/387795c86765346eca0c041bac00348b.png'),
(17, 5, 'https://down-vn.img.susercontent.com/file/b60919285747c42b8b64d156ff2ba478.webp'),
(18, 5, 'https://down-vn.img.susercontent.com/file/4e5ab004403ee3ff7eff8e0ffba3d76f.webp'),
(19, 5, 'https://down-vn.img.susercontent.com/file/e8f62989d7122f7e95fd1863ad78de53.webp'),
(20, 5, 'https://down-vn.img.susercontent.com/file/dbb92d2bda8aa89f309e237fbcf173a0.webp'),
(21, 41, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgez3hykw2ne4d.jpg'),
(22, 41, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgez3hyknn8q6d.jpg'),
(23, 41, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgez3hykp1t607.jpg'),
(24, 41, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgez3hykt9iib2.jpg'),
(25, 42, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llvq80znwhcv6c.jpg'),
(26, 42, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llvpq9z3c4pr03.jpg'),
(27, 42, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llvq80znv2lbd9.jpg'),
(28, 42, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llvpq9z3dja727.jpg'),
(29, 43, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgm3lwite0vn83.jpg'),
(30, 43, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgm3lwitffg38d.jpg'),
(31, 43, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgm3lwitcmb7fb.jpg'),
(32, 43, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgm3lwj33s4y85.jpg'),
(33, 44, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llvq80zodc6789.jpg'),
(34, 44, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llvq80zo949re0.jpg'),
(35, 44, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llvq80zohjvj2d.jpg'),
(36, 44, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llvq80zog5b352.jpg'),
(37, 45, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgm3lwite0vn83.jpg'),
(38, 45, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgm3lwitffg38d.jpg'),
(39, 45, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgm3lwitcmb7fb.jpg'),
(40, 45, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgm3lwj33s4y85.jpg'),
(41, 46, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lootu9roj11n34.jpg'),
(42, 46, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lootu9roetcb35.jpg'),
(43, 46, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lootu9rog7wr34.jpg'),
(44, 46, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lootu9roonbfa6.jpg'),
(45, 47, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-zx1b2la0ipovde.jpg'),
(46, 47, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-vmt8afd0ipov13.jpg'),
(47, 47, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-91jta2e0ipove4.jpg'),
(48, 47, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-1i57dyk0ipov87.jpg'),
(49, 48, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj6ic62aicwi5c.jpg'),
(50, 48, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj6ic62ajrgy9c.jpg'),
(51, 48, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj6ic62anz6ab0.jpg'),
(52, 48, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj6ic62apdqq8e.jpg'),
(53, 49, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-wjirm4ki2gov5c.jpg'),
(54, 49, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-1aich9ei2gov7a.jpg'),
(55, 49, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-kilf72ni2govcc.jpg'),
(56, 49, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-sozstupi2govee.jpg'),
(57, 50, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm8nm7sc990f82.jpg'),
(58, 50, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm8nm7sc7ufzff.jpg'),
(59, 50, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm8nm7svos0vc4.jpg'),
(60, 50, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm8nm7sc6fvj50.jpg'),
(61, 51, 'https://down-vn.img.susercontent.com/file/ad42bec5295a56593e7fe553dd94e150.jpg'),
(62, 51, 'https://down-vn.img.susercontent.com/file/4086d7bf067a2107ee347076c7c64f44.jpg'),
(63, 51, 'https://down-vn.img.susercontent.com/file/cdd3778b6a0feb09844592861bc48fda.jpg'),
(64, 51, 'https://down-vn.img.susercontent.com/file/fc1d9330df6673db44f549a61988514d.jpg'),
(65, 52, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ly22z7rt4mahca.jpg'),
(66, 52, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxasrrvj12hn3a.jpg'),
(67, 52, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxasrrvj83bvc1.jpg'),
(68, 52, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu6h8m8p5b812d.jpg'),
(69, 53, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyndyn8zuszx79.jpg'),
(70, 53, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyndyn8zp6q5f9.jpg'),
(71, 53, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyndyn8zteoxc5.jpg'),
(72, 53, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyne0528y8ul10.jpg'),
(73, 54, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj7yrf5db5e47f.jpg'),
(74, 54, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj7yrf5cvpoyce.jpg'),
(75, 54, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj7yrf5db5xu1d.jpg'),
(76, 54, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lngvm2ir88ze08.jpg'),
(77, 55, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxkk8b4cbjdlfa.jpg'),
(78, 55, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxkk8b4c8q8p6d.jpg'),
(79, 55, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxkk8b4ccxy1bf.jpg'),
(80, 55, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxkk8b4ccxqz93.jpg'),
(81, 56, 'https://down-vn.img.susercontent.com/file/9aeb462a2adab54311466b169f272a15.jpg'),
(82, 56, 'https://down-vn.img.susercontent.com/file/55df932ed7a41d324e07f733d184e7dd.jpg'),
(83, 56, 'https://down-vn.img.susercontent.com/file/92a7eea9b0b1f4bc7f2a4ed68e0f58c9.jpg'),
(84, 56, 'https://down-vn.img.susercontent.com/file/ec6a4b2e048ae7fabeea13117e184ecb.jpg'),
(85, 57, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyn7u3iel1upbb.jpg'),
(86, 57, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyn7u3iejna9b4.jpg'),
(87, 57, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyn7u3iemgf5e8.jpg'),
(88, 57, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyn7u3iel1l932.jpg'),
(89, 58, 'https://down-vn.img.susercontent.com/file/sg-11134201-22090-m8n5ih905nhv45.jpg'),
(90, 58, 'https://down-vn.img.susercontent.com/file/8017b11e8d11f16a7317f489327a68ec.jpg'),
(91, 58, 'https://down-vn.img.susercontent.com/file/b67215edf5da0c692dd5f9498a8b7e29.jpg'),
(92, 58, 'https://down-vn.img.susercontent.com/file/795304434161141c62061156d96408d7.jpg'),
(93, 59, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lx6d8z1j1q6zac.jpg'),
(94, 59, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lx6d8z1j7cgrde.jpg'),
(95, 59, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lx6d8z1jbk6305.jpg'),
(96, 59, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lx6d8z1jh6fv33.jpg'),
(97, 60, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lystfget4a4td6.jpg'),
(98, 60, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lystfget02fh07.jpg'),
(99, 60, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lystfget1gzxbb.jpg'),
(100, 60, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lystfget02oxc5.jpg'),
(101, 61, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp160-1.png'),
(102, 61, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp160-1.jpg'),
(103, 61, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp160-2.jpg'),
(104, 61, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp160-3.jpg'),
(105, 62, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp159.jpg'),
(106, 62, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp152-300x192.jpg'),
(107, 62, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp146-300x300.jpg'),
(108, 62, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp160-1.png'),
(109, 63, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp158-1-1.jpg'),
(110, 63, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp158-2.jpg'),
(111, 63, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp158-3.jpg'),
(112, 63, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp158.jpg'),
(113, 64, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp157-1-1.jpg'),
(114, 64, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp157-2.jpg'),
(115, 64, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp157-3.jpg'),
(116, 64, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp157-4.jpg'),
(117, 65, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp156-1.jpg'),
(118, 65, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp156-1.png'),
(119, 65, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp148-300x201.jpg'),
(120, 65, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp147-1-300x300.jpg'),
(121, 66, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp155-1.png'),
(122, 66, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp155-2.png'),
(123, 66, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp155.jpg'),
(124, 66, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp153-300x300.jpg'),
(125, 67, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp144-1.jpg'),
(126, 67, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp144-2.jpg'),
(127, 67, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp144-3.jpg'),
(128, 67, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp144-4.jpg'),
(129, 68, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp134-4.jpg'),
(130, 68, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp134-3.jpg'),
(131, 68, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp134-2-1.jpg'),
(132, 68, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp134-1-1.jpg'),
(133, 69, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/11/noi-ap-suat-da-nang-kyushu-anh-6-768x538.png'),
(134, 69, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/11/noi-ap-suat-da-nang-kyushu-anh-5.png'),
(135, 69, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/11/noi-ap-suat-da-nang-kyushu-anh-4.png'),
(136, 69, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/11/noi-ap-suat-da-nang-kyushu-anh-2-768x680.jpg'),
(137, 70, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp146-1.jpg'),
(138, 70, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp146-2.jpg'),
(139, 70, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp146-3.jpg'),
(140, 70, 'http://thegioigiadungonline.com.vn/wp-content/uploads/2018/10/sp146.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `Review_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Product_ID` int NOT NULL,
  `Ratting` int DEFAULT NULL,
  `Comment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `User_Name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Show_Hidden` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`Review_ID`, `User_ID`, `Product_ID`, `Ratting`, `Comment`, `User_Name`, `Show_Hidden`) VALUES
(14, 1, 40, 4, '1265', 'hhh', 1),
(15, 3, 35, NULL, 'haha', 'MinhSang12345', 1),
(16, 3, 35, 5, 'haha', 'MinhSang12345', 1),
(17, 3, 1, 4, 'sp tốt', 'MinhSang12345', 1),
(18, 29, 1, 4, 'sp ok', 'Hiep12345', 1),
(19, 29, 1, 1, 'aa', 'Hiep12345', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shipments`
--

CREATE TABLE `shipments` (
  `Shipment_ID` int NOT NULL,
  `Order_ID` int NOT NULL,
  `Shipment_Date` date DEFAULT NULL,
  `Delivery_Date` date DEFAULT NULL,
  `Shipment_Adress` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `User_ID` int NOT NULL,
  `User_Name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `resetToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `resetTokenExpiry` bigint DEFAULT NULL,
  `Phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Role` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`User_ID`, `User_Name`, `Email`, `Password`, `resetToken`, `resetTokenExpiry`, `Phone`, `Role`) VALUES
(1, 'sang', NULL, '123', '', NULL, NULL, 1),
(2, 'MinhSang123', 'sangnmps34186@fpt.edu.vn', '$2b$10$Vtn15cbFG/9QKOv51dLuFuIhyPnBjFs/9jL9okr98E7tek39eczsC', '', NULL, '123456789', 1),
(3, 'MinhSang12345', 'minhsangg0311@gmail.com', '$2b$10$iSKxqfaYx.nKc.aNtuNEkOkcpUgYP/sBD.RcS0omWc.whC6VaK7ui', NULL, NULL, '1234567890', 0),
(26, 'MinhSang1234567', 'sangnmps34186@fpt.edu.vn34567', '$2b$10$5ujdRnGPzqPM2uygpf1SWuxCnMwpGtsWk8d1LMSY7dwgb3GMpxQli', '', NULL, '234245', 0),
(27, 'fkshothw', 'sufhifis@gmail.com', '$2b$10$fcHejNLNlhGdTB/5nLRjROWPhrAWWy.DdxBNDb3Vyp8joeb.h67Uy', '', NULL, '345678', 0),
(28, 'hiep', 'nguyenhiep12@123', '$2b$10$zVfbtam7t2q9pevPksJIteHjthmdY5uSECgdoVjvblen2gMt2tzIG', '', NULL, '1111', 0),
(29, 'Hiep12345', 'nguyenhiep12062004@gmail.com', '$2b$10$vhZVqJ.WRUp40ISPw9wqbeT0xHbUvnjiuCl6q6uYfKH7ui7SGWCRK', '', NULL, '0376136846', 0),
(30, 'dattran', 'quocdat100322@gmail.com', '$2b$10$wvnqXA4lWh.gk1guWtDsVuiFhOssgS9Z8G.Jx8t.P3MSocqRCmZlG', '', NULL, '0676455634535', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vouchers`
--

CREATE TABLE `vouchers` (
  `Voucher_ID` int NOT NULL,
  `Code` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Discount` int DEFAULT NULL,
  `Expiration_Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `vouchers`
--

INSERT INTO `vouchers` (`Voucher_ID`, `Code`, `Discount`, `Expiration_Date`) VALUES
(1, 'sang', 50, '2024-10-09');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`Address_ID`);

--
-- Chỉ mục cho bảng `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`Brand_ID`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Category_ID`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Order_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Voucher_ID` (`Voucher_ID`),
  ADD KEY `order_ibfk_3` (`Status`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`Order_Detail_ID`),
  ADD KEY `Order_ID` (`Order_ID`),
  ADD KEY `order_details_ibfk_2` (`Product_ID`);

--
-- Chỉ mục cho bảng `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`Status_ID`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`Payments_ID`),
  ADD KEY `Order_ID` (`Order_ID`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Product_ID`),
  ADD KEY `Category_ID` (`Category_ID`),
  ADD KEY `Brand_ID` (`Brand_ID`);

--
-- Chỉ mục cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`Image_ID`),
  ADD KEY `Product_ID` (`Product_ID`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`Review_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `reviews_ibfk_2` (`Product_ID`);

--
-- Chỉ mục cho bảng `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`Shipment_ID`),
  ADD KEY `Order_ID` (`Order_ID`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_ID`);

--
-- Chỉ mục cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`Voucher_ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `addresses`
--
ALTER TABLE `addresses`
  MODIFY `Address_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `brands`
--
ALTER TABLE `brands`
  MODIFY `Brand_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `Category_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `Order_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `Order_Detail_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `order_status`
--
ALTER TABLE `order_status`
  MODIFY `Status_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
  MODIFY `Payments_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `Product_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
  MODIFY `Image_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `Review_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `shipments`
--
ALTER TABLE `shipments`
  MODIFY `Shipment_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `User_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `Voucher_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`Voucher_ID`) REFERENCES `vouchers` (`Voucher_ID`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`Status`) REFERENCES `order_status` (`Status_ID`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `orders` (`Order_ID`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`Product_ID`);

--
-- Các ràng buộc cho bảng `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `orders` (`Order_ID`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`Category_ID`) REFERENCES `categories` (`Category_ID`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`Brand_ID`) REFERENCES `brands` (`Brand_ID`);

--
-- Các ràng buộc cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`Product_ID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`Product_ID`);

--
-- Các ràng buộc cho bảng `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `shipments_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `orders` (`Order_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
