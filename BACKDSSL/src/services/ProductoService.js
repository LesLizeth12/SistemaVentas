const productoRepository = require("../repositories/ProductoRepository");

class ProductoService {
  getAllProductos() {
    return productoRepository.findAll();
  }
  getProductoById(id) {
    return productoRepository.findById(id);
  }
  createProducto(productoData) {
    return productoRepository.create(productoData);
  }
  updateProducto(id, productoData) {
    return productoRepository.update(id, productoData);
  }
  deleteProducto(id) {
    return productoRepository.delete(id);
  }
  restoreProducto(id) {
    return productoRepository.restore(id);
  }

  async getProductosByCategoria(categoriaId) {
    const categoria = await productoRepository.findById(categoriaId);
    if (!categoria) {
      throw new Error("Categoria not found");
      return;
    }
    const products = await productoRepository.findProductosByIdCategoria(
      categoriaId
    );
    const productobycategoria = {
      data: {
        ...categoria,
        productos: products,
      },
    };
    return productobycategoria;
  }

  async updateProducto(id, productoData) {
    await productoRepository.update(id, productoData);
    return productoRepository.findById(id);
  }
}
module.exports = new ProductoService();
