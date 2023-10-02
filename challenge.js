class Product {
    constructor(title, description, price, thumbnail, code, stock) {
      this.id = Product.incrementId();
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
  
    static incrementId() {
      if (!this.latestId) {
        this.latestId = 1;
      } else {
        this.latestId++;
      }
      return this.latestId;
    }
  }
  
  class ProductManager {
    constructor() {
      this.products = [];
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios");
        return;
      }
  
      if (this.products.some((product) => product.code === code)) {
        console.error("El código del producto ya existe");
        return;
      }
  
      const newProduct = new Product(title, description, price, thumbnail, code, stock);
      this.products.push(newProduct);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        console.error("Producto no encontrado");
      }
    }
  }
  
  const manager = new ProductManager();
  manager.addProduct("Producto 1", "Descripción 1", 10.99, "imagen1.jpg", "P1", 100);
  manager.addProduct("Producto 2", "Descripción 2", 19.99, "imagen2.jpg", "P2", 50);
  
  console.log(manager.getProducts());
  console.log(manager.getProductById(1));
  console.log(manager.getProductById(3));