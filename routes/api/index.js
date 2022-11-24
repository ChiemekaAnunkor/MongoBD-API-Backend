const router = require("express").Router();

const userRoutes = require("./userRoutes");
const thoguhtRoutes = require("./thoughtRoutes");

router.use("/users", userRoutes);
router.use("/thoughts", thoguhtRoutes);

module.exports = router;
