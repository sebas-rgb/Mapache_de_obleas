import { Router } from "express";
import { getuser, getuserbyid,createuser,deleteuser,updateuser, loginUser } from "../controlers/users.controlers.js";
const router = Router();

router.get("/users",getuser)
router.get("/users/:id",getuserbyid)
router.post("/users",createuser);
router.post("/login",loginUser);
router.delete("/users/:id",deleteuser);
router.put("/users/:id", updateuser);

export default router;