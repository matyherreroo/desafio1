import { Router } from 'express';
import { createCart, getCart, addProductCart, deletProductCart, overwriteCart, uptadeQuantityProduct, deletCart } from '../controllers/cart_controllers.js';

const router = Router()

//-------------------------------------------------------------------------------------

router.post('/', createCart );

//-------------------------------------------------------------------------------------

router.get('/:cid', getCart);

//-------------------------------------------------------------------------------------

router.post('/:cid/product/:pid', addProductCart)

//-------------------------------------------------------------------------------------

router.delete('/:cid/product/:pid', deletProductCart)

//-------------------------------------------------------------------------------------

router.put('/:cid', overwriteCart )

//-------------------------------------------------------------------------------------

router.put('/:cid/product/:pid', uptadeQuantityProduct)

//-------------------------------------------------------------------------------------
router.delete('/:cid', deletCart)

export default router