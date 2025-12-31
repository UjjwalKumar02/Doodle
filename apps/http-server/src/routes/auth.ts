import { Router } from "express";
import { handleSignin, handleSignup } from "../controllers/auth";

const router: Router = Router();

router.post("/signup", handleSignup);

router.post("/signin", handleSignin);

export default router;
