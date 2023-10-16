import fs from 'fs'


class ProductManager {

    static id;
    #path

    constructor(path) {
        this.#path = path
        this.products = this.#readFile()
        ProductManager.id = this.products.length > 0 ? this.products[this.products.length - 1].id : 0  
    }

    #readFile() {
        try {
            if (fs.existsSync(this.#path)) {
                const data = fs.readFileSync(this.#path, 'utf8')
                return JSON.parse(data)
            } else {
                return []
            }
        } catch (error) {

        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        let info
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === code) {
                info = `El código ${code} esta en uso`
                break;
            }
        }

        const newProduscts = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if (!Object.values(newProduscts).includes(undefined)) {
            ProductManager.id++;
            fs.writeFileSync(this.#path, JSON.stringify(this.products))
            this.products.push({
                id: ProductManager.id, ...newProduscts
            })
            
        } else {
            info = "Falta completar datos"
        }
        return info
    }

    getProduct() {
        return this.products;
    }

    exist(id) {
        return this.products.find((prod) => prod.id === id)
    }

    getProductById(id) {
        let info
        return !this.exist(id) ? info = {error: "Not Found"} : this.exist(id)
    }

    updateProduct(id, properties) {
        let info

        const index = this.products.findIndex(i => i.id === id)

        if (index >= 0) {
            const { id, ...rest } = properties
            fs.writeFileSync(this.#path, JSON.stringify(this.products))
            this.products[index] = { ...this.products[index], ...rest }
            
            info = `El Producto con ID: ${index + 1}, se Actualizó correctamente`
        } else {
            info = `El Producto con ID: ${id}, no existe`
        }

        return info
    }

    // Eliminamos un Producto
    deleteProduct(id) {

        let info

        const index = this.products.findIndex(i => i.id === id)

        if (index >= 0) {
            fs.writeFileSync(this.#path, JSON.stringify(this.products))
            this.products.splice(index, 1);
            
            info = `El Producto con ID: ${id}, se eliminó correctamente`
        } else {
            info = `El Producto con ID: ${id}, no existe`
        }

        return info;
    }

}

export default ProductManager