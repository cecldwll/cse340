const express = require("express");
const router = express.Router();
const utilities = require("../utilities/");
const errorHandlers = require("../middleware/errorHandler");
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

// Route to build account view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Process the login attempt
// router.post(
//     "/login",
//     (req, res) => {
//       res.status(200).send('login process')
//     }
// );

// Route to process login
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLogData,
    utilities.handleErrors(accountController.accountLogin)
  );

// Route to build register view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Route to register a new account
// router.post('/register', utilities.handleErrors(accountController.registerAccount));

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
);

// Error handler
router.use(errorHandlers);

module.exports = router;