const Product = require("../models/product.model");
const ProductCategory = require("../models/category.model");
const { uploadProductImage } = require('../config/cloudinary');

class ProductService {
  // Lấy tất cả sản phẩm kèm danh mục
  async   getAllProducts() {
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

    // Handle image upload if image file is provided
    if (productData.imageFile) {
      try {
        const imageUrl = await uploadProductImage(productData.imageFile);
        productData.HinhAnh = imageUrl;
      } catch (error) {
        throw new Error("Không thể tải lên hình ảnh: " + error.message);
      }
    }

    // Tạo sản phẩm mới
    const newProduct = await Product.create({
      ...productData,
      HinhAnh: productData.HinhAnh || 'default-image.png'
    });
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
      !productData.MaLoaiSanPham 
    ) {
      throw new Error(
        "Thông tin sản phẩm không đầy đủ. Vui lòng cung cấp đầy đủ thông tin."
      );
    }
  }
}

module.exports = new ProductService();