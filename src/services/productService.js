const Product = require("../models/product.model");
const ProductCategory = require("../models/category.model");

class ProductService {
  // Lấy tất cả sản phẩm kèm danh mục
  async getAllProducts() {
    return await Product.findAll({
      include: [{ association: "category" }], // Bao gồm danh mục
    });
  }

  // Lấy sản phẩm theo mã
  async getProductById(MaSanPham) {
    const product = await Product.findByPk(MaSanPham, {
      include: [{ association: "category" }],
    });
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm với mã này.");
    }
    return product;
  }

  // Hàm tạo sản phẩm mới
  async createProduct(productData) {
    // Kiểm tra thông tin đầu vào
    this.validateProductData(productData);

    // Kiểm tra mã sản phẩm trùng lặp
    const existingProduct = await Product.findOne({
      where: { MaSanPham: productData.MaSanPham },
    });
    if (existingProduct) {
      throw new Error("Mã sản phẩm đã tồn tại. Vui lòng sử dụng mã khác.");
    }

    // Kiểm tra mã loại sản phẩm tồn tại
    const category = await ProductCategory.findOne({
      where: { MaLoaiSanPham: productData.MaLoaiSanPham },
    });
    if (!category) {
      throw new Error("Mã loại sản phẩm không tồn tại. Vui lòng kiểm tra lại.");
    }

    // Kiểm tra trùng tên trong cùng loại sản phẩm
    const duplicateName = await Product.findOne({
      where: {
        TenSanPham: productData.TenSanPham,
        MaLoaiSanPham: productData.MaLoaiSanPham,
      },
    });
    if (duplicateName) {
      throw new Error(
        "Tên sản phẩm đã tồn tại trong loại sản phẩm này. Vui lòng chọn tên khác."
      );
    }

    // Tạo sản phẩm mới
    const newProduct = await Product.create(productData);
    return newProduct;
  }

  // Cập nhật sản phẩm
  async updateProduct(MaSanPham, productData) {
    // Tìm sản phẩm
    const product = await Product.findByPk(MaSanPham);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm để cập nhật.");
    }

    // Kiểm tra thông tin đầu vào nếu cập nhật
    this.validateProductData(productData);

    // Kiểm tra trùng tên sản phẩm (khi cần)
    if (
      productData.TenSanPham &&
      productData.TenSanPham !== product.TenSanPham
    ) {
      const duplicateName = await Product.findOne({
        where: {
          TenSanPham: productData.TenSanPham,
          MaLoaiSanPham: productData.MaLoaiSanPham,
        },
      });
      if (duplicateName) {
        throw new Error(
          "Tên sản phẩm đã tồn tại trong loại sản phẩm này. Vui lòng chọn tên khác."
        );
      }
    }

    // Cập nhật sản phẩm
    return await product.update(productData);
  }

  // Xóa sản phẩm
  async deleteProduct(MaSanPham) {
    const product = await Product.findByPk(MaSanPham);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm để xóa.");
    }

    await product.destroy();
    return { message: "Sản phẩm đã được xóa thành công." };
  }

  // Hàm kiểm tra thông tin đầu vào
  validateProductData(productData) {
    if (
      !productData.TenSanPham ||
      !productData.MaLoaiSanPham ||
      productData.DonGia == null ||
      productData.SoLuong == null
    ) {
      throw new Error(
        "Thông tin sản phẩm không đầy đủ. Vui lòng cung cấp đầy đủ thông tin."
      );
    }

    if (productData.DonGia <= 0) {
      throw new Error("Đơn giá phải là một số dương.");
    }

    if (productData.SoLuong < 0 || !Number.isInteger(productData.SoLuong)) {
      throw new Error("Số lượng phải là một số nguyên không âm.");
    }
  }
}

module.exports = new ProductService();