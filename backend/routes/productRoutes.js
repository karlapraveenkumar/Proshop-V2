import express from "express";
const router = express.Router();
import {getProducts, getProductById} from "../controllers/productController.js";

/*
router.get('/', asyncHandler(async (req,res)=>{
    getProducts();
}));
*/

router.route('/').get(getProducts);

/*
router.get('/:id', asyncHandler(async(req,res)=>{
    getProductById();
}));
*/
router.route('/:id').get(getProductById);

export default router;