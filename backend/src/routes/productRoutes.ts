import {Router} from "express"
import * as productController from "../controllers/productController"

const router = Router();

router.get("/", productController.GetAllProducts)
router.get("/my", productController.getMyProducts)
router.get("/:id", productController.getProductById)
router.post("/", productController.createProduct)
router.put("/:id", productController.updateProduct)

export default router