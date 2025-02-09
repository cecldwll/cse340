const invModel = require("../models/inventory-model"); // requires the inventory-model file
const utilities = require("../utilities/"); // requires the utilities file

const invCont = {}; // creates an empty invCont object

/* ***************************
 *  Build inventory by classification view
 ***************************/
invCont.buildByClassificationId = async function (req, res, next) { // creates an asynchronous function
  const classification_id = req.params.classificationId; // assigns the classification_id to the classification_id variable
  const data = await invModel.getInventoryByClassificationId(classification_id); // calls the getInventoryByClassificationId() function
  const grid = await utilities.buildClassificationGrid(data); // calls the buildClassificationGrid() function
  let nav = await utilities.getNav(); // calls the getNav() function
  
  const className = data[0].classification_name; // assigns the classification_name to the className variable
  
  res.render("./inventory/classification", { // uses EJS to render the classification view
    title: className + " vehicles",
    nav,
    grid,
  });
};

module.exports = invCont;