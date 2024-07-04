import { Router } from "express";
import { mock_products } from "../utils/constants.mjs";

const router = Router();

router.get("/api/products", (req, res) => {
  if (req.signedCookies.greeting && req.signedCookies.greeting === "guten mogen")
    return res.status(200).json({ products: mock_products });
  return res.status(400).json({ msg: "You need a cookie" });
});

export default router;
