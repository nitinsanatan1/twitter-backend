import { Router } from "express";
import { followController } from "../controllers/followController";
import { asyncMiddleware } from "../middleware/asyncMidd";

const router = Router();

router.post("/follow-user", asyncMiddleware(followController.follow));

export { router as followRouter };