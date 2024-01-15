import ProductManager from "../DAO/fileSystem/ProductManager.js";
import ProductManagerMDB from "../DAO/mongoDB/productManagerMDB.js";

const products = new ProductManager('./products.json');
const productsMDB= new ProductManagerMDB();

//-------------------------------------------------------------------

export const getProducts = async (req,res)=>{

    try {
        const limit= parseInt(req.query.limit);
        
        const productList= await productsMDB.getProducts();
        
        if(!limit || !limit == Number){
            return res.send({products:productList});
        }
        
        const limitProducts= productList.slice(0, limit);
        
        return res.send({products:limitProducts});
    
    } catch (error) {
        res.status(500).send({status:'error', result:error})
    }
}

//-------------------------------------------------------------------

export const productId= async (req,res)=>{
    
    try {
     const productId= req.params.pid;
     
     const product= await productsMDB.getProductById(productId);
     
     if(!product) return res.status(400).send({error:"Product not founded"});
     
     return res.send({product:product});
    } 
    catch (error) {
     return error
    }
     
 }

 //-------------------------------------------------------------------

 export const createProduct= async( req,res)=>{

    try {

     if(req.files){
         req.body.thumbnails= [];
         req.files.forEach((file)=> req.body.thumbnails.push(file.filename));
     }

     const Listproducts= await productsMDB.getProducts();

     const productRepeat = Listproducts.some(prod => prod.code === req.body.code);

     const checkOne = Object.keys(req.body).length;
     const checTwo = Object.values(req.body).includes("");

     if(productRepeat){
         return res.status(400).send({status:"Este producto ya existe, por favor verifique"});
     }
     
     if(checkOne < 7 || checTwo){
         return res.status(400).send({status:"Valores imcompletos, por favor verifique"});
     }

     const newProduct= await productsMDB.addProduct(req.body);

     res.send({status:"Producto Crado correctamente",result:req.body});

    } catch (error) {
     res.status(400).send({status:error, result:"No se pudo crear el producto"})
    }
 }

 //-------------------------------------------------------------------

 export const updateProduct= async (req, res) => {

    try {
        if (req.files) {
            req.body.thumbnails = [];
            req.files.forEach((file) => req.body.thumbnails.push(file.filename));
        }

        const productUpdated = await productsMDB.updateProduct(req.params.pid, req.body)

        res.send({ status: "Producto actualizado", result: req.body });
    } catch (error) {
        res.status(400).send({ status: error, message: "No se pudo actualizar el producto" });
    }

}

 //-------------------------------------------------------------------

 export const deletProduct= async (req, res) => {

    try {
        const deletProduct = await productsMDB.deletProduct(req.params.pid);

        if (deletProduct == "not found") {
            res.status(400).send({ status: "Product not found" })
        }

        res.send({ status: "Producto Eliminado Correctamente", payload: deletProduct })

    } catch (error) {
        return error
    }

}