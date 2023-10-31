const express = require("express");
const admin = require("../controllers/admin.controller");

const router = express.Router();

router.route("/")
    .post(admin.create);

router.route("/login")
    .post(admin.login);

router.route("/admin/:id")
    .get(admin.findOne)
    .put(admin.update)
    .delete(admin.delete);

router.route("/admins")
    .get(admin.findAll)
    .delete(admin.deleteAll);

module.exports = router;