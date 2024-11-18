-- Bảng KHACHHANG
CREATE TABLE KHACHHANG (
    MaKhachHang VARCHAR(50) PRIMARY KEY,
    TenKhachHang NVARCHAR(100),
    SoDT VARCHAR(15),
    DiaChi NVARCHAR(255)
);

-- Bảng DONVITINH
CREATE TABLE DONVITINH (
    MaDVTinh VARCHAR(50) PRIMARY KEY,
    TenDVTinh NVARCHAR(100)
);

-- Bảng LOAISANPHAM
CREATE TABLE LOAISANPHAM (
    MaLoaiSanPham VARCHAR(50) PRIMARY KEY,
    TenLoaiSanPham NVARCHAR(100),
    MaDVTinh VARCHAR(50),
    PhanTramLoiNhuan DECIMAL(5, 2),
    FOREIGN KEY (MaDVTinh) REFERENCES DONVITINH(MaDVTinh)
);

-- Bảng SANPHAM
CREATE TABLE SANPHAM (
    MaSanPham VARCHAR(50) PRIMARY KEY,
    TenSanPham NVARCHAR(100),
    MaLoaiSanPham VARCHAR(50),
    DonGia DECIMAL(18, 2),
    SoLuong INT,
    FOREIGN KEY (MaLoaiSanPham) REFERENCES LOAISANPHAM(MaLoaiSanPham)
);

-- Bảng NHACUNGCAP
CREATE TABLE NHACUNGCAP (
    MaNCC VARCHAR(50) PRIMARY KEY,
    TenNCC NVARCHAR(100),
    SoDienThoai VARCHAR(15),
    DiaChi NVARCHAR(255)
);

-- Bảng PHIEUMUAHANG
CREATE TABLE PHIEUMUAHANG (
    SoPhieu VARCHAR(50) PRIMARY KEY,
    NgayLap DATE,
    MaNCC VARCHAR(50),
    TongTien DECIMAL(18, 2),
    FOREIGN KEY (MaNCC) REFERENCES NHACUNGCAP(MaNCC)
);

-- Bảng CHITIETPHIEUMUAHANG
CREATE TABLE CHITIETPHIEUMUAHANG (
    MaChiTietMH VARCHAR(50) PRIMARY KEY,
    SoPhieu VARCHAR(50),
    MaSanPham VARCHAR(50),
    SoLuong INT,
    DonGia DECIMAL(18, 2),
    ThanhTien DECIMAL(18, 2),
    FOREIGN KEY (SoPhieu) REFERENCES PHIEUMUAHANG(SoPhieu),
    FOREIGN KEY (MaSanPham) REFERENCES SANPHAM(MaSanPham)
);

-- Bảng PHIEUBANHANG
CREATE TABLE PHIEUBANHANG (
    SoPhieuBH VARCHAR(50) PRIMARY KEY,
    NgayLap DATE,
    MaKhachHang VARCHAR(50),
    TongTien DECIMAL(18, 2),
    FOREIGN KEY (MaKhachHang) REFERENCES KHACHHANG(MaKhachHang)
);

-- Bảng CHITIETPHIEUBANHANG
CREATE TABLE CHITIETPHIEUBANHANG (
    MaChiTietBH VARCHAR(50) PRIMARY KEY,
    SoPhieuBH VARCHAR(50),
    MaSanPham VARCHAR(50),
    SoLuong INT,
    DonGiaBanRa DECIMAL(18, 2),
    ThanhTien DECIMAL(18, 2),
    FOREIGN KEY (SoPhieuBH) REFERENCES PHIEUBANHANG(SoPhieuBH),
    FOREIGN KEY (MaSanPham) REFERENCES SANPHAM(MaSanPham)
);

-- Bảng BAOCAOTONKHO
CREATE TABLE BAOCAOTONKHO (
    Thang VARCHAR(7),
    MaSanPham VARCHAR(50),
    TenSanPham NVARCHAR(100),
    TonDau INT,
    SoLuongMuaVao INT,
    SoLuongBanRa INT,
    TonCuoi INT,
    DonViTinh VARCHAR(50),
    PRIMARY KEY (Thang, MaSanPham),
    FOREIGN KEY (MaSanPham) REFERENCES SANPHAM(MaSanPham)
);

-- Bảng LOAIDICHVU
CREATE TABLE LOAIDICHVU (
    MaLoaiDV VARCHAR(50) PRIMARY KEY,
    TenLoaiDichVu NVARCHAR(100),
    DonGiaDV DECIMAL(18, 2),
    PhanTramTraTruoc DECIMAL(5, 2)
);

-- Bảng PHIEUDICHVU
CREATE TABLE PHIEUDICHVU (
    SoPhieuDV VARCHAR(50) PRIMARY KEY,
    NgayLap DATE,
    MaKhachHang VARCHAR(50),
    TongTien DECIMAL(18, 2),
    TongTienTraTruoc DECIMAL(18, 2),
    TinhTrang NVARCHAR(50),
    FOREIGN KEY (MaKhachHang) REFERENCES KHACHHANG(MaKhachHang)
);

-- Bảng CHITIETDICHVU
CREATE TABLE CHITIETDICHVU (
    MaChiTietDV VARCHAR(50) PRIMARY KEY,
    SoPhieuDV VARCHAR(50),
    MaLoaiDichVu VARCHAR(50),
    SoLuong INT,
    DonGiaDuocTinh DECIMAL(18, 2),
    ThanhTien DECIMAL(18, 2),
    TraTruoc DECIMAL(18, 2),
    ConLai DECIMAL(18, 2),
    NgayGiao DATE,
    TinhTrang NVARCHAR(50),
    ChiPhiRieng DECIMAL(18, 2),
    FOREIGN KEY (SoPhieuDV) REFERENCES PHIEUDICHVU(SoPhieuDV),
    FOREIGN KEY (MaLoaiDichVu) REFERENCES LOAIDICHVU(MaLoaiDV)
);

CREATE TABLE TAIKHOAN (
    MaTaiKhoan INT AUTO_INCREMENT PRIMARY KEY,
    TenTaiKhoan VARCHAR(50) NOT NULL UNIQUE,
    MatKhau VARCHAR(255) NOT NULL,
    Role ENUM('admin', 'seller', 'warehouse') NOT NULL DEFAULT 'seller'
);