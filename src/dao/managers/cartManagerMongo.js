import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"



export class CartManager {

    createCart = async () => {
        try{

            const cart = {
                productos: []
            }

            const result = await cartModel.create(cart)
            return {status:'Se creo el carrito correctamente',
                    res: result}
        } catch (error) {
            return error
        }
    }

    getCarts = async () => {
        try{
            const data = await cartModel.find()
            return data
        } catch (error) {
            return error
        }
    }

    getCartById = async (cid) => {
        try{
            const data = await cartModel.findById(cid)
            return data
        } catch (error) {
            return error
        }
    }

    addProductInCart = async (cid, pid) => {
        try{ 
            const carrito = await cartModel.findById(cid)
            const prod = await productModel.findById(pid)
           
            const product = carrito.productos.find(p => p.producto._id == pid)

            if(!product) {
                carrito.productos.push({producto: pid, qty: 1})
            } else {
                product.qty ++
            }

            const result = await cartModel.updateOne({_id: cid}, carrito)
            return {status:'Se agrego el producto correctamente',
                    res: result}
        } catch (error) {
            return error
        }
    }
}