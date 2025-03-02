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
  

  /*  **********************************
  *  Add New Classification Rules
  * ********************************* */
validate.vehicleRules = () => {
  return [
    // valid email is required and cannot already exist in the DB
    body("inv_make")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("The vehicle's make is required."),

    // valid email is required and cannot already exist in the DB
    body("inv_model")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("The vehicle's model is required."),

    // valid email is required and cannot already exist in the DB
    body("inv_year")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 4, max: 4 })
    .isInt()
    .withMessage("The vehicle's year is required."),

    // valid email is required and cannot already exist in the DB
    body("inv_description")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("The vehicle's description is required."),

    // valid email is required and cannot already exist in the DB
    body("inv_image")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("The vehicle's image is required."),

    // valid email is required and cannot already exist in the DB
    body("inv_thumbnail")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("The vehicle's thumbnail is required."),

    // valid email is required and cannot already exist in the DB
    body("inv_price")
    .trim()
    .escape()
    .notEmpty()
    .isNumeric()
    .withMessage("The vehicle's price is required."),

    // valid email is required and cannot already exist in the DB
    body("inv_miles")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .isInt()
    .withMessage("The vehicle's miles is required."),

    // valid email is required and cannot already exist in the DB
    body("inv_color")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("The vehicle's color is required."),

    // valid email is required and cannot already exist in the DB
    body("classification_id")
    .trim()
    .notEmpty()
    .isInt()
    .withMessage("The vehicle's classification is required."),
    ]
  }

  
/* ******************************
 * Check data and return errors or continue to login
 * ***************************** */
validate.checkVehicleData = async (req, res, next) => {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const { classification_id } = req.body
    let list = await utilities.buildClassificationList(classification_id)
    res.render("inventory/addvehicle", {
      errors,
      title: "Add New Vehicle",
      nav,
      list,
      inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id,
      
    })
    return
  }
  next()
}

/* ******************************
 * Check inventory data and return errors or continue to Management view
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const { inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    res.render("inventory/edit", {
      errors,
      title: "Edit " + itemName,
      nav,
      list: classificationSelect,
      inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id,
      
    })
    return
  }
  next()
}

module.exports = validate;