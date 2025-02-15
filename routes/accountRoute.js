const express = require("express");
const router = express.Router();
const utilities = require("../utilities/");
const errorHandlers = require("../middleware/errorHandler");
const accountController = require("../controllers/accountController");

// Route to build account view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to build register view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Error handler
router.use(errorHandlers);

module.exports = router;