import { Router } from "express";
import { authController } from "../controllers/authController";
import { asyncMiddleware } from "../middleware/asyncMidd";

const router = Router();

router.post("/signup", asyncMiddleware(authController.signup));

router.post("/login", asyncMiddleware(authController.login));

export { router as authRouter };