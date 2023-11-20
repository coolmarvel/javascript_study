const router = require("express").Router();

const usersController = require("../controllers/users.controller");

router.get("/", usersController.getUsers);
router.get("/:userId", usersController.getUser);
router.post("/", usersController.postUser);

module.exports = router;
