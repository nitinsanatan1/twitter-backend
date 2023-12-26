import { Router } from "express";
import { feedController } from "../controllers/feedController";
import { createPostSchema } from "../joiValidator/joiValidation";
import { celebrate } from 'celebrate';
import { asyncMiddleware } from "../middleware/asyncMidd";

const router = Router();

router.post("/post", celebrate({ body: createPostSchema}), asyncMiddleware(feedController.post));

router.get("/", asyncMiddleware(feedController.feed));

router.get("/home", asyncMiddleware(feedController.home));

export { router as feedRouter };