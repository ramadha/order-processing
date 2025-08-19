import { Router } from "express";
import { getOrder, listOrders, postOrder } from "../controllers/orderController";

const router = Router();

router.get("/", listOrders);
router.get("/:id", getOrder);
router.post("/", postOrder);

export default router;
