const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadFromFile();
  }

  loadFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  addProduct(product) {
    const newId = this.products.length > 0 ? Math.max(...this.products.map((p) => p.id)) + 1 : 1;
    product.id = newId;
    this.products.push(product);
    this.saveToFile();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id) || null;
  }

  updateProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {

      this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct, id };
      this.saveToFile();
    }
  }

  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    this.saveToFile();
  }
}

module.exports = ProductManager;
