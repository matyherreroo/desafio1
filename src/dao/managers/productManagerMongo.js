import productModel from '../models/product.model.js'

//creo la clase 
export default class ProductManager {
   
    //Validacion para que el codigo no se repita
    validateCode = async (code) => {
        try{ 
            const data = await productModel.find()
            return data.some((producto) => producto.code == code)
        } catch (err) {
            return err
        }

    }

    //muestro los priductos
    getProducts =  async (limit) => {
        try{
            const data = await productModel.find().lean().exec()
            const productosFiltrados = limit ? data.slice(0,limit) : data
            return productosFiltrados

        } catch (err) {
            return err
        }
        
    }

    //agrego 1 producto
    getAddProducts = async (producto) => {

        try{ 
            //Valido que no se repita el codigo
            const validacion = await this.validateCode(producto.code)
            if (validacion){
                return "El producto ya existe"
            } 

            //Valido que haya ingresado todos los campos ya que son obligatorios
            if(!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
                return "Te falto algun dato"
            }
            
            //creo el producto
            const product = {
                title: producto.title,
                description: producto.description,
                price: producto.price,
                thumbnail: producto.thumbnail,
                code: producto.code,
                stock: producto.stock
            }

            //Agrego el producto a la DB
            const result = await productModel.create(product)
            return {
                    status: "Se Creo el producto correctamente",
                    res: result}
        }catch (err) {
            return err
        }
        
        
    }

    //Muestro 1 producto buscando el id dentro del array
    getProductById = async (id) => {
        try{
            const data = await productModel.findById(id)
            return data
        } catch (err) {
            return err
        }
    }

    //Modifico 1 producto
    updateProduct = async (id, update) => {
        try{
            const data = await productModel.updateOne({_id: id}, {$set: update})
            
            return {status:"Se modifico el producto correctamente",
                    res: data}
        } catch (err) {
            return err
        }
    }

    deleteProduct = async (id) => {
        try{
            const data = await productModel.deleteOne({_id: id})
            
            return {status:"Se elimino el producto correctamente",
                    res: data}
        } catch (err) {
            return err
        }
    }
}