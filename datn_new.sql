-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 01, 2024 lúc 07:14 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

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
  `Address_ID` int(11) NOT NULL,
  `Street` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brand`
--

CREATE TABLE `brand` (
  `Brand_ID` int(11) NOT NULL,
  `Brand_Name` varchar(255) DEFAULT NULL,
  `Brand_Image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `brand`
--

INSERT INTO `brand` (`Brand_ID`, `Brand_Name`, `Brand_Image`) VALUES
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
  `Category_ID` int(11) NOT NULL,
  `Category_Name` varchar(255) DEFAULT NULL,
  `Category_Image` varchar(255) NOT NULL,
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
-- Cấu trúc bảng cho bảng `order`
--

CREATE TABLE `order` (
  `Order_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Voucher_ID` int(11) NOT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` int(11) DEFAULT NULL,
  `User_Name` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order`
--

INSERT INTO `order` (`Order_ID`, `User_ID`, `Voucher_ID`, `Status`, `Email`, `Phone`, `User_Name`, `Address`) VALUES
(1, 3, 1, 'đang giao', 'jfsdjfsjd', 4567, 'sang', 'adb');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `Order_Detail_ID` int(11) NOT NULL,
  `Order_ID` int(11) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Product_Name` varchar(100) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`Order_Detail_ID`, `Order_ID`, `Product_ID`, `Product_Name`, `Price`, `Quantity`) VALUES
(1, 1, 1, 'sang', 9999.00, 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `Payments_ID` int(11) NOT NULL,
  `Order_ID` int(11) NOT NULL,
  `Payments_Method` varchar(50) DEFAULT NULL,
  `Payments_Status` varchar(50) DEFAULT NULL,
  `Amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `Product_ID` int(11) NOT NULL,
  `Category_ID` int(11) NOT NULL,
  `Brand_ID` int(11) NOT NULL,
  `Product_Name` varchar(100) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Promotion` int(10) DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Views` int(11) DEFAULT NULL,
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
(40, 6, 2, 'Máy hút bụi Electrolux ZB6214IGM', 'Model:	ZB6214IGM\r\nMàu sắc:	Đen\r\nNhà sản xuất:	Electrolux\r\nXuất xứ : Trung Quốc\r\nThời gian bảo hành : 24 Tháng\r\nĐịa điểm bảo hành : Nguyễn Kim\r\nLoại máy : Cầm tay\r\nCông suất hoạt động : 54 W\r\nDung tích chứa bụi : 0.5 lít\r\nDung lượng pin : 1500 mAh', 10, 1890000, 'https://cdn.nguyenkimmall.com/images/thumbnails/600/336/detailed/782/10050727-may-hut-bui-electrolux-zb6214igm-1.jpg', 91, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `Review_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Ratting` int(11) DEFAULT NULL,
  `Comment` varchar(255) DEFAULT NULL,
  `User_Name` varchar(255) DEFAULT NULL,
  `Show_Hidden` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`Review_ID`, `User_ID`, `Product_ID`, `Ratting`, `Comment`, `User_Name`, `Show_Hidden`) VALUES
(14, 1, 40, 4, '1265', 'hhh', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shipments`
--

CREATE TABLE `shipments` (
  `Shipment_ID` int(11) NOT NULL,
  `Order_ID` int(11) NOT NULL,
  `Shipment_Date` date DEFAULT NULL,
  `Delivery_Date` date DEFAULT NULL,
  `Shipment_Adress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `User_ID` int(11) NOT NULL,
  `User_Name` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `resetToken` varchar(255) NOT NULL,
  `resetTokenExpiry` bigint(255) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Role` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`User_ID`, `User_Name`, `Email`, `Password`, `resetToken`, `resetTokenExpiry`, `Phone`, `Role`) VALUES
(1, 'sang', NULL, '123', '', NULL, NULL, 1),
(2, 'MinhSang123', 'sangnmps34186@fpt.edu.vn', '$2b$10$Vtn15cbFG/9QKOv51dLuFuIhyPnBjFs/9jL9okr98E7tek39eczsC', '', NULL, '123456789', 1),
(3, 'MinhSang12345', 'minhsangg0311@gmail.com', '$2b$10$PmKIMYfWwVDMm6V7ohhzy.vP2Lj6zG1gIRp74ObRbCZkznKZCHxBy', '', NULL, '1234567890', 0),
(26, 'MinhSang1234567', 'sangnmps34186@fpt.edu.vn34567', '$2b$10$5ujdRnGPzqPM2uygpf1SWuxCnMwpGtsWk8d1LMSY7dwgb3GMpxQli', '', NULL, '234245', 0),
(27, 'fkshothw', 'sufhifis@gmail.com', '$2b$10$fcHejNLNlhGdTB/5nLRjROWPhrAWWy.DdxBNDb3Vyp8joeb.h67Uy', '', NULL, '345678', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `voucher`
--

CREATE TABLE `voucher` (
  `Voucher_ID` int(11) NOT NULL,
  `Code` varchar(50) DEFAULT NULL,
  `Discount` int(11) DEFAULT NULL,
  `Expiration_Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `voucher`
--

INSERT INTO `voucher` (`Voucher_ID`, `Code`, `Discount`, `Expiration_Date`) VALUES
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
-- Chỉ mục cho bảng `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`Brand_ID`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Category_ID`);

--
-- Chỉ mục cho bảng `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`Order_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Voucher_ID` (`Voucher_ID`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`Order_Detail_ID`),
  ADD KEY `Order_ID` (`Order_ID`),
  ADD KEY `order_details_ibfk_2` (`Product_ID`);

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
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`User_ID`);

--
-- Chỉ mục cho bảng `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`Voucher_ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `addresses`
--
ALTER TABLE `addresses`
  MODIFY `Address_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `brand`
--
ALTER TABLE `brand`
  MODIFY `Brand_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `Category_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `order`
--
ALTER TABLE `order`
  MODIFY `Order_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `Order_Detail_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
  MODIFY `Payments_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `Product_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `Review_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `shipments`
--
ALTER TABLE `shipments`
  MODIFY `Shipment_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `voucher`
--
ALTER TABLE `voucher`
  MODIFY `Voucher_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`Voucher_ID`) REFERENCES `voucher` (`Voucher_ID`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`Order_ID`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`Product_ID`);

--
-- Các ràng buộc cho bảng `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`Order_ID`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`Category_ID`) REFERENCES `categories` (`Category_ID`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`Brand_ID`) REFERENCES `brand` (`Brand_ID`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`Product_ID`);

--
-- Các ràng buộc cho bảng `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `shipments_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`Order_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
