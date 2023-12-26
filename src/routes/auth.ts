import { Router } from "express";
import { authController } from "../controllers/authController";
import { loginSchema, signupSchema } from "../joiValidator/joiValidation";
import { celebrate } from 'celebrate';
import { asyncMiddleware } from "../middleware/asyncMidd";

const router = Router();

router.post("/signup", celebrate({ body: signupSchema}), asyncMiddleware(authController.signup));

router.post("/login", celebrate({ body: loginSchema}), asyncMiddleware(authController.login));

export { router as authRouter };