import express from "express";
const router = express.Router();
import {getProducts, getProductById, createProduct} from "../controllers/productController.js";
import {protect, admin} from "../middleware/authMiddleware.js";

/*
router.get('/', asyncHandler(async (req,res)=>{
    getProducts();
}));
*/

router.route('/').get(getProducts).post(protect, admin, createProduct);

/*
router.get('/:id', asyncHandler(async(req,res)=>{
    getProductById();
}));
*/
router.route('/:id').get(getProductById);

export default router;