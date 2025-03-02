const accountModel = require("../models/account-model")
const invModel = require("../models/inventory-model")
const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

 /*  **********************************
  *  Add New Classification Rules
  * ********************************* */
validate.classificationRules = () => {
  return [
    // valid email is required and cannot already exist in the DB
    body("classification_name")
    .trim()
    .escape()
    .notEmpty()
    .matches(/^[A-Za-z]+$/)
    .withMessage("Only alphabetic characters are allowed."),
    ]
  }

  /* ******************************
 * Check data and return errors or continue to login
 * ***************************** */
  validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = validationResult(req)  // should be assigned directly
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        errors: errors.array(), // Pass errors as an array
        title: "Add New Classification",
        nav,
        classification_name,
      })
      return
    }
    next()
  }
  

  /* **********************************
 *  Add Inventory Validation Rules
 * ********************************* */
validate.vehicleRules = () => {
  return [
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Make must be at least 3 characters."),

    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Model must be at least 3 characters."),

    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .isInt({ min: 1886, max: new Date().getFullYear() }) // Earliest cars appeared in 1886
      .withMessage("Enter a valid 4-digit year."),

    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Description is required."),

    body("inv_image")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Image path is required."),

    body("inv_thumbnail")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Thumbnail path is required."),

    body("inv_price")
      .trim()
      .escape()
      .notEmpty()
      .isFloat({ min: 0 })
      .withMessage("Price must be a valid number."),

    body("inv_miles")
      .trim()
      .escape()
      .notEmpty()
      .matches(/^\d+$/)
      .withMessage("Miles must contain digits only (no commas)."),

    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Color is required."),

    body("classification_id")
      .trim()
      .notEmpty()
      .isInt()
      .withMessage("A classification must be selected."),
  ];
};

/* ******************************
 * Check inventory data and return errors
 * ***************************** */
validate.checkVehicleData = async (req, res, next) => {
  let errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    let classifications = await utilities.buildClassificationList(req.body.classification_id);
    
    // Filter out "Invalid value" messages
    let filteredErrors = errors.array().filter(error => error.msg !== "Invalid value");

    res.render("inventory/add-inventory", {
      errors: filteredErrors,
      title: "Add Inventory Item",
      nav,
      classifications,
      ...req.body, // Repopulate form fields
    });
    return;
  }
  next();
};


module.exports = validate;