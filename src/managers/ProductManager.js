import fs from 'fs'

export default class ProductManager {
    constructor (){
        this.path = "./src/files/productos.json"
        this.products = []
    }

    validateCode = async (code) => {
        try{ 
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)

            return this.products.some((producto) => producto.code == code)
        } catch (err) {
            return err
        }

    }


    getProducts =  async (limit) => {
        try{
            if(!fs.existsSync(this.path)) return this.products

            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
            const productosFiltrados = limit ? this.products.slice(0,limit) : this.products
            return productosFiltrados

        } catch (err) {
            return err
        }
        
    }


    getAddProducts = async (producto) => {

        try{ 
            if(!fs.existsSync(this.path)) {

                if(!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
                    return "Te falto algun dato"
                }
                

                const product = {
                    id: this.products.length + 1,
                    title: producto.title,
                    description: producto.description,
                    price: producto.price,
                    thumbnail: producto.thumbnail,
                    code: producto.code,
                    stock: producto.stock
                }

                this.products.push(product)

                await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'))
                return "Se Creo el producto correctamente"
            } 


            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)


            const validacion = await this.validateCode(producto.code)
            if (validacion){
                return "El producto ya existe"
            } 

            if(!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
                return "Te falto algun dato"
            }
            

            const product = {
                id: this.products.length + 1,
                title: producto.title,
                description: producto.description,
                price: producto.price,
                thumbnail: producto.thumbnail,
                code: producto.code,
                stock: producto.stock
            }

            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'))
            return {
                    status: "Se Creo el producto correctamente",
                    res: product}
        }catch (err) {
            return err
        }
        
        
    }

    getProductById = async (id) => {
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
            const producto = this.products.find(product => product.id === id)

            return producto ? producto : 'Not found'
        } catch (err) {
            return err
        }
    }


    updateProduct = async (id, update) => {
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
            let producto = this.products.find(product => product.id === id)

            for(let propiedad in update){
                if(producto.hasOwnProperty(propiedad)){
                    producto[propiedad] = update[propiedad]
                }
            }
            
            await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'))
            return "Se modifico el producto correctamente"
        } catch (err) {
            return err
        }
    }

    deleteProduct = async (id) => {
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
            const productos = this.products.filter(product => product.id !== id)

            await fs.promises.writeFile(this.path, JSON.stringify(productos,null,'\t'))
            return {status:"Se elimino el producto correctamente",
                    res: productos}
        } catch (err) {
            return err
        }
    }
}