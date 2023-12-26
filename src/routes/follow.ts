import { Router } from "express";
import { followController } from "../controllers/followController";
import { followUserSchema } from "../joiValidator/joiValidation";
import { celebrate } from 'celebrate';
import { asyncMiddleware } from "../middleware/asyncMidd";

const router = Router();

router.post("/follow-user", celebrate({ body: followUserSchema} ), asyncMiddleware(followController.follow));

export { router as followRouter };