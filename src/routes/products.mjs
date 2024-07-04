import { Router } from "express";
import { mock_products } from "../utils/constants.mjs";

const router = Router();

router.get("/api/products", (req, res) => {
  if (
    req.signedCookies.greeting &&
    req.signedCookies.greeting === "guten mogen"
  )
    return res.status(200).json({ products: mock_products });
  return res.status(400).json({ msg: "You need a cookie" });
});

router.post("/api/cart", (req, res) => {
  const user = req.session.user;
  if (!user) return res.status(401).json({ msg: "Unauthenticated " });
  const { body: item } = req;

  if (req.session.cart) {
    req.session.cart.push(item);
  } else {
    req.session.cart = [item];
  }
  res.status(200).json({ cart: req.session.cart });
});

router.get("/api/cart", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ msg: "You not authenticated" });
  } else if (!req.session.cart) {
    return res.status(200).json({ cart: [] });
  } else {
    return res.status(200).json({ cart: req.session.cart });
  }
});

export default router;
