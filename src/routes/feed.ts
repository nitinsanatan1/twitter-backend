import { Router } from "express";
import { feedController } from "../controllers/feedController";
import { asyncMiddleware } from "../middleware/asyncMidd";

const router = Router();

router.post("/post", asyncMiddleware(feedController.post));

router.get("/", asyncMiddleware(feedController.feed));

router.get("/home", asyncMiddleware(feedController.home));

export { router as feedRouter };