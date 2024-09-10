const express = require("express");
const { 
    handleGetAllUsers, 
    handleCreateUser, 
    handleGetUserById, 
    handleUpdateUserById, 
    handleDeleteUserById 
} = require("../controllers/user");

const router = express.Router();

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateUser);

router.route("/:id")
.get(handleGetUserById)
.put(handleUpdateUserById)
.delete(handleDeleteUserById);

module.exports = router;