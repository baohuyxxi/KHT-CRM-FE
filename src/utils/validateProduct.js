export function validateProduct(product) {
  const errors = [];

  if (!product.name || !product.name.trim()) {
    errors.push("Tên sản phẩm không được để trống.");
  }

  if (!product.categoryId || !product.categoryId.trim()) {
    errors.push("Danh mục sản phẩm chưa được chọn.");
  }

  if (!product.subcategoryId || !product.subcategoryId.trim()) {
    errors.push("Nhóm sản phẩm chưa được chọn.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
